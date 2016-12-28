/**
 * 游戏结束页面
 * @author YaoQiao
 *
 */
var GameOverPage = (function (_super) {
    __extends(GameOverPage, _super);
    function GameOverPage(total) {
        _super.call(this);
        this.oneTotal_Xpos = 308;
        this.twoTotal_Xpos = [295, 324];
        this.threeTotal_Xpos = [277, 304, 332];
        this.skinName = "src/components/GameOverSkin.exml";
        this.init(total);
    }
    var d = __define,c=GameOverPage,p=c.prototype;
    p.init = function (total) {
        this.SetNum(total);
        this.SetLabel(total);
        this.game_cat_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.CatOnClick, this);
        this.cat_eggs_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.CatOnClick, this);
        this.PlayCatEggsEffect();
        this.PlayCatHandEffect();
    };
    p.PlayCatHandEffect = function () {
        this.cat_hand_tween = egret.Tween.get(this.cat_hand, { loop: true });
        this.cat_hand_tween.to({ y: -75 }, 300).to({ y: -120 }, 300);
    };
    p.PlayCatEggsEffect = function () {
        this.cat_eggs_timer = new egret.Timer(300, 0);
        this.cat_eggs_timer.addEventListener(egret.TimerEvent.TIMER, this.EggsShowFunc, this);
        this.cat_eggs_timer.start();
    };
    p.EggsShowFunc = function () {
        this.cat_eggs_btn.visible = !this.cat_eggs_btn.visible;
    };
    p.CatOnClick = function () {
        this.cat_hand_tween.pause();
        this.cat_eggs_timer.stop();
        this.game_cat_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.CatOnClick, this);
        this.cat_eggs_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.CatOnClick, this);
        window.location.href = GameOverPage.MOVIE_URL;
    };
    p.SetNum = function (value) {
        if (value >= 100) {
            var percent = parseInt((value / 100).toString());
            var ten = parseInt(((value - percent * 100) / 10).toString());
            var single = parseInt((value % 10).toString());
            this.num1.source = "total_" + ten.toString() + "_png";
            this.num2.source = "total_" + single.toString() + "_png";
            this.num0.source = "total_" + percent.toString() + "_png";
            this.num0.x = this.threeTotal_Xpos[0];
            this.num1.x = this.threeTotal_Xpos[1];
            this.num2.x = this.threeTotal_Xpos[2];
        }
        else {
            var ten = parseInt((value / 10).toString());
            var single = parseInt((value % 10).toString());
            this.num1.source = "total_" + ten.toString() + "_png";
            this.num2.source = "total_" + single.toString() + "_png";
            this.num1.visible = ten == 0 ? false : true;
            this.num0.visible = false;
            if (value >= 10) {
                this.num1.x = this.twoTotal_Xpos[0];
                this.num2.x = this.twoTotal_Xpos[1];
            }
            else {
                this.num2.x = this.oneTotal_Xpos;
            }
        }
    };
    p.SetLabel = function (value) {
        if (value < 60) {
            this.game_total_tip.text = "啧啧，您是跟我这儿挠痒痒呢！";
            this.game_total_tip.textColor = 0xA59C9C;
        }
        else if (value < 120) {
            this.game_total_tip.text = "是你！世界上最分裂的就是你！";
            this.game_total_tip.textColor = 0x104CD8;
        }
        else {
            this.game_total_tip.text = "泥揍开~我坑都被你分裂到稀碎啦！";
            this.game_total_tip.textColor = 0xB612C2;
        }
    };
    GameOverPage.MOVIE_URL = "http://v.youku.com/v_show/id_XMTYxMTE0NTk4MA==.html?from=y1.7-1.1";
    return GameOverPage;
}(eui.Component));
egret.registerClass(GameOverPage,'GameOverPage');
