/**
 * 游戏首页
 * @author YaoQiao
 * 2016-09-06
 */
class GameBeginPage extends eui.Component {
   
    private img_title:eui.Image;
    private img_text1:eui.Image;
    private img_text2:eui.Image;
    private img_text3:eui.Image;
    private img_text4:eui.Image;
    private img_text5:eui.Image;
    private btn_enter_big:eui.Button;
    private btn_enter_small:eui.Button;
    
    private img_texts:Array<eui.Image>;
    private img_texts_pos:Array<number>;
    private show_title_y:number;
    private hide_title_y:number;
    private hide_text_y:number;
    private btn_timer:egret.Timer;
    
    public constructor() {
    	super();
    	
    	this.skinName = "src/components/GameBeginPageSkin.exml";
    	
    	this.show_title_y = this.img_title.y;
    	this.hide_title_y = -100;
    	this.hide_text_y = 1000;
    	
    	this.img_texts = [];
    	this.img_texts.push(this.img_text1);
    	this.img_texts.push(this.img_text2);
    	this.img_texts.push(this.img_text3);
    	this.img_texts.push(this.img_text4);
    	this.img_texts.push(this.img_text5);
    	
    	this.img_texts_pos = [];
    	var tmp_y:number = 0;
    	for(let i = 0; i < this.img_texts.length; i++){   	     
            tmp_y = this.img_texts[i].y;
    	    this.img_texts_pos[i] = tmp_y;
    	}
    	
        this.btn_timer = new egret.Timer(400,0);
        this.btn_timer.addEventListener(egret.TimerEvent.TIMER,this.playBtnEffect,this);
        
        this.btn_enter_big.addEventListener(egret.TouchEvent.TOUCH_TAP,this.enterBtnOnClick,this);
        this.btn_enter_small.addEventListener(egret.TouchEvent.TOUCH_TAP,this.enterBtnOnClick,this);
    	
        this.hideAll();   	
	}
	
	/**
	 * 显示游戏开始界面
	 */ 
	public ShowPage(stage:eui.UILayer){
	    //防止多次调用ShowPage()方法时界面出错
    	this.hideAll();
    	
    	if(stage){
    	    stage.addChild(this);
            this.playTitleEffect();   
            this.playTextEffect();
    	}
    	else{
    	    console.log("首页父对象为空...");
    	}
	}
	
	/**
	 * 移除游戏开始界面 
	 */ 
	public HidePage(){
	    if(this.parent){
	        this.parent.removeChild(this);
	    }
	   
	    this.hideAll();
	}
	
	private enterBtnOnClick(){
	    this.btn_enter_big.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.enterBtnOnClick,this);
        this.btn_enter_small.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.enterBtnOnClick,this);
        
        GameController.getInstance().GameSelect();
	}
	
	/**
	 *	播放标题效果
	 */ 
    private playTitleEffect(){
        var _tween_title = egret.Tween.get(this.img_title);
        _tween_title.to({ y: this.show_title_y },500);
	}
	
	/**
	 * 播放文案效果
	 */ 
	private playTextEffect(){
    	var _this = this;
        var _posArr = this.img_texts_pos;
        var _textsArr = this.img_texts;
    	var _index:number = 0;
        var _tween_text = egret.Tween.get(_textsArr[_index]);
        _tween_text.to({ y: _posArr[_index] },1000).call(textEffect);
        
        function textEffect(){
            _index += 1;
            if(_index < _posArr.length){
                _tween_text = egret.Tween.get(_textsArr[_index]);
                _tween_text.to({ y: _posArr[_index] },1000).call(textEffect);
            }else{
                _this.btn_timer.start();   
                _this.btn_enter_small.visible = true;
            }
        }
	}
	
	/**
	 * 播放进入游戏按钮效果
	 */ 
	private playBtnEffect(){
        this.btn_enter_big.visible = !this.btn_enter_big.visible;
        this.btn_enter_small.visible = !this.btn_enter_small.visible;      
	}
	
    /**
     * 隐藏首页所有元素
     */ 
	private hideAll(){
	    this.img_title.y = this.hide_title_y;
        this.btn_timer.stop();
        
	    for(let i = 0;i < this.img_texts.length; i++){
	        this.img_texts[i].y = this.hide_text_y;
	    }
	    
	    this.btn_enter_big.visible = false;
	    this.btn_enter_small.visible = false;
	}
}
