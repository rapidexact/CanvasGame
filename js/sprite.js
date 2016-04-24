/**
 * Created by alexander on 24.04.16.
 */

function Sprite(_width,_height,_url) {
    this.lastChangeSec= 0;
    this.curFrameNuminSerial = 0;
    this.curFrameNum = 0;
    this.width =  _width;
    this.height = _height;
    this.url = _url;
    this.image = new Image();
    this.image.src = this.url;
    this.update = function (_frameSerial, _speed, _dt) {
        // log(_dt," ");
        _dt = _dt * 10000;
        this.serial = _frameSerial.split(',');
        this.lastChangeSec += _dt;
        if(this.lastChangeSec/60 > _speed){
            this.lastChangeSec = 0;
            if(this.curFrameNuminSerial >= this.serial.length){this.curFrameNuminSerial =0;}
            this.curFrameNuminSerial+=1;
        }
        this.curFrameNum = this.serial[this.curFrameNuminSerial-1] -1;
    };
    this.draw = function (_x,_y) {
        // log(this.image.src);
        context.drawImage(this.image, this.curFrameNum * this.width, 0, this.width, this.height,_x,_y, this.width, this.height);
    };
}