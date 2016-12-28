/**
 * 游戏元素类
 * @author YaoQiao
 *
 */
class GameElement extends eui.Button{
	
    private game_element:eui.Button;
    private game_element_image:eui.Image;
    private show_element_src:string = "";
    private bg_element_src: string = "game_element_back_png";
    private element_type:string = "";
    private isFinded = false;
    
    public constructor() {
    	super();
    	this.skinName = "src/components/GameElementSkin.exml";
      
	}
	
	public init(type):void{
    	 //获取按钮的图片
        this.game_element_image = <eui.Image>this.game_element.getChildAt(0);
	    this.element_type = type;
	    
    	this.show_element_src = "game_element_" + type + "_png";
        this.game_element_image.source = this.show_element_src; 
	}
		
	public ShowElement():void{
	    this.game_element_image.source = this.show_element_src;
	}
	
	public ShowBg():void{
    	if(!this.isFinded){
            this.game_element_image.source = this.bg_element_src;
    	}	   
	}
	
	public ElementType():string{
	    return this.element_type;
	}
	
	public IsFinded(value):void{
	    this.isFinded = value;
	}
	
    
}
