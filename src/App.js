import './App.css';
import React, {useEffect, useState} from 'react';
import LetterKey from './LetterKey';
import Confetti from 'react-confetti'
import Word from './words';

function App() {
  const [pickedLetter, setPickedLetter] = useState([""])
  const [solution, setSolution] = useState(Word)
  const [keyboard, setKeyboard] = useState(alphabet())
  const [win, setWin] = useState(checkForWin())
  const [count, setCount] = useState(0)

useEffect(() => {
  setWin(checkForWin())
  checkForLoss()
}, [pickedLetter])

function alphabet() {
  const array = []
  const alpha = Array.from(Array(26)).map((e, i) => i + 65)
  const alphabet = alpha.map((x) => String.fromCharCode(x))
  alphabet.map(ele => array.push({value: ele, isClicked: false}))
  return array
} 

function checkForWin() {
  const array = []
  for(let i = 0; i < solution.length; i++) {
    if(pickedLetter.includes(solution[i])){
      array.push(solution[i])
    }
    else array.push("")
  }
  return array.join() === solution.join() ? true : false
}

function checkForLoss() {
  if(count >= 10) {
    newWord()
  } else {
    return count < 10 && win === true
  }
}

/* To Do: 

  - Do some CSS magic

*/

function displayLetters() {
  const array = []
  for(let i = 0; i < solution.length; i++) {
    pickedLetter.includes(solution[i]) ? array.push(solution[i]) : array.push(" ")
  } 
  return array.map(ele => <span className='test'>{ele === " " ? "-" : ele }</span>)
}

const keyboardKey = keyboard.map(key => 
    <LetterKey
      className="keyboard"
      isClicked={key.isClicked}
      key={key.value}
      onClick={handleClick}
    >
      {key.value}
    </LetterKey>
  )

function handleClick(value) {
    if(win === false) {
      setKeyboard(prevKey => {
        return prevKey.map(key => key.value === value 
        ? {...key, isClicked: true}
        : {...key})
      })    
      setPickedLetter(prevLetters => {
        return prevLetters.includes(value)
        ? [...prevLetters]
        : [...prevLetters, value]
      })
      solution.includes(value) ? console.log() : setCount(prevCount => prevCount + 1)
    } else return newWord()
}
  
  function newWord() {
    setSolution(Word())
    setCount(0)
    setPickedLetter([""])
    setKeyboard(alphabet())
  }

  return (
    <main>
      <h2 className='container'>
        <h3 className='word'>{displayLetters()}</h3>
        <h3 className='keyboard-container'>{keyboardKey}</h3>
        <h3>{win && <Confetti />}</h3>
        <img 
        src={process.env.PUBLIC_URL + `/Hangman/Hangman - ${count}.png`} 
        alt="logo"
        className='hangman'
        />
        <button 
          className='button'
          onClick={newWord}
        >New Word</button>
      </h2>
    </main>
  );
}

export default App;
