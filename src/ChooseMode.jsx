export function ChooseMode({onChosen}){
    return (
        <div className="form-box register">
        <div className="heading">
          <p id = "title">HOW WOULD YOU LIKE TO PLAY?</p>
        </div>
        <div className = "mode trait">
          <a href="#" className="online" id="online" onClick={() => onChosen('Online')}>ONLINE</a>
        </div>
        <div className = "mode">
            <a href="#" className="local" id="local" onClick={() => onChosen('Local')}>LOCAL</a>
        </div>
        <div className = "mode">
            <a href="#" className="computer" id="computer" onClick={() => onChosen('Computer')}>COMPUTER</a>
        </div>
      </div>
    )
}