import { allCardsSame } from "./Brain";
import { useState } from "react";
import { useEffect } from "react";
const ActionButtons = ({isActive, onSend, data, onSuspect,onWin, correct}) => {
    const team = {'deck1':'user','user':'deck1','deck4':'deck5','deck5':'deck4','deck3':'deck2','deck2':'deck3'}
    return (
      
      <>
        <button className={`action ${isActive && !(data.players.user.sentSignal || data.sendSignal || data.players[team['user']].sentSignal || data.suspect || data['suspected'].length || data.players.user.suspects < 1)  ? 'fa-beat' : ''}`} onClick={onSend} disabled ={(data.players.user.sentSignal || data.sendSignal || data.players[team['user']].sentSignal || data.suspect || data['suspected'].length || data.players.user.suspects < 1) }>Send Signal</button>
        <button className="action" onClick={onSuspect} disabled={data.players.user.suspects < 1 || data.suspect || data['suspected'].length}>Suspect</button>
        <button className={`action ${(correct === false) ? 'fa-shake' : ""}`} disabled={ !data.players.user.jackPot || data.suspect || data['suspected'].length} onClick={onWin}>{`JACKPOT (${data.players.user.jackPot})`}</button>
      </>
    );
  };
const Lives = ({ suspectsCount }) => {
    return (
      <section className="lives">
        <p className="playerName">Suspects</p>
        {[...Array(suspectsCount)].map((_, index) => (
          <i key={index} className="fa-solid fa-heart fa-2xl heart"></i>
        ))}
      </section>
    )}

export const LivesBoard = ({ data , onAction, onWin, onWinner}) => {
    const [correct, setCorrect] = useState('true')
    let isActive = allCardsSame(data.players.user.cards)
    function handleAction(){
      onAction((prevData)=>{return {...prevData, ['sendSignal'] : true}})
    }
    function handleSuspect(){
      onAction((prevData)=>{return {...prevData, ['suspect'] : true}})
    }
    useEffect(()=>{
      if (correct == false){
        const audio = new Audio(`/src/assets/wrong-answer-sound-effect.mp3`);
        audio.play();
        const tred = setTimeout(()=>{setCorrect('true')},1000)
      }
    })
    function handleJackpot(){
      if (allCardsSame(data.players['deck1'].cards)){
        onWin(true)
        onWinner('user')
      }else{
        setCorrect(false)
        onAction((prevData)=> {return {...prevData,['players']:{...prevData.players,['user']:{...prevData.players.user,['jackPot']:prevData.players.user.jackPot-1}}}})
      }
    }
    return (
    <section >
      <Lives suspectsCount={data.players.user.suspects}/>
      <ActionButtons isActive = {isActive} onSend = {handleAction} data={data} onSuspect={handleSuspect} onWin={handleJackpot}  correct={correct}/>
      </section>
    );
  };
  