import React, { useState } from "react"; 
import {connect} from "react-redux";
import { useHistory } from "react-router";

import { 
    setConnectOnlyWithAudio, 
    setRoomId, 
    setIdentity } 
from "../store/actions";

import { getRoomExists } from "../utils/api";
import ErrorMessage from "./ErrorMessage";
import JoinRoomButtons from "./JoinRoomButtons";
import JoinRoomInputs from "./JoinRoomInputs";
// import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";

const JoinRoomContent = (props) => {
    const {
        isRoomHost, 
        // setConnectOnlyWithAudio, 
        // connectOnlyWithAudio, 
        setIdentityAction, 
        setRoomIdAction
    } = props;
    const [roomIdValue, setRoomIdValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    
    const history = useHistory();     

    const handleJoinRoom = async () => {

        setIdentityAction(nameValue);
        if(isRoomHost){
            createRoom();
        }else{
           await joinRoom();
        }
    };
    
    const joinRoom = async () => {
        const responseMessage = await getRoomExists(roomIdValue);
        const {roomExists, full} = responseMessage;
        if(roomExists){
            if(full){
                setErrorMessage("Cupo de asistentes lleno. Intenta más tarde.");
            }else{
                //Join a room
                //Save the room id in our redux store
                setRoomIdAction(roomIdValue);
                history.push("/room");
            }
        }else{
            setErrorMessage("Reunión no encontrada. Revisa tu ID de reunión.");
        }
        
    }
    
    const createRoom = () => {
        history.push("/room");
        
    }


    return (
        <>
            <JoinRoomInputs
                roomIdValue={roomIdValue}
                setRoomIdValue={setRoomIdValue}
                nameValue={nameValue}
                setNameValue={setNameValue}
                isRoomHost={isRoomHost}
            />
            {/* <OnlyWithAudioCheckbox 
                setConnectOnlyWithAudio={setConnectOnlyWithAudio}
                connectOnlyWithAudio={connectOnlyWithAudio}
             /> */}
            <ErrorMessage 
                errorMessage={errorMessage}
            />
            <JoinRoomButtons
                handleJoinRoom={handleJoinRoom}
                isRoomHost={isRoomHost}
            />
        </>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        setConnectOnlyWithAudio: (onlyWithAudio) => dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
        setIdentityAction: (identity) => dispatch(setIdentity(identity)),
        setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
    };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomContent);