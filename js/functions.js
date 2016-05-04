/**
 * Created by alexander on 16.04.16.
 */
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame
})();

function isRectCollision(objB, objA) {
    return isDirectLineCollision(objA.x, objA.x + objA.width, objB.x, objB.x + objB.width)
    && isDirectLineCollision(objA.y, objA.y + objA.height, objB.y, objB.y + objB.height)
        ? true : false;
}

function isDirectLineCollision(ax1, ax2, bx1, bx2) {
    return !!(ax2 > bx1 && ax1 < bx2);
}

function isEntry(objA, pointX, pointY) {
    return !!((pointX > objA.x && pointX < objA.x + objA.width)
    && (pointY > objA.y && pointY < objA.y + objA.height));
}



/**
 * аналог PHP-шной
 * @param {Array/HTMLElement/Object} taV
 */
function print_r(taV)
{
    return getProps(taV);
}

/**
 * возвращает список атрибутов объекта и значения
 * @param {Element/Object} toObj - ссылка на объект
 * @param {String} tcSplit - строка разделитель строк
 * @return {String} - строку со списком атрибутов объекта
 * и значениями атрибутов
 */
function getProps(toObj, tcSplit)
{
    if (!tcSplit) tcSplit = '\n';
    var lcRet = '';
    var lcTab = '    ';

    for (var i in toObj) // обращение к свойствам объекта по индексу
        lcRet += lcTab + i + " : " + toObj[i] + tcSplit;

    lcRet = '{' + tcSplit + lcRet + '}';

    return lcRet;
}

function smoothMove(a,b) {
    return a + ((b - a) * 0.1);
}