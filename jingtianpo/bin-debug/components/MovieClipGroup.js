/**
 * 自定义MovieClip组件，便于在exml中直接使用MC
 * @author YaoQiao
 * @date 2016-10-10
 *
 */
var MovieClipGroup = (function (_super) {
    __extends(MovieClipGroup, _super);
    function MovieClipGroup() {
        _super.call(this);
        this.source = "enemyRole";
    }
    var d = __define,c=MovieClipGroup,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var data = RES.getRes(this.source + "_json");
        var txtr = RES.getRes(this.source + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData(this.source));
        mc1.play(-1);
        this.addChild(mc1);
    };
    return MovieClipGroup;
}(eui.Group));
egret.registerClass(MovieClipGroup,'MovieClipGroup');
