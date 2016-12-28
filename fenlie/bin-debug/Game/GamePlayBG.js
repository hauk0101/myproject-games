/**
 * 游戏背景
 * @author YaoQiao
 *
 */
var GamePlayBG = (function (_super) {
    __extends(GamePlayBG, _super);
    function GamePlayBG() {
        _super.call(this);
        this.bg_posY_first = 0;
        this.bg_posY_last = 0;
        this.bg_posY_reset = 0;
        this.bg_move_speed = 5;
        this.element_move_speed = 9;
        this.elementShow_Ypos = 700;
        this.element_Xpos = [-120, -90, -60, -30, 0, 30, 60, 90];
        this.element_Types = [2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 0, 2, 3, 3, 3, 3, 2, 2, 2, 2, 1, 2, 3, 3, 2];
        this.lastTime = egret.getTimer();
        this.cacheDict = {};
        this.element_Xpos_last = 0;
        this.skinName = "src/components/GamePlayBGSkin.exml";
        this.init();
    }
    var d = __define,c=GamePlayBG,p=c.prototype;
    p.init = function () {
        this.btn_start_small.addEventListener(egret.TouchEvent.TOUCH_TAP, this.StartBtnOnClick, this);
        this.btn_start_big.addEventListener(egret.TouchEvent.TOUCH_TAP, this.StartBtnOnClick, this);
        this.game_play_bgs.mask = this.game_play_mask;
        this.playBGs = new Array();
        this.playBGs.push(this.game_play_bg0);
        this.playBGs.push(this.game_play_bg1);
        this.playBGs.push(this.game_play_bg2);
        this.bg_posY_first = this.game_play_bg0.y;
        this.bg_posY_last = this.game_play_bg1.y;
        this.bg_posY_reset = this.game_play_bg2.y;
    };
    p.StartBtnEffect = function () {
        this.startBtnTimer = new egret.Timer(500, 0);
        this.startBtnTimer.addEventListener(egret.TimerEvent.TIMER, this.StartBtnTimerFunc, this);
        this.startBtnTimer.start();
    };
    p.AddGameSpeed = function () {
        this.element_move_speed = 14;
        this.element_timer.stop();
        this.element_timer.removeEventListener(egret.TimerEvent.TIMER, this.CreatElements, this);
        this.element_timer = new egret.Timer(100);
        this.element_timer.addEventListener(egret.TimerEvent.TIMER, this.CreatElements, this);
        this.element_timer.start();
    };
    p.StopGame = function () {
        this.element_timer.stop();
        this.update_timer.stop();
        this.btn_start.visible = true;
    };
    p.RestartGame = function () {
        this.btn_start_small.addEventListener(egret.TouchEvent.TOUCH_TAP, this.StartBtnOnClick, this);
        this.btn_start_big.addEventListener(egret.TouchEvent.TOUCH_TAP, this.StartBtnOnClick, this);
        this.startBtnTimer.addEventListener(egret.TimerEvent.TIMER, this.StartBtnTimerFunc, this);
        this.startBtnTimer.start();
        //清除游戏界面的所有游戏元素
        for (var i = 0; i < this.showElements.length; i++) {
            this.game_play_bgs.removeChild(this.showElements[i]);
        }
        this.cacheDict = {};
        this.showElements = null;
    };
    p.StartGame = function () {
        this.showElements = new Array();
        this.element_timer = new egret.Timer(200);
        this.element_timer.addEventListener(egret.TimerEvent.TIMER, this.CreatElements, this);
        this.element_timer.start();
        this.update_timer = new egret.Timer(20);
        this.update_timer.addEventListener(egret.TimerEvent.TIMER, this.UpdateElementsPos, this);
        this.update_timer.start();
    };
    p.StartBtnTimerFunc = function () {
        this.btn_start_big.visible = !this.btn_start_big.visible;
    };
    p.StartBtnOnClick = function () {
        this.btn_start_small.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.StartBtnOnClick, this);
        this.btn_start_big.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.StartBtnOnClick, this);
        this.btn_start.visible = false;
        this.startBtnTimer.stop();
        this.startBtnTimer.removeEventListener(egret.TimerEvent.TIMER, this.StartBtnTimerFunc, this);
        this.StartGame();
        GameController.getInstance().TimeStart();
    };
    p.UpdateElementsPos = function () {
        //移动背景
        for (var i = 0; i < this.playBGs.length; i++) {
            this.playBGs[i].y -= this.bg_move_speed;
            if (this.playBGs[i].y <= this.bg_posY_reset) {
                this.playBGs[i].y = this.bg_posY_last;
            }
        }
        //移动游戏元素
        var nowTime = egret.getTimer();
        var fps = 1000 / (nowTime - this.lastTime);
        this.lastTime = nowTime;
        var speedOffset = 30 / fps;
        var delArr = [];
        var element;
        var elementCount = this.showElements.length;
        for (var j = 0; j < elementCount; j++) {
            element = this.showElements[j];
            element.y += this.element_move_speed * speedOffset;
            if (element.y >= this.elementShow_Ypos) {
                delArr.push(element);
            }
        }
        //回收不显示的游戏元素
        for (var k = 0; k < delArr.length; k++) {
            element = delArr[k];
            this.game_play_bgs.removeChild(element);
            this.reclaim(element, "element");
            this.showElements.splice(this.showElements.indexOf(element), 1);
        }
    };
    //创建游戏元素
    p.CreatElements = function () {
        var last_xpos = this.element_Xpos_last;
        var nums = this.element_Xpos;
        var element = this.produce("element");
        //element.init(this.element_Types[Math.floor(Math.random() * this.element_Types.length)]);
        element.init(Math.floor(Math.random() * 4));
        element.x = getXPos();
        element.y = -Math.floor(Math.random() * 200);
        this.element_Xpos_last = element.x;
        this.element_Xpos_last = element.x;
        this.game_play_bgs.addChild(element);
        this.showElements.push(element);
        function getXPos() {
            var value = nums[Math.floor(Math.random() * nums.length)];
            if (value == last_xpos) {
                var index = nums.indexOf(value);
                var next;
                if (index == 0 || index == 1)
                    next = nums.length - 1;
                else
                    next = index - 2;
                return nums[next];
            }
            return value;
        }
    };
    //对象池产生游戏元素对象
    p.produce = function (type) {
        var element;
        if (this.cacheDict[type] == null) {
            this.cacheDict[type] = [];
        }
        var dict = this.cacheDict[type];
        if (dict.length > 0) {
            element = dict.pop();
        }
        else {
            element = new GameElement();
        }
        return element;
    };
    //回收游戏元素对象
    p.reclaim = function (element, type) {
        if (this.cacheDict[type] == null) {
            this.cacheDict[type] = [];
        }
        var dict = this.cacheDict[type];
        if (dict.indexOf(element) == -1) {
            dict.push(element);
        }
    };
    return GamePlayBG;
}(eui.Component));
egret.registerClass(GamePlayBG,'GamePlayBG');
