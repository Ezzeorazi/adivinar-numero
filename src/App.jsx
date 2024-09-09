import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(5);
  const [highScore, setHighScore] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);
  const [image, setImage] = useState(null); // Nuevo estado para manejar la imagen

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 20) + 1);
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleGuess = () => {
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
    } else {
      setCounter(counter - 1);
      if (counter - 1 === 0) {
        setMessage("Perdiste. El número era " + randomNumber);
        setImage("gatito-triste.jpg"); // Mostrar imagen de perdedor
      } else {
        setMessage(
          guess < randomNumber ? "El número es mayor." : "El número es menor."
        );
      }
    }
  };

  const handleReset = () => {
    setRandomNumber(Math.floor(Math.random() * 20) + 1);
    setCounter(5);
    setInput("");
    setMessage("");
    setImage(null); // Reiniciar la imagen
  };

  return (
    <>
      <h1>Adivina el número</h1>
      <div className="container">
        <p>Elije un número del 1 al 20</p>
        <input type="number" value={input} onChange={handleInputChange} /> <br />
        <button onClick={handleGuess}>Enviar</button>
        <p>{message}</p>
        <div className="imagen">
        {image && <img src={image} alt="Resultado del juego" />} {/* Mostrar la imagen según el resultado */}
        </div>
        <p>Intentos: {counter}</p>
        <p>Puntaje más alto: {highScore}</p>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    </>
  );
}

export default App;
