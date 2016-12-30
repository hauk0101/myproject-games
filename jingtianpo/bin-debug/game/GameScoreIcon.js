/**
 * 游戏得分部分
 * @author YaoQiao
 * @date 2016-10-11
 */
var GameScoreIcon = (function (_super) {
    __extends(GameScoreIcon, _super);
    function GameScoreIcon() {
        _super.call(this);
        this.skinName = "src/gexml/GameScoreIconSkin.exml";
    }
    var d = __define,c=GameScoreIcon,p=c.prototype;
    d(p, "ScoreNumber",undefined
        /**
         * 设置游戏得分
         */
        ,function (value) {
            var ten = parseInt((value / 10).toString());
            var single = parseInt((value % 10).toString());
            this.tenNum.source = "time_" + ten.toString() + "_png";
            this.singleNum.source = "time_" + single.toString() + "_png";
        }
    );
    return GameScoreIcon;
}(eui.Component));
egret.registerClass(GameScoreIcon,'GameScoreIcon');
