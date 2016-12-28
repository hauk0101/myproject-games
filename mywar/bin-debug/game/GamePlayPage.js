/**
 * 游戏操作页面
 * @author YaoQiao
 * 2016-09-07
 */
var GamePlayPage = (function (_super) {
    __extends(GamePlayPage, _super);
    function GamePlayPage() {
        _super.call(this);
        this.game_timer_count = 0;
        this.gameTime = 20; //暂时设置为20s
        this.gameDelay = 3800;
        this.touchState = false;
        this.skinName = "src/components/GamePlayPageSkin.exml";
        this.gameReadyTipPage = new GameReadyTipPage();
        this.game_timer = new egret.Timer(1000, 0);
        this.distance = new egret.Point();
    }
    var d = __define,c=GamePlayPage,p=c.prototype;
    /**
     * 显示页面
     */
    p.ShowPage = function (stage) {
        if (stage) {
            this.currentStage = stage;
            stage.addChild(this);
            this.addChild(this.gameReadyTipPage);
            this.gameReadyTipPage.PlayEffect();
            //游戏完整图片显示时长，由显示游戏页面开始计时
            this.delay_timer = new egret.Timer(this.gameDelay, 1);
            this.delay_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.delayTimeComplete, this);
            this.delay_timer.start();
        }
    };
    /**
     * 移除页面
     */
    p.HidePage = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.SetNum(0);
        this.game_pic.visible = true;
    };
    /**
     * 设置游戏元素的ID
     */
    p.SetElementId = function (id) {
        this.gameId = id;
        this.game_pic.source = "game_pic" + id + "_jpg";
        this.game_pic.visible = true;
    };
    /**
     * 重玩当前页面的游戏
     */
    p.RestartGame = function () {
        this.currentStage.addChild(this);
        this.addChild(this.gameReadyTipPage);
        this.gameReadyTipPage.PlayEffect();
        //游戏完整图片显示时长，由显示游戏页面开始计时
        this.delay_timer = new egret.Timer(this.gameDelay, 1);
        this.delay_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.delayTimeComplete, this);
        this.delay_timer.start();
    };
    /**
     * 游戏开始
     */
    p.gameStart = function () {
        this.game_timer.addEventListener(egret.TimerEvent.TIMER, this.gameTimeHandle, this);
        this.game_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.gameTimeCompleteHandle, this);
        this.game_timer_count = 0;
        this.SetNum(this.game_timer_count);
        this.game_timer.reset();
        this.game_timer.repeatCount = this.gameTime;
        this.game_timer.start();
        this.currentPos = new egret.Point();
        this.targetPos = new egret.Point();
        this.game_pic.visible = false;
        this.showGameElement();
    };
    /**
     * 显示游戏元素
     */
    p.showGameElement = function () {
        this.gameElementArr = new Array();
        this.gameElementPosArr = new Array();
        for (var i = 0; i < 9; i++) {
            var pos = new egret.Point();
            pos.x = 64 + (i % 3) * 164;
            pos.y = 222 + Math.floor(i / 3) * 210;
            var element = new GamePlayElement();
            element.x = pos.x;
            element.y = pos.y;
            element.SetElementId(this.gameId, i + 1);
            element.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.elementTouchBegin, this);
            element.addEventListener(egret.TouchEvent.TOUCH_END, this.elementTouchEnd, this);
            this.group_play_bg.addChild(element);
            this.group_play_bg.setChildIndex(element, 10);
            this.gameElementArr.push(element);
            this.gameElementPosArr.push(pos);
        }
        //打乱游戏元素顺序
        this.randElementPos();
    };
    /**
     * 元素开始操作处理函数
     */
    p.elementTouchBegin = function (evt) {
        var element = evt.target;
        this.currentElement = element;
        this.moveElement = new GamePlayElement();
        this.moveElement.SetElementId(this.gameId, element.GetElementId());
        this.group_play_bg.addChild(this.moveElement);
        this.moveElement.x = element.x;
        this.moveElement.y = element.y;
        this.moveElement.touchEnabled = false;
        this.group_play_bg.setChildIndex(this.moveElement, 9);
        this.group_play_bg.setChildIndex(element, 100);
        this.currentPos.x = element.x;
        this.currentPos.y = element.y;
        this.touchState = true;
        this.distance.x = evt.stageX - element.x;
        this.distance.y = evt.stageY - element.y;
        this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.elementMove, this);
    };
    p.elementMove = function (evt) {
        if (this.touchState) {
            this.currentElement.x = evt.stageX - this.distance.x;
            this.currentElement.y = evt.stageY - this.distance.y;
        }
    };
    /**
     * 元素释放处理函数
     */
    p.elementTouchEnd = function (evt) {
        var element = evt.target;
        this.group_play_bg.setChildIndex(element, 10);
        this.setHitElementPos(evt.stageX, evt.stageY, element);
        if (this.moveElement && this.moveElement.parent) {
            this.moveElement.parent.removeChild(this.moveElement);
            this.moveElement = null;
        }
        this.touchState = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.elementMove, this);
        //如果游戏胜利，则结束游戏
        if (this.checkWin()) {
            this.gameOver(true);
        }
    };
    /**
     * 设置当前操作图片的位置
     */
    p.setHitElementPos = function (xpos, ypos, element) {
        var isChange = false;
        for (var i = 0; i < this.gameElementArr.length; i++) {
            if (this.gameElementArr[i].hitTestPoint(xpos, ypos) &&
                (this.gameElementArr[i].GetElementId() != this.currentElement.GetElementId())) {
                this.targetPos.x = this.gameElementArr[i].x;
                this.targetPos.y = this.gameElementArr[i].y;
                for (var i_1 = 0; i_1 < this.gameElementArr.length; i_1++) {
                    if (this.gameElementArr[i_1].x == this.targetPos.x && this.gameElementArr[i_1].y == this.targetPos.y) {
                        this.gameElementArr[i_1].x = this.currentPos.x;
                        this.gameElementArr[i_1].y = this.currentPos.y;
                        element.x = this.targetPos.x;
                        element.y = this.targetPos.y;
                    }
                }
                isChange = true;
            }
        }
        //如果不是在替换的区域内，则复位当前选择的图片
        if (!isChange) {
            element.x = this.currentPos.x;
            element.y = this.currentPos.y;
        }
    };
    /**
     * 检查游戏是否胜利
     */
    p.checkWin = function () {
        for (var i = 0; i < this.gameElementPosArr.length; i++) {
            if (this.gameElementPosArr[i].x != this.gameElementArr[i].x || this.gameElementPosArr[i].y != this.gameElementArr[i].y) {
                return false;
            }
        }
        return true;
    };
    /**
     * 游戏结束处理函数
     */
    p.gameOver = function (win) {
        this.game_timer.stop();
        this.game_timer.removeEventListener(egret.TimerEvent.TIMER, this.gameTimeHandle, this);
        this.game_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.gameTimeCompleteHandle, this);
        GameController.getInstance().GameOver(this.gameId, win);
        this.removeAllElement();
        if (this.moveElement && this.moveElement.parent) {
            this.moveElement.parent.removeChild(this.moveElement);
            this.moveElement = null;
        }
        this.gameElementArr = null;
        this.gameElementPosArr = null;
    };
    /**
     * 打乱游戏元素的顺序
     */
    p.randElementPos = function () {
        var len = this.gameElementArr.length;
        var pos = new egret.Point();
        for (var i = 0; i < this.gameElementArr.length; i++) {
            var randIndex = Math.floor(Math.random() * len);
            pos.x = this.gameElementArr[randIndex].x;
            pos.y = this.gameElementArr[randIndex].y;
            this.gameElementArr[randIndex].x = this.gameElementArr[i].x;
            this.gameElementArr[randIndex].y = this.gameElementArr[i].y;
            this.gameElementArr[i].x = pos.x;
            this.gameElementArr[i].y = pos.y;
        }
    };
    /**
     * 移除舞台上的所有拼图元素
     */
    p.removeAllElement = function () {
        for (var i = 0; i < this.gameElementArr.length; i++) {
            if (this.gameElementArr[i].parent) {
                this.gameElementArr[i].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.elementTouchBegin, this);
                this.gameElementArr[i].removeEventListener(egret.TouchEvent.TOUCH_END, this.elementTouchEnd, this);
                this.gameElementArr[i].parent.removeChild(this.gameElementArr[i]);
            }
        }
    };
    /**
     * Ready-Go页面计时完成函数
     */
    p.delayTimeComplete = function () {
        this.delay_timer.stop();
        this.delay_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.delayTimeComplete, this);
        this.delay_timer = null;
        this.gameStart();
    };
    /**
     * 游戏计时数字显示
     */
    p.gameTimeHandle = function () {
        this.game_timer_count += 1;
        this.SetNum(this.game_timer_count);
    };
    /**
     * 游戏计时结束
     */
    p.gameTimeCompleteHandle = function () {
        //检查游戏是否胜利
        this.gameOver(this.checkWin());
    };
    //设置倒计时显示
    p.SetNum = function (value) {
        var ten = parseInt((value / 10).toString());
        var single = parseInt((value % 10).toString());
        this.time_num_0.source = "time_num_" + ten.toString() + "_png";
        this.time_num_1.source = "time_num_" + single.toString() + "_png";
    };
    return GamePlayPage;
}(eui.Component));
egret.registerClass(GamePlayPage,'GamePlayPage');
