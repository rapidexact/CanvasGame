/**
 * Created by alexander on 18.02.16.
 */
function CBall() {
    this.picture = new Image();
    this.multiplier = Math.random();
    this.changeParams = function() {
        this.x = Math.floor(Math.random() * (cnvs.clientWidth - this.width));
        this.y = Math.floor(Math.random() * -1200) - this.height;
        this.color = Math.floor(Math.random() * 10) + 1;
        this.picture.src = 'images/ball(' + this.color + ').png';
        this.width = this.picture.naturalWidth;
        this.height = this.picture.naturalHeight;
    }
    this.draw = function() {
        context.drawImage(this.picture, this.x, this.y);
    }

    this.update = function(dt) {
        if (this.y <= cnvs.height) {
            this.y += Math.ceil(dt * ballSpeed + this.multiplier);
        } else {
            this.changeParams();
        }
    }
}