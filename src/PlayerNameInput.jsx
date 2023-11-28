import { useState } from "react"
export function PlayerInfo({onClose, onComplete, onInput, playerData}){
    const [click, setClick] = useState(false)
    const [val, setVal] = useState('')
    return (
        <div className="form-box name">
        <div>
          <span className="back2select3" onClick={() => onClose('Computer', 'blue')}>
            <i className="fa-solid fa-backward fa-shake"></i>
          </span>
        </div>
        <form id="my-form">
          <div className="input">
            <input id="username-input" name="username" pattern="[A-Za-z]{12}" type="text" value={val} onChange={(e)=>{onInput(e.target.value); setVal(e.target.value);setClick(true)}} required />
            <label className="level">Enter Your Name</label>
          </div>
          <button type="button" className="bton" onClick={() => onComplete()} disabled={!click}>
            Enter
          </button>
        </form>
      </div>
    )
}