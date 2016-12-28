/**
 * 游戏结束页面
 * @author YaoQiao
 *
 */
class GameOverPage extends eui.Component {
    private num1:eui.Image;
    private num2:eui.Image;
    private num0:eui.Image;
    private game_total_tip:eui.Label;
    
    private game1_btn:eui.Image;
    private game2_btn:eui.Image;
    private game3_btn:eui.Image;
    private chuo_big_btn:eui.Image;
    private chuo_small_btn:eui.Image;
    private gameover_btn:eui.Image;

    private oneTotal_Xpos = 280;
    private twoTotal_Xpos:number[] = [265,295];
    private threeTotal_Xpos:number[] = [252,277,302];
    
    private gamerover_timer:egret.Timer;
    
    public static MOVIE_URL: string = "http://v.youku.com/v_show/id_XMTYxMTE0NTk4MA==.html?from=y1.7-1.1";
    public static GAME_1_URL: string = "";
    public static GAME_2_URL: string = "";
    public static GAME_3_URL: string = "";
    public constructor(total) {
    	super();
    	this.skinName = "src/components/GameOverSkin.exml";
    
    	this.init(total);
	}
	
	private init(total){
        this.SetNum(total);
        this.SetLabel(total);  
              
        this.chuo_big_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GameOverBtnOnClick,this);
        this.chuo_small_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GameOverBtnOnClick,this);  
        this.gameover_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GameOverBtnOnClick,this);  
        this.game1_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.Game1_OnClick,this);
        this.game2_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.Game2_OnClick,this);
        this.game3_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.Game3_OnClick,this);
        this.PlayBtnShowEffect();

	}
	
    private Game1_OnClick():void{
        this.StopTimer();
        this.game1_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.Game1_OnClick,this);
        window.location.href = GameOverPage.GAME_1_URL;
    }
    
    private Game2_OnClick(): void {
        this.StopTimer();
        this.game2_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.Game1_OnClick,this);
        window.location.href = GameOverPage.GAME_2_URL;
    }
    
    private Game3_OnClick(): void {
        this.StopTimer();
        this.game3_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.Game1_OnClick,this);
        window.location.href = GameOverPage.GAME_3_URL;
    }
 
	
    private PlayBtnShowEffect(){
        this.gamerover_timer = new egret.Timer(300,0);
        this.gamerover_timer.addEventListener(egret.TimerEvent.TIMER,this.EggsShowFunc,this);
        this.gamerover_timer.start();
    }
    
    private EggsShowFunc(){
        this.chuo_big_btn.visible = !this.chuo_big_btn.visible;
        this.chuo_small_btn.visible = !this.chuo_small_btn.visible;
    }
    
	private GameOverBtnOnClick(){
        this.StopTimer();
        this.chuo_big_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.GameOverBtnOnClick,this);
        this.chuo_small_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.GameOverBtnOnClick,this);  
        this.gameover_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.GameOverBtnOnClick,this); 
        window.location.href = GameOverPage.MOVIE_URL;
	}
	
	private StopTimer(){
        this.gamerover_timer.stop();
        this.gamerover_timer.removeEventListener(egret.TimerEvent.TIMER,this.EggsShowFunc,this);
        this.gamerover_timer = null;
	}
	
    private SetNum(value: number) {
        if(value >= 100){
            var percent: number = parseInt((value / 100).toString());
            var ten: number = parseInt(((value - percent * 100) / 10).toString());
            var single: number = parseInt((value % 10).toString());
            this.num1.source = "total_" + ten.toString() + "_png";
            this.num2.source = "total_" + single.toString() + "_png";
            this.num0.source = "total_" + percent.toString() + "_png";
            
            this.num0.x = this.threeTotal_Xpos[0];
            this.num1.x = this.threeTotal_Xpos[1];
            this.num2.x = this.threeTotal_Xpos[2];
        }else
        {
            var ten: number = parseInt((value / 10).toString());
            var single: number = parseInt((value % 10).toString());


            this.num1.source = "total_" + ten.toString() + "_png";
            this.num2.source = "total_" + single.toString() + "_png";
            this.num1.visible = ten == 0 ? false : true;
            this.num0.visible = false;
            
            if(value >= 10){
                this.num1.x = this.twoTotal_Xpos[0];
                this.num2.x = this.twoTotal_Xpos[1];
            }
            else
            {
                this.num2.x = this.oneTotal_Xpos;
            }
        }
        
    }
    
    private SetLabel(value:number){
        if(value < 60){
            this.game_total_tip.text = "你那是鱼的记忆，对吧？！";
            this.game_total_tip.textColor = 0xA59C9C;
        }else if(value < 120){
            this.game_total_tip.text = "钱包拿了，钥匙带了，门？锁了吗？";
            this.game_total_tip.textColor = 0x104CD8;
        }else{
            this.game_total_tip.text = "大神，下次考试我挨着你坐！";
            this.game_total_tip.textColor = 0xB612C2;
        }
    }
}
