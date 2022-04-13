import { useEffect, useState } from 'react'
import localforage from 'localforage';
import { RootState } from '../../../reducer';
import { useSelector } from 'react-redux';

localforage.config({
    name: 'react-flow-docs',
    storeName: 'flows',
});

const useCustomcomponent = () => {
    const [reactFlowElements, setreactFlowElements] = useState<any>([
        { id: '1', type: 'input', data: { label: 'Start Campaign' }, position: { x: 100, y: 100 } }
    ]);
    const userState = useSelector((store: RootState) => store.userLoggedIn)

    const restoreFlow = async () => {
        const flow: any = await localforage.getItem(userState.email);
        console.log(flow)

        if (flow) {
            setreactFlowElements(() => flow.elements.length > 0 ? flow.elements : reactFlowElements);
        }
    }

    const SaveProgress = (rfInstance) => {
        console.log('saving')
        const flow = rfInstance.toObject();
        localforage.setItem(userState.email, flow);
    }

    useEffect(() => {
        restoreFlow()
    }, [])

    // console.log(reactFlowElements);

    return [reactFlowElements, SaveProgress]

}

export default useCustomcomponent