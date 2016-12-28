/**
 * 游戏元素类
 * @author YaoQiao
 *
 */
class GameElement extends eui.Component{
	public static ELEMENT_EGG_1:number = 0;
    public static ELEMENT_EGG_2:number = 1;
    public static ELEMENT_CRAMERA_1:number = 2;
    public static ELEMENT_CRAMERA_2: number = 3;
    
    private group_egg1:eui.Group;
    private group_egg2: eui.Group;
    private group_camera1: eui.Group;
    private group_camera2: eui.Group;
    
    private element_egg1:eui.Button;
    private element_egg2:eui.Button;
    private element_camera1:eui.Button;
    private element_camera2:eui.Button;
    
    private tip_wrong_egg1:eui.Image;
    private tip_wrong_egg2:eui.Image;
    private tip_right_camera1:eui.Image;
    private tip_right_camera2:eui.Image;
    
    private isUseful:Boolean = false;
    private angle:number = 0;
    private speedLineX:number = 0;
    private speedLineY:number = 0;
    private moveSpeed:number = 0;
    
    public constructor() {
    	super();
    	this.skinName = "src/components/GameElementSkin.exml";

	}
	
	public  IsUserful():Boolean{
	    return this.isUseful;
	}
	
	public IsUserFul(value){
	    this.isUseful = value;
	}
	
	public init(type):void{
        this.restetButton();
        this.SetButton(type);
        this.isUseful = true;
        this.angle = Math.floor(Math.random() * 361);
        this.rotation = this.angle;
        this.scaleX = 0;
        this.scaleY = 0;
        this.speedLineX = Math.random() * 2 - 1;
        this.speedLineY = Math.random() * 2 - 1 >= 0?this.speedLineX:-this.speedLineX;
	}
	
	public speed(value):void{
	    this.moveSpeed = value;
	}
	
	//随机移动效果
	public MoveEffect1():void{
        this.x += this.speedLineX * this.moveSpeed;
        this.y += this.speedLineY * this.moveSpeed;
	}
	
	//大小变化效果
	public ScaleEffect(size,range):void{
	    this.scaleX +=  size;
	    this.scaleY += size;
	  
	    if(this.scaleX>= range || this.scaleY >= range){
	        this.scaleX = range;
	        this.scaleY = range;
	    }
	}
	
	public RotationEffect(angle):void{
	    this.rotation += angle;
	}
	
	
	private SetButton(type){
        switch(type) {
            case GameElement.ELEMENT_EGG_1:
                this.group_egg1.visible = true;         
                this.element_egg1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ElementEgg1OnClick,this);
                break;
            case GameElement.ELEMENT_EGG_2:
                this.group_egg2.visible = true;  
                this.element_egg2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ElementEgg2OnClick,this);
                break;
            case GameElement.ELEMENT_CRAMERA_1:
                this.group_camera1.visible = true;
                this.element_camera1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ElementCamera1OnClick,this);
                break;
            case GameElement.ELEMENT_CRAMERA_2:
                this.group_camera2.visible = true;
                this.element_camera2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ElementCamera2OnClick,this);
                break;
            default:
                break;
        }
	}
	
	private restetButton():void{
        this.group_egg1.visible = false;
        this.group_egg2.visible = false;
        this.group_camera1.visible = false;
        this.group_camera2.visible = false;
        
        this.tip_wrong_egg1.visible = false;
        this.tip_wrong_egg2.visible = false;
        this.tip_right_camera1.visible = false;
        this.tip_right_camera2.visible = false;
	}
	
	private ElementEgg1OnClick():void{
	    this.tip_wrong_egg1.visible = true;
	    this.element_egg1.visible = false;
        this.element_egg1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.ElementEgg1OnClick,this);
        
        this.ClickTipHide(this.tip_wrong_egg1);
        GameController.getInstance().ClearGameTotal();
	}
	
    private ElementEgg2OnClick():void{
        this.tip_wrong_egg2.visible = true;
        this.element_egg2.visible = false;
        this.element_egg2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.ElementEgg2OnClick,this);
        
        this.ClickTipHide(this.tip_wrong_egg2);
        GameController.getInstance().GameTotal("-",1);
    }
    
    private ElementCamera1OnClick(): void{
        this.tip_right_camera1.visible = true;
        this.element_camera1.visible = false;
        this.element_camera1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.ElementCamera1OnClick,this);
        
        this.ClickTipHide(this.tip_right_camera1);
 
        GameController.getInstance().GameTotal("+",2);
    }
    
    private ElementCamera2OnClick(): void {
        this.tip_right_camera2.visible = true;
        this.element_camera2.visible = false;
        this.element_camera2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.ElementCamera2OnClick,this);
        
        this.ClickTipHide(this.tip_right_camera2);
        GameController.getInstance().GameTotal("+",4);
    }
    
    private ClickTipHide(tip):void{     
        setTimeout(function() { 
            tip.visible = false;
        },500);      
        this.isUseful = false;
    }
    
   
	
}
