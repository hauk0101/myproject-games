/**
 * 游戏加载页面
 * @author YaoQiao
 * 2016-09-12
 */
class LoadingPage extends eui.Component{
    private img_boom:eui.Image;
    private loading_progress:eui.Image;
    private loading_text:eui.Label;
    private loading_number:eui.Label;
    private progressWidth:number = 0;
    private img_time:eui.Image;
    private loadingTimer:egret.Timer;
    public constructor() {
    	super();
        this.skinName = "src/gexml/LoadingPageSkin.exml";
//    	this.progressWidth = this.loading_progress.width;
//    	this.loading_progress.width = 0;
       this.loadingTimer = new egret.Timer(50);
       this.loadingTimer.addEventListener(egret.TimerEvent.TIMER,this.timerHandle,this);
       this.loadingTimer.start();
	}
	
	
	private timerHandle(){
	    this.img_time.visible = !this.img_time.visible;
	}

	/**
	 * 设置加载进度
	 */ 
    public setProgress(current: number,total: number): void {
        var percent: number = Math.floor((current / total) * 100);
        this.loading_number.text = "已完成" + percent.toString() + "%";
//        this.loading_text.text = percent.toString() + "%";
//        this.loading_progress.width = (current / total) * this.progressWidth;
       
        if(this.loadingTimer && percent >=80){
            var shock: GameShock = new GameShock();
            shock.shock(GameShock.MAP);
            shock._target = this;
            shock.start(20);
            this.img_time.visible = true;
            this.loadingTimer.stop();
            this.loadingTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerHandle,this);
            this.loadingTimer = null;
                 
        }
    }
	
	
}
