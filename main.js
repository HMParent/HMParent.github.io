var saveGame = localStorage.getItem('goldMinerSave')
var gameData = {
  suctionPower: 0,
  absorbedPerClick: 1,
  goldPerClickCost: 10,
  lastTick: performance.now()
}

function update(id, content) {
  document.getElementById(id).innerHTML = content;
}

function selfAbsorb() {
  gameData.suctionPower += gameData.absorbedPerClick
  update("suctioned", gameData.suctionPower + " suctionPower Absorbed")
}

function buySuctionPerClick() {
  if (gameData.suctionPower >= gameData.goldPerClickCost) {
    gameData.suctionPower -= gameData.goldPerClickCost
    gameData.absorbedPerClick += 1
    gameData.goldPerClickCost *= 2
    update("suctioned", gameData.suctionPower + " suctionPower Absorbed")
    update("perClickUpgrade", "Upgrade Pickaxe (Currently Level " + gameData.absorbedPerClick + ") Cost: " + gameData.goldPerClickCost + " suctionPower")
  }
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

function format(number, type) {
	let exponent = Math.floor(Math.log10(number))
	let mantissa = number / Math.pow(10, exponent)
	if (exponent < 3) return number.toFixed(1)
	if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
	if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}


if (typeof saveGame.suctionPower !== "undefined") gameData.suctionPower = saveGame.suctionPower;
if (typeof saveGame.absorbedPerClick !== "undefined") gameData.absorbedPerClick = saveGame.absorbedPerClick;
if (typeof saveGame.goldPerClickCost !== "undefined") gameData.goldPerClickCost = saveGame.goldPerClickCost;
if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;

function tab(tab) {
    // hide all your tabs, then show the one the user selected.
    document.getElementById("mineGoldMenu").style.display = "none"
    document.getElementById("shopMenu").style.display = "none"
    document.getElementById(tab).style.display = "inline-block"
  }
  // go to a tab for the first time, so not all show
  tab("mineGoldMenu")