var cnvs, context;
var ballSpeed;
var balls = [];
var lastTime;
var ballCount = 10;
var rocket;
var isGameOver = false;
var score;
var buttons = [];
var durationGame = 0;
var grassPattern;
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
    update(dt);
    lastTime = now;
    requestID = requestAnimFrame(main);
}

function CRocket() {
    //this.w = img2.naturalWidth;
    //this.h = img2.naturalHeight;
    this.ball = [];
    this.width = 120;
    this.height = 10;
    this.x = ((cnvs.clientWidth) / 2) - (this.width / 2);
    this.y = cnvs.clientHeight - this.height;
    this.draw = function() {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y);
        context.stroke();
        for (var i = 0; i < this.ball.length; i++) {
            if (this.ball[i] !== undefined) {
                this.ball[i].x = (this.x + (this.width / 2)) - ((((this.ball[i].width * this.ball.length / 2)))) + (this.ball[i].width * i);
                this.ball[i].y = this.y - this.ball[i].height;
                this.ball[i].draw();
            }
        }
    }
    this.update = function(dx) {
        if (this.ball.length == 3)
            this.ball = [];
    }

    this.moveTo = function(dx) {
        if (dx < 0) {
            this.x = 0;
            return;
        }
        if (dx > cnvs.clientWidth - this.width) {
            this.x = cnvs.clientWidth - this.width;
            return;
        }
        this.x = dx;
    }

    this.move = function(offset) {
        if (this.x + offset < 0) {
            this.x = 0;
            return;
        } else if (this.x + this.width + offset > cnvs.clientWidth) {
            this.x = cnvs.clientWidth - this.width;
            return;
        }
        this.x += offset;
    }

    this.cth = function(ball) {
        if (this.ball.length < 3) {
            this.ball[this.ball.length] = new CBall();
            this.ball[this.ball.length - 1] = ball;
            if (this.ball[this.ball.length - 1].color == this.ball[0].color) {
                score += 1;
            } else {
                gameOver();
            }
        } else {
            this.ball = null;
        }
    }
}

function CButton(x, y, width, height, url, callback) {
    this.width = width;
    this.height = height;
    this.initPosX = x;
    this.initPosY = y;
    this.offset = 0;
    this.x = this.initPosX + this.offset;
    this.y = this.initPosY + this.offset;

    this.picture = new Image();
    this.picture.src = url;
    this.draw = function() {
        context.drawImage(this.picture, this.x, this.y, this.width, this.height);
    }

    this.update = function() {
        this.x = this.initPosX + this.offset;
        this.y = this.initPosY + this.offset;
    }

    this.click = function(mouseX, mouseY) {
        if ((this.x + this.offset) < mouseX && (this.x + this.offset) + this.width >= mouseX)
            if ((this.y + this.offset) < mouseY && (this.y + this.offset) + this.height > mouseY)
                this.onclick();
    }
    this.onHover = function() {
        if (this.x < mouseX && this.x + this.width >= mouseX) {
            if (this.y < mouseY && this.y + this.height > mouseY) {
                this.offset = 2;
                this.update();
            }
        } else {
            this.offset = 0;
            this.update();
        }
    }

    this.onclick = callback;
}

function CBall() {
    this.picture = new Image();
    this.multiplier = Math.random();
    this.changeParams = function() {
        this.x = Math.floor(Math.random() * (cnvs.clientWidth - this.width));
        this.y = Math.floor(Math.random() * -1200) - this.height;
        this.color = Math.floor(Math.random() * 10) + 1;
        this.picture.src = 'images/ball(' + this.color + ').png';
        this.width = this.picture.naturalWidth;
        this.height = this.picture.naturalHeight;
    }
    this.draw = function() {
        context.drawImage(this.picture, this.x, this.y);
    }

    this.update = function(dt) {
        if (this.y <= cnvs.height) {
            this.y += Math.ceil(dt * ballSpeed + this.multiplier);
        } else {
            this.changeParams();
        }
    }
}

function stop() {
    rocket = null;
    cancelAnimationFrame(requestID);
}

function reset() {
    stop();
    init();
}

function gameOver() {
    isGameOver = true;
    var message = "Game Over !"
    context.save();
    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.restore();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    buttons[0] = new CButton(cnvs.clientWidth / 2 - buttons[0].width / 2, cnvs.clientHeight / 2 + 20, 30, 31, '../images/refresh.png', reset);
    buttons[0].draw();
    stop();
}

function update(dt) {
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
    //    context.fillStyle = grassPattern;
    //    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.clearRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
    }
    buttons[0].draw();
    buttons[2].draw();
    rocket.draw();
    context.textAlign = 'end';
    context.fillText('Score : ' + score, cnvs.width - 10, 20);
    context.fillText('Ball speed : ' + ballSpeed, cnvs.width - 10, 40);
}

function init() {
    window.document.addEventListener('click', click, true);
    window.onmousemove = mousemove;
    window.onkeydown = keydown;
    cnvs = document.getElementById('gamewindow');
    if (!cnvs || !cnvs.getContext) {
        return;
    }
    context = cnvs.getContext('2d');
    if (!context) {
        return;
    }
    setOtions();
    menu();
}

function setOtions() {
    context.font = "20px Tahoma";
    context.fillStyle = "black";
    for (var i = 0; i < ballCount; i++)
        balls[i] = new CBall();
    rocket = new CRocket();
    buttons[0] = new CButton(10, 10, 30, 31, 'images/refresh.png', reset);
    buttons[1] = new CButton(cnvs.clientWidth / 2, cnvs.clientHeight / 2 + 20, 30, 31, 'images/play.png', main);
    buttons[2] = new CButton(50, 10, 30, 31, 'images/pause.png', pause);
    lastTime = Date.now();
    score = 0;
    ballSpeed = 100;
    isGameOver = false;
    //    img.src = '../images/Seamless-Green-Grass-Texture.jpg';
    //    grassPattern = context.createPattern(img,'repeat');

}

function pause() {
    if (requestID === undefined) {
        lastTime = Date.now();
        requestID = requestAnimFrame(main);
    } else {
        requestID = cancelAnimationFrame(requestID);
    }
}


function menu() {
    var message = "Welcome !"
    var instructions = "Для перемещения каретки используйте мышь либо стрелочки на клавиатуре";
    context.save();
    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.restore();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    context.fillText(instructions, cnvs.clientWidth / 2, cnvs.clientHeight / 2 + 80)
    buttons[1] = new CButton(cnvs.clientWidth / 2 - buttons[1].width / 2, cnvs.clientHeight / 2 + 20, 30, 31, 'images/play.png', main);
    buttons[1].draw();
}

var mouseX;
var mouseY;

function click(evt) {
    mouseX = evt.pageX - cnvs.offsetLeft;
    mouseY = evt.pageY - cnvs.offsetTop;
    for (var i = 0; i < buttons.length; i++)
        buttons[i].click(mouseX, mouseY);
}

function mousemove(evt) {
    mouseX = evt.pageX - cnvs.offsetLeft;
    mouseY = evt.pageY - cnvs.offsetTop;
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onHover(mouseX, mouseY);
    }
    rocket.moveTo(mouseX);
}

function keydown(evt) {
    keyCode = evt.keyCode;
    if (keyCode == 37)
        rocket.move(-rocketMoveStep);
    if (keyCode == 39)
        rocket.move(rocketMoveStep);
}