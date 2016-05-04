/**
 * Created by alexander on 03.05.16.
 */

function gameScreen() {
    // transparency = 0;
    context.save();
    bgPattern = context.createPattern(bgImg, "repeat");
    context.fillStyle = bgPattern;
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.fillStyle = "rgba(255,255,255,0.7)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.fillStyle = "black";
    context.textAlign = 'end';
    context.fillText('Score : ' + score, cnvs.width - 10, 20);
    // context.fillText('Ball speed : ' + ballSpeed, cnvs.width - 10, 40);
    // i
    context.fillText('Your record : ' + lastRecord, cnvs.width - 10, 40);
    var minutes = Math.floor(durationGame / 60);
    var seconds = (durationGame % 60 > 10) ? Math.floor(durationGame % 60) : "0" + Math.floor(durationGame % 10);
    context.fillText('Time : ' + minutes + ":" + seconds, cnvs.width - 10, 60);
    context.fillText('Your missions : ', cnvs.width - 10, 80);
    context.restore();
    balls.draw();
    missionMan.draw();
    basket.draw();
    buttonsManager.draw(buttons);
}

function loadingScreen() {
    context.save();
    context.fillStyle = "rgba(254, 249, 245,1)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.fillStyle = "black";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText("Loading...", cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    context.restore();
}


function startScreen() {
    gameScreen();
    var message = "Welcome !";
    var instructions = "For moving rocket use mouse or keyboard arrows";
    context.save();
    context.fillStyle = "rgba(254, 249, 245,0.5)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.restore();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    context.fillText(instructions, cnvs.clientWidth / 2, cnvs.clientHeight / 2 + 80);
    buttons = {};
    buttons.play = BUTTON_PLAY;
    buttons.play.setPos(cnvs.clientWidth / 2 - 15, cnvs.clientHeight / 2 + 20);
    buttonsManager.draw(buttons);
}


function pauseScreen() {
    // transparency = 0;
    context.save();
    context.fillStyle = "rgba(254, 249, 245, 0.5)";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.fillStyle = "black";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText("Paused", cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    context.restore();
    buttons = {};
    buttons.play = BUTTON_PLAY;
    buttons.play.setPos(cnvs.clientWidth / 2 - 15, cnvs.clientHeight / 2 + 20);
    buttonsManager.draw(buttons);
}
var transparency = 0;
function gameOverScreen() {
    var message = "GAME OVER !";
    context.save();
    transparency = smoothMove(transparency,1);
    context.fillStyle = "rgba(254, 249, 245,"+ transparency +")";
    context.fillRect(0, 0, cnvs.clientWidth, cnvs.clientHeight);
    context.restore();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, cnvs.clientWidth / 2, cnvs.clientHeight / 2);
    buttons = {};
    buttons.reset = BUTTON_RESET;
    buttons.reset.setPos(cnvs.clientWidth / 2 - 30 / 2, cnvs.clientHeight / 2 + 20);
    buttonsManager.draw(buttons);
}