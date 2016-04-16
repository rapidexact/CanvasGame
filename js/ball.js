/**
 * Created by alexander on 18.02.16.
 */
function Ball() {
    this.picture = new Image();
    this.changeParams = function() {
        this.height = 70;//this.picture.naturalHeight;
        this.width = 70;//this.picture.naturalWidth;
        this.x = Math.floor((Math.random() * Math.random() / Math.random())%1 * (cnvs.clientWidth - this.width));
        this.y = Math.floor((Math.random() * Math.random() / Math.random())%1 * - 4000) - this.height;
        this.color = Math.floor(Math.random() * 5) + 1;
        this.picture.src = 'images/balls(' + this.color + ').png';
        this.multiplier = Math.random();// * Math.random() / Math.random();
        this.isDied = false;
    };
    this.changeParams();
    this.draw = function() {
        context.drawImage(this.picture, this.x, this.y,this.width,this.height);
    };

    this.update = function(dt) {
        if (this.y < cnvs.height-10) {
            this.y = smoothMove(this.y, this.y+Math.ceil(dt * ballSpeed * 10 + this.multiplier));
            // this.y += Math.ceil(dt * ballSpeed + this.multiplier);
        } else {
            this.isDied = true;
        }
    }
}

function BallManager(ballsCount){
    this.count = ballsCount;
    this.balls = [];
    this.addNew = function(){
        this.balls.push(new Ball());
        for(i=0;i<this.balls.length;i++){
            for(var key in this.balls){
                if(isCollision(this.balls[this.balls.length-1],this.balls[key]))   {
                    this.balls[this.balls.length-1].changeParams();
                    i=0;
                }
            }}
    };
    for (var i = 0; i < this.count; i++){
        this.addNew();
    }
    this.update = function(dt) {
        for (var key in this.balls) {
            this.balls[key].update(dt);
            if(this.balls[key].isDied == true){
                this.balls.splice(key,1);
                this.addNew();
            }
            if (isCollision(this.balls[key], basket)) {
                basket.cth(this.balls[key]);
                this.balls[key].isDied = true;
            }
        }
    };
    this.draw = function(){
        for(var key in this.balls){
            this.balls[key].draw();
        }
    }

}