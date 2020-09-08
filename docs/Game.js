"use strict"

var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")
canvas.width = 512
canvas.height = 480
document.body.appendChild(canvas)

// Image
var bgReady = false
var bgImage = new Image()
bgImage.onload = function () {
    bgReady = true
}
bgImage.src = "Img/background.png"

var heroReady = false
var heroImage = new Image()
heroImage.onload = function () {
    heroReady = true
}
heroImage.src = "Img/hero.png"

var monsterReady = false
var monsterImage = new Image()
monsterImage.onload = function () {
    monsterReady = true
}
monsterImage.src = "Img/monster.png"

// Objetos do game
var hero = {
    speed: 256
}

// EasterEgg

var EasterEgg = function EasterEgg() {
    if (EasterEggFind.checked) {
        hero.speed = 600
    } else {
        hero.speed = 256
    }
}

var monster = {}
var monstersCaught = 0

// Controle do teclado
var keysDown = {}

window.addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true
}, false)

window.addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode]
}, false)

// Reseta o jogo quando o jogador pega o monstro
var reset = function reset() {
    hero.x = canvas.width / 2
    hero.y = canvas.height / 2

    //Posiciona o monstro randomicamente na tela
    monster.x = Math.random() * (canvas.width - 32)
    monster.y = Math.random() * (canvas.height - 32)
}

//Atualiza os objetos do jogo 
var update = function update(modifier) {
    if (38 in keysDown) {
        // Cima
        hero.y -= hero.speed * modifier
    }
    if (40 in keysDown) {
        // Baixo
        hero.y += hero.speed * modifier
    }
    if (37 in keysDown) {
        // Esquerda
        hero.x -= hero.speed * modifier
    }
    if (39 in keysDown) {
        // Direita
        hero.x += hero.speed * modifier
    }
    // Colisão do hero com o canvas  
    hero.x = Math.max(0, hero.x)
    hero.y = Math.max(0, hero.y)
    hero.y = Math.min(canvas.height - 32, hero.y)
    hero.x = Math.min(canvas.width - 32, hero.x)
    // Os personagens se encostaram?
    if (hero.x <= monster.x + 32 && monster.x <= hero.x + 32 && hero.y <= monster.y + 32 && monster.y <= hero.y + 32) {
        ++monstersCaught
        reset()
    }
    // Pontuação para resetar o jogo
    if (monstersCaught == 20) {
        alert("Fim do jogo! You Win!")
        location.reload()
        end()
    }
}

// Teleporta o monstro conforme aumenta a pontuação 

var Nivel_1 = setInterval(function () {
    if (monstersCaught >= 5 && monstersCaught < 10) {
        monster.x = Math.random() * (canvas.width - 32)
        monster.y = Math.random() * (canvas.height - 32)
    }
}, 1400)

var Nivel_2 = setInterval(function () {
    if (monstersCaught >= 10 && monstersCaught < 15) {
        monster.x = Math.random() * (canvas.width - 32)
        monster.y = Math.random() * (canvas.height - 32)
    }
}, 1000)

var Nivel_3 = setInterval(function () {
    if (monstersCaught >= 15) {
        monster.x = Math.random() * (canvas.width - 32)
        monster.y = Math.random() * (canvas.height - 32)
    }
}, 600)

// Renderiza tudo
var render = function render() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0)
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y)
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y)
    }
    // Pontuação
    ctx.fillStyle = "rgb(250, 250, 250)"
    ctx.font = "24px Helvetica"
    ctx.textAlign = "left"
    ctx.textBaseline = "top"
    ctx.fillText("Captured Monsters: " + monstersCaught + "/20", 32, 32)
}

// Controla o loop do jogo
var main = function main() {
    var now = Date.now()
    var delta = now - then

    update(delta / 1000)
    render()

    then = now

    requestAnimationFrame(main)
}

var w = window
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame

var then = Date.now()
reset()
main()
