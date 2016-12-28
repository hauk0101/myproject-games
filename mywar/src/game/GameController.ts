/**
 * 游戏控制类
 * @author YaoQiao
 * 2016-09-06
 */
class GameController {
	private static instance:GameController;
	public static getInstance():GameController{
	    if(this.instance == null){
	        this.instance = new GameController();
	    }
	    return this.instance;
	}
	
	private gameBeginPage:GameBeginPage;
	private gameSelectPage:GameSelectPage;
    private gamePlayePage:GamePlayPage;
    private gameOverPage:GameOverPage;
	
	private gameStage:eui.UILayer;
	
    private initGame() {
        this.gameBeginPage = new GameBeginPage();
        this.gameSelectPage = new GameSelectPage();
        this.gamePlayePage = new GamePlayPage();
        this.gameOverPage = new GameOverPage();
    }
	/**
	 * 进入游戏首页
	 * @param stage 游戏舞台
	 */ 
	public GameEnter(stage:eui.UILayer){
	    this.initGame();
	    
	    if(stage){
	        this.gameStage = stage;
//	        this.gameBeginPage.ShowPage(stage);
	        this.gameSelectPage.ShowPage(stage);
	    } 
	}
	
	/**
	 * 进入游戏选择页面
	 */ 
	public GameSelect(){
	    this.gameBeginPage.HidePage();
	    this.gameSelectPage.ShowPage(this.gameStage);    
	}
	
	/**
	 * 操作游戏页面
	 * @param gameId 游戏元素id
	 */ 
	public GamePlay(gameId:number){
	    this.gameSelectPage.HidePage();
        this.gamePlayePage.SetElementId(gameId);
	    this.gamePlayePage.ShowPage(this.gameStage);
	}
	
	/**
	 * 游戏结束页面
	 * @param gameId 游戏元素id
	 * @param isWin 是否胜利
	 */ 
	public GameOver(gameId:number,isWin:boolean){
	    this.gamePlayePage.HidePage();
	    this.gameOverPage.ShowPage(gameId,this.gameStage,isWin);
	}
	
	/**
	 * 游戏重玩
	 * @isCurrentGame 是否是重玩当前游戏页面
	 */ 
	public GameRestartPlay(isCurrentGame){
      this.gameOverPage.HidePage();  
    	if(isCurrentGame){
	        this.gamePlayePage.RestartGame();
	    }else{
	        this.gameSelectPage.ShowPage(this.gameStage);
	    }
	}
	
	/**
	 * 播放视频
	 */ 
	public GameVideoPlay(){
	    this.gameOverPage.HidePage();
        
	}
}
