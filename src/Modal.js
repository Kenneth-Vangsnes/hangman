const Modal = ({ win }) => {
  console.log(win)

  const modalContent = () => {
    if (win === undefined) {
      return null
    }
    if (win === true) {
      return <div>You win!</div>
    }
    if (win === false) {
      return <div>You Lost!</div>
    }
  }

  return <div className="modal-container">{modalContent()}</div>
}

export default Modal
