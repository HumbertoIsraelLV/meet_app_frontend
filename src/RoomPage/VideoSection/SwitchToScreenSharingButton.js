import React, { useState } from "react";

import SwitchImg from "./../../resources/images/switchToScreenSharing.svg";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
import * as webRTCHandler from "../../utils/webRTCHandler";

const constrainsts = {
    audio: false,
    video: true
};

const SwitchToScreenSharingButton = () => {
    const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
    const [screenSharingStream, setScreenSharingStream] = useState(null);

    const handleScreenSharingToggle = async () => {
        if(!isScreenSharingActive) {
            let stream = null;
            try{
                stream = await navigator.mediaDevices.getDisplayMedia();
            }catch(err){
                console.log("when trying to share screen");
                console.log(err);
            }
            if(stream){
                setScreenSharingStream(stream);
                webRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
                
                setIsScreenSharingActive(true);
                
                //execute here video track
                
            }
        }else{
            webRTCHandler.toggleScreenShare(isScreenSharingActive);
            setIsScreenSharingActive(false);

            //stop screen share stream
            screenSharingStream.getTracks().forEach((t) => t.stop());
            setScreenSharingStream(null);
             
        }


        setIsScreenSharingActive(!isScreenSharingActive);
    };

    return (
        <>
        <div className="video_button_container">
            <img 
                src={SwitchImg} 
                onClick={handleScreenSharingToggle}
                className="video_button_image"
                alt=""
            />
        </div>
        {
            isScreenSharingActive && (<LocalScreenSharingPreview stream={screenSharingStream}/>)
        }
        </>
    );
};

export default SwitchToScreenSharingButton;