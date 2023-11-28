const signals =  ["fa-face-angry","fa-face-dizzy","fa-face-frown","fa-face-frown-open","fa-face-dizzy","fa-face-grimace","fa-face-flushed","fa-face-grin","fa-face-grin-tongue","fa-face-grin-tongue-wink","fa-face-grin-tongue-squint","fa-face-grin-wink","fa-face-grin-wide","fa-face-grin-hearts","fa-face-grin-beam","fa-face-grin-beam-sweat","fa-face-grin-squint","fa-face-grin-squint-tears","fa-face-grin-stars","fa-face-grin-tears","fa-face-kiss","fa-face-kiss-wink-heart","fa-face-kiss-beam","fa-face-smile","fa-face-smile-wink","fa-face-smile-beam","fa-face-sad-tear","fa-face-sad-cry","fa-face-tired","fa-face-surprise","fa-face-rolling-eyes","fa-face-meh-blank","fa-face-meh","fa-face-laugh-wink","fa-face-laugh-squint","fa-face-laugh-beam","fa-face-laugh"];

export function SignalSelect({onClose, onEmojiSelect}){
    return (
        <div className="form-box signalSelect">
        <div>
            <span className="icon-close" onClick={() => {onClose("Info")}}><i className="fa-sharp fa-solid fa-xmark"></i></span>
        </div>
        <div className="sub-heading">
            <p className = "prompt">Pick a SIGNAL!!</p>
        </div>
        <section id="EmojiSection">
        
          {signals.map((signal, index) => (
            <div key={index} className="row">
              <div className="column">
                <i
                  className={`fa-solid fa-beat fa-xl signal ${signal}`}
                  onClick={() => onEmojiSelect(signal)}
                ></i>
              </div>
            </div>
          ))}
        </section>
      </div>
    )
}