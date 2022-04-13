import React, { FC, useEffect, useState } from 'react'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import "./MainCampaignComponent.css"
import 'react-flow-renderer/dist/style.css';
import localforage from 'localforage';
import useCustomcomponent from './customcomponent/useCustomcomponent';
import useCreateCampaign from './customcomponent/useCreateCampaign';
import Button from '@mui/material/Button';
import LoadingPage from '../LoadingPage';

interface Props {
    platform: any,
    ClickedComponent: (para: any) => void,
    SelectedNode: (para: any) => void,
    PostAddedNode: any
}

localforage.config({
    name: 'react-flow-docs',
    storeName: 'flows',
});

const MainCampaignComponent: FC<Props> = ({ platform, ClickedComponent, SelectedNode, PostAddedNode }) => {
    const [rfInstance, setRfInstance] = useState(null);
    const [reactFlowElements, SaveProgress] = useCustomcomponent()
    const [elements, setElements] = useState<any>(reactFlowElements);
    const { getElements, loaderToggle } = useCreateCampaign()

    useEffect(() => {
        setElements(reactFlowElements);
    }, [reactFlowElements])

    useEffect(() => {
        if (rfInstance) {
            SaveProgress(rfInstance)
        }
    }, [elements])

    useEffect(() => {
        if (PostAddedNode) {
            setElements((eachElement) => eachElement.id === PostAddedNode.id ? PostAddedNode : eachElement)
            SaveProgress(rfInstance)
        }
    }, [PostAddedNode])


    useEffect(() => {
        if (platform) {
            setElements((val: any) => {
                return [...val, { id: `${elements.length + 1}`, data: { label: platform.name, platformtype: platform.type, platformname: platform.name }, position: { x: 100, y: 100 } }]
            })
            // SaveProgress(rfInstance)
        }
        return () => {
            ClickedComponent(null)
        }
    }, [platform])


    const onElementsRemove = (elementsToRemove: any) => {
        setElements((els: any) => removeElements(elementsToRemove, els))
    }

    const onConnect = (params: any) => {
        // console.log(params)
        setElements((els: any) => addEdge(params, els))
        // SaveProgress(rfInstance)
    };

    const onElementClick = (event, element) => {
        console.log('click', element);
        SelectedNode(element)
    }

    const onNodeDragStop = (event, node) => {
        setElements((Stateelements) => Stateelements.map(ele => ele.id === node.id ? node : ele))
        // SaveProgress(rfInstance)
    };

    const resetElements = () => {
        // console.log('Reseting')
        setElements([
            { id: '1', type: 'input', data: { label: 'Start Campaign' }, position: { x: 100, y: 100 } }
        ])
    }

    return (
        <>
            {loaderToggle && <LoadingPage />}
            <div className='MainCampaignComponent' >
                <ReactFlow
                    elements={elements}
                    onElementsRemove={onElementsRemove}
                    onConnect={onConnect}
                    onElementClick={onElementClick}
                    onNodeDragStop={onNodeDragStop}
                    onLoad={setRfInstance}
                />
                <Button variant='contained' color='warning' onClick={resetElements} className='reset_button' >Reset</Button>
                <Button variant='contained' color='primary' onClick={() => getElements(elements)} className='confirm_button' >Confirm</Button>
            </div>
        </>
    )
}

export const CampaignComponent = React.memo(MainCampaignComponent)