import { Button } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import "./RightSiderBarCampaign.css"
import Instagram from '../instagram/Instagram'
import Facebook from '../instagram/Facebook'
import Timer from '../Timer'

interface Props {
    selectedNode: any,
    setPostAddedNode: React.Dispatch<any>
}

const RightSiderBarCampaign: FC<Props> = ({ selectedNode, setPostAddedNode }) => {
    const [selectedFile, setselectedFile] = useState<any>()
    const [fileBase64, setfileBase64] = useState<any>()
    const [fileName, setfileName] = useState<any>()
    const [toggle, settoggle] = useState(false)

    const fileSelected = (e) => {
        if (e.target.files?.length) {
            setselectedFile(e.target.files[0]);
        }
    }

    useEffect(() => {
        if (selectedNode) {
            setfileBase64(selectedNode.data?.base64)
            setfileName(selectedNode.data?.base64Name || "Select The File")
        }
    }, [selectedNode])

    useEffect(() => {
        if (selectedFile) {
            var reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = function () {
                setfileBase64(reader.result);
                setfileName(selectedFile.name)
                settoggle(true)
            };
        }
    }, [selectedFile])

    useEffect(() => {
        if (fileBase64 && toggle) {
            selectedNode.data.base64 = fileBase64
            selectedNode.data.base64Name = selectedFile.name
            setPostAddedNode(selectedNode);
            settoggle(false)
        }
    }, [fileBase64, toggle])

    return (
        <div className='RightSiderBarCampaign' >
            {
                selectedNode?.data.platformname === 'Instagram' ? <Instagram selectedNode={selectedNode} setPostAddedNode={setPostAddedNode} /> : selectedNode?.data.platformname === 'Facebook' ? <Facebook selectedNode={selectedNode} setPostAddedNode={setPostAddedNode} /> : selectedNode?.data.platformtype === 'input' ? <div>
                    {fileBase64 && <img src={fileBase64} alt="anything" />}
                    <div className='add_post_input' >
                        <Button variant='contained' color='primary' > {fileName?.length > 6 ? `${fileName.substr(0, 6)}...` : fileName} </Button>
                        <input title='Select a file' type="file" name='file_selected' onChange={fileSelected} accept="image/png, image/gif, image/jpeg" />
                    </div>
                </div> : selectedNode?.data.platformtype === "timer" ? <Timer selectedNode={selectedNode} /> : <h3>Select Node to see the status</h3>
            }
        </div>
    )
}

export default RightSiderBarCampaign