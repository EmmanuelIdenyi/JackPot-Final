export function ConfirmSignal({onClose, data, onGameStart}){
    return (
        <div className="form-box signalSelected">
        <div className="sub-heading">
            <p className = "level">Your team signal is</p>
        </div>
        <section id="result">
          <div className="chose">
                  <i className={`fa-solid fa-beat fa-xl signal ${data['teams']['BLUE'] ? data['teams']['BLUE']["signal"] : ''}`}></i>
            </div>
        </section>
        <div className = "next">
            <div className = "back">
                <a onClick={() => onClose('Select','red')} className="goback">BACK</a>
            </div>
            <div className = "continue">
                <a onClick={onGameStart} className="tocont" >CONTINUE</a>
            </div>
        </div>
        </div>
    )
}