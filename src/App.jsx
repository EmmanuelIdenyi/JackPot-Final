import {Card} from './Card'
import{Emoji} from './Emoji'
import {Welcome} from './Welcome'
import {ChooseMode} from './ChooseMode'
import {Online} from './OnlineMode'
import {Local} from './LocalMode'
import {Computer} from './ComputerMode'
import {PlayerInfo} from './PlayerNameInput'
import {SignalSelect} from './SignalSelect'
import {ConfirmSignal} from './ConfirmSignal'
import { ScoreBoard } from './ScoreBoard'
import { LivesBoard } from './Lives'
import { InfoTab } from './InfoTab'
import { Deck } from './Deck'
import React, { useState } from 'react';
import { useRef } from 'react'
import { useEffect } from 'react'

function App() {
  const [status, setStatus] = useState(false)
  const [active, setActive] = useState('');
  const [tras, setTras] = useState('')
  const [playerSize, setPlayerSize] = useState(0);
  const [playersData, setPlayersData] = useState({'players':{}, 'teams':{},'playerTurn':'','sendSignal': false ,"timer": 10000,'suspect':false, 'suspected': "", 'newGame': false});
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const teams = {'deck1':'BLUE','user':'BLUE','deck4':'YELLOW','deck5':'YELLOW','deck3':'RED','deck2':'RED'}
  const timeout = useRef()
  const playerTimeout = useRef()
  var set = {'BLUE' : 'playerName', 'YELLOW' : 'playername',"RED": 'player-Name'}
  const sections = [['topMid','deck1'], ['rightMid', 'deck2'],['bottomMid', 'user'] , ["leftMid", 'deck3'], ["topRight", 'deck4'],[ 'bottomLeft', 'deck5']]
  const signals =  ["fa-face-angry","fa-face-dizzy","fa-face-frown","fa-face-frown-open","fa-face-dizzy","fa-face-grimace","fa-face-flushed","fa-face-grin","fa-face-grin-tongue","fa-face-grin-tongue-wink","fa-face-grin-tongue-squint","fa-face-grin-wink","fa-face-grin-wide","fa-face-grin-hearts","fa-face-grin-beam","fa-face-grin-beam-sweat","fa-face-grin-squint","fa-face-grin-squint-tears","fa-face-grin-stars","fa-face-grin-tears","fa-face-kiss","fa-face-kiss-wink-heart","fa-face-kiss-beam","fa-face-smile","fa-face-smile-wink","fa-face-smile-beam","fa-face-sad-tear","fa-face-sad-cry","fa-face-tired","fa-face-surprise","fa-face-rolling-eyes","fa-face-meh-blank","fa-face-meh","fa-face-laugh-wink","fa-face-laugh-squint","fa-face-laugh-beam","fa-face-laugh"];
// const playersData = positions.reduce((acc, position) => { acc[position] = { suspects: 5, cards: [], player: players.splice((Math.random() * (players.length - 1)) | 0, 1)[0] }; return acc; }, {});
// change cards to useState func`
  function handleGameOver(){
    setGameOver(true)
  }
  const handleNewGame = () => {
    
    setGameStart(false)
    setPlayersData((prev) => {const positions = Object.keys(prev.players);
                              const teamKeys = Object.keys(prev.teams)
                              const cardTypes = Object.keys(prev.teams).length === 3 ? ['cross', 'star', 'circle', 'triangle', 'square','diamond','cross', 'star', 'circle', 'triangle', 'square','diamond','cross', 'star', 'circle', 'triangle', 'square','diamond','cross', 'star', 'circle', 'triangle', 'square','diamond'] : ['cross', 'circle', 'triangle', 'square','cross', 'circle', 'triangle', 'square','cross', 'circle', 'triangle', 'square','cross', 'circle', 'triangle', 'square'] ;
                              const shuffledCards = cardTypes.sort(() => Math.random() - 0.5);
                              return {...prev,['players']: positions.reduce((acc, position, index) => {acc[position] = {...prev.players[position] , ['suspects']: 5, ['cards']: [...shuffledCards].splice((index)*4,4),['sentSignal']: '',['jackPot']: 2,["timer"]: 10000}; return {...acc}; }, {}), 
                                              ['teams']: teamKeys.reduce((res, key) => {res[key] = {...prev.teams[key], ['signal']: key === "BLUE" ?  "" : signals[Math.floor(Math.random() * signals.length)]};return  {...res};},{}),
                                              ['newGame']: true,
                                              ['playerTurn'] : ''}})
    handleOptionClick("Select")
  }
  const handleEmojiSelect = (chosenSignal) => {
    
    setPlayersData((prevPlayersData) => {
      return {...prevPlayersData, ['players'] : {...prevPlayersData['players']},
            ['teams'] : {...prevPlayersData['teams'],['BLUE'] : {...prevPlayersData['teams']['BLUE'], ["signal"] : chosenSignal} }
      }
    });
    handleOptionClick('Selected')
    // Additional logic if needed
  };
  function handleTeamSizeSelect(size){
    const positions =  Array.from({ length: size * 2 - 1}, (_, i) => `deck${i + 1}`);
    const players =  Array.from({ length: size * 2 - 1}, (_, i) => `CPU${i + 1}`);
    const player_positions = positions.reduce((result, position) => {result[position] = players.splice((Math.random() * (players.length - 1)) | 0, 1)[0];return result;}, {});
    const teamKeys = Array.from({ length: size }, (_, i) => ["RED", "BLUE", "YELLOW"][i]);
    const cardTypes = size === 3 ? ['cross', 'star', 'circle', 'triangle', 'square','diamond','cross', 'star', 'circle', 'triangle', 'square','diamond','cross', 'star', 'circle', 'triangle', 'square','diamond','cross', 'star', 'circle', 'triangle', 'square','diamond'] : ['cross', 'circle', 'triangle', 'square','cross', 'circle', 'triangle', 'square','cross', 'circle', 'triangle', 'square','cross', 'circle', 'triangle', 'square'] ;

    const shuffledCards = cardTypes.sort(() => Math.random() - 0.5);
    setPlayersData((prevPlayersData) => 
      { const newPlayersData = {...prevPlayersData, ['players']: positions.reduce((acc, position, index) => {acc[position] = { suspects: 5, cards: [...shuffledCards].splice((index+1)*4,4), player: player_positions[position] ,'sentSignal': '','jackPot': 2}; return {...acc, user: { suspects: 5, cards: [...shuffledCards].splice(0, 4), player: '' ,'sentSignal': '', 'jackPot' : 2}}; }, {}),
                                  ['teams']: teamKeys.reduce((res, key) => {
                                      let membersArray = [];
                                    
                                      if (key === "BLUE") {
                                        membersArray = [player_positions["deck1"], playerName];
                                      } else if (key === "RED") {
                                        membersArray = [player_positions["deck2"], player_positions["deck3"]];
                                      } else if (key === "YELLOW") {
                                        membersArray = [player_positions["deck4"], player_positions["deck5"]];
                                      }res[key] = {points: "JAC ",signal: key === "BLUE" ?  "" : signals[Math.floor(Math.random() * signals.length)],members: membersArray,};return  res;},{})}; return newPlayersData})}
  const handleNameSubmit = () => {
    const playerNameInput = document.getElementById('username-input');
    if (playerNameInput) {
      const newName = playerNameInput.value;
      setPlayersData((prevPlayersData) => {
        return {...prevPlayersData,['players'] : {...prevPlayersData['players'], ['user'] : {...prevPlayersData['players']['user'], ['player'] : newName.toUpperCase()}},
              ['teams'] : {...prevPlayersData['teams'],['BLUE'] : {...prevPlayersData['teams']['BLUE'], ["members"] : [prevPlayersData['teams']['BLUE']['members'][0], newName.toUpperCase()]} }
        }});
      handleOptionClick("Select");
    }
  };
  const playAudio = (filename) => {
    const audio = new Audio(`/src/assets/${filename}.mp3`);
    audio.play();
  };
  const handleOptionClick = (state, soundFilename = 'yellow') => {
    playAudio(soundFilename);
    setActive(`active${state}`);
  };
  const addCardToRandomPlayer = () => {
    const positions = Object.keys(playersData.players)

    const randomPlayerIndex = Math.floor(Math.random() * positions.length);
    const randomPlayerKey = positions[randomPlayerIndex]
    const cardTypes = playersData.teams.length === 3 ? ['cross', 'star', 'circle', 'triangle', 'square','camo','diamond'] : ['cross', 'circle', 'triangle', 'square','camo'] ;
    const card = cardTypes[Math.floor(Math.random() * cardTypes.length)]
    setPlayersData((prevPlayersData) => {
      return {...prevPlayersData,
        ['players'] : {...prevPlayersData['players'], [randomPlayerKey] : {...prevPlayersData['players'][randomPlayerKey], ['cards'] : [...prevPlayersData['players'][randomPlayerKey]['cards'], card] }},
        ['teams'] : {...prevPlayersData['teams']},
        ['playerTurn'] : positions[randomPlayerIndex]
  }});
  
  };
  
  function sendCard(userKey, index) {
    setPlayersData((prevPlayersData) => {
      const chosenCard = prevPlayersData.players[userKey].cards[index];
  
      // Assuming you have a valid 'user' key for the player
      // Get the next player's key in a cyclic manner

      const positions =  Object.keys(playersData.teams).length == 2 ? ['deck1', 'deck3', 'user', 'deck2'] : ['deck1', 'deck3','deck5', 'user', 'deck2', 'deck4'];
      const userIndex = positions.indexOf(userKey);
      const nextPlayerIndex = (userIndex + 1) % positions.length;
      const nextPlayerKey = positions[nextPlayerIndex];
      return {...prevPlayersData,
        ['players']: {
          ...prevPlayersData.players,
          [userKey]: {
            ...prevPlayersData.players[userKey],
            cards: prevPlayersData.players[userKey].cards.filter((_, i) => i !== index),
          },
          [nextPlayerKey]: {
            ...prevPlayersData.players[nextPlayerKey],
            cards: [...prevPlayersData.players[nextPlayerKey].cards, chosenCard],
          },
        },
        ['teams']: { ...prevPlayersData.teams },
        ['playerTurn'] : positions[nextPlayerIndex]
      };}
    );playAudio('red')}
  
  
  
  useEffect(() => {
    if (!playersData.playerTurn && gameStart && !playersData.newGame) {
      timeout.current = setTimeout(() => {
        addCardToRandomPlayer();
      }, 2000);
      
    }

    // Cleanup function to cancel the timeout if playerTurn changes
    return () => clearTimeout(timeout.current);
  });
  // Use useEffect to add a card after a timeout

  return (
    <>
    {gameOver && (<div className={`fa-fade`} id ="main_section">
          <div className="form-box info">
            <p style={{fontSize:'xxx-large'}}>GAME OVER!!!</p>
            <div className={`${set[teams[tras]]} prompt1`} style={{fontSize:'xx-large', animation:'none'}}> {`${teams[tras]}`} TEAM WINS!!!</div>
            <p style={{color:'rgba(255, 255, 255, .5),',fontSize:'medium'}}>REFRESH PAGE TO PLAY AGAIN</p>
            </div>
    </div>)}
    {!gameStart && !gameOver && (<div className={`wrapper active-popup  ${active}`}>
      {!playersData.newGame && <><Welcome onStart={handleOptionClick}/>
      <ChooseMode onChosen={handleOptionClick}/>
      <Online onClose={handleOptionClick}/>
      <Local onClose={handleOptionClick}/>
      <Computer onClose={handleOptionClick} onSelectPlayerSize={setPlayerSize} onSelectTeamSize={handleTeamSizeSelect} playerSize={playerSize}/>
      <PlayerInfo onClose={handleOptionClick} onComplete={handleNameSubmit} onInput={setPlayerName} playerData={playersData['players']['user'] ? playersData['players']['user'] : {}}/> </>}
      <SignalSelect onClose={handleOptionClick} onEmojiSelect={handleEmojiSelect}/>
      <ConfirmSignal onClose={handleOptionClick} data={playersData} onGameStart={() =>{setGameStart(true);setPlayersData((prev)=>{return {...prev,['newGame']:false}})}}/>
    </div>)}
    {(gameStart ) && !(gameOver) && (<>
        
        {playersData.playerTurn && <InfoTab data={playersData} onRecieve = {sendCard} onChosen={setPlayersData} ref={playerTimeout} setStatus = {setStatus} status={status} tras ={tras} setTras={setTras} onWinner = {handleNewGame} onDone={handleGameOver}/>}
        {sections.map(([x, y], index) => {
        if (playersData['players'][y]) {
          return (
            <Deck
              key={index}
              location={y}
              section={x}
              data={playersData}
              onTap={sendCard}
              timeout = {playerTimeout}
              onSet = {setPlayersData}
            />
          );
        }
      })}

      <ScoreBoard data={playersData}/>
      {playersData.playerTurn && <LivesBoard data ={playersData} onAction ={setPlayersData} onWin={setStatus} onWinner={setTras}/>}
        </>)}
        </>
  );
}

export default App;

