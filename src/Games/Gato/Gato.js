//BUGS CUANDO SE GANA, SE AÑADEN PUNTOS A VECES MÁS DE UNA VEZ
import './Gato.css';
import Board from "./Board";
import Square from "./Square";
import {useState, useEffect} from 'react';
import { addNPoints } from '../../utils/api';
import Result from '../Result';
import GameTitle from '../GameTitle';

const defaultSquares = () => (new Array(9)).fill(null);

var gato_flag=false;

const lines = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6],
];

const Gato = ({student}) => {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner,setWinner] = useState(null);

  useEffect(()=>{
    gato_flag=true;
  },[]);
  useEffect(() => {
    const isComputerTurn = squares.filter(square => square !== null).length % 2 === 1;
    const linesThatAre = (a,b,c) => {
      return lines.filter(squareIndexes => {
        const squareValues = squareIndexes.map(index => squares[index]);
        return JSON.stringify([a,b,c].sort()) === JSON.stringify(squareValues.sort());
      });
    };
    const emptyIndexes = squares
      .map((square,index) => square === null ? index : null)
      .filter(val => val !== null);
    const playerWon = linesThatAre('x', 'x', 'x').length > 0;
    const computerWon = linesThatAre('o', 'o', 'o').length > 0;
    if (playerWon) {
      if(gato_flag){
        addNPoints(student.roomId, student.identity, 2);
        setWinner('x');
        console.log("gane");
        gato_flag=false;
      }
    }
    if (computerWon) {
      if(gato_flag){
        addNPoints(student.roomId, student.identity, 1);
        console.log("perdi");
        setWinner('o');
        gato_flag=false;
      }
    }
    const putComputerAt = index => {
      let newSquares = squares;
      newSquares[index] = 'o';
      setSquares([...newSquares]);
    };
    if (isComputerTurn) {

      const winingLines = linesThatAre('o', 'o', null);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter(index => squares[index] === null)[0];
        putComputerAt(winIndex);
        return;
      }

      const linesToBlock = linesThatAre('x', 'x', null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(index => squares[index] === null)[0];
        putComputerAt(blockIndex);
        return;
      }

      const linesToContinue = linesThatAre('o', null, null);
      if (linesToContinue.length > 0) {
        putComputerAt(linesToContinue[0].filter(index => squares[index] === null)[0]);
        return;
      }

      const randomIndex = emptyIndexes[ Math.ceil(Math.random()*emptyIndexes.length) ];
      putComputerAt(randomIndex);
    }
  }, [squares]);



  function handleSquareClick(index) {
    const isPlayerTurn = squares.filter(square => square !== null).length % 2 === 0;
    if (isPlayerTurn) {
      let newSquares = squares;
      newSquares[index] = 'x';
      setSquares([...newSquares]);
    }
  }

  return (
    <div className="memorama-main">
      <GameTitle title="GATO" instructions="Forma tres 'X' en una línea."/>
      <Board>
        {squares.map((square,index) =>
          <Square
            x={square==='x'?1:0}
            o={square==='o'?1:0}
            onClick={() => handleSquareClick(index)} />
        )}
      </Board>
      {!!winner && winner === 'x' && (
        <Result isWinner={true}/>
      )}
      {!!winner && winner === 'o' && (
        <Result isWinner={false}/>
      )}



    </div>
  );
}

export default Gato;