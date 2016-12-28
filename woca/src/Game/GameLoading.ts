/**
 * 进度加载类
 * @author YaoQiao
 *
 */
class GameLoading extends eui.Component{
 
    private loadingText:eui.Label;
    private loading_mask:eui.Image;
    private loading_alpha:eui.Image;
    
    private per_Ypos:number;
    public constructor() {
    	super(); 
        this.skinName = "src/components/GameLoadingSkin.exml";    
        this.per_Ypos = this.loading_mask.height / 100;
	}

    public setProgress(current: number,total: number): void {
        var percent:number = Math.floor((current / total) * 100);
        this.loadingText.text = percent.toString() + "%";
        this.loading_alpha.y += this.per_Ypos;      
    }
    
   
}
