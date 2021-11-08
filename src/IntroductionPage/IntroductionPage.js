import React, { useEffect } from "react";
import {connect} from "react-redux";

import logo from "../resources/images/logo.png";
import { setIsRoomHost } from "../store/actions";
import ConnectingButtons from "./ConnectingButtons";
import './IntroductionPage.css';

const IntroductionPage = ({setIsRoomHostAction}) => {

    useEffect(()=>{
        setIsRoomHostAction(false);
    },[]);

    return (
        <div className="introduction_page_container">
            <div className="introduction_page_panel">
                <img src={logo} className="introduction_page_image" alt=""/>
                <ConnectingButtons/>
            </div>
        </div>
    );
};

const mapActionsToProps = (dispatch) => {
    return {
        setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
    };
};

export default connect(null, mapActionsToProps)(IntroductionPage);