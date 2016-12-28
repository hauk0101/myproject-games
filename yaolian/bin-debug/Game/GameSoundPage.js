/**
 * 游戏音乐控制类
 * @author
 *
 */
var GameSoundPage = (function (_super) {
    __extends(GameSoundPage, _super);
    function GameSoundPage() {
        _super.call(this);
        this.btn_sound_toggle = false;
        this.skinName = "src/components/GameSoundBGSkin.exml";
        this.btn_sound_on.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SoundBtnOnclick, this);
        this.btn_sound_off.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SoundBtnOnclick, this);
        this.bg_sound = RES.getRes("bg_music_mp3");
        this.sound_Channel = this.bg_sound.play();
    }
    var d = __define,c=GameSoundPage,p=c.prototype;
    p.SoundBtnOnclick = function () {
        this.SetSoundBtn(this.btn_sound_toggle);
    };
    p.SetSoundBtn = function (bool) {
        if (!bool) {
            this.btn_sound_off.visible = false;
            this.btn_sound_on.visible = true;
            this.sound_Channel.stop();
        }
        else {
            this.btn_sound_off.visible = true;
            this.btn_sound_on.visible = false;
            this.sound_Channel = this.bg_sound.play();
        }
        this.btn_sound_toggle = !this.btn_sound_toggle;
    };
    return GameSoundPage;
}(eui.Component));
egret.registerClass(GameSoundPage,'GameSoundPage');
