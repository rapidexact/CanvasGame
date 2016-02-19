/**
 * Created by alexander on 18.02.16.
 */

function Button(x, y, width, height, url, callback) {
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
    }

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
        this.onclick();
    };
    this.onmouseon = function() {
        log.innerHTML = document.getElementById('gamewindow').style.cursor = 'pointer';
        this.offset = 2;
        this.update();
    };
    this.onmouseout = function(){
        log.innerHTML = document.getElementById('gamewindow').style.cursor = 'default';
        this.offset = 0;
        this.update();
    };

    this.onclick = callback;
}