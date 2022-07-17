import React, { useEffect, useState, FC } from 'react';
import DateTimePicker from 'react-datetime-picker';
import "react-datetime-picker/dist/DateTimePicker.css"
import "./Timer.css"

interface Props {
    selectedNode: any,
}

const Timer: FC<Props> = ({ selectedNode }) => {
    const [value, onChange] = useState<Date>();

    useEffect(() => {
        if (selectedNode) {
            if (selectedNode.data.time) {
                onChange(new Date(new Date().getTime() + selectedNode.data.time))
            }
            else {
                onChange(new Date());
            }
        }
    }, [selectedNode])

    useEffect(() => {
        if (value) {
            let time = new Date(value).getTime()
            let uploadtime = time - new Date().getTime();
            console.log(uploadtime);
            selectedNode.data.time = uploadtime;
        }
    }, [value])

    return (
        <div>
            <h3>Select the Time.</h3>
            <DateTimePicker onChange={onChange} value={value} />
        </div>
    )
}

export default Timer