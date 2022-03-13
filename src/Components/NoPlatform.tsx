import React, { FC } from 'react'

const NoPlatform: FC = (): JSX.Element => {
    return (
        <div className='no_platform' >
            <h2>No Platform Selected</h2>
            <p> Please select a platform to see the posts. </p>
        </div>
    )
}

export default NoPlatform
