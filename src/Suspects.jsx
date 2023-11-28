import {likelySuspects } from "./Brain"


import { useState } from "react"
export function SuspectSelect({data, onClose, onSelect, play='user'}){
    const suspects = likelySuspects(data,'user')
    const [suspect,setSuspect] = useState('')
    var content = ''
    if ((suspect !== '') && !(suspects.includes(suspect)) ){
      setSuspect('')
    }
    
    return (
        <div className="form-box suspectSelect">
        {(data['suspected'].length <= 0) && <><div>
            <span className="icon-close" onClick={() => {onClose()}}><i className="fa-sharp fa-solid fa-xmark"></i></span>
        </div>
        <div className="sub-heading info">
            <p className = "fa-beat">Who do you SUSPECT?!!</p>
        </div>
        <section id="EmojiSection">
          {suspects.map((suspect, index) => (
            <div key={index}>
              <div className="action">
                <p onClick={()=>{setSuspect(suspect)}}>{data.players[suspect].player}</p>
              </div>
            </div>
          ))}
          
        </section>
        {suspect && <div className="info" style={{display: "flex", alignItems: 'flex-end',gap:'10px', alignSelf:'end'}}>
          <p>Are you sure?</p> <button onClick={()=>{onSelect(suspect)}} className="player_size">Yes</button>
          </div>}</>}
        {(data['suspected'].length > 0) && <div className="prompt">{`${play != 'user' ? data.players[play].player : 'YOU' } suspect${play != 'user' ? 's' : '' } ${data['suspected'] != 'user' ? data.players[data['suspected']].player : 'YOU' }`}</div>}
      </div>
    )
}