var cnvs, context;
var ballSpeed;
var balls = [];
var lastTime;
var ballCount = 10;
var rocket;
var isGameOver = false;
var score;
var buttons = {};
var durationGame = 0;
var isGamePaused = false;

window.onload = init;
rocketMoveStep = 50;

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
    if (!isGamePaused) {

        update(dt);
    }
    lastTime = now;
    requestID = requestAnimFrame(main);
}

function stop() {
    isGamePaused = true;
}

function pause() {
    isGamePaused = isGamePaused ? false : true;
    /*if (requestID === undefined) {
     lastTime = Date.now();
     requestID = requestAnimFrame(main);
     } else {
     requestID = cancelAnimationFrame(requestID);
     }*/
}
function reset() {
    init();
}

function gameOver() {
    isGameOver = true;
    var message = "GAME OVER !"
    context.save();
    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.restore();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    buttons['refresh'] = new CButton(cnvs.clientWidth / 2 - buttons['refresh'].width / 2, cnvs.clientHeight / 2 + 20, 30, 31, 'images/refresh.png', reset);
    buttons['refresh'].draw();
    pause();
}

function update(dt) {
    if(isGamePaused){
        return;
    }
    for (var i = 0; i < balls.length; i++) {
        balls[i].update(dt);    
        if (balls[i].x + balls[i].width > rocket.x && balls[i].x < rocket.x + rocket.width && balls[i].y + balls[i].height > rocket.y) {
            rocket.cth(balls[i]);
            balls[i] = new CBall();
        }
    }
    rocket.update();
    if (durationGame / 10 > 1) {
        durationGame = 0;
        ballSpeed += 10;
    }
    durationGame += dt;
}

function render() {
    context.clearRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    for(var key in balls){
        balls[key].draw();
    }
    buttons['refresh'].draw();
    buttons['pause'].draw();
    rocket.draw();
    context.textAlign = 'end';
    context.fillText('Score : ' + score, cnvs.width - 10, 20);
    context.fillText('Ball speed : ' + ballSpeed, cnvs.width - 10, 40);
}

function init() {
    window.document.addEventListener('click', click, true);
    window.onmousemove = mousemove;
    window.onkeydown = keydown;
    window.onblur = stop;
    cnvs = document.getElementById('gamewindow');
    if (!cnvs || !cnvs.getContext) {
        return;
    }
    context = cnvs.getContext('2d');
    if (!context) {
        return;
    }
    setOptions();
    menu();
}

function setOptions() {
    context.font = "20px Arial";
    context.fillStyle = "black";
    for (var i = 0; i < ballCount; i++)
        balls[i] = new CBall();
    rocket = new CRocket();
    buttons['refresh'] = new CButton(10, 10, 30, 31, 'images/refresh.png', reset);
    buttons['play'] = new CButton(cnvs.clientWidth / 2, cnvs.clientHeight / 2 + 20, 30, 31, 'images/play.png', main);
    buttons['pause'] = new CButton(50, 10, 30, 31, 'images/pause.png', pause);
    lastTime = Date.now();
    score = 0;
    ballSpeed = 100;
    isGamePaused = false;
    isGameOver = false;
}



function menu() {
    var message = "Welcome !"
    var instructions = "For moving rocket use mouse of keyboard arrows";
    context.save();
    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.restore();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    context.fillText(instructions, cnvs.clientWidth / 2, cnvs.clientHeight / 2 + 80)
    buttons['play'] = new CButton(cnvs.clientWidth / 2 - buttons['play'].width / 2, cnvs.clientHeight / 2 + 20, 30, 31, 'images/play.png', main);
    buttons['play'].draw();
}


function pauseScreen(){

}

var mouseX;
var mouseY;

function click(evt) {
    mouseX = evt.pageX - cnvs.offsetLeft;
    mouseY = evt.pageY - cnvs.offsetTop;
    for (var key in buttons){
        buttons[key].click(mouseX,mouseY);
    }
}

function mousemove(evt) {
    mouseX = evt.pageX - cnvs.offsetLeft;
    mouseY = evt.pageY - cnvs.offsetTop;
    for (var key in buttons){
        buttons[key].onHover(mouseX,mouseY);
    }
    if(!isGamePaused) {
        rocket.moveTo(mouseX);
    }
}

function keydown(evt) {
    if(isGamePaused){
        return;
    }
    keyCode = evt.keyCode;
    if (keyCode == 37)
        rocket.move(-rocketMoveStep);
    if (keyCode == 39)
        rocket.move(rocketMoveStep);
}