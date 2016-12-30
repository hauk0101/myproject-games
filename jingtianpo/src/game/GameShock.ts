/**
 *
 * @author 
 *
 */
class GameShock {
    constructor() {
    }
    static MAP: number = 0;
    static SPRITE: number = 1;
    private mapPoss: Array<any> = [new egret.Point(0,10),new egret.Point(10,5),new egret.Point(-10,-5)];
    private spritePoss: Array<any> = [new egret.Point(10,0),new egret.Point(-10,0),new egret.Point(10,0)];
    private _shockPoss: Array<any>;
    private _shockLength: number = 0;
    private _shockCount: number = 0;
    public _target: egret.DisplayObject;
    private _rx: number = 0;
    private _ry: number = 0;
    private _type: number = 0;

    private _repeatCount: number = 0;
    private _isRunning: boolean = false;
    public destroy(): void {
        this.stop();
        this._target = null;
    }
    public shock(type: number = 0): void {
        this._type = type;
        if(this._type == GameShock.MAP) {
            this._shockPoss = this.mapPoss.concat();
            this._shockLength = this._shockPoss.length;
        }
        else if(this._type == GameShock.SPRITE) {
            this._shockPoss = this.spritePoss.concat();
            this._shockLength = this._shockPoss.length;
        }
    }
    public start(num: number = 1): void {
        if(this._isRunning) {
            this.stop();
        }
        this.repeatCount = num;
        this._shockCount = 0;
        if(this._target) {
            this._isRunning = true;
            this._rx = this._target.x;
            this._ry = this._target.y;
            egret.Ticker.getInstance().register(this.onShockEnter,this);
        }
    }
    public stop(): void {
        this._isRunning = false;
        if(this._target) {
            this._target.x = this._rx;
            this._target.y = this._ry;
            egret.Ticker.getInstance().unregister(this.onShockEnter,this);
        }
    }
    private onShockEnter(e: Event): void {
        var maxCount: number = this._shockLength * this._repeatCount;
        if(this._shockCount >= maxCount) {
            this.stop();
            return;
        }
        var index: number = this._shockCount % this._shockLength;
        var pos: egret.Point = this._shockPoss[index];
        if(this._target) {
            this._target.x = this._rx + pos.x;
            this._target.y = this._ry + pos.y;
        }
        this._shockCount++;
    }
    public get repeatCount(): number {
        return this._repeatCount;
    }
    public set repeatCount(value: number) {
        this._repeatCount = value;
    }
}
