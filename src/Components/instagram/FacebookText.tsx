import { Button } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'

interface Props{
    selectedNode: any,
    saveCaption:  (caption: string) => void
}

const FacebookText: FC<Props> = ({ selectedNode, saveCaption }) => {
    const [nodeCaption, setnodeCaption] = useState("")

    useEffect(() => {
        if (selectedNode) {
            setnodeCaption(selectedNode.data.caption || "")
        }
    }, [selectedNode])

    const saveTheCaption = () => {
        saveCaption(nodeCaption)
        setnodeCaption("")
    }

    return (
        <div className='teaxtarea_container' >
            <textarea placeholder='Post Caption For Instagram' value={nodeCaption} onChange={(e) => setnodeCaption(e.target.value)} />
            <Button variant='contained' onClick={saveTheCaption} color='info' > Save </Button>
        </div>
    )
}

export default FacebookText