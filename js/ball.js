/**
 * Created by alexander on 18.02.16.
 */
function Ball() {
    this.picture = new Image();
    this.changeParams = function() {
        this.width = 70;//this.picture.naturalWidth;
        this.height = 70;//this.picture.naturalHeight;
        this.x = Math.floor((Math.random() * Math.random() / Math.random())%1 * (cnvs.clientWidth - this.width));
        this.y = Math.floor((Math.random() * Math.random() / Math.random()) * - 2000) - this.height;
        this.color = Math.floor(Math.random() * 5) + 1;
        this.picture.src = 'images/balls(' + this.color + ').png';
        this.multiplier = Math.random();// * Math.random() / Math.random();
    };
    this.draw = function() {
        context.drawImage(this.picture, this.x, this.y,this.width,this.height);
    };

    this.update = function(dt) {
        if (this.y < cnvs.height-10) {
            this.y += Math.ceil(dt * ballSpeed + this.multiplier);
        } else {
            this.changeParams();
        }
    }
}

function Balls(ballsCount){
    this.count = ballsCount;
    this.balls = [];
    for (var i = 0; i < this.count; i++){
        this.balls[i] = new Ball();
    }
    this.update = function(dt) {
        for (var key in this.balls) {
            this.balls[key].update(dt);
            if (isCollision(this.balls[key], basket)) {
                basket.cth(this.balls[key]);
                this.balls[key] = new Ball();
            }
        }
    };
    this.draw = function(){
        for(var key in this.balls){
            this.balls[key].draw();
        }
    }

}