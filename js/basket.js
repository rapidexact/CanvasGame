/**
 * Created by alexander on 18.02.16.
 */
function Basket() {
    this.ball = [];
    this.width = 70;
    this.height = 70;
    this.picture = new Sprite(this.width,this.height,'images/basket.png');
    this.x = ((cnvs.clientWidth) / 2) - (this.width / 2);
    this.y = cnvs.clientHeight - this.height;
    this.state = 3;
    this.draw = function() {
        // context.save();
        // context.strokeStyle = 'black';
        // context.beginPath();
        // context.moveTo(this.x, this.y);
        // context.lineTo(this.x + this.width, this.y);
        // context.stroke();
        // context.restore();
        // for (var i = 0; i < this.ball.length; i++) {
            // if (this.ball[i] !== undefined) {
            //     this.ball[i].x = (this.x + (this.width / 2)) - ((((this.ball[i].width * this.ball.length / 2)))) + (this.ball[i].width * i);
            //     this.ball[i].y = this.y - this.ball[i].height;
                // this.ball[i].draw();
            // }
        // }
    };
    this.update = function(dx) {
        if(this.state < 1) this.state=3;
        this.picture.update(this.state+"",60,60);
        this.picture.draw(this.x,this.y);
        if(dx>cnvs.clientWidth - this.width){
            dx = cnvs.clientWidth - this.width/2;
        }else if(dx < this.width/2){
                dx = this.width/2;
            }
            dx = dx-(this.width/2);
        this.x = smoothMove(this.x,dx);
            // this.x = (this.x+((dx-this.x)*0.1));
        };

    this.setPos = function(dx) {
        dx = dx - this.width/2;
        if (dx < 0) {
            this.x = 0;
            return;
        }
        if (dx > cnvs.clientWidth - this.width) {
            this.x = cnvs.clientWidth - this.width;
            return;
        }
        this.x = dx;
    };

    this.move = function(offset) {
        if (this.x + offset < 0) {
            this.x = 0;
            return;
        } else if (this.x + this.width + offset > cnvs.clientWidth) {
            this.x = cnvs.clientWidth - this.width;
            return;
        }
        this.x += offset;
    };

    this.cth = function(ball) {
            this.ball[this.ball.length] = new Ball();
            this.ball[this.ball.length - 1] = ball;
        this.state --;
    }
}