import React from "react";

const LeaveRoomButton = () => {
    const handleRoomDisconnection = () => {
        const siteUrl = window.location.origin;
        window.location.href = siteUrl;
    };
    return (
        <div className="video_button_container">
            <button 
                onClick={handleRoomDisconnection}
                className="video_button_end"
                alt=""
            >
                Dejar reunión
            </button>
        </div>
    );
};

export default LeaveRoomButton;