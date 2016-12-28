/**
 * 进度加载类
 * @author YaoQiao
 *
 */
class GameLoading extends eui.Component{
 
    private loadingText:eui.Label;
    private loading_bg:eui.Group;
    
    private barWidth:number;
    public constructor() {
    	super(); 
        this.skinName = "src/components/GameLoadingSkin.exml";    
        var data = RES.getRes("loading_json");
        var txtr = RES.getRes("loading_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,txtr);
        var mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("loading"));
        this.addChild(mc);
        mc.scaleX = 0.8;
        mc.scaleY = 0.8;
        mc.x = 212 - mc.width;
        mc.y = 296 - mc.height + 20;      
        mc.play(-1);
	}
	
	
    public setProgress(current: number,total: number): void {
        var percent:number = Math.floor((current / total) * 100);
        this.loadingText.text = percent.toString() + "%";
       
    }
}
