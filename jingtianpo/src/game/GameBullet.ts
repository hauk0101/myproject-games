/**
 * 游戏子弹
 * @author YaoQiao 
 * @date 2016-10-11
 */
class GameBullet extends eui.Component{
    public static GAME_BULLET_MY:string = "game_bullet_my";
    public static GAME_BULLET_ENEMY:string = "game_bullet_enemy";
    
    private myBullet:eui.Image;
    private enemyBullet:eui.Image;
    private type:string;
	public constructor() {
    	super();
        this.skinName = "src/gexml/GameBulletSkin.exml"
	}
	
	/**
	 * 设置子弹类型
	 */ 
	public set BulletType(value:string){
	   this.myBullet.visible = false;
	   this.enemyBullet.visible = false;
    	 if(value == GameBullet.GAME_BULLET_MY){
	        this.myBullet.visible = true;
	    }
	    else if(value == GameBullet.GAME_BULLET_ENEMY){
             this.enemyBullet.visible = true;
	    }
	    this.type =value;
	}
	
	/**
	 * 设置子弹类型
	 */
    public get BulletType() :string{
        return this.type;
   }
}
