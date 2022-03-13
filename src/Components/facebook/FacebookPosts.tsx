import React from 'react';
import { EachPostField } from '../../interfaces/facebookInterfaces';
import "./FacebookPosts.css"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import moment from "moment"

function FacebookPosts({ id, picture, name, name_tags, likes, comments, created_time, alt_text }: EachPostField) {

    // console.log(created_time);

    return (
        <Card style={{ width: '19rem', margin: "10px" }} sx={{ maxWidth: 345 }}>
            <CardHeader style={{ height: "5.5rem" }}
                title={name?.split("\n").shift()}
                subheader={moment(created_time).fromNow()}
            />
            <CardMedia
                component="img"
                height="200"
                image={picture}
                alt={alt_text}
            />
            <CardContent>
                {
                    name_tags?.map(tag => {
                        return <Typography variant="body2" key={tag.id} color="text.secondary">{tag.name}</Typography>
                    })
                }
            </CardContent>
            <CardActions>
                <Typography style={{ display: "flex", alignItems: "center" }} > <ThumbUpAltIcon /> {likes.data?.length || 0}</Typography>
                <Typography style={{ display: "flex", alignItems: "center" }} > <CommentIcon /> {comments.data?.length || 0}</Typography>
            </CardActions>
        </Card>
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