var saveGame = localStorage.getItem('absorberSave')
var gameData = {
  suctionPower: 0,
  absorbedPerClick: 1,
  goldPerClickCost: 10,
  lastTick: Date.now()
}

function update(id, content) {
  document.getElementById(id).innerHTML = content;
}

var mainGameLoop = window.setInterval(function() {
  diff = Date.now() - gameData.lastTick;
  gameData.lastTick = Date.now()
  gameData.suctionPower += gameData.absorbedPerClick * (diff / 1000)
  update("suctioned", Math.floor(gameData.suctionPower) + " Absorbed")
}, 1000)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('goldMinerSave', JSON.stringify(gameData))
}, 15000)

