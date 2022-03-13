import React, { useState } from 'react';
import "./AddPostModal.css"
import CloseIcon from '@material-ui/icons/Close';
import { motion } from "framer-motion"
// import { Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { addingShare } from './linkedIn/apis/linkedInApi';
import { RootState } from '../reducer';

const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
}

const AddPostModal = ({ setaddPostModal }) => {
    // const [postSelected, setpostSelected] = useState(null);
    // const [imgLink, setimgLink] = useState("");
    const [checkedPlatforms, setcheckedPlatforms] = useState({
        linkedIn: "",
        instagram: "",
        twitter: "",
    });
    const [description, setdescription] = useState('')
    const LinkedInState = useSelector((store: RootState) => store.linkedInUser)

    // const fileSelected = (e) => {
    //     if (e.target.files?.length) {
    //         setpostSelected(e.target.files[0]);
    //     }
    // }

    // useEffect(() => {
    //     if (postSelected) {
    //         console.log(postSelected)
    //         const reader = new FileReader();
    //         reader.readAsDataURL(postSelected);
    //         reader.onloadend = () => {
    //             if (reader.result) {
    //                 setimgLink(reader.result)
    //             }
    //         }
    //     }
    // }, [postSelected]);


    const platformSelect = (e) => {
        const { name, value } = e.target

        setcheckedPlatforms((val) => {
            return {
                ...val,
                [name]: value
            }
        })
    }

    const addingPost = async () => {
        if (checkedPlatforms.linkedIn) {
            if (!LinkedInState.accessToken) {
                alert('LogIn First!');
            }
            await addingShare(LinkedInState, description)
        }
    }

    return (
        <motion.div variants={variants} initial="hidden" animate="visible" exit="hidden" transition={{ ease: "easeIn" }} className='AddPostModal' >
            <div className='AddPostModal_form' >
                <button className='addpost_close_btn' onClick={() => setaddPostModal(false)} > <CloseIcon /> </button>
                <h2>Add The Post You want to share Today.</h2>
                <input type='text' onChange={(e) => setdescription(e.target.value)} />
                {/* {imgLink && <img src={imgLink} alt={postSelected?.name} />}
                <div className='add_post_input' >
                    <Button variant='contained' color='primary' > Select the Image </Button>
                    <input type="file" name='file_selected' onChange={fileSelected} accept="image/png, image/gif, image/jpeg" />
                </div> */}
                <div className='addPostModal_checkbox' >
                    <h3>Select the Accounts you want to ADD post to.</h3>
                    <FormControlLabel onChange={platformSelect} control={<Checkbox />} label="LinkedIn" name='linkedIn' value="linkedIn" />
                    <FormControlLabel onChange={platformSelect} control={<Checkbox />} label="Instagram" name='instagram' value="instagram" />
                    <FormControlLabel onChange={platformSelect} control={<Checkbox />} label="Twitter" name='twitter' value="twitter" />
                </div>
                {description && <button className='login_form_btn' style={{ fontWeight: "bold", width: "100%" }} onClick={addingPost} >Upload</button>}
            </div>
        </motion.div>
    );
}

export default AddPostModal;
