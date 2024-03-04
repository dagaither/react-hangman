import { useState, useEffect } from 'react'
import './App.css'
import words from './assets/words.json'

function App() {
  // const [letter, setLetter] = useState("")

  const [puzzle, setPuzzle] = useState(words)
  const [hidden, setHidden] = useState("")
  const [guessedLetters, setGuessedLetters] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [guesses, setGuesses] =  useState(0)

  useEffect(() => randomWord(), [])

  const randomWord = () => {
    const randPuzzle = words[Math.floor(Math.random() * words.length)]
    setPuzzle(randPuzzle)
    setHidden(hiddenWord(randPuzzle))
    console.log(randPuzzle)
  }

  const handleGuessedLetter = (e) => {
    e.preventDefault();
    let letter = inputValue.toLowerCase();
  
    if (guessedLetters.includes(letter)) {
      alert("Already guessed!");
      setInputValue("");
      return;
    }

    if (letter.trim() == "") {
      alert("Please enter a letter!");
      setInputValue("");
      return;
    }

    let lowerCasePuzzle = puzzle.toLowerCase();
  
    if (lowerCasePuzzle.includes(letter)) {
      let newWord = "";
      for (let i = 0; i < lowerCasePuzzle.length; i++) {
        if (letter === lowerCasePuzzle[i]) {
          newWord += puzzle[i];
        } else if (hidden[i] !== "_") {
          newWord += hidden[i];
        } else {
          newWord += "_";
        }
      }
      if (guesses <= puzzle.length -1) {
        setHidden(newWord);
        setGuesses(prevGuesses => prevGuesses + 1);
        setGuessedLetters(prevGuessedLetters => [...prevGuessedLetters, letter]);
        setInputValue("");
      } else {
        gameOver();
      }
      if (newWord === lowerCasePuzzle) {
        alert(`You win! The word was ${puzzle.toUpperCase()}`);
        location.reload();
      }
    } else {
      if (guesses <= puzzle.length -1) {
        setGuesses(prevGuesses => prevGuesses + 1);
        setGuessedLetters(prevGuessedLetters => [...prevGuessedLetters, letter]);
        setInputValue("");
      } else {
        gameOver();
      }
    }
  };

  const hiddenWord = (puzzle) => {
    let hidden = ""
    for (let i=0; i <puzzle.length; i++) {
      hidden += "_"
    }
    return hidden
  }

  const remainingGuesses = () => {
    let remaining = (puzzle.length + 1) - guesses;
    return `Remaining guesses: ${remaining}`
  };

  const gameOver = () => {
    alert("Game over!");
    location.reload();
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGuessedLetter(e);
    } else if (e.target.value.length >= 1 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };


  return (
    <>
    <h1>React Hangman</h1>
    <h1>{hidden}</h1>
    <form id="userGuess" onSubmit={handleGuessedLetter}>
      <input 
      type="text" 
      name="letter" 
      placeholder="Guess a letter"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      ></input>
      <button type="submit">Submit</button>
    </form> 
    <div className="guessed">
    <h1>{guessedLetters.join(" ")}</h1>
    <h2>{remainingGuesses()}</h2>
    </div>
    </>
  )
}

export default App
