export function Local({onClose}){
    return (
        <div className="form-box localTeam">
            <div>
                <span className="back2select1"  onClick={() => onClose('','blue')} ><i className="fa-solid fa-backward fa-shake"></i></span>
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
    )
}