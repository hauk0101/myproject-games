/**
 * 游戏选择元素
 * @author YaoQiao
 * 2016-09-07
 */
class GameSelectElement extends eui.Component{
    private select_bg:eui.Image;
    private select_img:eui.Image;
    
    private select_id:number = 0;
    public constructor() {
    	super();
    	
    	this.skinName = "src/components/GameSelectElementSkin.exml";
	}
	
	/**
	 * 初始化游戏选择元素
	 */ 
    public Init(id:number,isSelect:boolean){
	    this.select_id = id;
        this.select_img.source = "game_pic" + id + "_jpg";
	    this.IsSelect(isSelect);
	}
	
	/**
	 * 设置游戏选择元素的选择状态，以此来判断是否显示选中框效果
	 */ 
	public IsSelect(value:boolean){
	    this.select_bg.visible = value;
	}
	
	/**
	 * 获取当前选择元素的ID
	 */ 
	public GetElementId():number{
	    return this.select_id;
	}

}
