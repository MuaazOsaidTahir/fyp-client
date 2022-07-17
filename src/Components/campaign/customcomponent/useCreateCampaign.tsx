import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { automateInsta, uploadPost, uploadtoFacebook, uploadtoInstagram } from '../../../apis/api';
import { RootState } from '../../../reducer'
import { notificationToastify, Options } from '../../../tostify/toastify';
import { v4 as uuidv4 } from 'uuid';
import useAccessToken from '../../instagram/customComponent/useAccessToken';

interface notification {
    message: string
    type: Options
}

const useCreateCampaign = () => {
    const InstagramProfile = useSelector((store: RootState) => store.instagramUser);
    const FacebookToken = useSelector((store: RootState) => store.facebookUser);
    const userState = useSelector((store: RootState) => store.userLoggedIn)
    const [campaignsCheck, setcampaignsCheck] = useState<Array<notification>>([])
    const [socialMedias, setsocialMedias] = useState([])
    const [elements, setelements] = useState([])
    const [loaderToggle, setloaderToggle] = useState(false)
    const [mutate, { data }] = useMutation(uploadPost);
    const [Instagrammutate, instagramPost] = useMutation(uploadtoInstagram);
    const [InstagramAutomatemutate, instagramAutomation] = useMutation(automateInsta);
    const [facebookmutate, facebookPost] = useMutation(uploadtoFacebook);
    const { usersPages } = useAccessToken()
    const [instaToggle, setinstaToggle] = useState(true)
    const [facebookToggle, setfacebookToggle] = useState(true)
    const [timer, settimer] = useState<any>([])
    const [platforms, setplatforms] = useState<any[]>([])
    const [automatePlatforms, setautomatePlatforms] = useState<any>([])
    const [campaignId, setcampaignId] = useState<string>('')
    const [automateToggle, setautomateToggle] = useState(true)

    const getElements = (campaignelements) => {
        setloaderToggle(true);
        setelements(campaignelements)
    }

    useEffect(() => {
        if (elements.length) {
            const selectedPicture = elements.filter(element => element.data?.platformtype === 'input');
            if (!selectedPicture.length) {
                notificationToastify('Please select at least One Picture!!!', Options.ERROR)
                return
            }

            mutate({
                variables: {
                    pictueURL: selectedPicture[0].data.base64
                }
            })

            settimer(elements.filter(element => element.data?.platformtype === "timer"))
        }
    }, [elements])

    useEffect(() => {
        if (data) {
            console.log(data);
            setsocialMedias(() => {
                return elements.filter(element => element.data?.platformtype === "platform")
            })
            setcampaignId(uuidv4());
        }
    }, [data])

    useEffect(() => {
        if (socialMedias.length) {
            if(timer.length){
                setplatforms(() => {
                    return socialMedias.filter(element => Number(element.id) < Number(timer[0].id))
                })
            }
            else{
                setplatforms(socialMedias)
            }
        }
    }, [socialMedias])

    useEffect(() => {
        if (socialMedias.length) {
            if(timer.length){
                setautomatePlatforms(() => {
                    return socialMedias.filter(element => Number(element.id) > Number(timer[0].id))
                })
            }
        }
    }, [socialMedias])

    useEffect(() => {
        if (automatePlatforms.length) {
            const instagram: any[] = automatePlatforms.filter(element => element.data.platformname === "Instagram")
            // console.log(data)
            if (instagram.length) {
                // console.log(instagram[0].data.caption);
                try {
                    InstagramAutomatemutate({
                        variables: {
                            accessToken: InstagramProfile.accessToken,
                            profileid: InstagramProfile.userId,
                            image: data.uploadPictures.url,
                            caption: instagram[0].data.caption || "",
                            userId: userState.id,
                            campaignName: localStorage.getItem('Campaign_name'),
                            campaignId: `${campaignId}`,
                            time: String(timer[0].data.time),
                            // object: JSON.stringify(obj)
                        }
                    })
                } catch (error) {
                    console.log(error.message)
                }
            }
        }
    }, [automatePlatforms])


    useEffect(() => {
        if (platforms.length) {
            const instagram: any[] = platforms.filter(element => element.data.platformname === "Instagram")

            if (instagram.length) {
                // console.log(instagram[0].data.caption);
                try {
                    Instagrammutate({
                        variables: {
                            accessToken: InstagramProfile.accessToken,
                            id: InstagramProfile.userId,
                            image: data.uploadPictures.url,
                            caption: instagram[0].data.caption || "",
                            userId: userState.id,
                            campaignName: localStorage.getItem('Campaign_name'),
                            campaignId: `${campaignId}`
                            // object: JSON.stringify(obj)
                        }
                    })
                } catch (error) {
                    console.log(error.message)
                }
            }

            const facebook: any[] = platforms.filter(element => element.data.platformname === "Facebook")
            if (facebook.length) {
                try {
                    facebookmutate({
                        variables: {
                            accessToken: FacebookToken.accessToken,
                            pageId: usersPages[0].id,
                            image: data.uploadPictures.url,
                            caption: facebook[0].data.caption,
                            userId: userState.id,
                            campaignName: localStorage.getItem('Campaign_name'),
                            campaignId: campaignId,
                            // object: JSON.stringify(obj)
                        }
                    })
                } catch (error) {
                    console.log(error.message)
                }
            }
        }
    }, [platforms])

    useEffect(() => {
        if (instagramPost.data) {
            if (instagramPost.data.uploadInstagram && instaToggle) {
                setcampaignsCheck((val) => {
                    return [...val, { message: "Post Successfully Posted on Instagram", type: Options.SUCCESS }]
                })
                setinstaToggle(false)
            }
            else if (!instagramPost.data.uploadInstagram && instaToggle) {
                setcampaignsCheck((val) => {
                    return [...val, { message: "Error occured while uploading on Instagram!", type: Options.ERROR }]
                })
                setinstaToggle(false)
            }

        }
        else if (instagramPost.error && instaToggle) {
            setcampaignsCheck((val) => {
                return [...val, { message: "Error occured while uploading on Instagram!", type: Options.ERROR }]
            })

            setinstaToggle(false)
        }
    }, [instagramPost])

    useEffect(() => {
        if (facebookPost.data) {
            if (facebookPost.data.uploadFacebook && facebookToggle) {
                setcampaignsCheck((val) => {
                    return [...val, { message: "Post Successfully Posted on Facebook", type: Options.SUCCESS }]
                })
                setfacebookToggle(false)
            }
            else if (!facebookPost.data.uploadFacebook && facebookToggle) {
                setcampaignsCheck((val) => {
                    return [...val, { message: "Error occured while uploading on Facebook!", type: Options.ERROR }]
                })
                setfacebookToggle(false)
            }
        }
        else if (facebookPost.error && facebookToggle) {
            setcampaignsCheck((val) => {
                return [...val, { message: "Error occured while uploading on Facebook!", type: Options.ERROR }]
            })
            setfacebookToggle(false)
        }
    }, [facebookPost])

    useEffect(() => {
        if (instagramAutomation.data) {
            console.log(instagramAutomation.data)
            if (instagramAutomation.data) {
                if (instagramAutomation.data.automateInstagram && automateToggle) {
                    notificationToastify("Your Campaign has been Automated!", Options.INFO)
                    setautomateToggle(false)
                    setloaderToggle(false);
                }
                else if (!instagramAutomation.data.automateInstagram && automateToggle) {
                    notificationToastify("Error Occured While Automating your Campaign.", Options.ERROR)
                    setautomateToggle(false)
                    setloaderToggle(false);
                }
            }
            else if (instagramAutomation.error && setautomateToggle) {
                notificationToastify("Error Occured While Automating your Campaign.", Options.ERROR)
                setautomateToggle(false)
                setloaderToggle(false);
            }
        }
    }, [instagramAutomation, automateToggle])

    useEffect(() => {
        // console.log(platforms)
        if (campaignsCheck.length === platforms.length) {
            setloaderToggle(false);
            campaignsCheck.map((eachnotification) => {
                return notificationToastify(eachnotification.message, eachnotification.type)
            })
        }
    }, [campaignsCheck])

    return { getElements, loaderToggle }
}

export default useCreateCampaign