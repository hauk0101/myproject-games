/**
 * 游戏控制类
 * @author YaoQiao
 * @date 2016-10-10
 */
class GameController {	
    private static instance:GameController;
    public static getInstance():GameController{
        if(this.instance == null){
            this.instance = new GameController();
        }
        return this.instance;
    }
    
    private gameStage: eui.UILayer;
    private gamePageOne:GamePageOne;
    private gamePageTwo:GamePageTwo;
    private gamePage:GamePage;
    private gamePopup:GamePopup;
    private gamePageThree:GamePageThree;
    private boomPage:GameBoomEffect;
    private gameSound:GameSound;
    
    private gameType:string;
    
    /**
	 * 进入游戏首页
	 * @param stage 游戏舞台
	 */
    public GameEnter(stage: eui.UILayer) {
        this.initGame();
        if(stage) {
            this.gameStage = stage;
            this.BoomPage();           
           
        }
   }
   
   public set GameType(value:string){
       this.gameType = value;
   }
   
   public get GameType():string{
       return this.gameType;
   }
   
   private initGame() {
        this.gamePageOne = new GamePageOne();
        this.gamePageTwo = new GamePageTwo();
        this.gamePage = new GamePage();
        this.gamePopup = new GamePopup();
        this.gamePageThree = new GamePageThree();
        this.boomPage = new GameBoomEffect();
        this.gameSound = new GameSound();
        this.gameSound.PlaySound();
    }
   
    private BoomPage(){
        this.gameStage.addChild(this.boomPage);
        this.boomPage.PlayEffect(this.gameStage);
    }
    public GameRestart(){
        this.gameStage.removeChild(this.gamePageThree);
        this.TwoPage();
    }
    
    public PlaySound(value:boolean){
        if(value){
            this.gameSound.PlaySound();
        }else{
            this.gameSound.StopSound();
        }
    }
    
    public GamePage(){
        if(this.gamePageTwo.parent){
            this.gamePageTwo.parent.removeChild(this.gamePageTwo);            
        }
        this.gameStage.addChild(this.gamePage);
        this.gamePage.StartGame(GameController.getInstance().GameType);
    }
    
    public ThreePage(){
        if(this.gamePopup.parent){
            this.gamePopup.parent.removeChild(this.gamePopup);
        }
        this.gameStage.addChild(this.gamePageThree);
        this.gamePageThree.PlayEffect(GameController.getInstance().GameType);
    }
    
    public TwoPage(){
        if(this.gamePageOne.parent){
            this.gamePageOne.parent.removeChild(this.gamePageOne);
        }
        this.gameStage.addChild(this.gamePageTwo);
        this.gamePageTwo.PlayeEffect();
    }
    
    public PopupPage(score:number){
        
        this.gameStage.addChild(this.gamePopup);
        this.gamePopup.x = this.gameStage.width / 2 - this.gamePopup.width / 2;
        this.gamePopup.y = this.gameStage.height / 2 - this.gamePopup.height / 2;
        this.gamePopup.PopupEffect(score);
        
    }
    
    public FirstPage(){
        if(this.boomPage.parent){
            this.boomPage.parent.removeChild(this.boomPage);
        }
        this.gameStage.addChild(this.gamePageOne);
        this.gamePageOne.PlayEffect();
    }
    
    
   
}
