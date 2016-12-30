/**
 * 游戏声音
 * @author YaoQiao
 * @date 2016-10-14 
 *
 */
class GameSound {
    private sound2:egret.Sound ;
    private loader:egret.URLLoader;
    
    private sound:egret.Sound;
    private channel:egret.SoundChannel;
	public constructor() {
        this.sound = RES.getRes("bg_music_mp3");
        
    	  this.sound2 = new egret.Sound();
    	  //this.sound2.addEventListener(egret.Event.COMPLETE,)
	}
	

	
	
	public PlaySound(){
    	if(this.sound){
            this.channel = this.sound.play();
    	}
        
	}
	
	public StopSound(){
    	if(this.channel)
	   this.channel.stop();
	}
}
