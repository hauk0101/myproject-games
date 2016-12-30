/**
 * 游戏倒计时部分
 * @author YaoQiao
 * @date 2016-10-11
 *
 */
var GameTimeIcon = (function (_super) {
    __extends(GameTimeIcon, _super);
    function GameTimeIcon() {
        _super.call(this);
        this.skinName = "src/gexml/GameTimeIcon.exml";
    }
    var d = __define,c=GameTimeIcon,p=c.prototype;
    d(p, "TimeNumber",undefined
        /**
         * 设置游戏倒计时时间
         */
        ,function (value) {
            var ten = parseInt((value / 10).toString());
            var single = parseInt((value % 10).toString());
            this.tenNum.source = "time_" + ten.toString() + "_png";
            this.singleNum.source = "time_" + single.toString() + "_png";
        }
    );
    return GameTimeIcon;
}(eui.Component));
egret.registerClass(GameTimeIcon,'GameTimeIcon');
