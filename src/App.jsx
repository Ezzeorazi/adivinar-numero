import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(5);
  const [highScore, setHighScore] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);
  const [image, setImage] = useState(null);
  const [gameOver, setGameOver] = useState(false); // Nuevo estado para detectar si terminó el juego

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const generateRandomNumber = () => {
    setRandomNumber(Math.floor(Math.random() * 20) + 1);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleGuess = () => {
    if (gameOver) return; // No permitir adivinar si el juego terminó

    const guess = parseInt(input);
    if (isNaN(guess)) {
      setMessage("Por favor, ingresa un número válido.");
      return;
    }

    // Verificar si está en el rango 1-20
    if (guess < 1 || guess > 20) {
      setMessage("El número debe estar entre 1 y 20.");
      return;
    }

    if (guess === randomNumber) {
      setMessage("¡Felicidades! Adivinaste el número.");
      if (counter > highScore) {
        setHighScore(counter);
      }
      setImage("gatito-feliz.jpg"); // Mostrar imagen de ganador
      setGameOver(true); // Finalizar el juego
    } else {
      setCounter(counter - 1);
      if (counter - 1 === 0) {
        setMessage("Perdiste. El número era " + randomNumber);
        setImage("gatito-triste.jpg"); // Mostrar imagen de perdedor
        setGameOver(true); // Finalizar el juego
      } else {
        setMessage(
          guess < randomNumber ? "El número es mayor." : "El número es menor."
        );
      }
    }
  };

  const handleReset = () => {
    generateRandomNumber();
    setCounter(5);
    setInput("");
    setMessage("");
    setImage(null); // Reiniciar la imagen
    setGameOver(false); // Resetear el estado de finalización
  };

  return (
    <>
      <h1>Adivina el número</h1>
      <div className="container">
        <p>Elige un número del 1 al 20</p>
        <input
          type="number"
          value={input}
          onChange={handleInputChange}
          disabled={gameOver} // Desactivar input si el juego terminó
        />{" "}
        <br />
        <button onClick={handleGuess} disabled={gameOver}>
          Enviar
        </button>
        {gameOver && (
          <button onClick={handleReset}>Jugar de nuevo</button> // Mostrar botón sólo cuando el juego termina
        )}
        <p>{message}</p>
        <div className="imagen">
          {image && <img src={image} alt="Resultado del juego" />}{" "}
        </div>
        <p>Intentos: {counter}</p>
        <p>Puntaje más alto: {highScore}</p>
        
      </div>
    </>
  );
}

export default App;
