import React, { FC, useEffect, useState } from 'react';
import "./FacebookPosts.css"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { RootState } from '../../reducer';
import { useSelector } from 'react-redux';

interface Props {
    id: string,
    name: string,
    category: string
}

const FacebookPosts: FC<Props> = ({ id, name, category }) => {
    const userState = useSelector((store: RootState) => store.facebookUser)
    const [pageImage, setpageImage] = useState('')

    const getPageImage = async () => {
        try {
            const Pageimage = await fetch(`https://graph.facebook.com/v13.0/${id}/picture?fields=url&type=normal&access_token=${userState.accessToken}`);
            // console.log(Pageimage.url)

            setpageImage(Pageimage.url);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (id) {
            getPageImage()
        }
    }, [id])

    // console.log(created_time);

    return (
        <IconButton>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={name}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={pageImage}
                    alt={name}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {category}
                    </Typography>
                </CardContent>
            </Card>
        </IconButton>
    );
}

export default FacebookPosts;



// https://graph.facebook.com/v12.0/3227279850887028/photos
    //app/uploads?access_token={access_token}&file_length={your_file_length_in_bytes}&file_type=image/jpeg


    // formData.append('image-data', postSelected);

            // const res = await fetch(`https://graph.facebook.com/v12.0/3227279850887028/photos`, {
            //     method: "POST",
            //     headers: {
            //         'Host': 'graph.facebook.com'
            //     },
            //     body: formData
            // })

            // const data = await res.json();
            // console.log(data);

            // const res = await fetch(`https://graph.facebook.com/v12.0/app/uploads?access_token=${FaceBookState}&file_length=${postSelected.size}&file_type=${postSelected.type}`, {
            //     method: "POST"
            // })

            // const data = await res.json();
            // var binaryFile = new FileReader();
            // binaryFile.readAsBinaryString(postSelected);
            // const backEndReqs = {
            //     session_id: data.id,
            //     access_token: FaceBookState,
            //     file: imgLink,
            //     fileType: postSelected.type
            // }

            // uploadPostApi(backEndReqs)