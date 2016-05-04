/*
 TODO
 бонусы\антибонусы
 перерисовать анимацию
 рефакторинг
 выровнять отступы
 конгфиг жс
 алгоритм расстановки
 Корзинка на задания
 менеджер экранов
 режимы игры
 */

var cnvs, context;
var ballSpeed;
var lastTime;
var basket;
var isGameOver = false;
var score;
var buttons = {};
var durationGame;
var isGamePaused = false;
var rocketMoveStep = 50;
var balls;
var bgPattern;
var bgImg;
bgImg = new Image();
var sounds = {};
var waitingForReady = 0;
var imgsToPreload = [];
var preloadedImages = [];
var preloadedSounds = [];
var soundsToPreload = [];
var mouseX, mouseY;
var isMouseControl = true;
var ballCount = 15;
var isGameReady = false;
sounds.backgroundMusic = new Audio();
window.onload = init;
var buttonsManager;
var FONT_MAIN = "24px FReminderPro-Regular";
var requestID = requestAnimFrame(main);
var missionMan;
var lastRecord;

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    render();
    update(dt);
    lastTime = now;
    requestID = requestAnimFrame(main);
}

function start() {
    sounds.backgroundMusic.muted = true;
    defineParams();
    startScreen();
}

function pause() {
    isGamePaused = true;
    sounds.backgroundMusic.pause();
}

function reset() {
    start();
}

function gameOver() {
    sounds.backgroundMusic.pause();
    isGamePaused = true;
    isGameOver = true;
    var storage = localStorage;
    if (storage.getItem('record') < score) {
        storage.setItem('record', score);
    }
    curRenderScreen = gameOverScreen;
}


function update(dt) {
    if (durationGame == 0) {
        startScreen();
        return;
    }

    if (isGameOver) {
        gameOver();
        return;
    }

    if (isGamePaused) {
        pauseScreen();
        return;
    }
    missionMan.update();
    balls.update(dt);
    if (isMouseControl) {
        basket.update(mouseX);
    }
    if (durationGame > ballSpeed / 2) {
        ballSpeed += 10;
    }
    durationGame += dt;
}

function play() {
    isGamePaused = false;
    if (durationGame == 0) {
        durationGame++;
    }
    sounds.backgroundMusic.play();
    buttons = {};
    buttons.reset = BUTTON_RESET;
    buttons.reset.setPos(10, 10);
    buttons.pause = BUTTON_PAUSE;
    buttons.pause.setPos(50, 10);
    buttons.muteUnmute = BUTTON_MUTEUNMUTE;
    buttons.muteUnmute.setPos(90, 10);
    curRenderScreen = gameScreen;
}


function curRenderScreen() {

}

function render() {
    curRenderScreen();
}


function init() {
    imgsToPreload.push('images/gameBackground.jpg',
        'images/pause_new.png',
        'images/play_new.png',
        'images/refresh_new.png',
        'images/unmute_new.png',
        'images/mute_new.png',
        'images/ball_new(1).png',
        'images/ball_new(2).png',
        'images/ball_new(3).png',
        'images/ball_new(4).png',
        'images/ball_new(5).png',
        'images/basket_new.png'
    );
    soundsToPreload.push('sounds/Hopscotch.mp3');
    preloadImages(imgsToPreload, preloadedImages, incrementLoadProgress);
    preloadSounds(soundsToPreload, preloadedSounds, incrementLoadProgress);
    window.document.addEventListener('click', click, true);
    window.onmousemove = mousemove;
    window.onkeydown = keydown;
    window.onblur = pause;
    cnvs = document.getElementById('gamewindow');
    if (!cnvs || !cnvs.getContext) {
        return;
    }
    context = cnvs.getContext('2d');
    if (!context) {
        return;
    }
    context.font = FONT_MAIN;
    bgImg.src = 'images/gameBackground.jpg';
    sounds.backgroundMusic.src = 'sounds/Hopscotch.mp3';
    sounds.backgroundMusic.loop = true;
    sounds.backgroundMusic.volume = 0.1;

    start();
    main();
}

function defineParams() {
    basket = new Basket();
    lastTime = Date.now();
    score = 0;
    ballSpeed = 100;
    durationGame = 0;
    isGameOver = false;
    isGamePaused = true;
    balls = new BallManager(ballCount);
    buttonsManager = new Buttons();
    missionMan = new missionManager(3);
    lastRecord = localStorage.getItem('record');
    if(lastRecord == undefined){ lastRecord = 0;}
}


function log() {
    for (var key in arguments) {
        document.getElementById('log').innerHTML += arguments[key] + " ";
    }
    if (document.getElementById('log').innerHTML.length >= 1000) {
        document.getElementById('log').innerHTML = "";
    }
}


function click(evt) {
    mouseX = evt.pageX - cnvs.offsetLeft;
    mouseY = evt.pageY - cnvs.offsetTop;
    for (var key in buttons) {
        if (isEntry(buttons[key], mouseX, mouseY)) {
            buttons[key].click();
            break;
        }
    }
}

function mousemove(evt) {
    isMouseControl = true;
    mouseX = evt.pageX - cnvs.offsetLeft;
    mouseY = evt.pageY - cnvs.offsetTop;
    for (var key in buttons) {
        if (isEntry(buttons[key], mouseX, mouseY)) {
            buttons[key].onmouseon();
            break;
        } else {
            buttons[key].onmouseout();
        }
    }
    if (!isGamePaused) {
        basket.update(mouseX);
    }
}

function keydown(evt) {
    var keyCode = evt.keyCode;

    isMouseControl = false;
    if (keyCode == 32 || keyCode == 27) {
        if (isGameOver) {
            start();
        }
        if (isGamePaused) {
            play();
        }
        else {
            pause();
        }
    }
    if (isGamePaused) {
        return;
    }

    if (keyCode == 37) {
        basket.move(-rocketMoveStep);
    }
    if (keyCode == 39) {
        basket.move(rocketMoveStep);
    }
}


function muteUnmute() {
    for (var key in sounds) {
        sounds[key].muted = !sounds[key].muted;
    }
}

function incrementLoadProgress() {
    waitingForReady++;
    if (waitingForReady < 2) {
        curRenderScreen = loadingScreen;
    }
    else {
        curRenderScreen = startScreen;
        isGameReady = true;
    }
    if (isGameReady) {
        start();
    }
}


function Mission() {
    this.ball = new Ball();
    this.ball.randomize();
    this.ball.x = cnvs.clientWidth - this.ball.width - 30;
    this.ball.y = cnvs.clientHeight - 400;
    this.count = Math.ceil(Math.random() * 10 / 3);
    this.isCompleted = false;
    this.update = function () {
        if (basket.ball.length != 0) {
            if (basket.ball[basket.ball.length - 1].color != this.ball.color) {
                isGameOver = true;
            }
            else if (basket.ball.length == this.count) {
                basket.ball = [];
                score += this.count;
                this.isCompleted = true;
            }
        }
        basket.setProgressByPrsnt((100 / this.count + 1) * basket.ball.length);
    };
    this.draw = function () {
        context.save();
        context.textAlign = 'start';
        context.fillText("x" + this.count, this.ball.x + this.ball.width, this.ball.y + 10);
        context.restore();
        this.ball.draw();
    }
}


function missionManager(_count) {
    var missionStackOffset = 30;
    this.missions = [];
    var step = 80;
    this.basket = new Basket();


    this.update = function () {
        for (var key in this.missions) {
            this.missions[0].update();
            var pos = missionStackOffset + ((-parseInt(key) + 3) * step);
            this.missions[key].ball.y = smoothMove(this.missions[key].ball.y, pos);
            if (this.missions[key].isCompleted) {
                this.missions.splice(key, 1);
                this.addNew();

            }
        }
    };
    this.draw = function () {
        for (var key in this.missions) {
            this.missions[key].draw();
        }
        this.basket.draw();

    };
    this.addNew = function () {
        this.missions.push(new Mission());
        this.missions[this.missions.length - 1].ball.y = -(this.missions.length + 1) * step;
        this.basket.x = this.missions[this.missions.length-1].ball.x + this.missions[this.missions.length-1].ball.width / 2 - this.basket.width/2;
        this.basket.y = (this.missions.length + 1) * step + missionStackOffset;
    };
    for (var i = 0; i < _count; i++) {
        this.addNew();
    }


}