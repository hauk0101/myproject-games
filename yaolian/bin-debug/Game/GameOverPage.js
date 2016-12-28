/**
 * 游戏结束页面
 * @author YaoQiao
 *
 */
var GameOverPage = (function (_super) {
    __extends(GameOverPage, _super);
    function GameOverPage(total) {
        _super.call(this);
        this.oneTotal_Xpos = 290;
        this.twoTotal_Xpos = [270, 300];
        this.threeTotal_Xpos = [262, 288, 315];
        this.skinName = "src/components/GameOverSkin.exml";
        this.init(total);
    }
    var d = __define,c=GameOverPage,p=c.prototype;
    p.init = function (total) {
        this.SetNum(total);
        this.SetLabel(total);
        this.gameover_btn_big.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GameOverBtnOnClick, this);
        this.gameover_btn_small.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GameOverBtnOnClick, this);
        this.PlayBtnShowEffect();
    };
    p.PlayBtnShowEffect = function () {
        this.gamerover_timer = new egret.Timer(300, 0);
        this.gamerover_timer.addEventListener(egret.TimerEvent.TIMER, this.EggsShowFunc, this);
        this.gamerover_timer.start();
    };
    p.EggsShowFunc = function () {
        this.gameover_btn_small.visible = !this.gameover_btn_small.visible;
    };
    p.GameOverBtnOnClick = function () {
        this.gamerover_timer.stop();
        this.gameover_btn_big.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GameOverBtnOnClick, this);
        this.gameover_btn_small.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GameOverBtnOnClick, this);
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
            this.game_total_tip.text = "你那是鱼的记忆，对吧？！";
            this.game_total_tip.textColor = 0xA59C9C;
        }
        else if (value < 120) {
            this.game_total_tip.text = "钱包拿了，钥匙带了，门？锁了吗？";
            this.game_total_tip.textColor = 0x104CD8;
        }
        else {
            this.game_total_tip.text = "大神，下次考试我挨着你坐！";
            this.game_total_tip.textColor = 0xB612C2;
        }
    };
    GameOverPage.MOVIE_URL = "http://v.youku.com/v_show/id_XMTYxMTE0NTk4MA==.html?from=y1.7-1.1";
    return GameOverPage;
}(eui.Component));
egret.registerClass(GameOverPage,'GameOverPage');
