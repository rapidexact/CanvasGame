/**
 * Created by alexander on 24.04.16.
 */

function Sprite(_width, _height,_url) {
    this.lastChangeSec= 0;
    // this.now = Date.now();
    // this.dt = (this.now - this.lastChangeSec) / 1000;
    this.curFrameNuminSerial = 1;
    this.curFrameNum = 0;
    this.url = _url;
    this.image = new Image();
    this.image.src = this.url;
    this.width = _width;
    this.height = _height;
    this.update = function (_frameSerial, _speed, _dt) {
        this.serial = _frameSerial.split(',');
        // log(this.lastChangeSec);
        this.lastChangeSec += _dt;
        if(this.lastChangeSec > _speed){
            this.lastChangeSec = 0;
            this.curFrameNuminSerial %= this.serial.length;
            this.curFrameNuminSerial+=1;
        }
        this.curFrameNum = this.serial[this.curFrameNuminSerial-1] -1;
    };
    this.draw = function (_x,_y) {
        context.drawImage(this.image, this.curFrameNum * this.width, 0, this.width, this.height,_x,_y, this.width, this.height);
    };
}