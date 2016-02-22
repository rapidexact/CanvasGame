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
var pat;
var img;
img = new Image();

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
}
function reset() {
    start();
}

function gameOver() {
    isGameOver = true;
    var message = "GAME OVER !";
    context.save();
    context.fillStyle = "rgba(254, 249, 245,0.1)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.restore();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    buttons['refresh'].moveTo(cnvs.clientWidth / 2 - 30/ 2,cnvs.clientHeight / 2 + 20);
    //buttons['refresh'].draw();
}

function update(dt) {

    if(durationGame==0){
        startScreen();
        return;
    }

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
    durationGame++;
}

function isCollision(objB, objA){
    if (isEntry(objA,objB.x,objB.y)){
        return true;
    }   else if(isEntry(objA,objB.x + objB.width,objB.y)){
        return true;
    }   else if(isEntry(objA,objB.x,objB.y + objB.height)){
        return true;
    }   else if(isEntry(objA,objB.x + objB.width,objB.y + objB.height)){
        return true;
    }
return false;
}

function isEntry(objA,pointX,pointY){
    if(pointX>objA.x && pointX < objA.x + objA.width){
        if(pointY > objA.y && pointY < objA.y + objA.height)
        return true;
    }else return false;
}


function render() {
    context.save();
    pat = context.createPattern(img,"repeat");
    context.fillStyle = pat;
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.fillStyle = "rgba(255,255,255,0.2)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.restore();
    balls.draw();
    buttons['refresh'].draw();
    buttons['pause'].draw();
    basket.draw();
    context.save();
    context.fillStyle = "black";
    context.textAlign = 'end';
    context.fillText('Score : ' + score, cnvs.width - 10, 20);
    context.fillText('Ball speed : ' + ballSpeed, cnvs.width - 10, 40);
    context.restore();
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
    basket = new Basket();
    buttons = new Buttons();
    lastTime = Date.now();
    score = 0;
    ballSpeed = 100;
    durationGame = 0;
    isGameOver = false;
    isGamePaused = true;
    balls = new Balls(10);
    img.src = 'images/gameBackground.jpg';
}

function log(str){
    log.innerHTML += str + " <br>";
}

function startScreen() {
    var message = "Welcome !";
    var instructions = "For moving rocket use mouse of keyboard arrows";
    context.save();
    context.fillStyle = "rgba(254, 249, 245,0.5)";
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
    context.save();
    context.fillStyle = "rgba(254, 249, 245,0.1)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.fillStyle = "black";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText("Paused", cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    context.restore();
    buttons['play'].moveTo(cnvs.clientWidth / 2 - 15,  cnvs.clientHeight / 2 + 20);
    buttons['play'].draw();
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