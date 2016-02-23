/**
 * Created by alexander on 18.02.16.
 */

function Button(x, y, width, height, url, callback) {
    var clickSound = new Audio();
    clickSound.src = 'sounds/click.mp3';
    this.width = width;
    this.height = height;
    this.initPosX = x;
    this.initPosY = y;
    this.offset = 0;
    this.isVisible = false;
    this.x = this.initPosX + this.offset;
    this.y = this.initPosY + this.offset;
    this.picture = new Image();
    this.picture.src = url;
    this.moveTo = function(x,y){
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
    this.refresh = new Button(10, 10, 30, 31, 'images/refresh.png', reset);
    this.play = new Button(cnvs.clientWidth / 2, cnvs.clientHeight / 2 + 20, 30, 31, 'images/play.png', play);
    this.pause = new Button(50, 10, 30, 31, 'images/pause.png', pause);
}