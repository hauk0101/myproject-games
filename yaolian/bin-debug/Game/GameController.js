/**
 * 游戏控制单例
 * @author YaoQiao
 * @data 2016-06-12
 */
var GameController = (function () {
    function GameController() {
        this.gameTotal = 0;
    }
    var d = __define,c=GameController,p=c.prototype;
    GameController.getInstance = function () {
        if (this.gameController == null) {
            this.gameController = new GameController();
        }
        return this.gameController;
    };
    p.GameInit = function (stage) {
        this.myStage = stage;
        this.beginPage = new GameBeginPage();
        this.myStage.addChild(this.beginPage);
        this.gamePlayBG = new GamePlayBG();
        this.gameSound = new GameSoundPage();
    };
    p.ShowGameEnterBtn = function () {
        if (!this.myStage.contains(this.beginBtn)) {
            this.beginBtn = new GameBeginBtn(this.beginPage);
            this.beginBtn.ShowBtnEffect();
        }
    };
    p.EnterGame = function () {
        this.myStage.removeChild(this.beginPage);
        this.myStage.addChild(this.gameSound);
        this.myStage.addChild(this.gamePlayBG);
        this.myStage.addChild(new GameTipPage(this.myStage));
    };
    p.PlayStartBtnEffect = function () {
        this.gamePlayBG.StartBtnEffect();
        this.gameTime = new GameTimeControl();
        this.myStage.addChild(this.gameTime);
        this.gameTime.x = 20;
        this.gameTime.y = 40;
    };
    p.TimeStart = function () {
        this.gameTime.StartTime();
    };
    p.TimeOver = function () {
        this.myStage.removeChild(this.gameTime);
        this.gamePlayBG.StopGame();
        this.gameRestart = new GameRestartPage();
        this.myStage.addChild(this.gameRestart);
    };
    p.GameOver = function () {
        this.myStage.removeChild(this.gamePlayBG);
        this.gameOver = new GameOverPage(this.gameTotal);
        this.myStage.addChild(this.gameOver);
    };
    //游戏停止，用于游戏完成，但时间未结束
    p.GameStop = function () {
        this.gameTime.GameTimeComplete();
    };
    p.GameRestart = function () {
        this.gameTotal = 0;
        this.gamePlayBG.RestartGame();
        this.gameTime = new GameTimeControl();
        this.myStage.addChild(this.gameTime);
        this.gameTime.x = 20;
        this.gameTime.y = 40;
    };
    p.GameTotal = function (type, value) {
        switch (type) {
            case "+":
                this.gameTotal += value;
                break;
            case "-":
                this.gameTotal -= value;
                break;
            case "*":
                this.gameTotal *= value;
                break;
            default:
                break;
        }
        this.gameTotal = this.gameTotal <= 0 ? 0 : this.gameTotal;
    };
    p.ReduceDouble = function () {
        this.gameTotal = Math.floor(this.gameTotal / 2);
        this.gameTotal = this.gameTotal <= 0 ? 0 : this.gameTotal;
    };
    p.ClearGameTotal = function () {
        this.gameTotal = 0;
    };
    return GameController;
}());
egret.registerClass(GameController,'GameController');
