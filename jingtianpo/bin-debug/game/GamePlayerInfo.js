/**
 * 游戏玩家信息部分
 * @author YaoQiao
 * @date 2016-10-11
 *
 */
var GamePlayerInfo = (function (_super) {
    __extends(GamePlayerInfo, _super);
    function GamePlayerInfo() {
        _super.call(this);
        this.bloodValue = 0;
        this.skinName = "src/gexml/GamePlayerInfoSkin.exml";
        this.bloodArr = [];
        this.bloodArr.push(this.blood0);
        this.bloodArr.push(this.blood1);
        this.bloodArr.push(this.blood2);
        this.bloodArr.push(this.blood3);
        this.bloodArr.push(this.blood4);
    }
    var d = __define,c=GamePlayerInfo,p=c.prototype;
    d(p, "ManName",undefined
        /**
         * 设置玩家名字
         * @param value GamePlayerInfo静态变量可选择
         */
        ,function (value) {
            this.manName.visible = false;
            this.manName0.visible = false;
            if (value == GamePlayerInfo.MAN_NAME_CHEJIAWEI) {
                //设置名字为车家伟
                //this.manName.source = "name_chejiawei_png";
                this.manName.visible = true;
            }
            else if (value == GamePlayerInfo.MAN_NAME_MAJIN) {
                // this.manName.source = "name_majin_png";
                this.manName0.visible = true;
            }
        }
    );
    d(p, "ManIcon",undefined
        /**
         * 设置玩家头像
         * @param value GamePlayerInfo静态变量可选择
         */
        ,function (value) {
            if (value == GamePlayerInfo.MAN_NAME_CHEJIAWEI) {
                //设置头像为刘青云
                this.manIcon.source = "man_lqy_png";
            }
            else if (value == GamePlayerInfo.MAN_NAME_MAJIN) {
                this.manIcon.source = "man_xtf_png";
            }
        }
    );
    d(p, "ManBlood"
        /**
         * 获取人物血量
         * @return 返回玩家血滴数量
         */
        ,function () {
            return this.bloodValue;
        }
        /**
         * 设置玩家血条
         * @param value 玩家血滴数量
         */
        ,function (value) {
            var _blood = value < 0 ? 0 : value;
            _blood = value > 5 ? 5 : value;
            for (var i = 0; i < this.bloodArr.length; i++) {
                this.bloodArr[i].alpha = 0;
            }
            for (var j = 0; j < value; j++) {
                this.bloodArr[j].alpha = 1;
            }
            this.bloodValue = _blood;
        }
    );
    GamePlayerInfo.MAN_NAME_CHEJIAWEI = "chejiawei";
    GamePlayerInfo.MAN_NAME_MAJIN = "majin";
    return GamePlayerInfo;
}(eui.Component));
egret.registerClass(GamePlayerInfo,'GamePlayerInfo');
