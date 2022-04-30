import React from "react";
import { useHistory } from "react-router";

const Button = ({buttonText, cancelButton = false, onClickHandler}) => {
    const buttonClass = cancelButton ? "join_room_cancel_button" : "join_room_success_button";
    return (
        <button onClick={onClickHandler} className={buttonClass}>
            {buttonText}
        </button>
    );

}

const JoinRoomButtons = ({handleJoinRoom, isRoomHost}) => {
    const successButtonText = isRoomHost? "Iniciar" : "Unirse"
    const history = useHistory();

    const pushToIntrodutionPage = () => {
        history.push("/");
    };
    
    return (
        <div className="join_room_buttons_container">
            <Button 
                buttonText={successButtonText}
                onClickHandler={handleJoinRoom}
            />
            <Button 
                buttonText={"Cancelar"}
                cancelButton
                onClickHandler={pushToIntrodutionPage}
            />
        </div>
    );
};

export default JoinRoomButtons;