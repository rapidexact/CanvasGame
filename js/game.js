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
    defineParams();
    startScreen();
}

function stop() {
    isGamePaused = true;
}

function pause() {
    isGamePaused = true;
    //isGamePaused = isGamePaused ? false : true;
}
function reset() {
    start();
}

function gameOver() {
    isGameOver = true;
    var message = "GAME OVER !"
    context.save();
    context.fillStyle = "rgba(255, 255, 255, 0.4)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.restore();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    buttons['refresh'].moveTo(cnvs.clientWidth / 2 - 30/ 2,cnvs.clientHeight / 2 + 20);
    buttons['refresh'].draw();
}

function update(dt) {
   // document.getElementById('log').innerHTML = 1 + " ";

    if(isGamePaused){
        pauseScreen();
        return;
    }

    if(isGameOver){
        gameOver();
        return;
    }

    balls.update(dt);
    basket.update();

    if (durationGame / 10 > 1) {
        durationGame = 0;
        ballSpeed += 10;
    }
    durationGame += dt;
}

function play(){
    isGamePaused = false;
    //main();
    //startScreen();
}

function isCollision(objA, objB){
    return (objA.x + objA.width > objB.x && objA.x < objB.x + objB.width && objA.y + objA.height > objB.y) ? true : false;
}

function isEntry(objA,pointX,pointY){
    return isCollision(objA, {x : pointX, y : pointY, width : 1, height : 1});
}


function render() {
    if(isGamePaused){
        return;
    }
    context.clearRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    balls.draw();
    buttons['refresh'].draw();
    buttons['pause'].draw();
    basket.draw();

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
    start();
    main();
}



function defineParams() {
    context.font = "20px Lasco";
    context.fillStyle = "black";
    context.shadowColor = 'grey';
    context.shadowBlur = 0.5;
    //context.shadowOffsetX = 1;
    basket = new Basket();
    buttons['refresh'] = new Button(10, 10, 30, 31, 'images/refresh.png', reset);
    buttons['play'] = new Button(cnvs.clientWidth / 2, cnvs.clientHeight / 2 + 20, 30, 31, 'images/play.png', play);
    buttons['pause'] = new Button(50, 10, 30, 31, 'images/pause.png', pause);
    lastTime = Date.now();
    score = 0;
    ballSpeed = 100;
    durationGame = 0;
    isGameOver = false;
    isGamePaused = true;
    balls = new Balls(10);
}



function startScreen() {
    var message = "Welcome !"
    var instructions = "For moving rocket use mouse of keyboard arrows";
    context.save();
    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.restore();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    context.fillText(instructions, cnvs.clientWidth / 2, cnvs.clientHeight / 2 + 80);
    buttons['play'].moveTo(cnvs.clientWidth / 2 - 15,  cnvs.clientHeight / 2 + 20);
    buttons['play'].draw();
}


function pauseScreen(){
 /*   context.save();
    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText("Paused", cnvs.clientWidth / 2, cnvs.clientHeight / 2);

    context.restore();
*/
    startScreen();
}

var mouseX;
var mouseY;

function click(evt) {
    mouseX = evt.pageX - cnvs.offsetLeft;
    mouseY = evt.pageY - cnvs.offsetTop;
    for (var key in buttons){
        if (isEntry(buttons[key],mouseX,mouseY)){
            buttons[key].click();
            return;
        }
    }
}

function mousemove(evt) {
    mouseX = evt.pageX - cnvs.offsetLeft;
    mouseY = evt.pageY - cnvs.offsetTop;
    for (var key in buttons){
        if(isEntry(buttons[key],mouseX,mouseY)){
            buttons[key].onmouseon();
        }   else{
            buttons[key].onmouseout();
        }
    }
    if(!isGamePaused) {
        basket.moveTo(mouseX);
    }
}

function keydown(evt) {
    if(isGamePaused){
        return;
    }
    keyCode = evt.keyCode;
    if (keyCode == 37)
        basket.move(-rocketMoveStep);
    if (keyCode == 39)
        basket.move(rocketMoveStep);
}


/**
 * аналог PHP-шной
 * @param {Array/HTMLElement/Object} taV
 */
function print_r(taV)
{
    return getProps(taV);
}

/**
 * возвращает список атрибутов объекта и значения
 * @param {Element/Object} toObj - ссылка на объект
 * @param {String} tcSplit - строка разделитель строк
 * @return {String} - строку со списком атрибутов объекта
 * и значениями атрибутов
 */
function getProps(toObj, tcSplit)
{
    if (!tcSplit) tcSplit = '\n';
    var lcRet = '';
    var lcTab = '    ';

    for (var i in toObj) // обращение к свойствам объекта по индексу
        lcRet += lcTab + i + " : " + toObj[i] + tcSplit;

    lcRet = '{' + tcSplit + lcRet + '}';

    return lcRet;
}