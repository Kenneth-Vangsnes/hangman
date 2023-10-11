import "./Options.css"

const Options = ({ easyMode, setEasyMode, setMode, pickedLetter }) => {
  //console.log(pickedLetter)

  return (
    <div className="options-container">
      Select Mode:
      <button
        disabled={pickedLetter.length !== 0 ? true : false}
        id="options-mode"
        className="options-mode"
        onClick={() => {
          setEasyMode((prev) => !prev)
          setMode()
        }}>
        {easyMode === true ? "Easy Mode" : "Normal Mode"}
      </button>
    </div>
  )
}

export default Options
