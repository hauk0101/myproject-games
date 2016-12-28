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
    
    private game_cat_btn:eui.Button;
    private cat_eggs_btn:eui.Button;
    private cat_hand:eui.Image;

    private oneTotal_Xpos = 308;
    private twoTotal_Xpos:number[] = [295,324];
    private threeTotal_Xpos:number[] = [277,304,332];
    


    private cat_hand_tween:egret.Tween;
    private cat_eggs_timer:egret.Timer;
    
    public static MOVIE_URL: string = "http://v.youku.com/v_show/id_XMTYxMTE0NTk4MA==.html?from=y1.7-1.1";
    public constructor(total) {
    	super();
    	this.skinName = "src/components/GameOverSkin.exml";
    
    	this.init(total);
	}
	
	private init(total){
        this.SetNum(total);
        this.SetLabel(total);  
           
        this.game_cat_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.CatOnClick,this);
        this.cat_eggs_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.CatOnClick,this);       
        this.PlayCatEggsEffect();
        this.PlayCatHandEffect();
	}
	
    private PlayCatHandEffect(){
        this.cat_hand_tween =  egret.Tween.get(this.cat_hand,{loop:true});
        this.cat_hand_tween.to({y:-75},300).to({y:-120},300);
        
	}
	
    private PlayCatEggsEffect(){
        this.cat_eggs_timer = new egret.Timer(300,0);
        this.cat_eggs_timer.addEventListener(egret.TimerEvent.TIMER,this.EggsShowFunc,this);
        this.cat_eggs_timer.start();
    }
    
    private EggsShowFunc(){
        this.cat_eggs_btn.visible = !this.cat_eggs_btn.visible;
    }
    
	private CatOnClick(){
    	  this.cat_hand_tween.pause();
        this.cat_eggs_timer .stop();
        this.game_cat_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.CatOnClick,this);
        this.cat_eggs_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.CatOnClick,this);  
        window.location.href = GameOverPage.MOVIE_URL;
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
            this.game_total_tip.text = "啧啧，您是跟我这儿挠痒痒呢！";
            this.game_total_tip.textColor = 0xA59C9C;
        }else if(value < 120){
            this.game_total_tip.text = "是你！世界上最分裂的就是你！";
            this.game_total_tip.textColor = 0x104CD8;
        }else{
            this.game_total_tip.text = "泥揍开~我坑都被你分裂到稀碎啦！";
            this.game_total_tip.textColor = 0xB612C2;
        }
    }
}
