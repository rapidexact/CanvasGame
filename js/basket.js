/**
 * Created by alexander on 18.02.16.
 */
function Basket() {
    this.ball = [];
    this.width = 120;
    this.height = 10;
    this.x = ((cnvs.clientWidth) / 2) - (this.width / 2);
    this.y = cnvs.clientHeight - this.height;
    this.draw = function() {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y);
        context.stroke();
        for (var i = 0; i < this.ball.length; i++) {
            if (this.ball[i] !== undefined) {
                this.ball[i].x = (this.x + (this.width / 2)) - ((((this.ball[i].width * this.ball.length / 2)))) + (this.ball[i].width * i);
                this.ball[i].y = this.y - this.ball[i].height;
                this.ball[i].draw();
            }
        }
    }
    this.update = function(dx) {
        if (this.ball.length == 3)
            this.ball = [];
    }

    this.moveTo = function(dx) {
        if (dx < 0) {
            this.x = 0;
            return;
        }
        if (dx > cnvs.clientWidth - this.width) {
            this.x = cnvs.clientWidth - this.width;
            return;
        }
        this.x = dx;
    }

    this.move = function(offset) {
        if (this.x + offset < 0) {
            this.x = 0;
            return;
        } else if (this.x + this.width + offset > cnvs.clientWidth) {
            this.x = cnvs.clientWidth - this.width;
            return;
        }
        this.x += offset;
    }

    this.cth = function(ball) {
        if (this.ball.length < 3) {
            this.ball[this.ball.length] = new Ball();
            this.ball[this.ball.length - 1] = ball;
            if (this.ball[this.ball.length - 1].color == this.ball[0].color) {
                score += 1;
            } else {
                gameOver();
            }
        } else {
            this.ball = null;
        }
    }
}