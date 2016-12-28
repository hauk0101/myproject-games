/**
 * 游戏开始按钮
 * @author 
 *
 */
class GameBeginBtn extends eui.Component {
      
    private nose_btn:eui.Button;
    private foot_btn:eui.Button;
    
    private myStage:eui.UILayer;  
    private tween_foot:egret.Tween;
    private foot_Ypos1:number;
    private foot_Ypos2:number;
    public constructor(stage) {
      super();
      this.skinName = "src/components/GameBeginBtnSkin.exml";
     
      this.myStage = stage;
      this.myStage.addChild(this);
      this.foot_Ypos1 = this.foot_btn.y;
      this.foot_Ypos2 = this.foot_btn.y + 80;
      
      this.nose_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);
      this.foot_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);
	}
	
	public ShowBtnEffect():void{     
        this.tween_foot = egret.Tween.get(this.foot_btn,{loop:true});
        this.tween_foot.to({ y: this.foot_Ypos2 },300).to({ y: this.foot_Ypos1},300);
	}
	

    private EnterGameBtnFunc():void{  
        this.tween_foot.pause();
        this.foot_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);
        this.nose_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);
        this.myStage.removeChild(this);
        GameController.getInstance().EnterGame();
    }
}
