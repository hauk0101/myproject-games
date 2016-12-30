/**
 * 游戏对象池，用来创建敌人、敌方子弹、我方子弹
 * @author YaoQiao
 * @date 2016-10-11
 */
var GameObjectPool = (function () {
    function GameObjectPool() {
    }
    var d = __define,c=GameObjectPool,p=c.prototype;
    /**
     * 产生敌方游戏角色
     */
    GameObjectPool.ProduceEnemyRole = function () {
        var enemy;
        if (GameObjectPool.enemyRoleDict == null) {
            GameObjectPool.enemyRoleDict = [];
        }
        if (GameObjectPool.enemyRoleDict.length > 0) {
            enemy = GameObjectPool.enemyRoleDict.pop();
        }
        else {
            enemy = new GameRole();
            enemy.CreateRole(GameRole.GAME_ROLE_ENEMY);
        }
        return enemy;
    };
    /**
     * 回收敌方游戏角色
     */
    GameObjectPool.ReclaimEnemyRole = function (enemy) {
        if (GameObjectPool.enemyRoleDict == null) {
            GameObjectPool.enemyRoleDict = [];
        }
        if (GameObjectPool.enemyRoleDict.indexOf(enemy) == -1) {
            GameObjectPool.enemyRoleDict.push(enemy);
        }
    };
    /**
     * 产生游戏子弹对象，包括敌方子弹和我方子弹
     * @param bulletType 根绝GameBullet的静态变量来区分不同子弹类型
     */
    GameObjectPool.ProduceBullet = function (bulletType) {
        var bullet;
        if (GameObjectPool.bulletDict[bulletType] == null) {
            GameObjectPool.bulletDict[bulletType] = [];
        }
        var dict = GameObjectPool.bulletDict[bulletType];
        if (dict.length > 0) {
            bullet = dict.pop();
        }
        else {
            bullet = new GameBullet();
            bullet.BulletType = bulletType;
        }
        return bullet;
    };
    /**
     * 回收游戏子弹对象
     * @param bullet 子弹对象
     * @param bulletType 子弹类型
     */
    GameObjectPool.ReclaimBullet = function (bullet, bulletType) {
        if (GameObjectPool.bulletDict[bulletType] == null) {
            GameObjectPool.bulletDict[bulletType] = [];
        }
        var dict = GameObjectPool.bulletDict[bulletType];
        if (dict.indexOf(bullet) == -1 && (bullet.parent)) {
            dict.push(bullet);
        }
    };
    /**游戏子弹集合，包含敌方子弹和我方子弹**/
    GameObjectPool.bulletDict = {};
    return GameObjectPool;
}());
egret.registerClass(GameObjectPool,'GameObjectPool');
