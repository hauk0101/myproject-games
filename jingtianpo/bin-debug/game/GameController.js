/**
 * 游戏控制类
 * @author YaoQiao
 * @date 2016-10-10
 */
var GameController = (function () {
    function GameController() {
    }
    var d = __define,c=GameController,p=c.prototype;
    GameController.getInstance = function () {
        if (this.instance == null) {
            this.instance = new GameController();
        }
        return this.instance;
    };
    /**
     * 进入游戏首页
     * @param stage 游戏舞台
     */
    p.GameEnter = function (stage) {
        this.initGame();
        if (stage) {
            this.gameStage = stage;
            this.BoomPage();
        }
    };
    d(p, "GameType"
        ,function () {
            return this.gameType;
        }
        ,function (value) {
            this.gameType = value;
        }
    );
    p.initGame = function () {
        this.gamePageOne = new GamePageOne();
        this.gamePageTwo = new GamePageTwo();
        this.gamePage = new GamePage();
        this.gamePopup = new GamePopup();
        this.gamePageThree = new GamePageThree();
        this.boomPage = new GameBoomEffect();
        this.gameSound = new GameSound();
        this.gameSound.PlaySound();
    };
    p.BoomPage = function () {
        this.gameStage.addChild(this.boomPage);
        this.boomPage.PlayEffect(this.gameStage);
    };
    p.GameRestart = function () {
        this.gameStage.removeChild(this.gamePageThree);
        this.TwoPage();
    };
    p.PlaySound = function (value) {
        if (value) {
            this.gameSound.PlaySound();
        }
        else {
            this.gameSound.StopSound();
        }
    };
    p.GamePage = function () {
        if (this.gamePageTwo.parent) {
            this.gamePageTwo.parent.removeChild(this.gamePageTwo);
        }
        this.gameStage.addChild(this.gamePage);
        this.gamePage.StartGame(GameController.getInstance().GameType);
    };
    p.ThreePage = function () {
        if (this.gamePopup.parent) {
            this.gamePopup.parent.removeChild(this.gamePopup);
        }
        this.gameStage.addChild(this.gamePageThree);
        this.gamePageThree.PlayEffect(GameController.getInstance().GameType);
    };
    p.TwoPage = function () {
        if (this.gamePageOne.parent) {
            this.gamePageOne.parent.removeChild(this.gamePageOne);
        }
        this.gameStage.addChild(this.gamePageTwo);
        this.gamePageTwo.PlayeEffect();
    };
    p.PopupPage = function (score) {
        this.gameStage.addChild(this.gamePopup);
        this.gamePopup.x = this.gameStage.width / 2 - this.gamePopup.width / 2;
        this.gamePopup.y = this.gameStage.height / 2 - this.gamePopup.height / 2;
        this.gamePopup.PopupEffect(score);
    };
    p.FirstPage = function () {
        if (this.boomPage.parent) {
            this.boomPage.parent.removeChild(this.boomPage);
        }
        this.gameStage.addChild(this.gamePageOne);
        this.gamePageOne.PlayEffect();
    };
    return GameController;
}());
egret.registerClass(GameController,'GameController');
