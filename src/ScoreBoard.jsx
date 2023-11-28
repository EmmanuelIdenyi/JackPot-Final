import React from "react"

export function ScoreBoard({data}){
    var set = {'BLUE' : 'playerName', 'YELLOW' : 'playername',"RED": 'player-Name'}
    return(
        <section className="score-board">
            <header className="header">
                <p className="player-Name">SCOREBOARD</p>
            </header>
            {Object.entries(data.teams).map(([teamName, teamData]) => (
        <React.Fragment key={teamName}>
          <div className={`${set[teamName.toUpperCase()]} ${teamName.toLowerCase()[0]}team`}>
            <p>{teamName.toUpperCase()}</p>
          </div>
          <div className={`${set[teamName.toUpperCase()]} ${teamName.toLowerCase()[0]}1`}>
            {teamData.points.split('').map((point, index) => (
              <p key={index} className={`${point != ' ' ? 'fa-bounce' : ''} ${set[teamName.toUpperCase()]}`}>
                {point}
              </p>
            ))}
          </div>
        </React.Fragment>
      ))}
        </section>
    )
}