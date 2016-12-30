/**
 * 游戏角色
 * @author YaoQiao 
 * @2016-10-10
 */
class GameRole extends eui.Component {
    /**游戏敌人角色**/
    public static GAME_ROLE_ENEMY:string = "game_role_enemy";
    /**游戏主人公角色 **/
    public static GAME_ROLE_MY:string = "game_role_my";
    /**角色开火事件**/
    public static GAME_EVENT_FIRE:string = "game_event_fire";
    
    private role:egret.MovieClip;
    private touchDistance:egret.Point;
    private fireTimer:egret.Timer;
    private isShooted:boolean = false;
	public constructor(delayFire:number = 800) {
    	   super();
    	   this.touchDistance = new egret.Point();
           this.fireTimer = new egret.Timer(delayFire);
    	   this.fireTimer.addEventListener(egret.TimerEvent.TIMER,this.createBullet,this);
    }
	
	
	/**
	 * 创建游戏角色
	 * @param value 根据GameRole静态变量进行选择
	 */ 
	public CreateRole(value:string){
    	  var mc:egret.MovieClip;
	    if(value == GameRole.GAME_ROLE_ENEMY){
            var data = RES.getRes("enemyRole_json");
            var txtr = RES.getRes("enemyRole_png");
            var mcFactory = new egret.MovieClipDataFactory(data,txtr);
            mc = new egret.MovieClip(mcFactory.generateMovieClipData("enemy"));
            this.addChild(mc);
            mc.play(-1);
	    }
	    else if(value == GameRole.GAME_ROLE_MY){
            var data = RES.getRes("myRole_json");
            var txtr = RES.getRes("myRole_png");
            var mcFactory = new egret.MovieClipDataFactory(data,txtr);
            mc = new egret.MovieClip(mcFactory.generateMovieClipData("myRole"));
            this.addChild(mc);
            mc.play(-1);
	    }
	    this.role = mc;
	}
	
	public set IsShooted(value:boolean){
	    this.isShooted = value;
	}
    public get IsShooted():boolean{
	    return this.isShooted;
	}
	
	/**
	 * 设置游戏人物是否播放动画
	 * @param value 
	 */ 
	public set AnimationPlay(value:boolean){
	    if(this.role){
	       if(value){
	           this.role.play(-1);
	       }
	       else{
	           this.role.stop();
	       }
	    }
	}
	
	/**
	 * 开火
	 * @param value 是否开火
	 */ 
	public set Fire(value:boolean){
	    if(this.role){
	        if(value){
	            this.fireTimer.start();
	        }
	        else{
	            this.fireTimer.stop();
	        }
	    }
	}
	
	private createBullet(evt:egret.TimerEvent):void{
	    this.dispatchEventWith(GameRole.GAME_EVENT_FIRE);
	}
	
	/**
	 * 设置游戏角色是否可以触摸跟随
	 */ 
	public set TouchMove(value:boolean){
    	  if(!this.role) return;
	    if(value){     
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.TouchBeginHandle,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.TouchBeginHandle,this);
	    }
	    else{
            this.removeEventListener(egret.TouchEvent.TOUCH_END,this.TouchBeginHandle,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.TouchBeginHandle,this);
	    }
	}
	
    private TouchBeginHandle(evt: egret.TouchEvent){	    
	    var mc:egret.MovieClip = <egret.MovieClip>evt.currentTarget;
	    
	    this.touchDistance.x = evt.stageX - mc.x;
	    this.touchDistance.y = evt.stageY - mc.y;
        this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.TouchMoveHandle,this);
	}
	
	private TouchEndHandle(){
        this.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.TouchMoveHandle,this);
	}
	
	private TouchMoveHandle(evt:egret.TouchEvent){
	    this.x = evt.stageX - this.touchDistance.x;
	    this.y = evt.stageY - this.touchDistance.y;
	}
}
