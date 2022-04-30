import { useEffect, useState } from 'react';
import { addNPoints } from '../../utils/api';
import GameTitle from '../GameTitle';
import Result from '../Result';
import Board from './Board/Board';
import './Memorama.css';
const emojiList = [...'🍉🐶🎵👽'];

var flag=false;
var movements = 0;
var pairs = 0; 
const Memorama = ({student}) => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect( () => {
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setShuffledMemoBlocks(shuffledEmojiList.map( (emoji, i) => ({ index: i, emoji, flipped: false}) ));
    pairs=0;
    movements=0;
    flag=true;
  }, []);

  const shuffleArray = a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const handleMemoClick = memoBlock => {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    if(movements<14){
      shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
      setShuffledMemoBlocks(shuffledMemoBlocksCopy);
      movements++;
      if(selectedMemoBlock === null) {
        setselectedMemoBlock(memoBlock);
      } else if(selectedMemoBlock.emoji === memoBlock.emoji) {
        pairs=pairs+1;
        if(pairs===4 && flag){
          addNPoints(student.roomId, student.identity, 2)
          console.log("Ganaste");
          flag=false;
        }
        setselectedMemoBlock(null);
      } else {
        setAnimating(true);
        setTimeout(() => {
          shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
          shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
          setShuffledMemoBlocks(shuffledMemoBlocksCopy);
          setselectedMemoBlock(null);
          setAnimating(false);
        }, 1000);
      }
      
    }
    if(movements===14){
        if(flag){
          addNPoints(student.roomId, student.identity, 1);
          console.log("Perdiste");
          flag=false;
        }
        movements++; 
    }
  }

  return (
    <div className="memorama-main">
        <GameTitle title="MEMORAMA" instructions="Encuentra todos los pares."/>
      <Board memoBlocks={shuffledMemoBlocks} animating={animating}  handleMemoClick={handleMemoClick} />
      {pairs===4 &&
        <Result isWinner={true}/>
      } 
      {(movements>=14 && pairs!==4) && 
        <Result isWinner={false}/>
      }
    </div>
  );
}

export default Memorama;
