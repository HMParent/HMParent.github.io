var saveGame = localStorage.getItem('absorberSave')
var gameData = {
  suctionPower: 0,
  absorbedPerClick: 1,
  goldPerClickCost: 10,
  lastTick: performance.now()
}

function update(id, content) {
  document.getElementById(id).innerHTML = content;
}

var mainGameLoop = window.setInterval(function() {
  diff = performance.now() - gameData.lastTick;
  gameData.lastTick = performance.now()
  gameData.suctionPower += gameData.absorbedPerClick * (diff / 1000)
  update("suctioned", gameData.suctionPower + " suctionPower Absorbed")
}, 1000)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('goldMinerSave', JSON.stringify(gameData))
}, 15000)

