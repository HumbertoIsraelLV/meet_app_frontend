import React from "react";
import { useHistory } from "react-router";
import ConnectingButton from "./ConnectingButton";

const ConnectingButtons = () => {
    let history = useHistory();

    const pushToJoinRoomPage = () => {
        history.push("/join-room");
    };
    
    const pushToJoinRoomPageAsHost = () => {
        history.push("/join-room?host=true");
    };
    
    const pushToReportPage = () => {
        history.push("/report");
    };

    return (
        <div className="connecting_buttons_container">
            <ConnectingButton buttonText="Unirse a una reunión" onClickHandler={pushToJoinRoomPage}/>
            <ConnectingButton createRoomButton buttonText="Iniciar una reunión" onClickHandler={pushToJoinRoomPageAsHost}/>
            <ConnectingButton createRoomButton buttonText="Ver reportes" onClickHandler={pushToReportPage}/>
        </div>
    );
};

export default ConnectingButtons;