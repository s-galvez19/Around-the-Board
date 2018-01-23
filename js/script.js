const scoresList = new Scores(3, 10, 25, 50)
const scores = document.querySelectorAll(".score")
const die = document.querySelector(".die")
const roll = document.querySelector(".roll")
const img = die.querySelector("img")
const roller = document.querySelector(".turn")
const players = [
  {player: document.querySelector(".player1"), location: 0, score: 0, round: 1, finished: false},
  {player: document.querySelector(".player2"), location: 0, score: 0, round: 1, finished: false},
  {player: document.querySelector(".player3"), location: 0, score: 0, round: 1, finished: false},
  {player: document.querySelector(".player4"), location: 0, score: 0, round: 1, finished: false}
]

const numPlayers = 4
let turn = 0

function gameOver(player){
  console.log("Game Over")
  player.finished = true;
  console.log(player.player)
  player.player.classList.toggle("hide")
  const endGame = players.every(function(player){
    return player.finished == true;
  })
  console.log(endGame)
}
function setScores(){
  scores.forEach(function(score, i){
    score.textContent = scoresList.scores[`round${players[turn].round}`][i]
  })
}

function addScore(){
  players[turn].score += scoresList.scores[`round${players[turn].round}`][players[turn].location]
}

function updateRound(player){
  player.location = (player.location > 21) ? player.location - 21 : player.location
  player.round += 1
  if(player.round > scoresList.rounds) gameOver(player)
}

function changeTurn(){
  turn = (turn >= numPlayers - 1) ? 0 : turn+1
  roller.textContent = `Player ${turn+1}`
}

function movePlayer(turn, num, spots){
  const player = players[turn]
  player.location += num;
  if (player.location > 21) updateRound(player)
  if (player.round > scoresList.rounds) return
  spots[player.location].appendChild(player.player)
}

function rollDie(){
  img.src = `img/Dodecahedron3.gif`
  setTimeout(function(){
    const num = Math.ceil(Math.random() * 6)
    roll.textContent = num
    movePlayer(turn, num, getSpots())
    changeTurn()
    if (players[turn].round > scoresList.rounds) return 
    addScore()
    setScores()
  }, 1700)
}

die.addEventListener("click", function(e){
  // console.log(`Players ${turn + 1} is ${players[turn].score}`);
  (players[turn].finished == false) ? rollDie() : turn+=1
})

setScores()