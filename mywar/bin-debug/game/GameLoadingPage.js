/**
 * 游戏加载页面
 * @author YaoQiao
 * 2016-09-12
 */
var GameLoadingPage = (function (_super) {
    __extends(GameLoadingPage, _super);
    function GameLoadingPage() {
        _super.call(this);
        this.progressWidth = 0;
        this.skinName = "src/components/GameLoadingPageSkin.exml";
        this.progressWidth = this.loading_progress.width;
        this.loading_progress.width = 0;
    }
    var d = __define,c=GameLoadingPage,p=c.prototype;
    /**
     * 设置加载进度
     */
    p.setProgress = function (current, total) {
        var percent = Math.floor((current / total) * 100);
        this.loading_text.text = percent.toString() + "%";
        this.loading_progress.width = (current / total) * this.progressWidth;
    };
    return GameLoadingPage;
}(eui.Component));
egret.registerClass(GameLoadingPage,'GameLoadingPage');
