/**
 * 游戏背景
 * @author YaoQiao 
 * 
 */
class GamePlayBG extends eui.Component{
    
    private game_play_mask:eui.Image;
    private time_border_normal:eui.Image;
    private time_border_red:eui.Image;
   
    private game_play_bgs:eui.Group;
    private game_play_bg0:eui.Image;
    private game_play_bg1:eui.Image;
    private game_play_bg2:eui.Image;
    private btn_start:eui.Group;
    private btn_start_small:eui.Button;
    private btn_start_big:eui.Button;
    
	
    
    private playBGs:Array<eui.Image>;
    private bg_posY_first:number = 0;
    private bg_posY_last:number = 0;
    private bg_posY_reset:number = 0;
    private startBtnTimer:egret.Timer;

    private showElements: Array<GameElement>;
    private bg_move_speed:number = 5;
    private element_move_speed:number = 9;
    private elementShow_Ypos = 700;
    private element_Xpos:number[] = [-120,-90,-60,-30,0,30,60,90];
    private element_Types: number[] = [2,3,2,3,2,3,2,3,2,3,0,2,3,3,3,3,2,2,2,2,1,2,3,3,2];
    private element_timer:egret.Timer;
    private update_timer:egret.Timer;
    private lastTime: number = egret.getTimer();
    
    private cacheDict:Object={};
    
    public constructor() {
    	super();
    	this.skinName = "src/components/GamePlayBGSkin.exml";  
      this.init();
	}
	
	private init(){
        
       
        this.btn_start_small.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.btn_start_big.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        
        this.game_play_bgs.mask = this.game_play_mask;
        
        this.playBGs = new Array<eui.Image>();
        this.playBGs.push(this.game_play_bg0);
        this.playBGs.push(this.game_play_bg1);
        this.playBGs.push(this.game_play_bg2);
        
        this.bg_posY_first = this.game_play_bg0.y;
        this.bg_posY_last = this.game_play_bg1.y;     
        this.bg_posY_reset = this.game_play_bg2.y;
              
	}
	
    public StartBtnEffect() {
        this.startBtnTimer = new egret.Timer(500,0);
        this.startBtnTimer.addEventListener(egret.TimerEvent.TIMER,this.StartBtnTimerFunc,this);
        
        this.startBtnTimer.start();
        
    }
	
    public AddGameSpeed(){
        this.element_move_speed = 14;
        this.element_timer.stop();
        this.element_timer.removeEventListener(egret.TimerEvent.TIMER,this.CreatElements,this);
        this.element_timer = new egret.Timer(100);
        this.element_timer.addEventListener(egret.TimerEvent.TIMER,this.CreatElements,this);
        this.element_timer.start();
 
    }
    
    public StopGame(){
        this.element_timer.stop();
        this.update_timer.stop();
        this.btn_start.visible = true;
    }
        
    
    public RestartGame(){
     
        this.btn_start_small.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.btn_start_big.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.startBtnTimer.addEventListener(egret.TimerEvent.TIMER,this.StartBtnTimerFunc,this);
        this.startBtnTimer.start();
        
        //清除游戏界面的所有游戏元素
        for(var i = 0;i < this.showElements.length;i++){
            this.game_play_bgs.removeChild(this.showElements[i]);
        }
        this.cacheDict = {};
        this.showElements = null;
        
    }
    
    private StartGame() {
        this.showElements = new Array<GameElement>();

        this.element_timer = new egret.Timer(200);
        this.element_timer.addEventListener(egret.TimerEvent.TIMER,this.CreatElements,this);
        this.element_timer.start();

        this.update_timer = new egret.Timer(20);
        this.update_timer.addEventListener(egret.TimerEvent.TIMER,this.UpdateElementsPos,this);
        this.update_timer.start();

    }
    
   
	private StartBtnTimerFunc(){
        this.btn_start_big.visible = !this.btn_start_big.visible;
	}
	
	private StartBtnOnClick(){
        this.btn_start_small.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.btn_start_big.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.btn_start.visible = false;
        this.startBtnTimer.stop();
        this.startBtnTimer.removeEventListener(egret.TimerEvent.TIMER,this.StartBtnTimerFunc,this);       
        
        this.StartGame();
        GameController.getInstance().TimeStart();
	}
	
	


    private UpdateElementsPos(){
        //移动背景
        for(let i = 0;i < this.playBGs.length;i++) {
            this.playBGs[i].y -= this.bg_move_speed;
            if(this.playBGs[i].y <= this.bg_posY_reset) {
                this.playBGs[i].y = this.bg_posY_last;
            }
        }    
        //移动游戏元素
        var nowTime: number = egret.getTimer();
        var fps: number = 1000 / (nowTime - this.lastTime);
        this.lastTime = nowTime;
        var speedOffset: number = 30 / fps;
        var delArr: any[] = [];

        var element: GameElement;
        var elementCount: number = this.showElements.length;
        for(let j = 0;j < elementCount;j++) {
            element = this.showElements[j];
            element.y += this.element_move_speed *speedOffset;
            if(element.y >= this.elementShow_Ypos) {
                delArr.push(element);
            }
        }
        //回收不显示的游戏元素
        for(let k = 0;k < delArr.length;k++) {
            element = delArr[k];
            this.game_play_bgs.removeChild(element);
            this.reclaim(element,"element");
            this.showElements.splice(this.showElements.indexOf(element),1);
        }
    }

	private element_Xpos_last:number = 0;
	//创建游戏元素
	private CreatElements(){
        var last_xpos = this.element_Xpos_last;
        var nums: number[] = this.element_Xpos;
	    var element:GameElement = this.produce("element");
	    //element.init(this.element_Types[Math.floor(Math.random() * this.element_Types.length)]);
	    element.init(Math.floor(Math.random() * 4));
        element.x = getXPos();
        element.y = - Math.floor(Math.random() * 200) ;

        this.element_Xpos_last = element.x;
        this.element_Xpos_last = element.x;
        this.game_play_bgs.addChild(element);
        this.showElements.push(element);    
        
       
        function getXPos():number{
            var value = nums[Math.floor(Math.random() * nums.length)];                     
            if(value == last_xpos){
                var index = nums.indexOf(value);
                var next;
                if(index == 0 || index == 1) next = nums.length - 1;
                else next = index - 2;
                return nums[next];
            }
            return value;
        }
       
	}
	
	//对象池产生游戏元素对象
	private produce(type:string):GameElement{
	    var element:GameElement;	   
	    if(this.cacheDict[type] == null){
	        this.cacheDict[type] = [];
	    }
        var dict: GameElement[] = this.cacheDict[type];
   
	    if(dict.length > 0){
            element = dict.pop();
	    }else{
	        element = new GameElement();
	    }
	    
	    return element;
	}
	
	//回收游戏元素对象
	private reclaim(element:GameElement,type:string){
	    
       if(this.cacheDict[type] == null){
            this.cacheDict[type] = [];
	    }
       var dict: GameElement[] = this.cacheDict[type];
       if(dict.indexOf(element) == -1){
           dict.push(element);
       }
      
	}
	
	
}
