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
        var data = RES.getRes("loading_json");
        var txtr = RES.getRes("loading_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData("loading"));
        this.addChild(mc);
        mc.scaleX = 0.8;
        mc.scaleY = 0.8;
        mc.x = 212 - mc.width;
        mc.y = 296 - mc.height + 20;
        mc.play(-1);
    }
    var d = __define,c=GameLoading,p=c.prototype;
    p.setProgress = function (current, total) {
        var percent = Math.floor((current / total) * 100);
        this.loadingText.text = percent.toString() + "%";
    };
    return GameLoading;
}(eui.Component));
egret.registerClass(GameLoading,'GameLoading');
