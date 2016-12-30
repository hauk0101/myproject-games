/**
 * 游戏声音
 * @author YaoQiao
 * @date 2016-10-14
 *
 */
var GameSound = (function () {
    function GameSound() {
        this.sound = RES.getRes("bg_music_mp3");
        this.sound2 = new egret.Sound();
        //this.sound2.addEventListener(egret.Event.COMPLETE,)
    }
    var d = __define,c=GameSound,p=c.prototype;
    p.PlaySound = function () {
        if (this.sound) {
            this.channel = this.sound.play();
        }
    };
    p.StopSound = function () {
        if (this.channel)
            this.channel.stop();
    };
    return GameSound;
}());
egret.registerClass(GameSound,'GameSound');
