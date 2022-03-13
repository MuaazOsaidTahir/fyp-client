import React, { useEffect } from 'react'

function Snapchat() {

    useEffect(() => {
        (function (d, s, id) {
            var js, sjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://sdk.snapkit.com/js/v1/create.js";
            sjs.parentNode.insertBefore(js, sjs);
        }(document, 'script', 'snapkit-creative-kit-sdk'));
    }, [])

    return (
        <div className="snapchat-creative-kit-share"></div>
    )
}

export default Snapchat