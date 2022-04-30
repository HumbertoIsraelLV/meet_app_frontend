import React from "react"; 


const JoinRoomTitle = ({isRoomHost}) => {
    const titleText = isRoomHost ? "Iniciar una reunión" : "Unirse a una reunión";
    return (
        <p className="join_room_title">{titleText}</p>
    );
};

export default JoinRoomTitle;