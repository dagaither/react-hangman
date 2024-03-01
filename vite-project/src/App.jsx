import { useState, useEffect } from 'react'
import './App.css'
import words from './assets/words.json'

function App() {
  // const [letter, setLetter] = useState("")

  const [puzzle, setPuzzle] = useState(words)
  const [hidden, setHidden] = useState("")
  const [guessedLetters, setGuessedLetters] = useState([])
  const [inputValue, setInputValue] = useState("")

  useEffect(() => randomWord(), [])

  const randomWord = () => {
    const randPuzzle = words[Math.floor(Math.random() * words.length)]
    setPuzzle(randPuzzle)
    setHidden(hiddenWord(randPuzzle))
    console.log(randPuzzle)
  }

  const handleGuessedLetter = (e) => {
    e.preventDefault()
    let letter = e.target.letter.value
    let newWord = ""
    for (let i=0; i <puzzle.length; i++) {
      if (letter === puzzle[i]) {
        newWord += puzzle[i]
      } 
      else if (hidden[i] !== "_") {
        newWord += hidden[i]
      }
      else {
        newWord += "_"
      }
    }
    setHidden(newWord)
    setInputValue("")
  }


  const hiddenWord = (puzzle) => {
    let hidden = ""
    for (let i=0; i <puzzle.length; i++) {
      hidden += "_"
    }
    return hidden
  }

  return (
    <>
    <h1>Hangman</h1>
    <h1>{hidden}</h1>
    <form id="userGuess" onSubmit={handleGuessedLetter}>
      <input 
      type="text" 
      name="letter" 
      placeholder="Guess a letter"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      // onChange={(e) => setLetter(e.target.value)}
      ></input>
      <button type="submit">Submit</button>
    </form> 
    </>
  )
}

export default App
