/**
 * 游戏控制类
 * @author YaoQiao
 * 2016-09-06
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
    p.initGame = function () {
        this.gameBeginPage = new GameBeginPage();
        this.gameSelectPage = new GameSelectPage();
        this.gamePlayePage = new GamePlayPage();
        this.gameOverPage = new GameOverPage();
    };
    /**
     * 进入游戏首页
     * @param stage 游戏舞台
     */
    p.GameEnter = function (stage) {
        this.initGame();
        if (stage) {
            this.gameStage = stage;
            //	        this.gameBeginPage.ShowPage(stage);
            this.gameSelectPage.ShowPage(stage);
        }
    };
    /**
     * 进入游戏选择页面
     */
    p.GameSelect = function () {
        this.gameBeginPage.HidePage();
        this.gameSelectPage.ShowPage(this.gameStage);
    };
    /**
     * 操作游戏页面
     * @param gameId 游戏元素id
     */
    p.GamePlay = function (gameId) {
        this.gameSelectPage.HidePage();
        this.gamePlayePage.SetElementId(gameId);
        this.gamePlayePage.ShowPage(this.gameStage);
    };
    /**
     * 游戏结束页面
     * @param gameId 游戏元素id
     * @param isWin 是否胜利
     */
    p.GameOver = function (gameId, isWin) {
        this.gamePlayePage.HidePage();
        this.gameOverPage.ShowPage(gameId, this.gameStage, isWin);
    };
    /**
     * 游戏重玩
     * @isCurrentGame 是否是重玩当前游戏页面
     */
    p.GameRestartPlay = function (isCurrentGame) {
        this.gameOverPage.HidePage();
        if (isCurrentGame) {
            this.gamePlayePage.RestartGame();
        }
        else {
            this.gameSelectPage.ShowPage(this.gameStage);
        }
    };
    /**
     * 播放视频
     */
    p.GameVideoPlay = function () {
        this.gameOverPage.HidePage();
    };
    return GameController;
}());
egret.registerClass(GameController,'GameController');
