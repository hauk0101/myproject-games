/**
 * 重新开始游戏界面
 * @author YaoQiao
 *
 */
class GameRestartPage extends eui.Component{
    private restart_btn:eui.Button;
    private gameover_btn:eui.Button;
    
	public constructor() {
    	  super();
          this.skinName = "src/components/GameRestartPageSkin.exml";
        this.restart_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.RestartBtnOnClick,this);
        this.gameover_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GameOverBtnOnClick,this);
	}
	
	private RestartBtnOnClick(){
        this.restart_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.RestartBtnOnClick,this);
        this.RemoveSelf();
        GameController.getInstance().GameRestart();
	}
	
	private GameOverBtnOnClick(){
        this.gameover_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.GameOverBtnOnClick,this);
        this.RemoveSelf();
        GameController.getInstance().GameOver();
	}
	
	private RemoveSelf(){
	    this.parent.removeChild(this);
	}
}
