/**
 * Created by alexander on 18.02.16.
 */
function Basket() {
    this.ball = [];
    this.maxPossibleStates = 4;
    this.state = 1;
    this.image = new Image();
    this.image.src = 'images/basket_new.png';
    this.width = this.image.naturalWidth / this.maxPossibleStates;
    this.height = this.image.naturalHeight;
    this.progressInPrsnt = 1;
    this.picture = new Sprite(this.width, this.height, this.image.src);
    this.x = ((cnvs.clientWidth) / 2) - (this.width / 2);
    this.y = cnvs.clientHeight - this.height;
    this.draw = function () {
        if (this.ball.length != 0) {
            context.fillText("x" + this.ball.length, this.x + this.width, this.y - 5);
        }
        this.picture.draw(this.x, this.y);
    };
    this.setProgressByPrsnt = function (_progress) {
        this.progressInPrsnt = Math.abs(_progress % 100) + 1;
    };
    this.update = function (_newPosition) {
        this.state = Math.ceil(this.progressInPrsnt / (100 / this.maxPossibleStates + 1));
        this.picture.update(this.state + "", 60, 60);
        _newPosition = _newPosition - this.width/2;
        if (_newPosition > cnvs.clientWidth - this.width) {
            _newPosition = cnvs.clientWidth - this.width;
        }
        if (_newPosition < 0) {
            _newPosition = 0;
        }
        this.x = smoothMove(this.x, _newPosition);
    };

    this.setPos = function (dx) {
        dx = dx - this.width / 2;
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

    this.move = function (offset) {
        if (this.x + offset < 0) {
            this.x = 0;
            return;
        } else if (this.x + this.width + offset > cnvs.clientWidth) {
            this.x = cnvs.clientWidth - this.width;
            return;
        }
        this.x += offset;
    };

    this.cth = function (ball) {
        this.ball[this.ball.length] = new Ball();
        this.ball[this.ball.length - 1] = ball;
    }
}