/**
 * 游戏背景
 * @author YaoQiao 
 * @date 2016-10-11
 */
class GameBackground extends eui.Component{
	private bg1:eui.Image;
	private bg2:eui.Image;
	private maskbg:eui.Image;
	
	private speed:number = 2;
	private imgArr:Array<eui.Image>;
	private stageH:number = 0;
	private imgCount:number = 0;
    public constructor() {
    	super();
        this.skinName = "src/gexml/GameBackgroundSkin.exml";
      this.imgArr = [];
      this.imgArr.push(this.bg1);
      this.imgArr.push(this.bg2);
      this.stageH = -this.bg2.y;
      this.imgCount = this.imgArr.length;
     
	}
	
	/**
	 * 开始滚动背景
	 */ 
	public StartScroll(){
        this.maskbg.visible = false;
	    this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
	    this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
	}
	
	/**
	 * 停止滚动背景
	 */ 
	public StopScroll(){
        this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
        this.maskbg.visible = true;
	}

    
	private enterFrameHandler(event:egret.Event):void{
	    for(var i = 0;i < this.imgCount; i++){
	        var img:eui.Image = this.imgArr[i];
	        img.y += this.speed;
	        if(img.y >= this.stageH){
	            img.y = -this.stageH;	            
	        }
	    }
	}
}
