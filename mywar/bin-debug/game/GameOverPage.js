/**
 * 游戏结束页面
 * @author YaoQiao
 * 2016-09-09
 */
var GameOverPage = (function (_super) {
    __extends(GameOverPage, _super);
    function GameOverPage() {
        _super.call(this);
        this.isFailBeginBtn = true;
        this.video_url = "http://h5.twttmob.com/wodezhanzheng/mywar/mywar.html";
        this.skinName = "src/components/GameOverPageSkin.exml";
        this.btn_fail_again0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnFailAgainOnClick, this);
        this.btn_fail_again1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnFailAgainOnClick, this);
        this.btn_success_again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnSuccessAgainOnClick, this);
        this.btn_play_vedio0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnPlayVedioOnClick, this);
        this.btn_play_vedio1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnPlayVedioOnClick, this);
        this.btn_timer = new egret.Timer(500, 0);
        this.btn_timer.addEventListener(egret.TimerEvent.TIMER, this.btnTimerHandle, this);
    }
    var d = __define,c=GameOverPage,p=c.prototype;
    /**
     * 显示游戏结束页面
     * @param isWin 是否胜利
     */
    p.ShowPage = function (gameId, stage, isWin) {
        if (stage) {
            stage.addChild(this);
            this.game_pic.source = "game_pic" + gameId + "_jpg";
            this.hideAll();
            if (isWin) {
                this.playWinEffect();
            }
            else {
                this.playFailEffect();
            }
        }
    };
    /**
     * 隐藏游戏结束页面
     */
    p.HidePage = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    /**
     * 播放失败效果
     */
    p.playFailEffect = function () {
        var _this = this;
        this.group_fail.visible = true;
        this.isFailBeginBtn = true;
        this.img_fail.visible = true;
        this.img_fail.scaleX = 3;
        this.img_fail.scaleY = 3;
        var tween = egret.Tween.get(this.img_fail);
        tween.to({ scaleX: 1, scaleY: 1 }, 2000);
        var timer = new egret.Timer(3000, 1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, showBtn, this);
        timer.start();
        function showBtn() {
            timer.stop();
            timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, showBtn, this);
            timer = null;
            this.img_fail.visible = false;
            _this.group_fail.visible = false;
            _this.btn_fail_again0.visible = true;
            _this.btn_fail_again1.visible = false;
            _this.btn_timer.start();
        }
    };
    /**
     * 播放成功效果
     */
    p.playWinEffect = function () {
        var _this = this;
        this.group_win.visible = true;
        this.isFailBeginBtn = false;
        this.img_success.visible = true;
        this.img_success.scaleX = 0.5;
        this.img_success.scaleY = 0.5;
        var tween = egret.Tween.get(this.img_success);
        tween.to({ scaleX: 1, scaleY: 1 }, 500);
        var timer = new egret.Timer(3000, 1);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, showBtn, this);
        timer.start();
        function showBtn() {
            timer.stop();
            timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, showBtn, this);
            timer = null;
            this.img_success.visible = false;
            _this.group_win.visible = false;
            _this.btn_play_vedio0.visible = true;
            _this.btn_play_vedio1.visible = false;
            _this.btn_success_again.visible = true;
            _this.btn_timer.start();
        }
    };
    /**
     * 按钮变化时间间隔处理函数
     */
    p.btnTimerHandle = function () {
        if (this.isFailBeginBtn) {
            this.btn_fail_again0.visible = !this.btn_fail_again0.visible;
            this.btn_fail_again1.visible = !this.btn_fail_again1.visible;
        }
        else {
            this.btn_play_vedio0.visible = !this.btn_play_vedio0.visible;
            this.btn_play_vedio1.visible = !this.btn_play_vedio1.visible;
        }
    };
    /**
     * 失败后再玩一次按钮点击处理函数
     */
    p.btnFailAgainOnClick = function () {
        this.btn_timer.stop();
        GameController.getInstance().GameRestartPlay(true);
    };
    /**
     * 胜利后再玩一次按钮点击处理函数
     */
    p.btnSuccessAgainOnClick = function () {
        this.btn_timer.stop();
        GameController.getInstance().GameRestartPlay(false);
    };
    /**
     * 播放预告片按钮点击处理函数
     */
    p.btnPlayVedioOnClick = function () {
        window.location.href = this.video_url;
    };
    /**
     * 隐藏所有显示元素
     */
    p.hideAll = function () {
        this.group_win.visible = false;
        this.group_fail.visible = false;
        this.btn_fail_again0.visible = false;
        this.btn_fail_again1.visible = false;
        this.btn_play_vedio0.visible = false;
        this.btn_play_vedio1.visible = false;
        this.btn_success_again.visible = false;
        this.img_success.visible = false;
        this.img_fail.visible = false;
    };
    return GameOverPage;
}(eui.Component));
egret.registerClass(GameOverPage,'GameOverPage');
