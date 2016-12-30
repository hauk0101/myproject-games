/**
 * 游戏角色
 * @author YaoQiao
 * @2016-10-10
 */
var GameRole = (function (_super) {
    __extends(GameRole, _super);
    function GameRole(delayFire) {
        if (delayFire === void 0) { delayFire = 800; }
        _super.call(this);
        this.isShooted = false;
        this.touchDistance = new egret.Point();
        this.fireTimer = new egret.Timer(delayFire);
        this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
    }
    var d = __define,c=GameRole,p=c.prototype;
    /**
     * 创建游戏角色
     * @param value 根据GameRole静态变量进行选择
     */
    p.CreateRole = function (value) {
        var mc;
        if (value == GameRole.GAME_ROLE_ENEMY) {
            var data = RES.getRes("enemyRole_json");
            var txtr = RES.getRes("enemyRole_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            mc = new egret.MovieClip(mcFactory.generateMovieClipData("enemy"));
            this.addChild(mc);
            mc.play(-1);
        }
        else if (value == GameRole.GAME_ROLE_MY) {
            var data = RES.getRes("myRole_json");
            var txtr = RES.getRes("myRole_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            mc = new egret.MovieClip(mcFactory.generateMovieClipData("myRole"));
            this.addChild(mc);
            mc.play(-1);
        }
        this.role = mc;
    };
    d(p, "IsShooted"
        ,function () {
            return this.isShooted;
        }
        ,function (value) {
            this.isShooted = value;
        }
    );
    d(p, "AnimationPlay",undefined
        /**
         * 设置游戏人物是否播放动画
         * @param value
         */
        ,function (value) {
            if (this.role) {
                if (value) {
                    this.role.play(-1);
                }
                else {
                    this.role.stop();
                }
            }
        }
    );
    d(p, "Fire",undefined
        /**
         * 开火
         * @param value 是否开火
         */
        ,function (value) {
            if (this.role) {
                if (value) {
                    this.fireTimer.start();
                }
                else {
                    this.fireTimer.stop();
                }
            }
        }
    );
    p.createBullet = function (evt) {
        this.dispatchEventWith(GameRole.GAME_EVENT_FIRE);
    };
    d(p, "TouchMove",undefined
        /**
         * 设置游戏角色是否可以触摸跟随
         */
        ,function (value) {
            if (!this.role)
                return;
            if (value) {
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.TouchBeginHandle, this);
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchBeginHandle, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.TouchBeginHandle, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.TouchBeginHandle, this);
            }
        }
    );
    p.TouchBeginHandle = function (evt) {
        var mc = evt.currentTarget;
        this.touchDistance.x = evt.stageX - mc.x;
        this.touchDistance.y = evt.stageY - mc.y;
        this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchMoveHandle, this);
    };
    p.TouchEndHandle = function () {
        this.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchMoveHandle, this);
    };
    p.TouchMoveHandle = function (evt) {
        this.x = evt.stageX - this.touchDistance.x;
        this.y = evt.stageY - this.touchDistance.y;
    };
    /**游戏敌人角色**/
    GameRole.GAME_ROLE_ENEMY = "game_role_enemy";
    /**游戏主人公角色 **/
    GameRole.GAME_ROLE_MY = "game_role_my";
    /**角色开火事件**/
    GameRole.GAME_EVENT_FIRE = "game_event_fire";
    return GameRole;
}(eui.Component));
egret.registerClass(GameRole,'GameRole');
