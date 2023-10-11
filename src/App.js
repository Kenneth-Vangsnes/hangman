import "./App.css"
import React, { useEffect, useState } from "react"
import LetterKey from "./LetterKey"
import Confetti from "react-confetti"
import Word from "./words"
import Modal from "./components/Modal/Modal"
import Options from "./components/Modal/Options/Options"

function App() {
  const [pickedLetter, setPickedLetter] = useState([])
  const [solution, setSolution] = useState(Word)
  const [keyboard, setKeyboard] = useState(alphabet())
  const [win, setWin] = useState(checkForWin())
  const [count, setCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [easyMode, setEasyMode] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  //console.log(pickedLetter.length)

  useEffect(() => {
    setWin(checkForWin())
    checkForLoss()
  }, [pickedLetter])

  const setMode = () => {
    if (easyMode === true) {
      setCount(0)
    } else {
      setCount(4)
    }
  }

  function alphabet() {
    const array = []
    const alpha = Array.from(Array(26)).map((e, i) => i + 65)
    const alphabet = alpha.map((x) => String.fromCharCode(x))
    alphabet.map((ele) => array.push({ value: ele, isClicked: false }))
    return array
  }

  function checkForWin() {
    const array = []
    for (let i = 0; i < solution.length; i++) {
      if (pickedLetter.includes(solution[i])) {
        array.push(solution[i])
      } else array.push("")
    }
    return array.join() === solution.join() ? true : false
  }

  function checkForLoss() {
    if (count >= 11) {
      setShowModal(true)
      //newWord()
    } else {
      return count < 10 && win === true && setShowModal(true)
    }
  }

  /* To Do: 
  - Do some CSS magic
  - Modal with win or lose. 
  - Start new game button.
*/

  function displayLetters() {
    const array = []
    for (let i = 0; i < solution.length; i++) {
      pickedLetter.includes(solution[i])
        ? array.push(solution[i])
        : array.push(" ")
    }
    return array.map((ele, index) => (
      <span key={ele + index} className="test">
        {ele === " " ? "-" : ele}
      </span>
    ))
  }

  const keyboardKey = keyboard.map((key) => (
    <LetterKey
      className="keyboard"
      isClicked={key.isClicked}
      key={key.value}
      onClick={handleClick}>
      {key.value}
    </LetterKey>
  ))

  function handleClick(value) {
    if (win === false) {
      setKeyboard((prevKey) => {
        return prevKey.map((key) =>
          key.value === value ? { ...key, isClicked: true } : { ...key }
        )
      })
      setPickedLetter((prevLetters) => {
        return prevLetters.includes(value)
          ? [...prevLetters]
          : [...prevLetters, value]
      })
      solution.includes(value) || pickedLetter.includes(value)
        ? setCount(count)
        : setCount((prevCount) => prevCount + 1)
    } else return newWord()
  }

  function newWord() {
    setSolution(Word())
    setCount(0)
    setPickedLetter([])
    setKeyboard(alphabet())
    setShowModal(false)
  }

  return (
    <main>
      <div className="container">
        <div
          className="app-options"
          onClick={() => setShowOptions(!showOptions)}>
          Options
        </div>
        {showOptions && (
          <Options
            easyMode={easyMode}
            setEasyMode={setEasyMode}
            setMode={setMode}
            pickedLetter={pickedLetter}
          />
        )}
        {showModal && <Modal result={win} newWord={newWord} />}
        <img
          src={process.env.PUBLIC_URL + `/Hangman/Hangman - ${count}.png`}
          alt="logo"
          className="hangman"
        />
        <div className="word">{displayLetters()}</div>
        <div className="keyboard-container">{keyboardKey}</div>
        <div>{win && <Confetti />}</div>
        <button className="button" onClick={newWord}>
          New Word
        </button>
      </div>
    </main>
  )
}

export default App
