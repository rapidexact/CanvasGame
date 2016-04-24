/**
 * Created by alexander on 24.04.16.
 */

function Sprite(_numObjs,_url) {
    this.numbObjs = _numObjs;
    this.lastChangeSec= 0;
    this.curFrameNuminSerial = 1;
    this.curFrameNum = 0;
    this.url = _url;
    this.image = new Image();
    this.image.src = this.url;
    this.width =  this.image.naturalWidth / this.numbObjs;
    this.height = this.image.naturalHeight;
    this.update = function (_frameSerial, _speed, _dt) {
        this.serial = _frameSerial.split(',');
        this.lastChangeSec += _dt * 100;
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