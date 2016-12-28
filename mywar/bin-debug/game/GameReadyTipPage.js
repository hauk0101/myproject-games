/**
 * 游戏开始前提示页面（Ready-Go）
 * @author YaoQiao
 * 2016-09-07
 */
var GameReadyTipPage = (function (_super) {
    __extends(GameReadyTipPage, _super);
    function GameReadyTipPage() {
        _super.call(this);
        this.ready_count = 2000; //测试即时修改
        this.go_count = 2000; //测试即时修改
        this.skinName = "src/components/GameReadyTipPageSkin.exml";
    }
    var d = __define,c=GameReadyTipPage,p=c.prototype;
    /**
     * 播放Ready-Go提示效果
     * @param callback 效果完成后的回调函数
     */
    p.PlayEffect = function () {
        var _this = this;
        var ready_tween = egret.Tween.get(this.tip_ready);
        var go_tween = egret.Tween.get(this.tip_go);
        this.tip_ready.scaleX = GameReadyTipPage.BIG_SCALE;
        this.tip_ready.scaleY = GameReadyTipPage.BIG_SCALE;
        this.tip_ready.alpha = 1;
        this.tip_go.scaleY = GameReadyTipPage.SMALL_SCALE;
        this.tip_go.scaleX = GameReadyTipPage.SMALL_SCALE;
        this.tip_go.alpha = 0;
        ready_tween.to({ scaleX: GameReadyTipPage.SMALL_SCALE, scaleY: GameReadyTipPage.SMALL_SCALE, alpha: 0 }, this.ready_count);
        go_tween.wait(1000).to({ scaleX: GameReadyTipPage.BIG_SCALE, scaleY: GameReadyTipPage.BIG_SCALE, alpha: 1 }, this.go_count).call(function () {
            if (_this.parent) {
                _this.parent.removeChild(_this);
            }
        });
    };
    GameReadyTipPage.BIG_SCALE = 3;
    GameReadyTipPage.SMALL_SCALE = 0.1;
    return GameReadyTipPage;
}(eui.Component));
egret.registerClass(GameReadyTipPage,'GameReadyTipPage');
