/**
 * 游戏页面二
 * @author YaoQiao
 * @date 2016-10-12
 */
var GamePageTwo = (function (_super) {
    __extends(GamePageTwo, _super);
    function GamePageTwo() {
        _super.call(this);
        this.isDefaultSelect = true;
        this.skinName = "src/gexml/GamePageTwoSkin.exml";
        this.btnTimer = new egret.Timer(500);
    }
    var d = __define,c=GamePageTwo,p=c.prototype;
    p.PlayeEffect = function () {
        this.btnTimer.addEventListener(egret.TimerEvent.TIMER, this.btnTimerHandle, this);
        this.btn_start_big.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHandle, this);
        this.btn_start_small.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHandle, this);
        this.img_xie.addEventListener(egret.TouchEvent.TOUCH_TAP, this.imgXieOnClick, this);
        this.img_liu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.imgLiuOnClick, this);
        this.btnTimer.start();
        this.btn_start_big.visible = false;
        this.btn_select1.visible = false;
        this.btn_select0.visible = true;
        this.btn_start_small.visible = true;
        this.isDefaultSelect = true;
    };
    p.imgXieOnClick = function () {
        this.isDefaultSelect = true;
        this.btn_select0.visible = this.isDefaultSelect;
        this.btn_select1.visible = !this.isDefaultSelect;
    };
    p.imgLiuOnClick = function () {
        this.isDefaultSelect = false;
        this.btn_select0.visible = this.isDefaultSelect;
        this.btn_select1.visible = !this.isDefaultSelect;
    };
    p.btnTimerHandle = function () {
        this.btn_start_big.visible = !this.btn_start_big.visible;
        this.btn_start_small.visible = !this.btn_start_small.visible;
    };
    p.btnOnClickHandle = function () {
        this.btnTimer.stop();
        this.btnTimer.removeEventListener(egret.TimerEvent.TIMER, this.btnTimerHandle, this);
        this.btn_start_big.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHandle, this);
        this.btn_start_small.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHandle, this);
        this.img_xie.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.imgXieOnClick, this);
        this.img_liu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.imgLiuOnClick, this);
        var type = GamePlayerInfo.MAN_NAME_CHEJIAWEI;
        if (this.isDefaultSelect) {
            type = GamePlayerInfo.MAN_NAME_MAJIN;
        }
        GameController.getInstance().GameType = type;
        GameController.getInstance().GamePage();
    };
    return GamePageTwo;
}(eui.Component));
egret.registerClass(GamePageTwo,'GamePageTwo');
