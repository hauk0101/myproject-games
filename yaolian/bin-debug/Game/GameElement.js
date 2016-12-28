/**
 * 游戏元素类
 * @author YaoQiao
 *
 */
var GameElement = (function (_super) {
    __extends(GameElement, _super);
    function GameElement() {
        _super.call(this);
        this.show_element_src = "";
        this.bg_element_src = "game_element_back_png";
        this.element_type = "";
        this.isFinded = false;
        this.skinName = "src/components/GameElementSkin.exml";
    }
    var d = __define,c=GameElement,p=c.prototype;
    p.init = function (type) {
        //获取按钮的图片
        this.game_element_image = this.game_element.getChildAt(0);
        this.element_type = type;
        this.show_element_src = "game_element_" + type + "_png";
        this.game_element_image.source = this.show_element_src;
    };
    p.ShowElement = function () {
        this.game_element_image.source = this.show_element_src;
    };
    p.ShowBg = function () {
        if (!this.isFinded) {
            this.game_element_image.source = this.bg_element_src;
        }
    };
    p.ElementType = function () {
        return this.element_type;
    };
    p.IsFinded = function (value) {
        this.isFinded = value;
    };
    return GameElement;
}(eui.Button));
egret.registerClass(GameElement,'GameElement');
