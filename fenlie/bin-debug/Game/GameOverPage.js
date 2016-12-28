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
        this.tower_Ypos = this.game_tower.y;
        this.game_tower.y = 500;
        this.leftLg_Xpos = this.lighting_left.x;
        this.lighting_left.x = -200;
        this.rightLg_Xpos = this.lighting_right.x;
        this.lighting_right.x = 500;
        var dianbos = [];
        dianbos.push(this.dianbo_1);
        dianbos.push(this.dianbo_2);
        dianbos.push(this.dianbo_3);
        for (var i = 0; i < dianbos.length; i++) {
            dianbos[i].visible = false;
        }
        var tweenT = egret.Tween.get(this.game_tower);
        var left = this.lighting_left;
        var leftPos = this.leftLg_Xpos;
        var right = this.lighting_right;
        var rightPos = this.rightLg_Xpos;
        tweenT.to({ y: this.tower_Ypos }, 500).call(function () {
            var tweenLeft = egret.Tween.get(left);
            tweenLeft.to({ x: leftPos }, 200);
            var tweenRight = egret.Tween.get(right);
            tweenRight.to({ x: rightPos }, 50);
            playDianBo();
            addErWeiMa();
        });
        var tower = this.game_tower;
        function addErWeiMa() {
            var gameDiv = document.getElementById("gameDiv");
            var myImg = document.createElement("img");
            myImg.src = "resource/assets/res/game_tower.png";
            myImg.style.width = "48%";
            myImg.style.left = "50%";
            myImg.style.marginLeft = "-25%";
            myImg.style.position = "absolute";
            myImg.style.top = "60%";
            gameDiv.appendChild(myImg);
            tower.visible = false;
        }
        function playDianBo() {
            dianbos[0].visible = true;
            var timer = new egret.Timer(200, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, dianboEffect, this);
            timer.start();
        }
        function dianboEffect() {
            if (dianbos[0].visible) {
                dianbos[0].visible = false;
                dianbos[1].visible = true;
            }
            else if (dianbos[1].visible) {
                dianbos[1].visible = false;
                dianbos[2].visible = true;
            }
            else if (dianbos[2].visible) {
                dianbos[2].visible = false;
                dianbos[0].visible = true;
            }
        }
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
            this.game_total_tip.text = "啧啧啧～你弱爆了喂！";
            this.game_total_tip.textColor = 0xA59C9C;
        }
        else if (value < 120) {
            this.game_total_tip.text = "分裂的不错嘛~小神经儿~";
            this.game_total_tip.textColor = 0x104CD8;
        }
        else {
            this.game_total_tip.text = "啊啊啊～做我们的首领吧！老大！";
            this.game_total_tip.textColor = 0xB612C2;
        }
    };
    return GameOverPage;
}(eui.Component));
egret.registerClass(GameOverPage,'GameOverPage');
