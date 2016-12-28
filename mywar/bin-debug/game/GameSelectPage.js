/**
 * 游戏选择页面
 * @author YaoQiao
 * 2016-09-07
 */
var GameSelectPage = (function (_super) {
    __extends(GameSelectPage, _super);
    function GameSelectPage() {
        _super.call(this);
        this.skinName = "src/components/GameSelectPageSkin.exml";
        this.elementArr = new Array();
        for (var i = 0; i < 4; i++) {
            var element = new GameSelectElement();
            element.Init(i + 1, false);
            element.x = 85 + (i % 2) * 230;
            element.y = 210 + Math.floor(i / 2) * 260;
            this.select_bg.addChild(element);
            this.elementArr.push(element);
            element.addEventListener(egret.TouchEvent.TOUCH_TAP, this.elementOnClick, this);
        }
        this.enterGameTimer = new egret.Timer(800, 1);
        this.enterGameTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.enterGameTimerComplete, this);
    }
    var d = __define,c=GameSelectPage,p=c.prototype;
    /**
     * 显示游戏选择页面
     */
    p.ShowPage = function (stage) {
        this.cancelAllSelect();
        if (stage) {
            stage.addChild(this);
            this.elementArr[0].IsSelect(true);
        }
    };
    /**
     * 隐藏游戏选择页面
     */
    p.HidePage = function () {
        if (this.parent) {
            this.parent.removeChild(this);
            this.enterGameTimer.stop();
        }
    };
    /**
     * 游戏选择元素点击处理函数
     */
    p.elementOnClick = function (event) {
        var element = event.target.parent;
        this.cancelAllSelect();
        element.IsSelect(true);
        this.currentGameElementId = element.GetElementId();
        this.enterGameTimer.reset();
        this.enterGameTimer.repeatCount = 1;
        this.enterGameTimer.start();
    };
    /**
     * 游戏选择等待时间完成处理函数
     */
    p.enterGameTimerComplete = function () {
        this.enterGameTimer.stop();
        GameController.getInstance().GamePlay(this.currentGameElementId);
    };
    /**
     * 取消所有的选择元素的选择状态
     */
    p.cancelAllSelect = function () {
        for (var i = 0; i < this.elementArr.length; i++) {
            this.elementArr[i].IsSelect(false);
        }
    };
    return GameSelectPage;
}(eui.Component));
egret.registerClass(GameSelectPage,'GameSelectPage');
