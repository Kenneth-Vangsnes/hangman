import React from "react"

export default function LetterKey(props) {
  const styles = {
    backgroundColor: props.isClicked ? "orange" : "green",
    cursor: props.isClicked ? "undefined" : "pointer",
  }

  return (
    <div
      className={props.className}
      style={styles}
      key={props.value}
      value={props.value}
      clicked={props.isClicked}
      onClick={() => props.onClick(props.children)}>
      {props.children}
    </div>
  )
}
