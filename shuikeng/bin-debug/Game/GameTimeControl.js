/**
 * 时间显示控制类
 * @author YaoQiao
 *
 */
var GameTimeControl = (function (_super) {
    __extends(GameTimeControl, _super);
    function GameTimeControl() {
        _super.call(this);
        this.gameTime = 30;
        this.skinName = "src/components/GameTimeSkin.exml";
        this.init();
    }
    var d = __define,c=GameTimeControl,p=c.prototype;
    p.init = function () {
        this.SetNum(this.gameTime);
        this.time_border_red.visible = false;
        this.game_timer = new egret.Timer(1000, this.gameTime);
        this.game_timer.addEventListener(egret.TimerEvent.TIMER, this.GameTimeFun, this);
        this.game_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.GameTimeComplete, this);
        this.dangerEffect_timer = new egret.Timer(200, 0);
        this.dangerEffect_timer.addEventListener(egret.TimerEvent.TIMER, this.TimeDangerFunc, this);
    };
    p.StartTime = function () {
        this.game_timer.start();
    };
    //游戏时间变化函数
    p.GameTimeFun = function () {
        this.gameTime -= 1;
        this.SetNum(this.gameTime);
        if (this.gameTime == 10) {
            GameController.getInstance().AddSpeed();
        }
        if (this.gameTime == 5) {
            this.dangerEffect_timer.start();
        }
    };
    //危险时间提醒效果
    p.TimeDangerFunc = function () {
        this.time_border_red.visible = !this.time_border_red.visible;
    };
    //游戏时间结束
    p.GameTimeComplete = function () {
        this.game_timer.removeEventListener(egret.TimerEvent.TIMER, this.GameTimeFun, this);
        this.game_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.GameTimeComplete, this);
        this.game_timer.stop();
        this.dangerEffect_timer.removeEventListener(egret.TimerEvent.TIMER, this.TimeDangerFunc, this);
        this.dangerEffect_timer.stop();
        GameController.getInstance().TimeOver();
    };
    //设置倒计时显示
    p.SetNum = function (value) {
        var ten = parseInt((value / 10).toString());
        var single = parseInt((value % 10).toString());
        this.time_num_1.source = "time_" + ten.toString() + "_png";
        this.time_num_2.source = "time_" + single.toString() + "_png";
    };
    return GameTimeControl;
}(eui.Component));
egret.registerClass(GameTimeControl,'GameTimeControl');
