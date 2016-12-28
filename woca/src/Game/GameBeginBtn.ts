/**
 * 游戏开始按钮
 * @author 
 *
 */
class GameBeginBtn extends eui.Component {
      
    private bird_btn:eui.Button;
    private enter_words_small:eui.Button;
    private enter_words_big:eui.Button;
    
    private myStage:eui.UILayer; 
    private enter_timer:egret.Timer;

    public constructor(stage) {
      super();
      this.skinName = "src/components/GameBeginBtnSkin.exml";
     
      this.myStage = stage;
      this.myStage.addChild(this);
     
      
      this.bird_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);
      this.enter_words_small.addEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);
      this.enter_words_big.addEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);
	}
	
	public ShowBtnEffect():void{     
        this.enter_timer = new egret.Timer(350);
        this.enter_timer.addEventListener(egret.TimerEvent.TIMER,this.EnterWordsChange,this);
        this.enter_timer.start();
	}
	
    private EnterWordsChange():void{
        this.enter_words_small.visible = !this.enter_words_small.visible;
        this.enter_words_big.visible = !this.enter_words_big.visible;
    }

    private EnterGameBtnFunc():void{  
        this.enter_timer.stop();
        this.enter_timer.removeEventListener(egret.TimerEvent.TIMER,this.EnterWordsChange,this);
        this.enter_words_small.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);
        this.enter_words_big.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);
        this.bird_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);
        this.myStage.removeChild(this);
        this.enter_timer = null;
        GameController.getInstance().EnterGame();
    }
}
