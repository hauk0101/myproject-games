/**
 * 游戏背景
 * @author YaoQiao 
 * 
 */
class GamePlayBG extends eui.Component{
    
    private time_border_normal:eui.Image;
    private time_border_red:eui.Image;
    private group_game_bg:eui.Group;
    private group_rember_time:eui.Group;
    private rember_count_num:eui.Image;

    private btn_start:eui.Group;
    private btn_start_small:eui.Button;
    private btn_start_big:eui.Button;
    
	
    private startBtnTimer:egret.Timer;
    
    private selectGameElement1:GameElement = null;
    private selectGameElement2: GameElement = null;
  
    private showElements:GameElement[] = [];
    private elementPos:egret.Point[] = [];
    private allElements:GameElement[] = [];
    private show_timer:egret.Timer;
    private rember_timer:egret.Timer;
    private rember_count: number = 7;
    
    public constructor() {
    	super();
    	this.skinName = "src/components/GamePlayBGSkin.exml";  
        this.init();
	}
	
	private init(){             
        this.rember_count_num.source = "count_num_" + this.rember_count + "_png";     
        this.btn_start_small.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.btn_start_big.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.initGameElement();
        this.initShowPos();
        this.AddOrRemoveElement(true); 
        this.ShowBackOrElement(true);      
	}
    public StartBtnEffect() {
        this.group_rember_time.visible = false;
        this.startBtnTimer = new egret.Timer(500,0);
        this.startBtnTimer.addEventListener(egret.TimerEvent.TIMER,this.StartBtnTimerFunc,this);
        this.startBtnTimer.start();
    }

    public StopGame(){      
        this.AddOrRemoveClickListener(false);
        this.AddOrRemoveElement(false);
        this.selectGameElement1 = null;
        this.selectGameElement2 = null;  
        this.showElements = [];
        this.allElements = [];
    }
    
    public RestartGame() {
        this.btn_start_small.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.btn_start_big.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.rember_count = 7;
        this.rember_count_num.source = "count_num_" + this.rember_count + "_png";     
        this.initGameElement();
        this.AddOrRemoveElement(true);
        this.ShowBackOrElement(true);  
        this.btn_start.visible = true;
       
        this.StartBtnEffect();
       
    }

    private StartGame() {
        this.group_rember_time.visible = true;
        this.rember_timer = new egret.Timer(1000,this.rember_count);
        this.rember_timer.addEventListener(egret.TimerEvent.TIMER,this.SetRemberNum,this);
        this.rember_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.RemberCountComplete,this);
        this.rember_timer.start();
        this.RandomElementPos();
    }


    private StartBtnTimerFunc() {
        this.btn_start_big.visible = !this.btn_start_big.visible;
    }

    private StartBtnOnClick() {
        this.btn_start_small.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.btn_start_big.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.btn_start.visible = false;
        this.startBtnTimer.stop();
        this.startBtnTimer.removeEventListener(egret.TimerEvent.TIMER,this.StartBtnTimerFunc,this);
        this.startBtnTimer = null;
        this.StartGame();
        this.ShowBackOrElement(false);      
        
    }
    
    private SetRemberNum(){
        this.rember_count -= 1;       
        if(this.rember_count > 0){
            this.rember_count_num.source = "count_num_" + this.rember_count + "_png";
        }     
    }
    
    private RemberCountComplete(){
        this.rember_timer.stop();
        this.rember_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.RemberCountComplete,this);
        this.rember_timer.removeEventListener(egret.TimerEvent.TIMER,this.SetRemberNum,this);
        this.group_rember_time.visible = false;
        this.rember_timer = null;
        
        GameController.getInstance().TimeStart();
        this.ShowBackOrElement(true);
        this.AddOrRemoveClickListener(true);   
     
    }
    
	private GameElementOnClick(event:egret.TouchEvent){
        var tmp: GameElement = <GameElement>event.target;
        tmp.ShowElement();
        if(this.selectGameElement1 == null){
            this.selectGameElement1 = tmp;
            tmp.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.GameElementOnClick,this);
	    }else{
            this.AddOrRemoveClickListener(false);
	        this.selectGameElement2 = event.target;
	        //如果一致,设置“已找到”状态，删除显示数组中数据，为了方便移除对应的事件侦听
	        if(this.selectGameElement1.ElementType() == this.selectGameElement2.ElementType()){
	            this.selectGameElement1.IsFinded(true);
	            this.selectGameElement2.IsFinded(true);
	            var index = this.showElements.indexOf(this.selectGameElement1);
	            this.showElements.splice(index,1);
	            index = this.showElements.indexOf(this.selectGameElement2);
                this.showElements.splice(index,1);
                this.AddOrRemoveClickListener(true);    
                
                //根据不同判断添加不同得分
                GameController.getInstance().GameTotal("+",10);
                //如果全部找到，则直接游戏结束
                if(this.showElements.length == 0){
                    GameController.getInstance().GameStop();
                }
	        }//如果不一致
	        else{
                this.show_timer = new egret.Timer(500,1);
                this.show_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.TimerComplete,this);
                this.show_timer.start();
                //根据不同判断减少不同得分
                if(this.selectGameElement1.ElementType() == "1" || this.selectGameElement1.ElementType() == "8"
                    || this.selectGameElement2.ElementType() == "1" || this.selectGameElement2.ElementType() == "8")
                {
                    GameController.getInstance().ReduceDouble();
                }
	        }
	        
	        this.selectGameElement1 = null;
	        this.selectGameElement2 = null;
            
	    }	 
	}
	
	private TimerComplete(){
        this.show_timer.stop();
        this.show_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.TimerComplete,this);
        this.show_timer = null;
        this.ShowBackOrElement(true);
        this.AddOrRemoveClickListener(true);     
	}
	
	private ShowBackOrElement(isBack){
    	if(isBack){
            for(var i = 0;i < this.showElements.length;i++) {
                this.showElements[i].ShowBg();
            }
    	}
    	else{
            for(var i = 0;i < this.showElements.length;i++) {
                this.showElements[i].ShowElement();
            }
    	}
      
	}
	
	private AddOrRemoveElement(isAdd){
        if(isAdd){
            for(var i = 0,length = this.showElements.length;i < length;i++) {
                this.showElements[i].x = this.elementPos[i].x;
                this.showElements[i].y = this.elementPos[i].y;
                this.group_game_bg.addChild(this.showElements[i]);
             
            }
        }
        else{
            for(var j = 0,length = this.allElements.length;j<length;j++){
               
                this.group_game_bg.removeChild(this.allElements[j]);
            }
        }
        
	}
	
	//添加或者删除游戏元素侦听
	private AddOrRemoveClickListener(isAdd){
    	if(isAdd){
            for(var i = 0;i < this.showElements.length;i++) {
                this.showElements[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.GameElementOnClick,this);
            } 
    	}
    	else{
            for(var i = 0;i < this.allElements.length;i++) {
                this.allElements[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.GameElementOnClick,this);
            } 
    	}    
	}
	
	//初始化游戏元素的显示位置
	private initShowPos(){
	   var _startX:number = 25;
	   var _startY:number = 105;
	   var xValue:number = 110;
	   var yValue:number = 128;
	   var tmp = this.elementPos;
	   for(var i = 0 ; i < 4 ; i++){	       
	       for(var j = 0; j < 5;j++){
               var _point: egret.Point = new egret.Point();
               _point.x = _startX + xValue * i;
	           _point.y = _startY + yValue * j;
	           tmp.push(_point);
	       }
	   }
	}
	
	//初始化游戏元素
	private initGameElement(){
	    for(var i = 1; i <= 10;i++){
	        for(var j = 0; j < 2; j++){
	            var _ge:GameElement = new GameElement();
	            _ge.init(i);
	            this.showElements.push(_ge);
	            this.allElements.push(_ge);
	        }
	    }
	}
		
	private RandomElementPos(){
	    var tmpPoint:egret.Point = new egret.Point();
	    var tmp:number = 0;
    	for(var i = 0; i < this.showElements.length; i ++){
            tmp = Math.floor(Math.random() * this.showElements.length);
            tmpPoint.x = this.showElements[i].x;
            tmpPoint.y = this.showElements[i].y;
                      
            this.showElements[i].x = this.showElements[tmp].x;
            this.showElements[i].y = this.showElements[tmp].y;    	 
            this.showElements[tmp].x = tmpPoint.x;
            this.showElements[tmp].y = tmpPoint.y;
        }
	}
   
	
	



	
}
