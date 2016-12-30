/**
 * 游戏页面二
 * @author YaoQiao
 * @date 2016-10-12
 */
class GamePageTwo extends eui.Component{	
    private img_xie: eui.Image;
    private img_liu: eui.Image;
    private btn_select0: eui.Image;
    private btn_select1: eui.Image;
    private btn_start_big: eui.Image;
    private btn_start_small: eui.Image;
   
    private btnTimer:egret.Timer;
    private isDefaultSelect:boolean = true;
    public constructor() {
    	super();
        this.skinName ="src/gexml/GamePageTwoSkin.exml";
        this.btnTimer = new egret.Timer(500);
        
	}
	public PlayeEffect(){
        this.btnTimer.addEventListener(egret.TimerEvent.TIMER,this.btnTimerHandle,this);
        this.btn_start_big.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnOnClickHandle,this);
        this.btn_start_small.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnOnClickHandle,this);
        this.img_xie.addEventListener(egret.TouchEvent.TOUCH_TAP,this.imgXieOnClick,this);
        this.img_liu.addEventListener(egret.TouchEvent.TOUCH_TAP,this.imgLiuOnClick,this);
        this.btnTimer.start();
        this.btn_start_big.visible = false;
        this.btn_select1.visible = false;
        this.btn_select0.visible = true;
        this.btn_start_small.visible = true;
        this.isDefaultSelect = true;
	}
	
    private imgXieOnClick():void{
        this.isDefaultSelect = true;
        this.btn_select0.visible = this.isDefaultSelect;
        this.btn_select1.visible = !this.isDefaultSelect;
    }
	
    private imgLiuOnClick():void{
        this.isDefaultSelect = false;
        this.btn_select0.visible = this.isDefaultSelect;
        this.btn_select1.visible = !this.isDefaultSelect;
    }
    
    private btnTimerHandle(): void {
        this.btn_start_big.visible = !this.btn_start_big.visible;
        this.btn_start_small.visible = !this.btn_start_small.visible;
    }

    private btnOnClickHandle(): void {
        this.btnTimer.stop();
        this.btnTimer.removeEventListener(egret.TimerEvent.TIMER,this.btnTimerHandle,this);
        this.btn_start_big.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnOnClickHandle,this);
        this.btn_start_small.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnOnClickHandle,this);
        this.img_xie.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.imgXieOnClick,this);
        this.img_liu.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.imgLiuOnClick,this);
        
        var type:string = GamePlayerInfo.MAN_NAME_CHEJIAWEI;
        if(this.isDefaultSelect){
            type = GamePlayerInfo.MAN_NAME_MAJIN;
        }
        GameController.getInstance().GameType = type;
        GameController.getInstance().GamePage();
    }
    
}
