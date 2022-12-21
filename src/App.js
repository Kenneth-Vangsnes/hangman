import './App.css';
import React, {useEffect, useState} from 'react';
import LetterKey from './LetterKey';

function App() {
  const [pickedLetter, setPickedLetter] = useState([""])
  const [solution, setSolution] = useState(["H", "E", "L", "L", "O"])
  const [keyboard, setKeyboard] = useState(alphabet())
  
 console.log(pickedLetter)
useEffect(() => {  
}, [pickedLetter])

function alphabet() {
  const array = []
  const alpha = Array.from(Array(26)).map((e, i) => i + 65)
  const alphabet = alpha.map((x) => String.fromCharCode(x))
  alphabet.map(ele => array.push({value: ele, isClicked: false}))
  return array
} 

/* To Do: 
  - Map over solution to display correctly picked letters and set win condition
  - Set up a state for a counter to use with hangman images and set loss condition
  - Do some CSS magic
  - 

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
    setKeyboard(prevKey => {
      return prevKey.map(key => key.value === value 
      ? {...key, isClicked: true}
      : {...key})
    })    
    setPickedLetter(prevLetters => {
      return prevLetters.includes(value) ? [...prevLetters] : [...prevLetters, value]        
    })
    
}

  return (
    <main>
      <h2 className='container'>
        <h3 className='letter'>{displayLetters()}</h3>
        <h3 className='keyboard-container'>{keyboardKey}</h3>
      </h2>
    </main>
  );
}

export default App;
