import React from "react";

import CheckImg from "../resources/images/check.png";

const OnlyWithAudioCheckbox = ({
    connectOnlyWithAudio,
    setConnectOnlyWithAudio,

}) => {
    const handleConnectionTypeChange = () => {
        setConnectOnlyWithAudio(!connectOnlyWithAudio);
    }
    
    return (
        <div className="checkbox_container">
            <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
                {connectOnlyWithAudio &&
                    (<img className="checkbox_image" src={CheckImg} alt=""/>)} 
            </div>
            <p className="checkbox_container_paragraph">Solo audio</p>
        </div>
    );
};

export default OnlyWithAudioCheckbox;