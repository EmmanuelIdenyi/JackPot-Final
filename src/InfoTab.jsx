import { useEffect } from "react"
import { useRef } from "react";
import { chooseLeastFrequentCard, likelyThreats, shouldSuspect, accuseStatus, calculateTotalPoints, allCardsSame } from './Brain.js'
import { SignalSelect } from "./SignalSelect"
import { forwardRef } from "react";
import { shouldSignal } from "./Brain.js";
import { Card } from "./Card.jsx";
import { SuspectSelect } from "./Suspects.jsx";
import { useState } from "react";
export const InfoTab = forwardRef( function InfoTab({data, onRecieve, onChosen, setStatus, status, tras, setTras, onWinner, onDone},ref){
    const timeout = useRef()
    const emojiTimeout = useRef()
    const [wicked, setWicked] = useState('user')
    const lag = useRef()
    console.log(data)
    const playerTimeout = ref
    const teams = {'deck1':'BLUE','user':'BLUE','deck4':'YELLOW','deck5':'YELLOW','deck3':'RED','deck2':'RED'}
    const team = {'deck1':'user','user':'deck1','deck4':'deck5','deck5':'deck4','deck3':'deck2','deck2':'deck3'}
    var set = {'BLUE' : 'playerName', 'YELLOW' : 'playername',"RED": 'player-Name'}
    var type =  `${!data.sendSignal ? 'activeTurn': 'activeSelect'}`
    var threats = likelyThreats(data)
    var round = 
    useEffect(()=>{
      if (data['suspected'].length > 0)
       setTimeout(()=>{
         const correct = accuseStatus(data, data['suspected'])
         const susp = data['suspected'] 
         if (correct === true){
           onChosen((prevData) => {return {...prevData,
             ['players']:{...prevData['players'],[wicked]: {...prevData['players'][wicked], ['suspects']: prevData['players'][wicked].suspects + 1 },[susp]: {...prevData['players'][susp], ['suspects']: prevData['players'][susp].suspects ? prevData['players'][susp].suspects - 1 : 0 }},
           ['suspected'] : ''}})
         }else{
           onChosen((prevData) => {return {...prevData,
             ['players']:{...prevData['players'],[susp]: {...prevData['players'][susp], ['suspects']: prevData['players'][susp].suspects + 1 }},
           ['suspected'] : ''}})
         };setStatus(correct),setTras(wicked),setWicked('user')
       }, 3000)
     },[data['suspected']])
    useEffect(()=>{
      if (status !== false && status !== true){
        const tred = setTimeout(()=>{setStatus(false);setTras('')}, 2000)}
      else if (status === true){
        clearTimeout(emojiTimeout.current)
        clearInterval(playerTimeout.current)
        clearInterval(timeout.current)
        clearTimeout(lag.current)
        let point = 'JACK';
        let ans = point.substring(0, data['teams'][teams[tras]]['points'].trim().length + 1);
        let p = ' '.repeat(Math.max(0, 4 - ans.length));
        ans += p;
        
        onChosen((prevData) => {return {...prevData,
          ['teams']:{...prevData['teams'],[teams[tras]]: {...prevData['teams'][teams[tras]], ['points']: ans}},
        }})
        if(ans === "JACK"){
          onDone()
        }else{
        const tred = setTimeout(()=>{setStatus(false);setTras('');onWinner()}, 3000)}
      }

    },[status])
    useEffect(()=>{
      if (data['suspected'].length <= 0){
        
        for (var i = 0; i < threats.length; i++){
          const mean = shouldSuspect(data, threats[i])
          const suspe = threats[i]
          if (mean){
            onChosen((prevData)=>{
              return {...prevData,
                ['players'] :{...prevData['players'],[mean]: {...prevData['players'][mean], ['suspects']: prevData['players'][mean].suspects - 1 }},
                ['suspected'] : suspe
              }})
            setWicked(mean)
          }
          
        }
      }
   
    },[threats, data.suspected])
    
    if (data.timer <=0 ){
      const index = Math.floor(Math.random()*(data.players['user']['cards'].length))
      onRecieve(data.playerTurn,index);
      clearInterval(playerTimeout.current)
      onChosen((prevData)=> {return {...prevData, ['timer'] : 10000}})
    }
    if (data['suspected'].length){
      clearInterval(playerTimeout.current)
      clearInterval(timeout.current)
    }
    function handleJackpot(player){
      console.log(player)
      if (allCardsSame(data.players[team[player]].cards)){
        setStatus(true)
        setTras(player)
      }else{
        onChosen((prevData)=> {return {...prevData,['players']:{...prevData.players,[player]:{...prevData.players[player],['jackPot']:prevData.players[player].jackPot-1}}}})
      }
    }
    useEffect(() => {
      if (data.playerTurn != 'user' && data['suspected'].length <= 0 && !status) {
        if (data.playerTurn != 'user' && !data.players[data.playerTurn].sentSignal && !data.players[team[data.playerTurn]].sentSignal && !data.players[data.playerTurn].suspects < 1){
          const sig = shouldSignal(data, data.playerTurn)
          
          if (sig){
            handleEmojiSelect(sig, data.playerTurn)
          }
  
        }
        timeout.current = setTimeout(() =>{
          const index = chooseLeastFrequentCard(data.players[data.playerTurn]['cards'])
          onRecieve(data.playerTurn,index);
        },(Math.floor(Math.random() *5) + 1) * 1000)
      }else if (data['suspected'].length <= 0 && !status){
        playerTimeout.current = setInterval(() => {
          onChosen((prevData)=> {return {...prevData, ['timer'] : prevData.timer - 1000}}); }, 1000)
      }
    },[data.playerTurn, data.suspected, status])
    function handleClose(para){
      onChosen((prevData)=> {return {...prevData, ['sendSignal'] : false}})
    }
    function handleSelectionClose(){
      onChosen((prevData)=> {return {...prevData, ['suspect'] : false}})
    }
    // if player is user sendSignal = false else just put 

    function handleEmojiSelect(signal,userKey='user'){ 
      if ((Math.floor(Math.random()*2) && signal == data.teams[teams[userKey]]['signal'] && userKey != 'deck1') || (data.players[team[userKey]].jackPot === 2 && signal == data.teams[teams[userKey]]['signal'] && userKey != 'deck1')){
        lag.current = setTimeout(()=>{handleJackpot(team[userKey])}, 3500)
      }
      onChosen((prevData)=>{
      return {...prevData,
        ['players']: {...prevData['players'], [userKey] : {...prevData['players'][userKey], ['sentSignal'] : signal}},
       ['sendSignal'] : false}
      })
      emojiTimeout.current = setTimeout(() => {
        onChosen((prevData)=>{
          return {...prevData,
            ['players']: {...prevData['players'], [userKey] : {...prevData['players'][userKey], ['sentSignal'] : ''}}}
          })
      },20000)
    }
    function handleSuspectSelect(suspect){ 

      onChosen((prevData)=>{
      return {...prevData,['players'] :{...prevData['players'],['user']: {...prevData['players']['user'], ['suspects']: prevData['players']['user'].suspects - 1 }},
        ['suspected'] : suspect,
        ['suspect'] : false,
      }})
    }
    return(
        <section id="main_section">
        <section className={'wrapper active-popup ' + `${!(data.suspect || data['suspected'].length || status) ? type : 'activeSuspectSelect'}`}>
        {(!data.sendSignal && !(data.suspect || data['suspected'].length || status) ) &&  <div className="form-box info">
                <p>{data.players[data.playerTurn].player + '\'s'} </p>
                <p>Turn</p>
                {data.playerTurn == 'user' && <p className={`${data.timer/1000 < 5 ? 'fa-beat' : ''}`}>{(data.timer/1000)+ "s left"}</p>}
              </div>}
        {(data.sendSignal && !(data.suspect || data['suspected'].length > 0 || status)) && <SignalSelect onClose={handleClose} onEmojiSelect={handleEmojiSelect}/>}  
        {!status && (data.suspect || data['suspected'].length > 0) && <SuspectSelect data={data} onClose={handleSelectionClose} onSelect={handleSuspectSelect} play={wicked}/>}
        {status && <div className="form-box info">{status === true ? (<><div className={`${set[teams[tras]]} prompt1`}> {`${teams[tras]}`} TEAM WINS!!!</div><p className="Prompt">ROUND {`${calculateTotalPoints(data)-1}`}</p></>) : (<><p className='fa-beat' style={{color: 'red'}}>FALSELY ACCUSED!!!</p><p>SUSPECT HAS {status} DIFFERENT CARDS</p></>)}</div>}
        </section>
        </section>
    )
})