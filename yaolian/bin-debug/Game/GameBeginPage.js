/**
 * 游戏开始界面
 * @author YaoQiao
 * @data 2016-06-12
 */
var GameBeginPage = (function (_super) {
    __extends(GameBeginPage, _super);
    function GameBeginPage() {
        _super.call(this);
        this.textFlg = 0;
        this.hasStartBtn = false;
        this.skinName = "src/components/GameBeginSkin.exml";
        this.game_begin_stars.alpha = 1;
        //文字的逐行显示
        this.texts = new Array();
        this.texts.push(this.game_begin_text0);
        this.texts.push(this.game_begin_text1);
        this.texts.push(this.game_begin_text2);
        this.TextShowEffect();
        //星星背景的闪烁
        this.StarsEffect();
    }
    var d = __define,c=GameBeginPage,p=c.prototype;
    p.StarsEffect = function () {
        this.startTimer = new egret.Timer(1000, 0);
        this.startTimer.addEventListener(egret.TimerEvent.TIMER, this.StarsTimerFunc, this);
    };
    p.StarsTimerFunc = function () {
        this.game_begin_stars.alpha = Math.random();
    };
    p.TextShowEffect = function () {
        for (var i = 0; i < this.texts.length; i++) {
            this.texts[i].alpha = 0;
        }
        this.textTimer = new egret.Timer(50, 0);
        this.textTimer.addEventListener(egret.TimerEvent.TIMER, this.TextTimerFunc, this);
        this.textTimer.start();
    };
    p.TextTimerFunc = function () {
        if (this.texts[this.textFlg].alpha >= 1) {
            this.textFlg++;
        }
        else {
            this.texts[this.textFlg].alpha += 0.1;
        }
        if (this.textFlg == this.texts.length) {
            this.textTimer.removeEventListener(egret.TimerEvent.TIMER, this.TextTimerFunc, this);
            for (var i = 0; i < this.texts.length; i++) {
                this.texts[i].alpha = 1;
            }
            //当文字全出现之后再设置闪烁，否则会导致文字跟随星星闪烁，原因暂未知
            this.startTimer.start();
        }
        //当第4行文字出现时，开始按钮出现
        if (this.textFlg == this.texts.length - 1 && (!this.hasStartBtn)) {
            this.hasStartBtn = true;
            GameController.getInstance().ShowGameEnterBtn();
        }
    };
    return GameBeginPage;
}(eui.Component));
egret.registerClass(GameBeginPage,'GameBeginPage');
