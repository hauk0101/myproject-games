/**
 * 爆炸效果
 * @author YaoQiao 
 * @date 2016-10-13
 */
class GameBoomEffect extends eui.Component{
    private img_boom:eui.Image;
	public constructor() {
    	super();
        this.skinName = "src/gexml/GameBoomEffectSkin.exml";
	}

	private boom:egret.MovieClip;
	public PlayEffect(stage:eui.UILayer){
        var data = RES.getRes("suipian_json");
        var txtr = RES.getRes("suipian_png");
        var mcFactory = new egret.MovieClipDataFactory(data,txtr);
        
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData("suipian"));
        this.addChild(mc);
        mc.width = this.width;
        mc.play(1);
        this.boom = mc;
        mc.addEventListener(egret.Event.COMPLETE,this.completeHandle,this);
        var tween0:egret.Tween = egret.Tween.get(mc);
        mc.alpha = 0;
        tween0.to({alpha:1},800);
        var tween: egret.Tween = egret.Tween.get(this.img_boom);
        tween.to({ alpha: 0,scaleX: 3,scaleY: 3 },500,egret.Ease.quadInOut);
	}
	
    private completeHandle(){
        var _this = this;
        var tween: egret.Tween = egret.Tween.get(_this.boom);
        tween.to({alpha:0},1000).call(()=>{
            if(_this.boom.parent) {
                _this.boom.parent.removeChild(_this.boom);
            }
            GameController.getInstance().FirstPage();   
        });
        
       
	}
	
}
