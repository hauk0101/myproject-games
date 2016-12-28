/**
 * 进度加载类
 * @author YaoQiao
 *
 */
var GameLoading = (function (_super) {
    __extends(GameLoading, _super);
    function GameLoading() {
        _super.call(this);
        this.skinName = "src/components/GameLoadingSkin.exml";
        this.barWidth = this.loadingBar.width;
        this.loadingBar.width = 0;
    }
    var d = __define,c=GameLoading,p=c.prototype;
    p.setProgress = function (current, total) {
        var percent = Math.floor((current / total) * 100);
        this.loadingText.text = percent.toString() + "%";
        this.loadingBar.width = (current / total) * this.barWidth;
    };
    return GameLoading;
}(eui.Component));
egret.registerClass(GameLoading,'GameLoading');
