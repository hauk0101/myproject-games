/**
 * 游戏开始前提示页面（Ready-Go）
 * @author YaoQiao
 * 2016-09-07
 */
class GameReadyTipPage  extends eui.Component{
	
    private tip_ready:eui.Image;
    private tip_go:eui.Image;
    
    private static BIG_SCALE:number = 3;
    private static SMALL_SCALE:number = 0.1;
    private ready_count:number = 2000; //测试即时修改
    private go_count: number = 2000; //测试即时修改
    public constructor() {
    	super();
        this.skinName = "src/components/GameReadyTipPageSkin.exml";
	}
	
	/**
	 * 播放Ready-Go提示效果
	 * @param callback 效果完成后的回调函数
	 */ 
	public PlayEffect(){
    	  var _this = this;
        var ready_tween: egret.Tween = egret.Tween.get(this.tip_ready);
        var go_tween: egret.Tween = egret.Tween.get(this.tip_go);
        
        this.tip_ready.scaleX = GameReadyTipPage.BIG_SCALE;
        this.tip_ready.scaleY = GameReadyTipPage.BIG_SCALE;
        this.tip_ready.alpha = 1;
        this.tip_go.scaleY = GameReadyTipPage.SMALL_SCALE;
        this.tip_go.scaleX = GameReadyTipPage.SMALL_SCALE;
        this.tip_go.alpha = 0;
        
        ready_tween.to({ scaleX: GameReadyTipPage.SMALL_SCALE,scaleY: GameReadyTipPage.SMALL_SCALE,alpha: 0 },this.ready_count);   
        go_tween.wait(1000).to({ scaleX: GameReadyTipPage.BIG_SCALE,scaleY: GameReadyTipPage.BIG_SCALE,alpha: 1 },this.go_count).call(() => {
            if(_this.parent) {
                _this.parent.removeChild(_this);
            }
        });
       
	}
}
