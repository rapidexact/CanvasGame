/**
 * Created by alexander on 18.02.16.
 */

function CButton(x, y, width, height, url, callback) {
    this.width = width;
    this.height = height;
    this.initPosX = x;
    this.initPosY = y;
    this.offset = 0;
    this.x = this.initPosX + this.offset;
    this.y = this.initPosY + this.offset;

    this.picture = new Image();
    this.picture.src = url;
    this.draw = function() {
        context.drawImage(this.picture, this.x, this.y, this.width, this.height);
    }

    this.update = function() {
        this.x = this.initPosX + this.offset;
        this.y = this.initPosY + this.offset;
    }

    this.click = function(mouseX, mouseY) {
        if ((this.x + this.offset) < mouseX && (this.x + this.offset) + this.width >= mouseX)
            if ((this.y + this.offset) < mouseY && (this.y + this.offset) + this.height > mouseY)
                this.onclick();
    }
    this.onHover = function() {
        if (this.x < mouseX && this.x + this.width >= mouseX) {
            if (this.y < mouseY && this.y + this.height > mouseY) {
                this.offset = 2;
                this.update();
            }
        } else {
            this.offset = 0;
            this.update();
        }
    }

    this.onclick = callback;
}