/**
 * 游戏提示页面
 * @author YaoQiao
 * @data 2016-06-13
 */
class GameTipPage extends eui.Component {
    private btn_close_tip:eui.Button;
    private myStage:eui.UILayer;
    
	public constructor(stage) {
	    super();
        this.skinName = "src/components/GameTipSkin.exml";
        this.btn_close_tip.addEventListener(egret.TouchEvent.TOUCH_TAP,this.CloseBtnOnClick,this);
        this.myStage = stage;
        this.myStage.addChild(this);
	}
	
	private CloseBtnOnClick(){
	    if(this.myStage != null){
    	      this.myStage.removeChild(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.CloseBtnOnClick,this);     	        
	    }
	    GameController.getInstance().PlayStartBtnEffect();
	}
	
	
}
