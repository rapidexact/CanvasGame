/**
 * Created by alexander on 18.02.16.
 */
var BUTTON_PLAY = new Button(100,100, 40, 40, 'images/play_new.png', play);
var BUTTON_PAUSE = new Button(50, 10, 40, 40, 'images/pause_new.png', pause);
var BUTTON_RESET = new Button(10, 10, 40, 40, 'images/refresh_new.png', reset);
var BUTTON_MUTEUNMUTE = new Button(10, 10, 40, 40, 'images/unmute_new.png', muteUnmute);

function Button(x, y, width, height, url, callback) {
    var clickSound = new Audio();
    clickSound.src = 'sounds/click.mp3';
    clickSound.volume = 0.1;
    this.width = width;
    this.height = height;
    this.initPosX = x;
    this.initPosY = y;
    this.offset = 0;
    this.x = this.initPosX + this.offset;
    this.y = this.initPosY + this.offset;
    this.picture = new Image();
    this.picture.src = url;
    this.setPos = function(x, y){
        this.initPosX = x;
        this.initPosY = y;
        this.update();
    };

    this.draw = function() {
        context.drawImage(this.picture, this.x, this.y, this.width, this.height);
    };

    this.update = function() {
        this.x = this.initPosX + this.offset;
        this.y = this.initPosY + this.offset;
        if(this.isVisible){
            this.draw();
        }
    };

    this.click = function() {
        clickSound.play();
        this.onclick();
    };
    this.onmouseon = function() {
        document.body.style.cursor = 'pointer';
        this.offset = 2;
        this.update();
    };
    this.onmouseout = function(){
        document.body.style.cursor = 'default';
        this.offset = 0;
        this.update();
    };

    this.onclick = callback;
}

function Buttons(){
    this.draw = function (_buttons) {
        for (var key in _buttons){
            _buttons[key].draw();
        }
    }
}

