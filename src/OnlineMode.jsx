export function Online({onClose}){
    return (
        <div className="form-box onlineTeam">
        <div>
            <span className="back2select"  onClick={() => onClose('','blue')} ><i className="fa-solid fa-backward fa-shake"></i></span>
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
    )
}