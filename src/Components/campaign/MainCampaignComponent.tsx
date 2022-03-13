import React, { FC, useEffect, useState } from 'react'
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import "./MainCampaignComponent.css"
import 'react-flow-renderer/dist/style.css';
import localforage from 'localforage';
import useCustomcomponent from './customcomponent/useCustomcomponent';

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
        // console.log('click', element);
        SelectedNode(element)
    }

    const onNodeDragStop = (event, node) => {
        setElements((Stateelements) => Stateelements.map(ele => ele.id === node.id ? node : ele))
        // SaveProgress(rfInstance)
    };

    return (
        <div className='MainCampaignComponent' >
            <ReactFlow
                elements={elements}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
                onElementClick={onElementClick}
                onNodeDragStop={onNodeDragStop}
                onLoad={setRfInstance}
            />
        </div>
    )
}

export const CampaignComponent = React.memo(MainCampaignComponent)