import React, { useState } from 'react';
import { addNPoints } from '../../utils/api';
import GameTitle from '../GameTitle';
import Result from '../Result';

import "./Preguntas.css";

const Preguntas = ({student}) =>{
	const questions = [
		{
			questionText: '¿Qué color obtenemos al mezclar amarillo y azul?',
			answerOptions: [
				{ answerText: 'Negro', isCorrect: false },
				{ answerText: 'Rojo', isCorrect: false },
				{ answerText: 'Verde', isCorrect: true },
				{ answerText: 'Cafe', isCorrect: false },
			],
		},
		{
			questionText: '¿Cuántas vocales hay?',
			answerOptions: [
				{ answerText: '6', isCorrect: false },
				{ answerText: '5', isCorrect: true },
				{ answerText: '4', isCorrect: false },
				{ answerText: '7', isCorrect: false },
			],
		},
		{
			questionText: '¿Cuál es el septimo mes del año?',
			answerOptions: [
				{ answerText: 'Julio', isCorrect: true },
				{ answerText: 'Junio', isCorrect: false },
				{ answerText: 'Agosto', isCorrect: false },
				{ answerText: 'Mayo', isCorrect: false },
			],
		},
    {
			questionText: '¿Cuál es la quinta letra del abecedario?',
			answerOptions: [
				{ answerText: 'F', isCorrect: false },
				{ answerText: 'E', isCorrect: true },
				{ answerText: 'G', isCorrect: false },
				{ answerText: 'D', isCorrect: false },
			],
		},
    {
			questionText: '¿Cuantas semanas tiene un año?',
			answerOptions: [
				{ answerText: '52', isCorrect: true },
				{ answerText: '60', isCorrect: false },
				{ answerText: '45', isCorrect: false },
				{ answerText: '75', isCorrect: false },
			],
		},
		{
			questionText: '¿Cuantos segundos tiene un minuto?',
			answerOptions: [
				{ answerText: '50', isCorrect: false },
				{ answerText: '55', isCorrect: false },
				{ answerText: '65', isCorrect: false },
				{ answerText: '60', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			if(score<4 && score>0){
				addNPoints(student.roomId, student.identity, 1);
				console.log("Perdiste");

			}else
				if(score>3){
					addNPoints(student.roomId, student.identity, 2);
					console.log("Ganaste");
				}
			setShowScore(true);
		}
	};
	return (

		<div className="memorama-main">
			<GameTitle title="PREGUNTAS" instructions="Obtén al menos 4 respuestas correctas."/>
		<div className ="app">
			{showScore ? (
				<div className='score-section'>
					{score} respuestas correctas de {questions.length} en total. 
					{(score>3)?" 2 puntos":" 1 punto"}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span> {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button className="button_preguntas" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
		{showScore && score >= 4 && (
        	<Result isWinner={true}/>
		)}
		{(showScore && score <4  && score > 0) && (
			<Result isWinner={false}/>
		)}

		</div>
	);
}

export default Preguntas;