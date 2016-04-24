/*
TODO
сделать следующую цель
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
var mission = {};
var sounds = {};
var waitingForReady = 0;
var imgsToPreload = [];
var soundsToPreload = [];
var mouseX, mouseY;
var isMouseControl = true;
var ballCount = 15;
sounds.backgroundMusic = new Audio();
window.onload = init;

var requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var cancelAnimationFrame = (function() {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame
})();

var requestID = requestAnimFrame(main);


function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    render();
    update(dt);
    lastTime = now;
    requestID = requestAnimFrame(main);
}

function start(){
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
    isGamePaused =true;
    isGameOver = true;
    var message = "GAME OVER !";
    context.save();
    context.fillStyle = "rgba(254, 249, 245,0.1)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.restore();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    buttons = {};
    buttons.reset = BUTTON_RESET;
    buttons.reset.setPos(cnvs.clientWidth / 2 - 30/ 2,cnvs.clientHeight / 2 + 20);
}


function update(dt) {
    if(durationGame==0){
        startScreen();
        return;
    }

    if(isGameOver){
        gameOver();
        return;
    }

    if(isGamePaused){
        pauseScreen();
        return;
    }

    mission.update();
    if(mission.isCompleted){
        mission = new Mission();
    }
    balls.update(dt);
    if(isMouseControl) {
        basket.update(mouseX);
    }
    if (durationGame / 10 > 1) {
        durationGame = 0;
        ballSpeed += 10;
    }
    durationGame += dt;
}

function play(){
    isGamePaused = false;
    durationGame++;
    sounds.backgroundMusic.play();
    buttons = {};
    buttons.reset = BUTTON_RESET;
    buttons.reset.setPos(10, 10);
    buttons.pause = BUTTON_PAUSE;
    buttons.pause.setPos(50, 10);
    buttons.muteUnmute = BUTTON_MUTEUNMUTE;
    buttons.muteUnmute.setPos(90, 10);
}

function isRectCollision(objB, objA){
    return isDirectLineCollision(objA.x, objA.x+objA.width, objB.x, objB.x+objB.width)
    && isDirectLineCollision(objA.y, objA.y+objA.height, objB.y, objB.y+objB.height)
    ? true:false;
}

function isDirectLineCollision(ax1,ax2,bx1,bx2) {
    return (ax2>bx1 && ax1<bx2)?true:false;
}

function isEntry(objA,pointX,pointY){
    return (pointX>objA.x && pointX < objA.x + objA.width)
    && (pointY > objA.y && pointY < objA.y + objA.height)
    ? true: false;
}
function Mission(){
    this.ball = new Ball();
    this.ball.changeParams();
    this.ball.x = cnvs.clientWidth - this.ball.width - 20;
    this.ball.y = cnvs.clientHeight - 400;
    this.count = Math.ceil(Math.random() * 10 / 3);
    this.isCompleted = false;
    this.update = function(){
        if(basket.ball.length!=0){
            if (basket.ball[basket.ball.length-1].color != this.ball.color){
                isGameOver = true;
            }
            else if (basket.ball.length == this.count) {
                basket.ball = [];
                score+=this.count;
                this.isCompleted = true;
            }
        }
        basket.setProgressByPrsnt((100/this.count)*basket.ball.length + 1);
    };
    this.draw = function(){
        context.save();
        context.textAlign = 'end';
        context.fillText("Target x"+this.count, cnvs.clientWidth - 10, this.ball.y - 20);
        context.restore();
        this.ball.draw();
    }
}

function render() {
    context.save();
    bgPattern = context.createPattern(bgImg,"repeat");
    context.fillStyle = bgPattern;
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.fillStyle = "rgba(255,255,255,0.7)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.restore();
    balls.draw();
    mission.draw();
    basket.draw();
    context.save();
    context.fillStyle = "black";
    context.textAlign = 'end';
    context.fillText('Score : ' + score, cnvs.width - 10, 20);
    context.fillText('Ball speed : ' + ballSpeed, cnvs.width - 10, 40);
    context.restore();
    for(var key in buttons){
        buttons[key].draw();
    }
}

function loadingScreen(){
    context.save();
    context.fillStyle = "rgba(254, 249, 245,1)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.fillStyle = "black";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText("Loading...", cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    context.restore();
}

function init() {
    imgsToPreload.push('images/gameBackground.jpg',
        'images/ball(1).png',
        'images/ball(2).png',
        'images/ball(3).png',
        'images/ball(4).png',
        'images/ball(5).png',
        'images/pause_new.png',
        'images/play_new.png',
        'images/refresh_new.png',
        'images/ball_new(1).png',
        'images/ball_new(2).png',
        'images/ball_new(3).png',
        'images/ball_new(4).png',
        'images/ball_new(5).png',
        'images/basket.png'
    );
    soundsToPreload.push('sounds/bensound-littleidea.mp3');

    preloadImages(imgsToPreload, function(){waitingForReady++;});
    preloadSounds(soundsToPreload, function(){waitingForReady++;})
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

    context.font = "24px FReminderPro-Regular";
    bgImg.src = 'images/gameBackground.jpg';
    if(waitingForReady<2){loadingScreen();}
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
    mission = new Mission();
    sounds.backgroundMusic.src = 'sounds/bensound-littleidea.mp3';
    sounds.backgroundMusic.loop = true;
    sounds.backgroundMusic.volume = 0.1;
}

function log(){
    for (var key in arguments){
        document.getElementById('log').innerHTML += arguments[key] + " ";
    }
    if(document.getElementById('log').innerHTML.length >= 500){
        document.getElementById('log').innerHTML = "";
    }

}

function startScreen() {
    if(waitingForReady==0){
        loadingScreen();
        return;
    }
    var message = "Welcome !";
    var instructions = "For moving rocket use mouse or keyboard arrows";
    context.save();
    context.fillStyle = "rgba(254, 249, 245,0.5)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.restore();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    context.fillText(instructions, cnvs.clientWidth / 2, cnvs.clientHeight / 2 + 80);
    buttons = {};
    buttons.play = BUTTON_PLAY;
    buttons.play.setPos(cnvs.clientWidth / 2 - 15,  cnvs.clientHeight / 2 + 20);
}


function pauseScreen(){
    context.save();
    context.fillStyle = "rgba(254, 249, 245,0.5)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.fillStyle = "black";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText("Paused", cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    context.restore();
    buttons = {};
    buttons.play = BUTTON_PLAY;
    buttons.play.setPos(cnvs.clientWidth / 2 - 15,  cnvs.clientHeight / 2 + 20);
}


function click(evt) {
    mouseX = evt.pageX - cnvs.offsetLeft;
    mouseY = evt.pageY - cnvs.offsetTop;
    for (var key in buttons){
        if (isEntry(buttons[key],mouseX,mouseY)){
            buttons[key].click();
            break;
        }
    }
}

function mousemove(evt) {
    isMouseControl = true;
    mouseX = evt.pageX - cnvs.offsetLeft;
    mouseY = evt.pageY - cnvs.offsetTop;
    for (var key in buttons){
        if(isEntry(buttons[key],mouseX,mouseY)){
            buttons[key].onmouseon();
            break;
        }   else{
            buttons[key].onmouseout();
        }
    }
    if(!isGamePaused) {
        basket.update(mouseX);
    }
}

function keydown(evt) {
    var keyCode = evt.keyCode;

    isMouseControl = false;
    // if(isGamePaused){return;}
        if (keyCode == 37){
        basket.move(-rocketMoveStep);
    }
    if (keyCode == 39){
        basket.move(rocketMoveStep);}


    if(keyCode == 32 || keyCode == 27){
        if(isGamePaused) {
            play();
        }
        else {
            pause();
            }
    }
}


function muteUnmute() {
    for(var key in sounds){
        sounds[key].muted = !sounds[key].muted;
    }
}