import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { addNPoints } from "../../utils/api";

const ModalForGames = ({roomId, identity, isRoomHost}) => {
    
      const [isOpen, setIsOpen] = useState(false);

    const toogleModal = async () => {
      setIsOpen(!isOpen);
      console.log(await addNPoints(roomId, identity, 1));
    }

    //DESCOMENTAR CUANDO SE TENGA EL MECANISMO PARA DISPONER LOS JUEGOS.
    // useEffect(()=>{
    //     if(!isRoomHost){
    //       setTimeout(()=>{
    //           setIsOpen(true);
    //       }, 5000);
    //     }
    //   }, [isOpen]);

      return (
        <div>
          <Modal
            className="custom_modal"
            overlayClassName="custom_overlay"                
            isOpen={isOpen}>
            <div>React modal dialog component.</div>
            <p>chamaco {identity} mas 1 punto</p>
            <button onClick={toogleModal}>Close </button>
          </Modal>
        </div>
      );
}

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

export default connect(mapStoreStateToProps)(ModalForGames);