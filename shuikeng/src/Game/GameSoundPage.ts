/**
 * 游戏音乐控制类
 * @author 
 *
 */
class GameSoundPage extends eui.Component{
    private btn_sound: eui.Group;
    private btn_sound_on: eui.Button;
    private btn_sound_off: eui.Button;
    private btn_sound_toggle: Boolean = false;
    
    private bg_sound:egret.Sound;
    private sound_Channel:egret.SoundChannel;
    public constructor() {
    	super();
    	this.skinName = "src/components/GameSoundBGSkin.exml";
     
      this.btn_sound_on.addEventListener(egret.TouchEvent.TOUCH_TAP,this.SoundBtnOnclick,this);
      this.btn_sound_off.addEventListener(egret.TouchEvent.TOUCH_TAP,this.SoundBtnOnclick,this);
      this.bg_sound = RES.getRes("bg_music_mp3");
      this.sound_Channel = this.bg_sound.play();
	}
	
    private SoundBtnOnclick() {
        this.SetSoundBtn(this.btn_sound_toggle);
    }

    private SetSoundBtn(bool) {
        
        if(!bool) {
            this.btn_sound_off.visible = false;
            this.btn_sound_on.visible = true;
            this.sound_Channel.stop();
        } else {
            this.btn_sound_off.visible = true;
            this.btn_sound_on.visible = false;        
            this.sound_Channel = this.bg_sound.play();
        }
        this.btn_sound_toggle = !this.btn_sound_toggle;

    }
}
