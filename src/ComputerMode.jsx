import { useState } from 'react';
export function Computer({onClose, onSelectPlayerSize, onSelectTeamSize, playerSize}){
    const  [move, setMove] = useState(false);
    return (
        <form className="form-box computerTeam">
        <div>
          <span className="back2select2" onClick={() => onClose('', 'blue')}>
            <i className={`fa-solid fa-backward ${!playerSize ?"fa-shake" : "" }`}></i>
          </span>
        </div>
        <div>
            <span className="icon-close" onClick={move ? () => {onClose("Info")} : () =>alert('Choose a team size') }><i className={`fa-sharp fa-solid fa-right-long ${move ?"fa-shake" : "" }`}></i></span>
        </div>
        <div className="heading">
          <label id="player_size">
            <input type="radio" className="player_size" name="player" value="1" required onChange={() => onSelectPlayerSize(1)}/> One Player
          </label>
          <label id="player_size">
            <input type="radio" className="player_size" name="player" value="2" required onChange={() => onSelectPlayerSize(2)}/> Two Players
          </label>
        </div>
        <div className="sub-heading">
          <p className="level3">VS</p>
          <p className="level3">HOW MANY TEAMS? </p>
        </div>
        <div className="teams">
          <div className="modeComputer delay1">
            <button type="button" onClick={() => {onSelectTeamSize(2); setMove(true)}}  className="computer2 size2"   id="computer2"   name="Team"   value="2"   disabled={!playerSize} >
              Two Teams<br /> <span className="info4"> *Your Team Vs One Other Team</span>
            </button>
          </div>
          <div className="modeComputer size3">
            <button type="button"  onClick={() => {onSelectTeamSize(3); setMove(true)}}  className="computer2"   id="computer3"   name="Team"   value="3"   disabled={!playerSize} >
              Three Teams<br /> <span className="info4"> *Your Team Vs Two Other Teams</span>
            </button>
          </div>
        </div>
        </form>
    )
}
