import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './Words.js';

import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";
import { addNPoints } from '../../utils/api';
import GameTitle from '../GameTitle';
import Result from '../Result';

var flag=false;

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6]
  }

  constructor(props) {
    super(props);
    flag=true;
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord()
    }
  }

  handleGuess = e => {
    let letter = e.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
    }));
  }

  guessedWord() {
    return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  generateButtons() {
    return "abcdefghijklmnñopqrstuvwxyz".split("").map(letter => (
      <button
        class='btn btn-lg btn-primary m-2'
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord()
    });
  }


  render(){
      const gameOver = this.state.mistake >= this.props.maxWrong;
      const isWinner = this.guessedWord().join("") === this.state.answer;
      let gameStat = this.generateButtons();

      if (isWinner) {
        if(flag){
          addNPoints(this.props.student.roomId, this.props.student.identity, 2);
          console.log("ganaste");
          // gameStat = "GANASTE!! +4 puntos";
          gameStat = 1;
          flag=false;
        }
      }
      
      if (gameOver) {
        if(flag){
          addNPoints(this.props.student.roomId, this.props.student.identity, 1);
          gameStat = 2;
          // gameStat = "PERDISTE! +2 puntos";
          console.log("Perdiste");
          flag=false;
        }
      }

      return(
          <div className="memorama-main">
              <GameTitle title={"AHORCADO"} instructions={"Adivina la palabra."}/>
              <div className="float-right">Intento: {this.state.mistake} de {this.props.maxWrong}</div>
              <div className="text-center">
                <img src={this.props.images[this.state.mistake]} alt=""/>
              </div>
              <div className="text-center">
                  <p>Adivina la palabra:</p>
                  <p>
                      {!gameOver ? this.guessedWord() : this.state.answer}
                  </p>
                  <p>{gameStat}</p>
                  {/* <button className='btn btn-info' onClick={this.resetButton}>Limpiar</button> */}
              </div>
              {(gameStat===1) &&
              <Result isWinner={true} points={4}/>
              }
              {(gameStat===2) &&
              <Result isWinner={false} points={2}/>
              }
          </div>
      )
  }
}

export default Hangman;

  