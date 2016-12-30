/**
 * 游戏结果弹窗
 * @author YaoQiao
 * @date 2016-10-12
 */
var GamePopup = (function (_super) {
    __extends(GamePopup, _super);
    function GamePopup() {
        _super.call(this);
        this.skinName = "src/gexml/GamePopupSkin.exml";
    }
    var d = __define,c=GamePopup,p=c.prototype;
    p.PopupEffect = function (score) {
        this.btn_turn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTurnOnClick, this);
        this.txt_score.text = "您的最终得分为 " + score.toString() + " 分";
        this.sss1.visible = false;
        this.sss2.visible = false;
        this.sss3.visible = false;
        if (score <= 10) {
            this.sss1.visible = true;
        }
        else if (score <= 25) {
            this.sss1.visible = true;
            this.sss2.visible = true;
        }
        else if (score > 25) {
            this.sss1.visible = true;
            this.sss2.visible = true;
            this.sss3.visible = true;
        }
        this.popupEffect();
    };
    p.popupEffect = function () {
        var tween = egret.Tween.get(this);
        this.alpha = 0;
        tween.to({ alpha: 1 }, 1000, egret.Ease.quadOut).call(function () {
            tween = null;
        });
    };
    p.btnTurnOnClick = function () {
        this.btn_turn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTurnOnClick, this);
        GameController.getInstance().ThreePage();
    };
    return GamePopup;
}(eui.Component));
egret.registerClass(GamePopup,'GamePopup');
