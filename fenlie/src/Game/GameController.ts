/**
 * 游戏控制单例
 * @author YaoQiao
 * @data 2016-06-12
 */
class GameController {
	private static gameController:GameController;
	public static getInstance():GameController{
	    if(this.gameController == null){
	        this.gameController = new GameController();
	    }
    	  return this.gameController;  
	}
	
	private myStage:eui.UILayer;
	private beginPage:GameBeginPage;
	private beginBtn:GameBeginBtn;
	private gamePlayBG:GamePlayBG;
	private gameTime:GameTimeControl;
	private gameRestart:GameRestartPage;
	private gameSound:GameSoundPage;
	private gameOver:GameOverPage;
	
	private gameTotal:number = 0;

	public constructor(){  
  
	}
	
	public GameInit(stage:eui.UILayer){
        
        this.myStage = stage;
        this.beginPage = new GameBeginPage();
        this.myStage.addChild(this.beginPage);
        
        this.gamePlayBG = new GamePlayBG();
        this.gameSound = new GameSoundPage();
       

	}
	
	public ShowGameEnterBtn(){
        if(!this.myStage.contains(this.beginBtn))
        {
            this.beginBtn = new GameBeginBtn(this.beginPage);
            this.beginBtn.ShowBtnEffect();
        }   
	}
	
	public EnterGame(){   	  
	    this.myStage.removeChild(this.beginPage);       
        
	    this.myStage.addChild(this.gameSound);
	    this.myStage.addChild(this.gamePlayBG);
	    this.myStage.addChild(new GameTipPage(this.myStage));
        
	}
	
	public PlayStartBtnEffect(){
        this.gamePlayBG.StartBtnEffect();
        this.gameTime = new GameTimeControl();
        this.myStage.addChild(this.gameTime);
        this.gameTime.x = 20;
        this.gameTime.y = 40;
	}
	
	public TimeStart(){
        this.gameTime.StartTime();
	}
	
	public TimeOver(){
	    this.myStage.removeChild(this.gameTime);
	    this.gamePlayBG.StopGame();
        this.gameRestart = new GameRestartPage();
        this.myStage.addChild(this.gameRestart);
	}
	
	public GameOver(){
       this.myStage.removeChild(this.gamePlayBG);
       this.gameOver = new GameOverPage(this.gameTotal);
       this.myStage.addChild(this.gameOver);
	}
	
	public GameRestart(){
       this.gameTotal = 0;
       this.gamePlayBG.RestartGame();
       this.gameTime = new GameTimeControl();
       this.myStage.addChild(this.gameTime);
       this.gameTime.x = 20;
       this.gameTime.y = 40;
	}
	
	public GameTotal(value){ 	
	     this.gameTotal += value;
	     this.gameTotal = this.gameTotal <= 0 ? 0 : this.gameTotal;	    
	}
	
	public ClearGameTotal(){
	    this.gameTotal = 0;
	}
	
    public AddSpeed(){
        this.gamePlayBG.AddGameSpeed();
    }

}
