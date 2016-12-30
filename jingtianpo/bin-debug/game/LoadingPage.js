/**
 * 游戏加载页面
 * @author YaoQiao
 * 2016-09-12
 */
var LoadingPage = (function (_super) {
    __extends(LoadingPage, _super);
    function LoadingPage() {
        _super.call(this);
        this.progressWidth = 0;
        this.skinName = "src/gexml/LoadingPageSkin.exml";
        //    	this.progressWidth = this.loading_progress.width;
        //    	this.loading_progress.width = 0;
        this.loadingTimer = new egret.Timer(50);
        this.loadingTimer.addEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
        this.loadingTimer.start();
    }
    var d = __define,c=LoadingPage,p=c.prototype;
    p.timerHandle = function () {
        this.img_time.visible = !this.img_time.visible;
    };
    /**
     * 设置加载进度
     */
    p.setProgress = function (current, total) {
        var percent = Math.floor((current / total) * 100);
        this.loading_number.text = "已完成" + percent.toString() + "%";
        //        this.loading_text.text = percent.toString() + "%";
        //        this.loading_progress.width = (current / total) * this.progressWidth;
        if (this.loadingTimer && percent >= 80) {
            var shock = new GameShock();
            shock.shock(GameShock.MAP);
            shock._target = this;
            shock.start(20);
            this.img_time.visible = true;
            this.loadingTimer.stop();
            this.loadingTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
            this.loadingTimer = null;
        }
    };
    return LoadingPage;
}(eui.Component));
egret.registerClass(LoadingPage,'LoadingPage');
