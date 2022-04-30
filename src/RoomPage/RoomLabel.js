import React, { useRef } from "react";
import copy from "copy-to-clipboard"; 
import { MdOutlineContentCopy } from 'react-icons/md';
import ReactTooltip from 'react-tooltip';

const RoomLabel = ({roomId}) => {

    var tooltip = useRef();

    const copyToClipboard = async () => {
        copy(roomId);
        ReactTooltip.show(tooltip);
        await timeout(1000); //for 1 sec delay
        ReactTooltip.hide(tooltip);
    }

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    return (
        <>
            <div className="room_label">
                <button 
                    ref={ref => (tooltip = ref)}
                    data-tip="ID copiado" 
                    data-event="click" 
                    onClick={copyToClipboard} 
                    className="room_label_paragraph"
                >
                    <p >ID de reunión: {roomId} {' '}
                        <MdOutlineContentCopy/>
                    </p>
                </button>
                <ReactTooltip 
                    type="light"
                    effect="solid"
                    eventOff="custom"
                    isCapture={true}
                />
            </div>
        </>
    );
};

export default RoomLabel;