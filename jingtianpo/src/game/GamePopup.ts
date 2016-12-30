/**
 * 游戏结果弹窗
 * @author YaoQiao
 * @date 2016-10-12
 */
class GamePopup extends eui.Component{
    private txt_score:eui.Label;
    private sss1:eui.Image;
    private sss2:eui.Image;
    private sss3:eui.Image;
    private btn_turn:eui.Image;
	public constructor() {
    	super();
        this.skinName = "src/gexml/GamePopupSkin.exml";
	}
	
	public PopupEffect(score:number){
      this.btn_turn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTurnOnClick,this);
      this.txt_score.text = "您的最终得分为 " + score.toString() + " 分";
      this.sss1.visible = false;
      this.sss2.visible = false;
      this.sss3.visible = false;
    	if(score <= 10){
            this.sss1.visible = true;
    	}else if(score <=25){
            this.sss1.visible = true;
            this.sss2.visible = true;   	 

    	}else if(score > 25){
            this.sss1.visible = true;
            this.sss2.visible = true;
            this.sss3.visible = true;
    	}
    	
    	this.popupEffect();
	}
	
	private popupEffect(){
	    var tween:egret.Tween = egret.Tween.get(this);
	    this.alpha = 0;
	    tween.to({alpha:1},1000,egret.Ease.quadOut).call(()=>{
	        tween = null;
	    });
	}
	
	private btnTurnOnClick(){
        this.btn_turn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTurnOnClick,this);
        GameController.getInstance().ThreePage();
	}
}
