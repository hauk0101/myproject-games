/**
 * 游戏对象池，用来创建敌人、敌方子弹、我方子弹
 * @author YaoQiao
 * @date 2016-10-11
 */
class  GameObjectPool {
    /**敌方游戏角色对象数组**/
	private static enemyRoleDict:Array<GameRole>;
	/**游戏子弹集合，包含敌方子弹和我方子弹**/
	private static bulletDict:Object={};
	
	/**
	 * 产生敌方游戏角色
	 */
	public static ProduceEnemyRole():GameRole{
        var enemy: GameRole;
	    if(GameObjectPool.enemyRoleDict == null){
            GameObjectPool.enemyRoleDict = [];                  
	    }      
        if(GameObjectPool.enemyRoleDict.length > 0) {
            enemy = GameObjectPool.enemyRoleDict.pop();
        }else{
            enemy = new GameRole();
            enemy.CreateRole(GameRole.GAME_ROLE_ENEMY);
        }
        return enemy;
	}
	
	/**
	 * 回收敌方游戏角色
	 */ 
	public static ReclaimEnemyRole(enemy:GameRole){
	    if(GameObjectPool.enemyRoleDict == null){
	        GameObjectPool.enemyRoleDict = [];
	    }
	    if(GameObjectPool.enemyRoleDict.indexOf(enemy) == -1){
	        GameObjectPool.enemyRoleDict.push(enemy);
	    }
	}
	
	
	/**
	 * 产生游戏子弹对象，包括敌方子弹和我方子弹
	 * @param bulletType 根绝GameBullet的静态变量来区分不同子弹类型
	 */
	public static ProduceBullet(bulletType:string):GameBullet{
        var bullet: GameBullet ;
	    if(GameObjectPool.bulletDict[bulletType] == null){
	        GameObjectPool.bulletDict[bulletType] = [];
	    }
	    var dict:GameBullet[] = GameObjectPool.bulletDict[bulletType];
	    if(dict.length > 0){
            bullet = dict.pop();
	    }else{
	        bullet = new GameBullet();	   
            bullet.BulletType = bulletType;
	    }       

	    return bullet;
	}
	
	
	/**
	 * 回收游戏子弹对象
	 * @param bullet 子弹对象
	 * @param bulletType 子弹类型
	 */
	public static ReclaimBullet(bullet:GameBullet,bulletType:string):void{
	    if(GameObjectPool.bulletDict[bulletType] == null){
	        GameObjectPool.bulletDict[bulletType] = [];
	    }
	    var dict:GameBullet[] = GameObjectPool.bulletDict[bulletType];
	    if(dict.indexOf(bullet) == -1 && (bullet.parent)){
	        dict.push(bullet);
	    }

	}
}
