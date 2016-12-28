/**
 * 进度加载类
 * @author YaoQiao
 *
 */
class GameLoading extends eui.Component{
    private loadingBar:eui.Image;
    private loadingBG:eui.Image;
    private loadingText:eui.Label;
    
    private barWidth:number;
    public constructor() {
    	super();
    
        this.skinName = "src/components/GameLoadingSkin.exml";    
    	  this.barWidth = this.loadingBar.width;
    	  this.loadingBar.width = 0;
	}
	
	
    public setProgress(current: number,total: number): void {
        var percent:number = Math.floor((current / total) * 100);
        this.loadingText.text = percent.toString() + "%";
        this.loadingBar.width = (current / total) * this.barWidth;
    }
}
