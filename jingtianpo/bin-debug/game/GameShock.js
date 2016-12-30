/**
 *
 * @author
 *
 */
var GameShock = (function () {
    function GameShock() {
        this.mapPoss = [new egret.Point(0, 10), new egret.Point(10, 5), new egret.Point(-10, -5)];
        this.spritePoss = [new egret.Point(10, 0), new egret.Point(-10, 0), new egret.Point(10, 0)];
        this._shockLength = 0;
        this._shockCount = 0;
        this._rx = 0;
        this._ry = 0;
        this._type = 0;
        this._repeatCount = 0;
        this._isRunning = false;
    }
    var d = __define,c=GameShock,p=c.prototype;
    p.destroy = function () {
        this.stop();
        this._target = null;
    };
    p.shock = function (type) {
        if (type === void 0) { type = 0; }
        this._type = type;
        if (this._type == GameShock.MAP) {
            this._shockPoss = this.mapPoss.concat();
            this._shockLength = this._shockPoss.length;
        }
        else if (this._type == GameShock.SPRITE) {
            this._shockPoss = this.spritePoss.concat();
            this._shockLength = this._shockPoss.length;
        }
    };
    p.start = function (num) {
        if (num === void 0) { num = 1; }
        if (this._isRunning) {
            this.stop();
        }
        this.repeatCount = num;
        this._shockCount = 0;
        if (this._target) {
            this._isRunning = true;
            this._rx = this._target.x;
            this._ry = this._target.y;
            egret.Ticker.getInstance().register(this.onShockEnter, this);
        }
    };
    p.stop = function () {
        this._isRunning = false;
        if (this._target) {
            this._target.x = this._rx;
            this._target.y = this._ry;
            egret.Ticker.getInstance().unregister(this.onShockEnter, this);
        }
    };
    p.onShockEnter = function (e) {
        var maxCount = this._shockLength * this._repeatCount;
        if (this._shockCount >= maxCount) {
            this.stop();
            return;
        }
        var index = this._shockCount % this._shockLength;
        var pos = this._shockPoss[index];
        if (this._target) {
            this._target.x = this._rx + pos.x;
            this._target.y = this._ry + pos.y;
        }
        this._shockCount++;
    };
    d(p, "repeatCount"
        ,function () {
            return this._repeatCount;
        }
        ,function (value) {
            this._repeatCount = value;
        }
    );
    GameShock.MAP = 0;
    GameShock.SPRITE = 1;
    return GameShock;
}());
egret.registerClass(GameShock,'GameShock');
