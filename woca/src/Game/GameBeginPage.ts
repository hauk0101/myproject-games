/**
 * 游戏开始界面
 * @author YaoQiao
 * @data 2016-06-12
 */
class GameBeginPage extends eui.Component{
	
    private game_begin_stars:eui.Image;
    private game_begin_text0:eui.Label;
    private game_begin_text1: eui.Label;
    private game_begin_text2:eui.Label;
    
    private startTimer:egret.Timer;
    private textTimer:egret.Timer;
    private texts:Array<eui.Label>;
    private textFlg:number = 0;
 
    private hasStartBtn:Boolean = false;
    
    public constructor() {
    	super();
    	
    	this.skinName = "src/components/GameBeginSkin.exml";
    	this.game_begin_stars.alpha = 1;
    	
      //文字的逐行显示
      this.texts = new Array<eui.Label>();
      this.texts.push(this.game_begin_text0);
      this.texts.push(this.game_begin_text1);
      this.texts.push(this.game_begin_text2);
      this.TextShowEffect();
      //星星背景的闪烁
      this.StarsEffect();
	}
	
    private StarsEffect(): void{
        this.startTimer = new egret.Timer(1000,0);
        this.startTimer.addEventListener(egret.TimerEvent.TIMER,this.StarsTimerFunc,this);
        
    }
    
    private StarsTimerFunc():void{      
        this.game_begin_stars.alpha = Math.random();
    }
    
    private TextShowEffect():void{
        for(let i = 0; i < this.texts.length; i ++)
        {
            this.texts[i].alpha = 0;
        }
        this.textTimer = new egret.Timer(50,0);
        this.textTimer.addEventListener(egret.TimerEvent.TIMER,this.TextTimerFunc,this);
        this.textTimer.start();
    }
    
    private TextTimerFunc():void{

        if(this.texts[this.textFlg].alpha >= 1){
             this.textFlg++;
        }
        else{
            this.texts[this.textFlg].alpha += 0.1;    
        }
        if(this.textFlg == this.texts.length) {
            this.textTimer.removeEventListener(egret.TimerEvent.TIMER,this.TextTimerFunc,this);
            for(let i = 0;i < this.texts.length;i++) {
                this.texts[i].alpha = 1;
            }
            //当文字全出现之后再设置闪烁，否则会导致文字跟随星星闪烁，原因暂未知
            this.startTimer.start();
        }
        
        //当第4行文字出现时，开始按钮出现
        if(this.textFlg == this.texts.length-1 &&(!this.hasStartBtn))
        {
            this.hasStartBtn = true;
            GameController.getInstance().ShowGameEnterBtn();
        }
 
    }
    
  
    
}
