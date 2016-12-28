/**
 * 游戏选择元素
 * @author YaoQiao
 * 2016-09-07
 */
var GameSelectElement = (function (_super) {
    __extends(GameSelectElement, _super);
    function GameSelectElement() {
        _super.call(this);
        this.select_id = 0;
        this.skinName = "src/components/GameSelectElementSkin.exml";
    }
    var d = __define,c=GameSelectElement,p=c.prototype;
    /**
     * 初始化游戏选择元素
     */
    p.Init = function (id, isSelect) {
        this.select_id = id;
        this.select_img.source = "game_pic" + id + "_jpg";
        this.IsSelect(isSelect);
    };
    /**
     * 设置游戏选择元素的选择状态，以此来判断是否显示选中框效果
     */
    p.IsSelect = function (value) {
        this.select_bg.visible = value;
    };
    /**
     * 获取当前选择元素的ID
     */
    p.GetElementId = function () {
        return this.select_id;
    };
    return GameSelectElement;
}(eui.Component));
egret.registerClass(GameSelectElement,'GameSelectElement');
