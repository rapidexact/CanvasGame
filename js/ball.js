/**
 * Created by alexander on 18.02.16.
 */
function Ball() {
    this.randomize = function () {
        this.color = Math.floor(Math.random() * 5) + 1;
        this.states = 3;
        this.picture = new Image();
        this.picture.src = 'images/ball_new(' + this.color + ').png';
        this.width = this.picture.naturalWidth / this.states;
        this.height = this.picture.naturalHeight;
        this.picture = new Sprite(this.width, this.height, 'images/ball_new(' + this.color + ').png');
        this.x = Math.floor((Math.random() * Math.random() / Math.random()) % 1 * (cnvs.clientWidth - this.width));
        this.y = Math.floor((Math.random() * Math.random() / Math.random()) % 1 * -4000) - this.height;
        this.multiplier = Math.random();
        this.isDied = false;
    };
    this.randomize();
    this.draw = function () {
        this.picture.update("1,2,3,2,1", 1 / 2, 0.017);
        this.picture.draw(this.x, this.y);
    };

    this.update = function (dt) {

        if (this.y < cnvs.height - 10) {
            this.y = Math.ceil(smoothMove(this.y, this.y + Math.ceil(dt * ballSpeed * 10 + this.multiplier)));
        } else {
            this.isDied = true;
        }
    }
}

function BallManager(ballsCount) {
    this.count = ballsCount;
    this.balls = [];
    this.addNew = function () {
        this.balls.push(new Ball());
        for (var i = 0; i < this.balls.length; i++) {
            if (this.balls.length - 1 == i) {
                continue;
            }
            if (isRectCollision(this.balls[i], this.balls[this.balls.length - 1])) {
                this.balls[this.balls.length - 1].randomize();
                i = -1;
            }
        }
    };
    for (var i = 0; i < this.count; i++) {
        this.addNew();
    }
    this.update = function (dt) {
        for (var key in this.balls) {
            this.balls[key].update(dt);
            if (this.balls[key].isDied == true) {
                this.balls.splice(key, 1);
                this.addNew();
            }
            if (isRectCollision(this.balls[key], basket)) {
                basket.cth(this.balls[key]);
                this.balls[key].isDied = true;
            }
        }
    };
    this.draw = function () {
        for (var key in this.balls) {
            this.balls[key].draw();
        }
    }

}