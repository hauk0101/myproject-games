/**
 * 游戏页面一
 * @author YaoQiao
 * @date 2016-10-12
 */
var GamePageOne = (function (_super) {
    __extends(GamePageOne, _super);
    function GamePageOne() {
        _super.call(this);
        this.showX_xie = 0;
        this.showX_liu = 0;
        this.skinName = "src/gexml/GamePageOneSkin.exml";
    }
    var d = __define,c=GamePageOne,p=c.prototype;
    /**
     * 播放动画效果
     */
    p.PlayEffect = function () {
        this.init();
        this.playImgEffect();
    };
    p.init = function () {
        this.txtArr = [];
        this.txtArr.push(this.txt1);
        this.txtArr.push(this.txt2);
        this.txtArr.push(this.txt3);
        this.txtArr.push(this.txt4);
        for (var i = 0; i < this.txtArr.length; i++) {
            this.txtArr[i].alpha = 0;
        }
        this.showX_xie = this.img_xie.x;
        this.showX_liu = this.img_liu.x;
        this.img_xie.x = -250;
        this.img_liu.x = 650;
        this.btn_big.visible = false;
        this.btn_small.visible = false;
        this.btnTimer = new egret.Timer(500, 0);
        this.btnTimer.addEventListener(egret.TimerEvent.TIMER, this.btnTimerHandle, this);
        this.btn_big.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHandle, this);
        this.btn_small.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHandle, this);
        this.sound_play.addEventListener(egret.TouchEvent.TOUCH_TAP, this.soundPlayOnClick, this);
        this.sound_stop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.soundStopOnClick, this);
    };
    p.soundPlayOnClick = function () {
        this.sound_play.visible = false;
        this.sound_stop.visible = true;
        GameController.getInstance().PlaySound(true);
    };
    p.soundStopOnClick = function () {
        this.sound_play.visible = true;
        this.sound_stop.visible = false;
        GameController.getInstance().PlaySound(false);
    };
    /**
     * 播放图片效果
     */
    p.playImgEffect = function () {
        var _this = this;
        var tween0 = egret.Tween.get(_this.img_bg);
        this.img_bg.alpha = 0;
        tween0.to({ alpha: 1 }, 300);
        var tween1 = egret.Tween.get(this.img_xie);
        tween1.to({ x: this.showX_xie }, 500, egret.Ease.quadIn);
        var tween2 = egret.Tween.get(this.img_liu);
        tween2.to({ x: this.showX_liu }, 500, egret.Ease.quadIn).call(function () {
            tween1 = null;
            tween2 = null;
            _this.playWordsEffect();
        });
    };
    /**
     * 播放文字效果
     */
    p.playWordsEffect = function () {
        var _this = this;
        var _textsArr = this.txtArr;
        var _index = 0;
        var _tween_text = egret.Tween.get(_textsArr[_index]);
        _tween_text.to({ alpha: 1 }, 1000).call(textEffect);
        function textEffect() {
            _index += 1;
            if (_index < _textsArr.length) {
                _tween_text = egret.Tween.get(_textsArr[_index]);
                _tween_text.to({ alpha: 1 }, 1000).call(textEffect);
            }
            else {
                _this.btn_small.visible = true;
                _this.btnTimer.start();
            }
        }
    };
    p.btnTimerHandle = function () {
        this.btn_big.visible = !this.btn_big.visible;
        this.btn_small.visible = !this.btn_small.visible;
    };
    p.btnOnClickHandle = function () {
        this.btnTimer.stop();
        this.btnTimer.removeEventListener(egret.TimerEvent.TIMER, this.btnTimerHandle, this);
        this.btn_big.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHandle, this);
        this.btn_small.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOnClickHandle, this);
        GameController.getInstance().TwoPage();
    };
    return GamePageOne;
}(eui.Component));
egret.registerClass(GamePageOne,'GamePageOne');
