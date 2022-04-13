import React from 'react'
import Loader from 'react-loader-spinner'
import "./LoadingPage.css"

function LoadingPage() {
    return (
        <div className='loadingPage' >
            <Loader type="Puff" color="#FF4A00" height={80} width={80} />
            <h4>UPLOADING....</h4>
        </div>
    )
}

export default LoadingPage