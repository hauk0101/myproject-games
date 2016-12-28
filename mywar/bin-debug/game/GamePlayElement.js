/**
 * 拼图游戏元素
 * @author YaoQiao
 * 2016-09-08
 */
var GamePlayElement = (function (_super) {
    __extends(GamePlayElement, _super);
    function GamePlayElement() {
        _super.call(this);
        this.game_play_id = 0;
        this.skinName = "src/components/GamePlayElementSkin.exml";
        this.btn_game_img = this.btn_game_element.getChildAt(0);
    }
    var d = __define,c=GamePlayElement,p=c.prototype;
    /**
     * 设置游戏操作元素的ID
     * @param gameId 选择游戏图片id
     * @param imgId 操作游戏图片id
     */
    p.SetElementId = function (gameId, imgId) {
        this.game_play_id = imgId;
        if (this.btn_game_img) {
            this.btn_game_img.source = "element" + gameId + "_" + imgId + "_jpg";
        }
        else {
            console.log("获取按钮图片属性失败。");
        }
    };
    /**
     * 获取游戏操作元素的ID
     */
    p.GetElementId = function () {
        return this.game_play_id;
    };
    return GamePlayElement;
}(eui.Button));
egret.registerClass(GamePlayElement,'GamePlayElement');
