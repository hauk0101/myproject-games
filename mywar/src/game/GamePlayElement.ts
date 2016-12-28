/**
 * 拼图游戏元素
 * @author YaoQiao
 * 2016-09-08
 */
class GamePlayElement extends eui.Button{
	
    private btn_game_element:eui.Button;
    private btn_game_img:eui.Image;
    
    private game_play_id:number = 0;
    public constructor() {
    	super();
    	this.skinName = "src/components/GamePlayElementSkin.exml";
    	this.btn_game_img = <eui.Image>this.btn_game_element.getChildAt(0);
	}
	
	/**
	 * 设置游戏操作元素的ID
	 * @param gameId 选择游戏图片id
	 * @param imgId 操作游戏图片id
	 */ 
	public SetElementId(gameId:number,imgId:number){
        this.game_play_id = imgId;
	    if(this.btn_game_img){
	        this.btn_game_img.source = "element" + gameId + "_" + imgId + "_jpg";
	    }else{
	        console.log("获取按钮图片属性失败。");
	    }
	}
	
	/**
	 * 获取游戏操作元素的ID
	 */ 
	public GetElementId():number{
	    return this.game_play_id;
	}
}
