/**
 * 游戏加载页面
 * @author YaoQiao
 * 2016-09-12
 */
class GameLoadingPage extends eui.Component{
    private loading_progress:eui.Image;
    private loading_text:eui.Label;
    
    private progressWidth:number = 0;
    
    public constructor() {
    	super();
      this.skinName = "src/components/GameLoadingPageSkin.exml";
    	this.progressWidth = this.loading_progress.width;
    	this.loading_progress.width = 0;
	}
	
	/**
	 * 设置加载进度
	 */ 
    public setProgress(current: number,total: number): void {
        var percent: number = Math.floor((current / total) * 100);
        this.loading_text.text = percent.toString() + "%";
        this.loading_progress.width = (current / total) * this.progressWidth;
    }
	
	
}
