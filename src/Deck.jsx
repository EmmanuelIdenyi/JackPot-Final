
import { Card } from "./Card"
import React, { useState } from 'react';
export function Deck({location, section, data, onTap,timeout,onSet}){
    const team = {'deck1':'BLUE','user':'BLUE','deck4':'YELLOW','deck5':'YELLOW','deck3':'RED','deck2':'RED'}
    const color = {'BLUE':'darkblue', "RED": '#8c2923', "YELLOW":'#ffb903'}
    
    function handleCardSelect(index){
        if (data.playerTurn === 'user' && data.suspected.length <= 0){
            onTap('user',index)
            clearInterval(timeout.current)
            onSet((prevData)=> {return {...prevData, ['timer'] : 10000}})
        }
    }
    const isUser = data.playerTurn == 'user'
    return(
        <><section className={section}>
            <div className="row">
                <div className="column">
                    {<i className= {`fa-solid fa-2xl fa-bounce  ${data['players'][location]['sentSignal'] ?? ''}`} style={{color: `${color[team[location]]}`}}></i>}
                </div>             
            </div>
            <div className="playerBox" style={{borderColor: `${color[team[location]]}`}}>
                  <p className="player-Name" style={{color: `${color[team[location]]}`}} >{...data['players'][location]['player']}</p>
            </div>
            <div className={location}>
                {...data['players'][location]['cards'].map((item, index) => { if (location == 'user'){
                                    return (<Card onSelect = {() => handleCardSelect(index)} key={index} type={item} index={index} layout={location == 'user' ? 'layout' : 'layout_still'} isUser={isUser}/>)}else{
                                        return (<Card key={index} type='hidden' index={index} layout={location == 'user' ? 'layout' : 'layout_still'}/>)
                                    }}
          )}
            </div>
        </section></>
    )
}