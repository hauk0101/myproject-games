/**
 * 游戏玩家信息部分
 * @author YaoQiao
 * @date 2016-10-11
 *
 */
class GamePlayerInfo extends eui.Component{
    public static MAN_NAME_CHEJIAWEI:string = "chejiawei";
    public static MAN_NAME_MAJIN:string = "majin";
    
    private manIcon:eui.Image;
    private manName:eui.Image;
    private manName0:eui.Image;
    private blood0:eui.Image;
    private blood1: eui.Image;
    private blood2: eui.Image;
    private blood3: eui.Image;
    private blood4: eui.Image;
    
    private bloodArr:Array<eui.Image>;
    private bloodValue:number = 0;
    public constructor() {
    	super();
        this.skinName ="src/gexml/GamePlayerInfoSkin.exml";
        this.bloodArr = [];
        this.bloodArr.push(this.blood0);
        this.bloodArr.push(this.blood1);
        this.bloodArr.push(this.blood2);
        this.bloodArr.push(this.blood3);
        this.bloodArr.push(this.blood4);
        
	}
	
	/**
	 * 设置玩家名字
	 * @param value GamePlayerInfo静态变量可选择
	 */ 
	public set ManName(value:string){
    	  this.manName.visible = false;
    	  this.manName0.visible = false;
        if(value == GamePlayerInfo.MAN_NAME_CHEJIAWEI) {
            //设置名字为车家伟
            //this.manName.source = "name_chejiawei_png";
            this.manName.visible = true;
        }
        else if(value == GamePlayerInfo.MAN_NAME_MAJIN) {
           // this.manName.source = "name_majin_png";
            this.manName0.visible = true;
        }
	}
	
	/**
	 * 设置玩家头像
	 * @param value GamePlayerInfo静态变量可选择
	 */ 
	public set ManIcon(value:string){
        if(value == GamePlayerInfo.MAN_NAME_CHEJIAWEI) {
            //设置头像为刘青云
            this.manIcon.source = "man_lqy_png";
        }
        else if(value == GamePlayerInfo.MAN_NAME_MAJIN) {
            this.manIcon.source = "man_xtf_png";
        }
	}
	
	/**
	 * 设置玩家血条
	 * @param value 玩家血滴数量
	 */ 
	public set ManBlood(value:number){
	    var _blood:number = value < 0 ? 0 : value;
	    _blood  = value > 5 ? 5 : value;
	    for(var i = 0; i < this.bloodArr.length; i ++){
	        this.bloodArr[i].alpha = 0;
	    }
	    for(var j = 0; j < value;j++){
	        this.bloodArr[j].alpha = 1;
	    }
        this.bloodValue = _blood;
	}
	
	/**
	 * 获取人物血量
	 * @return 返回玩家血滴数量
	 */ 
    public get ManBlood():number{
	    return this.bloodValue;
	}
}
