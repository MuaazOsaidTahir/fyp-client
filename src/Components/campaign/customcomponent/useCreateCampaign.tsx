import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { uploadPost, uploadtoInstagram } from '../../../apis/api';
import { RootState } from '../../../reducer'
import { notificationToastify } from '../../../tostify/toastify';

const useCreateCampaign = () => {
    const InstagramProfile = useSelector((store: RootState) => store.instagramUser);
    const userState = useSelector((store: RootState) => store.userLoggedIn)
    const [elements, setelements] = useState([])
    const [loaderToggle, setloaderToggle] = useState(false)
    const [mutate, { data }] = useMutation(uploadPost);
    const [mutatefunction, instagramPost] = useMutation(uploadtoInstagram);

    const getElements = (campaignelements) => {
        setloaderToggle(true);
        setelements(campaignelements)
    }

    useEffect(() => {
        if (elements.length) {
            const selectedPicture = elements.filter(element => element.data?.platformtype === 'input');
            if (!selectedPicture.length) {
                alert('Please Add a Picture to create a Campaign.');
                return
            }

            mutate({
                variables: {
                    pictueURL: selectedPicture[0].data.base64
                }
            })
        }
    }, [elements])

    useEffect(() => {
        if (data) {
            // console.log(data);
            let socialMedias = elements.filter(element => element.data?.platformtype === "platform");

            let instagram = socialMedias.filter(element => element.data?.platformname === 'Instagram')
            if (instagram.length) {
                // console.log(instagram[0].data.caption);

                try {
                    mutatefunction({
                        variables: {
                            accessToken: InstagramProfile.accessToken,
                            id: InstagramProfile.userId,
                            image: data.uploadPictures.url,
                            caption: instagram[0].data.caption,
                            userId: userState.id
                            // object: JSON.stringify(obj)
                        }
                    })
                } catch (error) {
                    console.log(error.message)
                }

            }
        }
    }, [data])

    useEffect(() => {
        if(instagramPost.data && loaderToggle){
            console.log(instagramPost.data);
            setloaderToggle(false)
            notificationToastify(`Post Successfully Posted on Instagram`, 'success')
        }
        else if(instagramPost.error && loaderToggle){
            setloaderToggle(false)
            notificationToastify(`Error occured while uploading on Instagram!`, 'error')
        }
    }, [instagramPost])
    
    return { getElements, loaderToggle }
}

export default useCreateCampaign