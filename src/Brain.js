export function chooseLeastFrequentCard(cards) {
      // Count occurrences of each card in the player's deck
      const cardCounts = cards.reduce((counts, card, index) => {
        if (card != 'camo'){
        counts[card] = (counts[card] || 0) + 1;}
        return counts;
      }, {});
  
      // Find the card with the minimum occurrence
      const leastFrequentCard = Object.keys(cardCounts).reduce((minCard, card) => {
        if (cardCounts[card] < cardCounts[minCard]) {
          return card;
        }
        return minCard;
      }, Object.keys(cardCounts)[0]); // Initialize with the first card
  
      // Find the index of the least frequent card in the player's deck
      const leastFrequentCardIndex = cards.findIndex((card) => card === leastFrequentCard);
      return leastFrequentCard,leastFrequentCardIndex
}  

export function allCardsSame(cards) {
  var isCamo = false
  const cardCounts = cards.reduce((counts, card, index) => {
    if (card != 'camo'){
    counts[card] = (counts[card] || 0) + 1;}
    else{
      isCamo = true
    }
    return counts;
  }, {});
  const mostFrequentCard = Object.keys(cardCounts).reduce((maxCard, card) => {
    if (cardCounts[card] > cardCounts[maxCard]) {
      return card;
    }
    return maxCard;
  }, Object.keys(cardCounts)[0]);
  if (cardCounts[mostFrequentCard] > 3 || (cardCounts[mostFrequentCard]  > 2 && isCamo) ){
    return true
  }
  return false
}
export function shouldSignal(data,player) {
  const signals =  ["fa-face-angry","fa-face-dizzy","fa-face-frown","fa-face-frown-open","fa-face-dizzy","fa-face-grimace","fa-face-flushed","fa-face-grin","fa-face-grin-tongue","fa-face-grin-tongue-wink","fa-face-grin-tongue-squint","fa-face-grin-wink","fa-face-grin-wide","fa-face-grin-hearts","fa-face-grin-beam","fa-face-grin-beam-sweat","fa-face-grin-squint","fa-face-grin-squint-tears","fa-face-grin-stars","fa-face-grin-tears","fa-face-kiss","fa-face-kiss-wink-heart","fa-face-kiss-beam","fa-face-smile","fa-face-smile-wink","fa-face-smile-beam","fa-face-sad-tear","fa-face-sad-cry","fa-face-tired","fa-face-surprise","fa-face-rolling-eyes","fa-face-meh-blank","fa-face-meh","fa-face-laugh-wink","fa-face-laugh-squint","fa-face-laugh-beam","fa-face-laugh"];
  const team = {'deck1':'BLUE','user':'BLUE','deck4':'YELLOW','deck5':'YELLOW','deck3':'RED','deck2':'RED'}
  const canWin = allCardsSame(data.players[player].cards)
  if (canWin && !Math.floor(Math.random()*3)){
    return data.teams[team[player]].signal
  }else if (canWin && !Math.floor(Math.random()*5) || !Math.floor(Math.random()*5)){
    return signals[Math.floor(Math.random() * signals.length)]
  }else{
    return ''
  }

}
export function likelySuspects(data, player){
  const team = {'deck1':'user','user':'deck1','deck4':'deck5','deck5':'deck4','deck3':'deck2','deck2':'deck3'}
  const suspects = []
  const positions = Object.keys(data.players)
  for (var i = 0; i < positions.length; i++){
    if (positions[i] != player && positions[i] != team[player] && data.players[positions[i]].cards.length < 5){
      suspects.push(positions[i])
    }

  }
  return suspects
}
export function likelyThreats(data){
  const suspects = []
  const positions = Object.keys(data.players)
  for (var i = 0; i < positions.length; i++){
    if (data.players[positions[i]].sentSignal.length > 0){
      suspects.push(positions[i])
    }
  }
  return suspects
}
function proof(cards){
    var diff = []
    for (let i = 0; i < cards.length; i++) {
      if (!diff.includes(cards[i]) && cards[i] != 'camo'){
        diff.push(cards[i])
      }
        
        
      }
    return diff.length
    
}
export function accuseStatus(data, player){
  const canWin = allCardsSame(data.players[player].cards)
  if (canWin){
    return true
  }else{
    return proof(data.players[player].cards)
  }

}
export function shouldSuspect(data, player){
  if (data['suspected'].length > 0 || data.players[player].cards.length >= 5){
    return false
  }
  const team = {'deck1':'user','user':'deck1','deck4':'deck5','deck5':'deck4','deck3':'deck2','deck2':'deck3'}
  const positions = Object.keys(data.players)
  
  for (var i = 0; i < positions.length; i++){
    var choice = Math.floor(Math.random()*4*positions.length)
    if (positions[i] != 'user' && positions[i] != player &&  data.players[positions[i]].suspects > 0 && 10 == choice && positions[i] != team[player]){
      return positions[i]
    }
  }
  return false
}
export function calculateTotalPoints(data) {
  let totalPoints = 0;

  // Loop through each team in the 'teams' object
  for (const team in data.teams) {
    // Ensure the property is a direct property of the object (not from the prototype chain)
      totalPoints += data.teams[team].points.trim().length
  }
  return totalPoints+1;
}