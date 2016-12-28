/**
 * 进度加载类
 * @author YaoQiao
 *
 */
var GameLoading = (function (_super) {
    __extends(GameLoading, _super);
    function GameLoading() {
        _super.call(this);
        this.skinName = "src/components/GameLoadingSkin.exml";
        this.addLoadingEffect();
    }
    var d = __define,c=GameLoading,p=c.prototype;
    p.addLoadingEffect = function () {
        this.eye_timer = new egret.Timer(100, 0);
        this.eye_timer.addEventListener(egret.TimerEvent.TIMER, this.EyeMoveEffect, this);
        this.eye_timer.start();
    };
    p.EyeMoveEffect = function () {
        this.eyes_right.visible = !this.eyes_right.visible;
        this.eyes_left.visible = !this.eyes_left.visible;
    };
    p.addMC = function () {
        var data = RES.getRes("loading_json");
        var txtr = RES.getRes("loading_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData("loading"));
        this.addChild(mc);
        mc.scaleX = 0.8;
        mc.scaleY = 0.8;
        mc.x = -50;
        mc.y = -100;
        mc.play(-1);
    };
    p.setProgress = function (current, total) {
        var percent = Math.floor((current / total) * 100);
        this.loadingText.text = percent.toString() + "%";
    };
    p.stopEffect = function () {
        this.eye_timer.stop();
        this.eye_timer.removeEventListener(egret.TimerEvent.TIMER, this.EyeMoveEffect, this);
        this.eye_timer = null;
    };
    return GameLoading;
}(eui.Component));
egret.registerClass(GameLoading,'GameLoading');
