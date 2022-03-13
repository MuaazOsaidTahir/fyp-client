import Header from '../Header'
import LeftSiderBarCampaign from "./LeftSiderBarCampaign"
import React, { FC, useState } from 'react'
import "./CampaignPage.css"
import RightSiderBarCampaign from './RightSiderBarCampaign';
import { CampaignComponent } from './MainCampaignComponent';

const CampaignPage: FC = () => {
    const [platform, setplatform] = useState<any>()
    const [selectedNode, setselectedNode] = useState<any>()
    const [PostAddedNode, setPostAddedNode] = useState<any>(null)

    const ClickedComponent = (para: any) => {
        // console.log(para)
        setplatform(para)
    }

    const SelectedNode = (para: any) => {
        setselectedNode(para);
    }

    return (
        <>
            <Header />
            <div className='CampaignPage' >
                <LeftSiderBarCampaign ClickedComponent={ClickedComponent} />
                <CampaignComponent platform={platform} ClickedComponent={ClickedComponent} SelectedNode={SelectedNode} PostAddedNode={PostAddedNode} />
                <RightSiderBarCampaign selectedNode={selectedNode} setPostAddedNode={setPostAddedNode}  />
            </div>
        </>
    )
}

export default CampaignPage