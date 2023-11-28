export function Welcome({onStart}){
    return (
      <div className="form-box login">
        <h2 id="level-title">Welcome to</h2>
              <div className="input-box">
                  <img src="src/assets/Untitled.png"/>
              </div>
              <div className = "play">
                  <button onClick={() => onStart('')} className="btn"><span id="start">Play  </span></button>
              </div>
      </div>
    )
}