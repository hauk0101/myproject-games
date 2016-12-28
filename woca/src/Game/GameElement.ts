/**
 * 游戏元素类
 * @author YaoQiao
 *
 */
class GameElement extends eui.Button{
	
    private game_element_red:eui.Button;
    private game_element_green:eui.Button;
   
    private element_type:number = 3;
    private elementHide_timer:egret.Timer;
    private elementShowTime:number = 1000;
    public constructor() {
    	super();
    	this.skinName = "src/components/GameElementSkin.exml";      
	}
	
	public init(type):void{
    	this.element_type = type;
    	this.game_element_red.visible = false;
    	this.game_element_green.visible = false;
    	switch(type){
        	//绿色为0
    	    case 0:
    	        this.game_element_green.visible = true;
    	        break;
    	    case 1:
    	        this.game_element_red.visible = true;
    	        break;
    	    default:
    	    break;
    	}
    	
        this.elementHide_timer = new egret.Timer(this.elementShowTime,1);
        this.elementHide_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.ElementHideHandle,this);
        this.elementHide_timer.start();
	}
	
	public GetElementType(){
	    return this.element_type;
	}
	
    private ElementHideHandle(){
        this.visible = false;
        this.elementHide_timer.stop();
        this.elementHide_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.ElementHideHandle,this);
        this.elementHide_timer = null;
    }
		
    
}
