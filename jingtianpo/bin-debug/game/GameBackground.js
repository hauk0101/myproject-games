/**
 * 游戏背景
 * @author YaoQiao
 * @date 2016-10-11
 */
var GameBackground = (function (_super) {
    __extends(GameBackground, _super);
    function GameBackground() {
        _super.call(this);
        this.speed = 2;
        this.stageH = 0;
        this.imgCount = 0;
        this.skinName = "src/gexml/GameBackgroundSkin.exml";
        this.imgArr = [];
        this.imgArr.push(this.bg1);
        this.imgArr.push(this.bg2);
        this.stageH = -this.bg2.y;
        this.imgCount = this.imgArr.length;
    }
    var d = __define,c=GameBackground,p=c.prototype;
    /**
     * 开始滚动背景
     */
    p.StartScroll = function () {
        this.maskbg.visible = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    /**
     * 停止滚动背景
     */
    p.StopScroll = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.maskbg.visible = true;
    };
    p.enterFrameHandler = function (event) {
        for (var i = 0; i < this.imgCount; i++) {
            var img = this.imgArr[i];
            img.y += this.speed;
            if (img.y >= this.stageH) {
                img.y = -this.stageH;
            }
        }
    };
    return GameBackground;
}(eui.Component));
egret.registerClass(GameBackground,'GameBackground');
