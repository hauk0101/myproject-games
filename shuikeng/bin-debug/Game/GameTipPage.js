/**
 * 游戏提示页面
 * @author YaoQiao
 * @data 2016-06-13
 */
var GameTipPage = (function (_super) {
    __extends(GameTipPage, _super);
    function GameTipPage(stage) {
        _super.call(this);
        this.skinName = "src/components/GameTipSkin.exml";
        this.btn_close_tip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.CloseBtnOnClick, this);
        this.myStage = stage;
        this.myStage.addChild(this);
    }
    var d = __define,c=GameTipPage,p=c.prototype;
    p.CloseBtnOnClick = function () {
        if (this.myStage != null) {
            this.myStage.removeChild(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.CloseBtnOnClick, this);
        }
        GameController.getInstance().PlayStartBtnEffect();
    };
    return GameTipPage;
}(eui.Component));
egret.registerClass(GameTipPage,'GameTipPage');
