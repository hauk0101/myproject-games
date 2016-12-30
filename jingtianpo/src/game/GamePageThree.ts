/**
 * 游戏界面三
 * @author YaoQiao
 * @date 2016-10-13
 */
class GamePageThree extends eui.Component{
    private img_txt:eui.Image;
    private img_xie:eui.Image;
    private img_liu:eui.Image;
    private group_restart:eui.Group;
    private group_turn_big:eui.Group;
    private group_turn_small:eui.Group;
    private group_turn_1:eui.Group;
    private group_turn_0:eui.Group;
    private btnTimer:egret.Timer;
    private turnUrl1: string = "";
    private turnUrl0: string = "";
   
    public constructor() {
    	super();
        this.skinName = "src/gexml/GamePageThreeSkin.exml";   
        this.btnTimer = new egret.Timer(500);
	}
	
	
	/**
	 * 播放第三页的动画效果
	 */
	public PlayEffect(type:string){

        this.btnTimer.addEventListener(egret.TimerEvent.TIMER,this.btnTimerHandle,this);
        this.group_turn_big.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTurnOnClick,this);
        this.group_turn_small.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTurnOnClick,this);
        this.group_restart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnRestartOnClick,this);
        this.group_turn_0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.turnBtn0OnClick,this);
        this.group_turn_1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.turnBtn1OnClick,this);
    	
        
        this.group_turn_0.visible = false;
        this.group_turn_1.visible = false;
        this.img_xie.visible = false;
        this.img_liu.visible = false;
	    var txtShowY:number = this.img_txt.y;
        
	    var _this = this;
	    _this.group_restart.visible = false;
	    _this.group_turn_big.visible = false;
        _this.group_turn_small.visible = false;
	    var tween1:egret.Tween = egret.Tween.get(_this.img_txt);
	    _this.img_txt.y = -250;
	    
        tween1.to({ y: txtShowY },1200,egret.Ease.quartIn).call(() => {
            _this.group_restart.visible = true;
            _this.group_turn_small.visible = true;
            tween1 = null;
            tween2 = null;
            _this.btnTimer.start();
        });;
	    
        
        if(type == GamePlayerInfo.MAN_NAME_MAJIN){
            var imgShowX: number = this.img_xie.x;
            var tween2: egret.Tween = egret.Tween.get(_this.img_xie);
            _this.img_xie.x = -250;
            _this.img_xie.visible = true;
            tween2.to({ x: imgShowX },1000,egret.Ease.cubicIn);
        }
        else{
            var imgShowX: number = this.img_liu.x;
            var tween2: egret.Tween = egret.Tween.get(_this.img_liu);
            _this.img_liu.x = 700;
            _this.img_liu.visible = true;
            tween2.to({ x: imgShowX },1000,egret.Ease.cubicIn);
        }
        
	}
	
    private btnTimerHandle(){
        this.group_turn_big.visible = !this.group_turn_big.visible;
        this.group_turn_small.visible = !this.group_turn_small.visible;
    }
    
    
    /**
     * 点击惊天破按钮之后，出现2个按钮
     */
    private btnTurnOnClick(){
        this.btnTimer.stop();
        this.group_turn_big.visible = false;
        this.group_turn_small.visible = false;
        this.playTurnTwoBtnEffect();  
        
    }
    
    private playTurnTwoBtnEffect() {
        var tween0: egret.Tween = egret.Tween.get(this.group_turn_0);
        this.group_turn_0.visible = true;
        this.group_turn_0.alpha = 0;
        tween0.to({ alpha: 1 },1000);
        
       var tween1:egret.Tween = egret.Tween.get(this.group_turn_1);
       this.group_turn_1.visible = true;
       this.group_turn_1.alpha = 0;
       tween1.to({alpha:1},1000);
       
    }
    
    private turnBtn0OnClick(){
        window.location.href = this.turnUrl0;
        this.stopEffect();
    }
    
    private turnBtn1OnClick() {
        window.location.href = this.turnUrl1;
        this.stopEffect();
    }
    
    private btnRestartOnClick(){
        this.stopEffect();
        GameController.getInstance().GameRestart();
    }
    
    private stopEffect(){
        this.btnTimer.stop();
        this.btnTimer.removeEventListener(egret.TimerEvent.TIMER,this.btnTimerHandle,this);
        this.group_turn_big.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTurnOnClick,this);
        this.group_turn_small.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTurnOnClick,this);
        this.group_restart.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnRestartOnClick,this);
        this.group_turn_0.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.turnBtn0OnClick,this);
        this.group_turn_1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.turnBtn1OnClick,this);
    }
    
  
}
