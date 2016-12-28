/**
 * 游戏开始按钮
 * @author
 *
 */
var GameBeginBtn = (function (_super) {
    __extends(GameBeginBtn, _super);
    function GameBeginBtn(stage) {
        _super.call(this);
        this.skinName = "src/components/GameBeginBtnSkin.exml";
        this.myStage = stage;
        this.myStage.addChild(this);
        this.foot_Ypos1 = this.foot_btn.y;
        this.foot_Ypos2 = this.foot_btn.y + 80;
        this.nose_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.EnterGameBtnFunc, this);
        this.foot_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.EnterGameBtnFunc, this);
    }
    var d = __define,c=GameBeginBtn,p=c.prototype;
    p.ShowBtnEffect = function () {
        this.tween_foot = egret.Tween.get(this.foot_btn, { loop: true });
        this.tween_foot.to({ y: this.foot_Ypos2 }, 300).to({ y: this.foot_Ypos1 }, 300);
    };
    p.EnterGameBtnFunc = function () {
        this.tween_foot.pause();
        this.foot_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.EnterGameBtnFunc, this);
        this.nose_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.EnterGameBtnFunc, this);
        this.myStage.removeChild(this);
        GameController.getInstance().EnterGame();
    };
    return GameBeginBtn;
}(eui.Component));
egret.registerClass(GameBeginBtn,'GameBeginBtn');
