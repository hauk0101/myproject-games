/**
 * 自定义MovieClip组件，便于在exml中直接使用MC
 * @author YaoQiao
 * @date 2016-10-10
 *
 */
class MovieClipGroup extends eui.Group{
    public source: string ="enemyRole";
	public constructor() {
    	super();
	}
	protected createChildren():void{
	    super.createChildren();
	    
	    var data = RES.getRes(this.source + "_json");
	    var txtr = RES.getRes(this.source +"_png");
	    var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,txtr);
	    var mc1:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData(this.source));
	    mc1.play(-1);
	    this.addChild(mc1);
	}
}
