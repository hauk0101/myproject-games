/**
 * 重新开始游戏界面
 * @author YaoQiao
 *
 */
var GameRestartPage = (function (_super) {
    __extends(GameRestartPage, _super);
    function GameRestartPage() {
        _super.call(this);
        this.skinName = "src/components/GameRestartPageSkin.exml";
        this.restart_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.RestartBtnOnClick, this);
        this.gameover_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GameOverBtnOnClick, this);
    }
    var d = __define,c=GameRestartPage,p=c.prototype;
    p.RestartBtnOnClick = function () {
        this.restart_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.RestartBtnOnClick, this);
        this.RemoveSelf();
        GameController.getInstance().GameRestart();
    };
    p.GameOverBtnOnClick = function () {
        this.gameover_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GameOverBtnOnClick, this);
        this.RemoveSelf();
        GameController.getInstance().GameOver();
    };
    p.RemoveSelf = function () {
        this.parent.removeChild(this);
    };
    return GameRestartPage;
}(eui.Component));
egret.registerClass(GameRestartPage,'GameRestartPage');
