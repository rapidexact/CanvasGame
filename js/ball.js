/**
 * Created by alexander on 18.02.16.
 */
function Ball() {
    this.picture = new Image();
    this.multiplier = Math.random();
    this.changeParams = function() {
        this.x = Math.floor(Math.random() * (cnvs.clientWidth - this.width));
        this.y = Math.floor(Math.random() * -1200) - this.height;
        this.color = Math.floor(Math.random() * 5) + 1;
        this.picture.src = 'images/balls(' + this.color + ').png';
        this.width = 70;//this.picture.naturalWidth;
        this.height = 70;//this.picture.naturalHeight;
    };
    this.draw = function() {
        context.drawImage(this.picture, this.x, this.y,this.width,this.height);
    };

    this.update = function(dt) {
        if (this.y <= cnvs.height) {
            this.y += Math.ceil(dt * ballSpeed + this.multiplier);
        } else {
            this.changeParams();
        }
    }
}

function Balls(ballsCount){
    this.count = ballsCount;
    this.balls = [];
    for (var i = 0; i < ballsCount; i++){
        balls[i] = new Ball();
    }
    this.get = function(pos){
        return balls[pos];
    }
}