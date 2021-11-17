import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { addNPoints } from "../../utils/api";
// Juegos
import Gato from "../../Games/Gato/Gato";
import Preguntas from "../../Games/Preguntas/Preguntas";
import Hangman from "../../Games/Hangman/Hangman";
import Memorama from "../../Games/Memorama/Memorama";

var game;

const ModalForGames = ({roomId, identity, isRoomHost}) => {
    
    const [isOpen, setIsOpen] = useState(false);

    const student = {
      roomId,
      identity
    };

    const chooseGame = () => {
      const games = [
        // <Memorama student={student}/>,
        // <Memorama student={student}/>,
        // <Memorama student={student}/>,
        // <Memorama student={student}/>,
        <Gato student={student} />,
        <Gato student={student} />,
        <Gato student={student} />,
        <Gato student={student} />,
        // <Preguntas student={student}/>,
        // <Preguntas student={student}/>,
        // <Preguntas student={student}/>,
        // <Preguntas student={student}/>,
        // <Hangman student={student} />,
        // <Hangman student={student} />,
        // <Hangman student={student} />,
        // <Hangman student={student} />,
      ];  
      const index = Math.floor(Math.random() * 4);
      game = games[index];

    };

    useEffect(async () =>{
        if(!isRoomHost && !isOpen){
          await setTimeout(()=>{
              chooseGame();
              setIsOpen(true);
          // }, 1000*(Math.floor(Math.random() * 60))+60);
          }, 5000);
        }else{
          if(isOpen){
            await setTimeout(()=>{
                addNPoints(roomId, identity, 0);
                setIsOpen(false);
            // }, 50000);
            }, 20000);
          }
        }
      }, [isOpen]);

      return (
        // <div>
          <Modal
            className="custom_modal d-flex align-items-center"
            overlayClassName="custom_overlay"                
            isOpen={isOpen}>
              {game}
          </Modal>
        // </div>
      );
}

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

export default connect(mapStoreStateToProps)(ModalForGames);