/**
 * 游戏界面
 * @author YaoQiao
 * @date 2016-10-12
 *
 */
var GamePage = (function (_super) {
    __extends(GamePage, _super);
    function GamePage() {
        _super.call(this);
        this.gameTimerCount = 30;
        this.myBulletSpeed = 1;
        this.enemyBulletSpeed = 1;
        this.stageH = 0;
        this.gameScoreCount = 1;
        /**一共5滴血 */
        this.gameBloodCount = 5;
        this.initGame();
    }
    var d = __define,c=GamePage,p=c.prototype;
    /**
     * 游戏数据初始化
     */
    p.initGame = function () {
        this.enemyPlayers = [];
        this.myBullets = [];
        this.enemyBullets = [];
        this.gameTimer = new egret.Timer(1000, 0);
        this.enemyTimer = new egret.Timer(800);
        this.gameBG = new GameBackground();
        this.addChild(this.gameBG);
        this.myPlayer = new GameRole(300);
        this.addChild(this.myPlayer);
        this.myPlayer.scaleX = 2;
        this.myPlayer.scaleY = 2;
        this.setChildIndex(this.myPlayer, 50);
        this.timeTip = new GameTimeIcon();
        this.addChild(this.timeTip);
        this.timeTip.TimeNumber = 30;
        this.timeTip.x = 50;
        this.timeTip.y = 10;
        this.setChildIndex(this.timeTip, 1000);
        this.scoreTip = new GameScoreIcon();
        this.addChild(this.scoreTip);
        this.scoreTip.ScoreNumber = 0;
        this.scoreTip.x = 450;
        this.scoreTip.y = 10;
        this.setChildIndex(this.scoreTip, 1000);
        this.playerInfo = new GamePlayerInfo();
        this.addChild(this.playerInfo);
        this.playerInfo.ManBlood = 5;
        this.playerInfo.scaleX = 1;
        this.playerInfo.scaleY = 1;
        this.playerInfo.x = 0;
        this.playerInfo.y = 850;
        this.setChildIndex(this.scoreTip, 1000);
        this.stageH = this.gameBG.height;
    };
    p.StartGame = function (roleType) {
        this.gameRoleType = roleType;
        this.gameTimerCount = 30;
        this.gameScoreCount = 1;
        this.enemyPlayers = [];
        this.myBullets = [];
        this.enemyBullets = [];
        this.gameBloodCount = 5;
        this.myPlayer.x = 200;
        this.myPlayer.y = 700;
        this.myPlayer.CreateRole(GameRole.GAME_ROLE_MY);
        this.myPlayer.TouchMove = true;
        this.myPlayer.Fire = true;
        this.myPlayer.visible = true;
        ///游戏相关的事件
        this.myPlayer.addEventListener(GameRole.GAME_EVENT_FIRE, this.FireHandle, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.gameTimerHandle, this);
        this.enemyTimer.addEventListener(egret.TimerEvent.TIMER, this.createEnemyRole, this);
        ///
        this.gameTimer.start();
        this.enemyTimer.start();
        this.gameBG.StartScroll();
    };
    d(p, "gameRoleType",undefined
        /**
          * 设置角色的名称和头像
          * @param value 根据GamePlayerInfo的静态变量来选择
          */
        ,function (value) {
            if (value) {
                this.playerInfo.ManName = value;
                this.playerInfo.ManIcon = value;
            }
        }
    );
    /**
     * 游戏页面刷新事件处理函数
     */
    p.gameViewUpdate = function () {
        ///游戏碰撞检测
        this.gameHitTest();
        ///我的子弹运动
        var i = 0;
        var bullet;
        var myBulletCount = this.myBullets.length;
        var delArr = [];
        for (i = 0; i < myBulletCount; i++) {
            bullet = this.myBullets[i];
            bullet.y -= this.myBulletSpeed * 10;
            if (bullet.y < -bullet.height) {
                delArr.push(bullet);
            }
        } //回收不显示的子弹
        this.reclaimBullet(delArr, GameBullet.GAME_BULLET_MY);
        delArr = [];
        ///敌人飞机运动
        var enemy;
        var enemyCount = this.enemyPlayers.length;
        for (i = 0; i < enemyCount; i++) {
            enemy = this.enemyPlayers[i];
            enemy.y += this.myBulletSpeed * 5;
            if (enemy.y > this.stageH) {
                delArr.push(enemy);
            }
        }
        this.reclimEnemy(delArr);
        delArr = [];
        ///敌人子弹运动
        var enemyBulletCount = this.enemyBullets.length;
        for (i = 0; i < enemyBulletCount; i++) {
            bullet = this.enemyBullets[i];
            bullet.y += this.myBulletSpeed * 10;
            if (bullet.y > this.stageH) {
                delArr.push(bullet);
            }
        }
        this.reclaimBullet(delArr, GameBullet.GAME_BULLET_ENEMY);
        ///游戏状态更新
        this.upateGameState();
    };
    p.gameTimerHandle = function () {
        this.gameTimerCount -= 1;
        if (this.gameTimerCount >= 0) {
            this.timeTip.TimeNumber = this.gameTimerCount;
        } //游戏结束
        else {
            this.gameStop();
        }
    };
    p.upateGameState = function () {
        this.scoreTip.ScoreNumber = this.gameScoreCount;
        this.playerInfo.ManBlood = this.gameBloodCount;
        if (this.playerInfo.ManBlood <= 0) {
            this.gameStop();
        }
    };
    p.gameStop = function () {
        //停止刷新页面
        this.gameBG.StopScroll();
        this.myPlayer.Fire = false;
        this.myPlayer.TouchMove = false;
        this.myPlayer.visible = false;
        this.gameTimer.stop();
        this.enemyTimer.stop();
        this.myPlayer.removeEventListener(GameRole.GAME_EVENT_FIRE, this.FireHandle, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER, this.gameTimerHandle, this);
        this.enemyTimer.removeEventListener(egret.TimerEvent.TIMER, this.createEnemyRole, this);
        //清空数据
        this.reclimAll();
        //跳转至游戏结束页面
        GameController.getInstance().PopupPage(this.gameScoreCount);
    };
    p.createEnemyRole = function () {
        var enemy = GameObjectPool.ProduceEnemyRole();
        enemy.x = Math.random() * (640 - enemy.width);
        enemy.y = Math.random() * 100;
        enemy.scaleX = 1.5;
        enemy.scaleY = 1.5;
        enemy.Fire = true;
        enemy.AnimationPlay = true;
        this.addChild(enemy);
        this.setChildIndex(enemy, 10);
        this.enemyPlayers.push(enemy);
        enemy.addEventListener(GameRole.GAME_EVENT_FIRE, this.FireHandle, this);
    };
    p.FireHandle = function (evt) {
        var bullet;
        if (evt.target == this.myPlayer) {
            bullet = GameObjectPool.ProduceBullet(GameBullet.GAME_BULLET_MY);
            bullet.x = this.myPlayer.x + 20;
            bullet.y = this.myPlayer.y - 50;
            this.addChild(bullet);
            this.setChildIndex(bullet, 2);
            this.myBullets.push(bullet);
        }
        else {
            bullet = GameObjectPool.ProduceBullet(GameBullet.GAME_BULLET_ENEMY);
            bullet.x = evt.target.x + 20;
            bullet.y = evt.target.y + 50;
            this.addChild(bullet);
            this.setChildIndex(bullet, 2);
            this.enemyBullets.push(bullet);
        }
    };
    /**
     * 游戏碰撞检测
     */
    p.gameHitTest = function () {
        var i, j;
        var bullet1, bullet2;
        var role;
        var myBulletCount = this.myBullets.length;
        var enemyCount = this.enemyPlayers.length;
        var enemyBulletsCount = this.enemyBullets.length;
        var bullentArr1 = [];
        var bullentArr2 = [];
        var enemyArr = [];
        //我的子弹消灭敌人
        for (i = 0; i < myBulletCount; i++) {
            bullet1 = this.myBullets[i];
            for (j = 0; j < enemyCount; j++) {
                role = this.enemyPlayers[j];
                if (this.hitTest(bullet1, role)) {
                    //消灭敌人，得分+1
                    this.gameScoreCount += 1;
                    bullentArr1.push(bullet1);
                    enemyArr.push(role);
                }
            }
        }
        this.reclaimBullet(bullentArr1, GameBullet.GAME_BULLET_MY);
        this.reclimEnemy(enemyArr);
        bullentArr1 = [];
        enemyArr = [];
        //我的子弹消灭敌人子弹
        myBulletCount = this.myBullets.length;
        enemyBulletsCount = this.enemyBullets.length;
        for (i = 0; i < myBulletCount; i++) {
            bullet1 = this.myBullets[i];
            for (j = 0; j < enemyBulletsCount; j++) {
                bullet2 = this.enemyBullets[j];
                if (this.hitTest(bullet1, bullet2)) {
                    //子弹消失
                    bullentArr1.push(bullet1);
                    bullentArr2.push(bullet2);
                }
            }
        }
        this.reclaimBullet(bullentArr1, GameBullet.GAME_BULLET_MY);
        this.reclaimBullet(bullentArr2, GameBullet.GAME_BULLET_ENEMY);
        bullentArr1 = [];
        bullentArr2 = [];
        //敌人的子弹减我血
        enemyBulletsCount = this.enemyBullets.length;
        for (i = 0; i < enemyBulletsCount; i++) {
            bullet2 = this.enemyBullets[i];
            if (this.hitTest(bullet2, this.myPlayer)) {
                //减一滴血
                this.gameBloodCount -= 1;
                bullentArr2.push(bullet2);
            }
        }
        this.reclaimBullet(bullentArr2, GameBullet.GAME_BULLET_ENEMY);
        //敌人撞我，直接结束游戏
        enemyCount = this.enemyPlayers.length;
        for (i = 0; i < enemyCount; i++) {
            role = this.enemyPlayers[i];
            if (this.hitTest(role, this.myPlayer)) {
                //游戏结束
                this.gameStop();
            }
        }
    };
    /**
     * 回收消失的子弹
     * @param arr 消失的子弹数组
     */
    p.reclaimBullet = function (arr, type) {
        var lenth = arr.length;
        var bullet;
        for (var i = 0; i < lenth; i++) {
            bullet = arr[i];
            if (bullet.parent) {
                bullet.parent.removeChild(bullet);
                GameObjectPool.ReclaimBullet(bullet, type);
                if (type == GameBullet.GAME_BULLET_MY) {
                    this.myBullets.splice(this.myBullets.indexOf(bullet), 1);
                }
                else {
                    this.enemyBullets.splice(this.enemyBullets.indexOf(bullet), 1);
                }
            }
            else {
                console.log("有子弹为空", bullet.BulletType);
                bullet = null;
            }
        }
    };
    /**
     * 回收消失的敌人
     * @param arr 消失的敌人数组
     */
    p.reclimEnemy = function (arr) {
        var length = arr.length;
        var enemy;
        for (var i = 0; i < arr.length; i++) {
            enemy = arr[i];
            if (enemy.parent) {
                enemy.parent.removeChild(enemy);
                GameObjectPool.ReclaimEnemyRole(enemy);
                enemy.Fire = false;
                enemy.removeEventListener(GameRole.GAME_EVENT_FIRE, this.FireHandle, this);
                this.enemyPlayers.splice(this.enemyPlayers.indexOf(enemy), 1);
            }
            else {
                console.log("有敌人为空", enemy);
            }
        }
    };
    p.reclimAll = function () {
        var i = 0;
        var enemy;
        var bullet;
        for (i = 0; i < this.enemyPlayers.length; i++) {
            enemy = this.enemyPlayers[i];
            if (enemy.parent) {
                enemy.parent.removeChild(enemy);
                GameObjectPool.ReclaimEnemyRole(enemy);
                enemy.Fire = false;
                enemy.removeEventListener(GameRole.GAME_EVENT_FIRE, this.FireHandle, this);
            }
        }
        for (i = 0; i < this.enemyBullets.length; i++) {
            bullet = this.enemyBullets[i];
            if (bullet.parent) {
                bullet.parent.removeChild(bullet);
                GameObjectPool.ReclaimBullet(bullet, GameBullet.GAME_BULLET_ENEMY);
            }
        }
        for (i = 0; i < this.myBullets.length; i++) {
            bullet = this.myBullets[i];
            if (bullet.parent) {
                bullet.parent.removeChild(bullet);
                GameObjectPool.ReclaimBullet(bullet, GameBullet.GAME_BULLET_MY);
            }
        }
    };
    /**
     * 基于矩形的碰撞检测
     * @param obj1
     * @param obj2
     */
    p.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    return GamePage;
}(egret.DisplayObjectContainer));
egret.registerClass(GamePage,'GamePage');
