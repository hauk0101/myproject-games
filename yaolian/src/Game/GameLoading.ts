/**
 * 进度加载类
 * @author YaoQiao
 *
 */
class GameLoading extends eui.Component{
 
    private loadingText:eui.Label;
    private loading_bg:eui.Group;
    private eyes_right:eui.Image;
    private eyes_left:eui.Image;
    
    private barWidth:number;
    private eye_timer:egret.Timer;
    public constructor() {
    	super(); 
        this.skinName = "src/components/GameLoadingSkin.exml";    
        this.addLoadingEffect();
	}
	private addLoadingEffect():void{
	    this.eye_timer = new egret.Timer(100,0);
	    this.eye_timer.addEventListener(egret.TimerEvent.TIMER,this.EyeMoveEffect,this);
	    this.eye_timer.start();
	}
	
	private EyeMoveEffect():void{
	    this.eyes_right.visible = !this.eyes_right.visible;
	    this.eyes_left.visible = !this.eyes_left.visible;
       
	}
	
	private addMC():void{
        var data = RES.getRes("loading_json");
        var txtr = RES.getRes("loading_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,txtr);
        var mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("loading"));
        this.addChild(mc);
        mc.scaleX = 0.8;
        mc.scaleY = 0.8;
        mc.x = -50;
        mc.y = -100;
        mc.play(-1);
	}
	
    public setProgress(current: number,total: number): void {
        var percent:number = Math.floor((current / total) * 100);
        this.loadingText.text = percent.toString() + "%";
       
    }
    
    public stopEffect(){
        this.eye_timer.stop();
        this.eye_timer.removeEventListener(egret.TimerEvent.TIMER,this.EyeMoveEffect,this);
        this.eye_timer = null;
        
    }
}
