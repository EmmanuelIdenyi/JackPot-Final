import React, { useState } from 'react';
export function Wrapper({playerSize, setSelectedTeam, setPlayerSize, startGame}){
    const [on,setOn] = useState(false);
  const [active, setActive] = useState('');


  const handleTeamSelection = (team) => {     setSelectedTeam(team);     startGame(playerSize, team);} // Notify parent component to start the game   };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission with playerSize and selectedTeam values

    
    // ... (perform further actions)
  };

  const playAudio = (filename) => {
    const audio = new Audio(`/src/assets/${filename}.mp3`);
    audio.play();
  };

  const handleIconCloseClick = () => {
    playAudio('blue');
    setActivePopup(true);
  };

  const handleSelectClick = (soundFilename, setActive) => {
    playAudio(soundFilename);
    setActive(false);
    setActivePopup(true);
  };

  const handleOptionClick = (state, soundFilename = 'yellow') => {
    playAudio(soundFilename);
    setActive(state);
  };

    return (
        <div className={`wrapper 'active-popup'  ${on ? 'active' : ''}${active}`}>
        <div className="form-box login">
          <h2 id="level-title">Welcome to</h2>
                <div className="input-box">
                    <img src="src/assets/Untitled.png"/>
                </div>
                <div className = "play">
                    <button onClick={() => {setOn(true)}} className="btn"><span id="start">Play  </span></button>
                </div>
        </div>
        <div className="form-box register">
          <div className="heading">
            <p id = "title">HOW WOULD YOU LIKE TO PLAY?</p>
          </div>
          <div className = "mode trait">
            <a href="#" className="online" id="online" onClick={() => handleOptionClick('Online')}>ONLINE</a>
          </div>
          <div className = "mode">
              <a href="#" className="local" id="local" onClick={() => handleOptionClick('Local')}>LOCAL</a>
          </div>
          <div className = "mode">
              <a href="#" className="computer" id="computer" onClick={() => handleOptionClick('Computer')}>COMPUTER</a>
          </div>
        </div>
        
        <div className="form-box onlineTeam">
          <div>
              <span className="back2select"  onClick={() => handleOptionClick('','blue')} ><i className="fa-solid fa-backward fa-shake"></i></span>
          </div>
          <div className="sub-heading">
              <p className = "level">HOW MANY TEAMS? </p>
          </div>
          <div className = "modeOnline delay size2">
              <a href="#" className="online2" id ="online2">Two Teams<br/> <span className = "info2"> *Your Team Vs One Other Team</span></a>
          </div>
          <div className="sub-heading">
              <p id = "alternate" className = "level">or </p>
          </div>
          <div className = "modeOnline size3">
              <a href="#" className="online3" id="online3">Three Teams<br/> <span className = "info2"> *Your Team Vs Two Other Teams</span></a>
          </div>
        </div>
  
          <div className="form-box localTeam">
              <div>
                  <span className="back2select1"  onClick={() => handleOptionClick('','blue')} ><i className="fa-solid fa-backward fa-shake"></i></span>
              </div>
              <div className="sub-heading">
                  <p className = "level2">Play with Friends </p>
              </div>
              <div className = "modeLocal">
                  <a href="#" className="local2" id ="local2">Host Game<br/> <span className = "info3"> Create a code for your friends to join with</span></a>
              </div>
              <div className="sub-heading">
                  <p id = "alternate1" >or </p>
              </div>
              <div className = "modeLocal">
                  <a href="#" className="local2" id="local3">Join Game<br/> <span className = "info3">Use a code to join an existing game</span></a>
              </div>
          </div>
          <form className="form-box computerTeam" onSubmit={handleFormSubmit}>
          <div>
            <span className="back2select2" onClick={() => handleOptionClick('', 'blue')}>
              <i className="fa-solid fa-backward fa-shake"></i>
            </span>
          </div>
          <div className="heading">
            <label id="player_size">
              <input type="radio" className="player_size" name="player" value="1" required onChange={() => setPlayerSize('1')}/> One Player
            </label>
            <label id="player_size">
              <input type="radio" className="player_size" name="player" value="2" required onChange={() => setPlayerSize('2')}/> Two Players
            </label>
          </div>
          <div className="sub-heading">
            <p className="level3">VS</p>
            <p className="level3">HOW MANY TEAMS? </p>
          </div>
          <div className="teams">
            <div className="modeComputer delay1">
              <button  onClick={() => handleTeamSelection('2')}  className="computer2 size2"   id="computer2"   name="Team"   value="2"   disabled={!playerSize} >
                Two Teams<br /> <span className="info4"> *Your Team Vs One Other Team</span>
              </button>
            </div>
            <div className="modeComputer size3">
              <button   onClick={() => handleTeamSelection('3')}  className="computer2"   id="computer3"   name="Team"   value="3"   disabled={!playerSize} >
                Three Teams<br /> <span className="info4"> *Your Team Vs Two Other Teams</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      
    )
}