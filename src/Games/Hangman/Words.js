var palabras = [
	// "circulo",
	// "cuadrado",
	// "triangulo",
	// "rectangulo",
	// "numero",
	// "vocal",
	// "abecedario",
    // "carro",
	// "letra",
	// "escuela",
	// "salon",
	// "clases",
	// "maestra",
    // "alumno",
    // "pluma",
    // "descanso",
    "lapiz"
]

function randomWord() {
  return palabras[Math.floor(Math.random() * palabras.length)]
}

export { randomWord }