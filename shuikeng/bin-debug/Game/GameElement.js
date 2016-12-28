/**
 * 游戏元素类
 * @author YaoQiao
 *
 */
var GameElement = (function (_super) {
    __extends(GameElement, _super);
    function GameElement() {
        _super.call(this);
        this.isUseful = false;
        this.angle = 0;
        this.speedLineX = 0;
        this.speedLineY = 0;
        this.moveSpeed = 0;
        this.skinName = "src/components/GameElementSkin.exml";
    }
    var d = __define,c=GameElement,p=c.prototype;
    p.IsUserful = function () {
        return this.isUseful;
    };
    p.IsUserFul = function (value) {
        this.isUseful = value;
    };
    p.init = function (type) {
        this.restetButton();
        this.SetButton(type);
        this.isUseful = true;
        this.angle = Math.floor(Math.random() * 361);
        this.rotation = this.angle;
        this.scaleX = 0;
        this.scaleY = 0;
        this.speedLineX = Math.random() * 2 - 1;
        this.speedLineY = Math.random() * 2 - 1 >= 0 ? this.speedLineX : -this.speedLineX;
    };
    p.speed = function (value) {
        this.moveSpeed = value;
    };
    //随机移动效果
    p.MoveEffect1 = function () {
        this.x += this.speedLineX * this.moveSpeed;
        this.y += this.speedLineY * this.moveSpeed;
    };
    //大小变化效果
    p.ScaleEffect = function (size, range) {
        this.scaleX += size;
        this.scaleY += size;
        if (this.scaleX >= range || this.scaleY >= range) {
            this.scaleX = range;
            this.scaleY = range;
        }
    };
    p.RotationEffect = function (angle) {
        this.rotation += angle;
    };
    p.SetButton = function (type) {
        switch (type) {
            case GameElement.ELEMENT_EGG_1:
                this.group_egg1.visible = true;
                this.element_egg1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ElementEgg1OnClick, this);
                break;
            case GameElement.ELEMENT_EGG_2:
                this.group_egg2.visible = true;
                this.element_egg2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ElementEgg2OnClick, this);
                break;
            case GameElement.ELEMENT_CRAMERA_1:
                this.group_camera1.visible = true;
                this.element_camera1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ElementCamera1OnClick, this);
                break;
            case GameElement.ELEMENT_CRAMERA_2:
                this.group_camera2.visible = true;
                this.element_camera2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ElementCamera2OnClick, this);
                break;
            default:
                break;
        }
    };
    p.restetButton = function () {
        this.group_egg1.visible = false;
        this.group_egg2.visible = false;
        this.group_camera1.visible = false;
        this.group_camera2.visible = false;
        this.tip_wrong_egg1.visible = false;
        this.tip_wrong_egg2.visible = false;
        this.tip_right_camera1.visible = false;
        this.tip_right_camera2.visible = false;
    };
    p.ElementEgg1OnClick = function () {
        this.tip_wrong_egg1.visible = true;
        this.element_egg1.visible = false;
        this.element_egg1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ElementEgg1OnClick, this);
        this.ClickTipHide(this.tip_wrong_egg1);
        GameController.getInstance().ClearGameTotal();
    };
    p.ElementEgg2OnClick = function () {
        this.tip_wrong_egg2.visible = true;
        this.element_egg2.visible = false;
        this.element_egg2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ElementEgg2OnClick, this);
        this.ClickTipHide(this.tip_wrong_egg2);
        GameController.getInstance().GameTotal("-", 1);
    };
    p.ElementCamera1OnClick = function () {
        this.tip_right_camera1.visible = true;
        this.element_camera1.visible = false;
        this.element_camera1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ElementCamera1OnClick, this);
        this.ClickTipHide(this.tip_right_camera1);
        GameController.getInstance().GameTotal("+", 2);
    };
    p.ElementCamera2OnClick = function () {
        this.tip_right_camera2.visible = true;
        this.element_camera2.visible = false;
        this.element_camera2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ElementCamera2OnClick, this);
        this.ClickTipHide(this.tip_right_camera2);
        GameController.getInstance().GameTotal("+", 4);
    };
    p.ClickTipHide = function (tip) {
        setTimeout(function () {
            tip.visible = false;
        }, 500);
        this.isUseful = false;
    };
    GameElement.ELEMENT_EGG_1 = 0;
    GameElement.ELEMENT_EGG_2 = 1;
    GameElement.ELEMENT_CRAMERA_1 = 2;
    GameElement.ELEMENT_CRAMERA_2 = 3;
    return GameElement;
}(eui.Component));
egret.registerClass(GameElement,'GameElement');
