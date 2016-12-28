/**
 * 游戏背景
 * @author YaoQiao 
 * 
 */
class GamePlayBG extends eui.Component{
    
    private btn_start:eui.Group;
    private btn_start_small:eui.Button;
    private btn_start_big:eui.Button;
    private group_white_block:eui.Group;
    private role_girl:eui.Image;
    private role_boy:eui.Image;
    private group_game_element:eui.Group;
    
	
    private startBtnTimer:egret.Timer;
    private showElements:GameElement[] = [];
    private elementPos:egret.Point[] = [];
    private roleElements:eui.Image[] = [];
    private roleShow_timer:egret.Timer;
    private roleHide_timer:egret.Timer;
    private roleHideTime:number = 1000;
    private roleShowTimeMin:number = 1000;
    private roleShowTimeMax:number = 2000;
    
    private normalTimer:egret.Timer;
    private normalTime:number =  500;
    private manyTimer:egret.Timer;
   
    private isCreatingElement:Boolean = false;   
    private reciveTimer:egret.Timer;
    private manyElementNum = 3;
    private manyTime: number = 5;
    
    private cacheDict:Object={};
    public constructor() {
    	super();
    	this.skinName = "src/components/GamePlayBGSkin.exml";  
        this.init();
	}
	/*------------------游戏逻辑相关----------------------*/
	private init(){                   
        this.btn_start_small.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.btn_start_big.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.role_girl.addEventListener(egret.TouchEvent.TOUCH_TAP,this.AddTenPoint,this);
        this.role_boy.addEventListener(egret.TouchEvent.TOUCH_TAP,this.AddTenPoint,this);
        this.roleElements.push(this.role_girl);
        this.roleElements.push(this.role_boy);
        this.InitElementPos();
        this.AddWhiteBlocks();

	}
    public StartBtnEffect() {     
        this.startBtnTimer = new egret.Timer(500,0);
        this.startBtnTimer.addEventListener(egret.TimerEvent.TIMER,this.StartBtnTimerFunc,this);
        this.startBtnTimer.start();
              
    }

    public StopGame(){      
       
        this.normalTimer.stop();
        this.normalTimer.removeEventListener(egret.TimerEvent.TIMER,this.NormalTimer,this);
        this.normalTimer = null;
        
        this.manyTimer.stop();
        this.manyTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.ManyTimer,this);
        this.manyTimer = null;
        
        this.reciveTimer.stop();
        this.reciveTimer.removeEventListener(egret.TimerEvent.TIMER,this.ReciveTimer,this);
        this.reciveTimer = null;
        
        if(this.roleShow_timer != null){
            this.roleShow_timer.stop();
            this.roleShow_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.RoleTimerComplete,this);
            this.roleShow_timer = null;
        }
        if(this.roleHide_timer != null){
            this.roleHide_timer.stop();
            this.roleHide_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.RoleHideTimeComplete,this);
            this.roleHide_timer = null;
        }
       
        
    }
    
    public RestartGame() {
        this.btn_start_small.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.btn_start_big.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartBtnOnClick,this);
        this.btn_start.visible = true;   
        this.StartBtnEffect();
       
        this.HideAllElement();
    }

    private StartGame() {   
        this.showElements = [];
        
        this.roleShow_timer = new egret.Timer(this.GetRandomTimeCount(this.roleShowTimeMin,this.roleShowTimeMax),1);
        this.roleShow_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.RoleTimerComplete,this);
        this.roleShow_timer.start();
        
        this.normalTimer = new egret.Timer(this.normalTime);
        this.normalTimer.addEventListener(egret.TimerEvent.TIMER,this.NormalTimer,this);
        this.normalTimer.start();
        
        this.manyTimer = new egret.Timer(2000,1);
        this.manyTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.ManyTimer,this);
        this.manyTimer.start();
        //开启回收计时器
        this.reciveTimer = new egret.Timer(50);
        this.reciveTimer.addEventListener(egret.TimerEvent.TIMER,this.ReciveTimer,this);
        this.reciveTimer.start();
        
        GameController.getInstance().TimeStart();
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
       
    }
    
     
    
    /*-----------------------其它函数----------------------*/
 
    private HideAllElement(){
        for(var i = 0; i < this.roleElements.length;i++){
            this.roleElements[i].visible = false;
        }
     
        for(var j = 0; j < this.showElements.length;j++){
            this.showElements[j].visible = false;
            this.group_game_element.removeChild(this.showElements[j]);
        }
    }
    
    
    private ReciveTimer(){
        var element:GameElement;
        for(var i = 0; i < this.showElements.length;i++){
            element = this.showElements[i];
            if(!element.visible){
                this.reclaim(element,"element");
                this.showElements.splice(this.showElements.indexOf(element),1);
            }
        }
    }
    
    private ManyTimer() {
        this.manyTimer.stop();
        this.manyTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.ManyTimer,this);
        this.manyTimer = null;
       
        var num = Math.round(Math.random() + this.manyElementNum) + 1;
        for(var i=0;i<num;i++){
            if(this.showElements.length >= this.elementPos.length || this.isCreatingElement) {
                break;
            }
            this.isCreatingElement = true;
            this.CreateGameElement();
            this.isCreatingElement = false;
        }
        
        this.manyTimer = new egret.Timer(Math.round(Math.random() * this.manyTime + 1) * 1000,1);
        this.manyTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.ManyTimer,this);
        this.manyTimer.start();
    }
    
    private NormalTimer() {
        if(this.showElements.length >= this.elementPos.length || this.isCreatingElement) {
            return;
        }
        this.isCreatingElement = true;
        this.CreateGameElement();
        this.isCreatingElement = false;
    }

    
    private CreateGameElement(){     
        var element: GameElement = this.produce('element');
        this.group_game_element.addChild(element);
        element.init(Math.round(Math.random()));
        var point = this.GetElementPos(this.elementPos.length - 1);
        element.x = point.x;
        element.y = point.y;
        element.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ElementOnClick,this);
        element.visible = true;
        this.showElements.push(element);
    }
    
    
    private ElementOnClick(event:egret.TouchEvent){
        var element:GameElement = <GameElement>event.target;
        element.visible = false;
        if(element.GetElementType() == 0){
            //绿色为0
            GameController.getInstance().GameTotal('+',2);
        }else if(element.GetElementType() == 1){
            GameController.getInstance().GameTotal('-',1);
        }
    }
    
    private GetElementPos(length):egret.Point{
        var value = Math.round(Math.random() * length);       
        var point: egret.Point = this.elementPos[value];       
        var canShow:Boolean = true;
        for(var i = 0; i < this.showElements.length;i++){        
            if((this.showElements[i].x == point.x) && (this.showElements[i].y == point.y)){
                canShow = false;
            }
        }
      
        if(canShow){          
            return point;
        }else{         
            return this.GetElementPos(length);
        }
    }
    
    private RoleTimerComplete(){
        this.roleShow_timer.stop();
        this.roleShow_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.RoleTimerComplete,this);
        this.roleShow_timer = null;
        
        
        this.roleElements[0].visible = false;
        this.roleElements[1].visible = false;
        
        this.roleElements[Math.round(Math.random())].visible = true;
        this.roleHide_timer = new egret.Timer(this.roleHideTime,1);
        this.roleHide_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.RoleHideTimeComplete,this);
        this.roleHide_timer.start();
       
    }
    
    private RoleHideTimeComplete(){
        this.roleElements[0].visible = false;
        this.roleElements[1].visible = false;
        this.roleHide_timer.stop();
        this.roleHide_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.RoleHideTimeComplete,this);
        this.roleHide_timer = null;
        
        this.roleShow_timer = new egret.Timer(this.GetRandomTimeCount(this.roleShowTimeMin,this.roleShowTimeMax),1);
        this.roleShow_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.RoleTimerComplete,this);
        this.roleShow_timer.start();  
    }
    
    private AddTenPoint(){
        this.roleElements[0].visible = false;
        this.roleElements[1].visible = false;
        GameController.getInstance().GameTotal('+',10);
    }
    
    private GetRandomTimeCount(min,max):number{
        var result:number = min;
        result = Math.random() * max + min;
        return result;
    }
    
    private InitElementPos(){
        this.elementPos = [];
        var startX: number = 75;
        var startY: number = 205;
        var x_diff: number = 70;
        var y_diff: number = 65;
        
        var point:egret.Point;
        for(var i = 0;i < 5;i++) {
            for(var j = 0; j < 6;j++){
                point = new egret.Point();
                point.x = startX + x_diff * i;
                point.y = startY + y_diff * j;
                this.elementPos.push(point);
            }
        }
        
        //最下面两个
        point = new egret.Point();
        point.x = startX;
        point.y = startY + y_diff * 6;
        this.elementPos.push(point);
        
        point = new egret.Point();
        point.x = startX + x_diff * 4;
        point.y = startY + y_diff * 6;
        this.elementPos.push(point);
    }
    
    private AddWhiteBlocks(){
        var source:string = "white_block_png";
        var block:eui.Image;
        
        for(var i = 0; i < this.elementPos.length;i++){
            block = new eui.Image(source);
            block.width = 55;
            block.height = 55;
            this.group_white_block.addChild(block);
            block.x = this.elementPos[i].x;
            block.y = this.elementPos[i].y;
            block.touchEnabled = false;
        }
        
    }

    /*---------------------对象池----------------*/
    //对象池生产游戏元素对象
    private produce(type:string):GameElement{
        var element:GameElement;
        if(this.cacheDict[type] == null){
            this.cacheDict[type] = [];
        }
        var dict:GameElement[] = this.cacheDict[type];
        if(dict.length > 0){
            element = dict.pop();
        }else{
            element = new GameElement();
        }
        return element;
    }
	//对象池回收游戏元素对象
    private reclaim(element:GameElement,type:string){
        if(this.cacheDict[type] == null){
            this.cacheDict[type] = [];
        }
        var dict:GameElement[] = this.cacheDict[type];
        if(dict.indexOf(element) == -1){
            dict.push(element);
        }
    }
    
    
	


	
}
