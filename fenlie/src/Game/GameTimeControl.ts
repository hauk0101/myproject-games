/**
 * 时间显示控制类
 * @author YaoQiao
 *
 */
class GameTimeControl extends eui.Component {
    private time_border_normal:eui.Image;
    private time_border_red:eui.Image;
	private time_border:eui.Group;
    private time_num_1:eui.Image;
    private time_num_2:eui.Image;
    
    private dangerEffect_timer:egret.Timer;
    private game_timer:egret.Timer;
    private gameTime:number = 45;
    public constructor() {
    	super();
        this.skinName = "src/components/GameTimeSkin.exml";      
        this.init();
	}

	
	private init(){
    	 this.SetNum(this.gameTime);
       this.time_border_red.visible = false;
       this.game_timer = new egret.Timer(1000,this.gameTime);
	   this.game_timer.addEventListener(egret.TimerEvent.TIMER,this.GameTimeFun,this);
       this.game_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.GameTimeComplete,this);
	  
	   
       this.dangerEffect_timer = new egret.Timer(200,0);
       this.dangerEffect_timer.addEventListener(egret.TimerEvent.TIMER,this.TimeDangerFunc,this);
      
	}
	
	public StartTime(){
        this.game_timer.start();
	}
	
	//游戏时间变化函数
	private GameTimeFun(){   
	    this.gameTime -= 1;
	    this.SetNum(this.gameTime);
	    if(this.gameTime == 20){
	        GameController.getInstance().AddSpeed();
	    }
	    if(this.gameTime == 5){
            this.dangerEffect_timer.start();
	    }
	}
	
	//危险时间提醒效果
    private TimeDangerFunc() {
        this.time_border_red.visible = !this.time_border_red.visible;
    }

    //游戏时间结束
	private GameTimeComplete(){   
        this.game_timer.removeEventListener(egret.TimerEvent.TIMER,this.GameTimeFun,this);
        this.game_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.GameTimeComplete,this);
        this.game_timer.stop();
        this.dangerEffect_timer.removeEventListener(egret.TimerEvent.TIMER,this.TimeDangerFunc,this);
        this.dangerEffect_timer.stop();
        
        GameController.getInstance().TimeOver();
        
	}
	
	//设置倒计时显示
	private SetNum(value:number){
	    var ten:number = parseInt((value / 10).toString());
        var single: number = parseInt((value % 10).toString());
        
        this.time_num_1.source ="time_" + ten.toString() + "_png";
        this.time_num_2.source = "time_" + single.toString() + "_png";
	}
	
}

