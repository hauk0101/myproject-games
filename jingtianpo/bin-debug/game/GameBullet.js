/**
 * 游戏子弹
 * @author YaoQiao
 * @date 2016-10-11
 */
var GameBullet = (function (_super) {
    __extends(GameBullet, _super);
    function GameBullet() {
        _super.call(this);
        this.skinName = "src/gexml/GameBulletSkin.exml";
    }
    var d = __define,c=GameBullet,p=c.prototype;
    d(p, "BulletType"
        /**
         * 设置子弹类型
         */
        ,function () {
            return this.type;
        }
        /**
         * 设置子弹类型
         */
        ,function (value) {
            this.myBullet.visible = false;
            this.enemyBullet.visible = false;
            if (value == GameBullet.GAME_BULLET_MY) {
                this.myBullet.visible = true;
            }
            else if (value == GameBullet.GAME_BULLET_ENEMY) {
                this.enemyBullet.visible = true;
            }
            this.type = value;
        }
    );
    GameBullet.GAME_BULLET_MY = "game_bullet_my";
    GameBullet.GAME_BULLET_ENEMY = "game_bullet_enemy";
    return GameBullet;
}(eui.Component));
egret.registerClass(GameBullet,'GameBullet');
