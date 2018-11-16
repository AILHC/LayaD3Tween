
/**
 * author:AILHC
 * email:505126057@qq.com
 * gitHub:https://github.com/AILHC
 */
export default class D3Tween {
    private static tweenMap: any={};
    private static frame:number = 2;
    /**
     * 
     * @param target 目标物体
     * @param toPos 要去的目的地
     * @param duration 间隔
     * @param caller 回调执行领域
     * @param ease 缓动函数
     * @param complete 播放完成回调 
     * @param delay 延迟
     * @param coverBefore 是否覆盖上一个缓动
     * @param update 更新函数
     * @param frame 帧数间隔
     */
    public static MoveTo(target: Laya.Sprite3D, toPos: Laya.Vector3, duration: number, caller: any
        , ease?: Function, complete?: Function, delay: number=0, coverBefore: boolean = true, update?: Function,frame?:number) {
        let position: Laya.Vector3 = target.transform.position.clone();
        // target["position"] = target.transform.position;
        if (duration == 0||duration===undefined||duration===null) {
            target.transform.position = toPos.clone();
            complete && complete.apply(caller);
            return;
        }
        if(frame<=0||frame===undefined||frame===null){
            frame = this.frame;
        }
        let updateRenderPos = function () {
            if (target.transform) {
                target.transform.position = position;
            }
            update && update();
        };
        Laya.timer.once(delay, target, function () {
            Laya.timer.frameLoop(frame, target, updateRenderPos);
        });

        let endTween = function () {
            if (target.transform) {
                target.transform.position = toPos.clone();
                Laya.timer.clear(target, updateRenderPos);
            }
            complete && complete.apply(caller);
        }
        
        let tween = Laya.Tween.to(position, { x: toPos.x, y: toPos.y, z: toPos.z }, duration, ease, Laya.Handler.create(target, endTween), delay, coverBefore);
        if(!this.tweenMap[target.id]){
            this.tweenMap[target.id] = [];
        }
        this.tweenMap[target.id].push(tween);

    }
    public static RotateTo(target:Laya.Sprite3D,toRotation:Laya.Vector3,duration:number, caller: any
        , ease?: Function, complete?: Function, delay?: number, coverBefore?: boolean, update?: Function,frame?:number) {
            let rotation: Laya.Vector3 = target.transform.localRotationEuler.clone();
            if (duration == 0||duration===undefined||duration===null) {
                target.transform.localRotationEuler = toRotation.clone();
                complete && complete.apply(caller);
                return;
            }
            if(frame<=0||frame===undefined||frame===null){
                frame = this.frame;
            }
            let updateRenderRotation = function () {
                if (target.transform) {
                    target.transform.localRotationEuler = rotation;
                }
                update && update();
            };
            Laya.timer.once(delay, target, function () {
                Laya.timer.frameLoop(frame, target, updateRenderRotation);
            });
    
            let endTween = function () {
                if (target.transform) {
                    target.transform.localRotationEuler = toRotation.clone();
                    Laya.timer.clear(target, updateRenderRotation);
                }
                complete && complete.apply(caller);
            }
            
            let tween = Laya.Tween.to(rotation, { x: toRotation.x, y: toRotation.y, z: toRotation.z }, duration, ease, Laya.Handler.create(target, endTween), delay, coverBefore);
            if(!this.tweenMap[target.id]){
                this.tweenMap[target.id] = [];
            }
            this.tweenMap[target.id].push(tween)
            
        }
    public static ScaleTo(target: Laya.Sprite3D, toScale: Laya.Vector3, duration: number, caller: any
        , ease?: Function, complete?: Function, delay?: number, coverBefore?: boolean, update?: Function,frame?:number) {
        let localScale = target.transform.localScale.clone();
        if (duration == 0||duration===undefined||duration===null) {
            target.transform.localScale = toScale.clone();
            complete && complete.apply(caller);
            return;
        }
        if(frame<=0||frame===undefined||frame===null){
            frame = this.frame;
        }
        let updateRenderPos = function () {
            target.transform.localScale = localScale.clone();
            update && update();
        };
        Laya.timer.once(delay, this, function () {
            Laya.timer.frameLoop(frame, target, updateRenderPos);
        });
        let endTween = function () {
            target.transform.localScale = toScale.clone();
            Laya.timer.clear(target, updateRenderPos);
            complete && complete.apply(caller);
        }
        let tween = Laya.Tween.to(localScale, { x: toScale.x, y: toScale.y, z: toScale.z }, duration, ease, Laya.Handler.create(target, endTween), delay, coverBefore);
        if(!this.tweenMap[target.id]){
            this.tweenMap[target.id] = [];
        }
        this.tweenMap[target.id].push(tween);
    }
    public static ClearTween(target:Laya.Sprite3D){
        let tweens = this.tweenMap[target.id] as Array<Laya.Tween>;
        if(tweens&&tweens.length){
            while(tweens.length>0){
                let tween = tweens.pop();
                tween.clear();
            }
        }
        Laya.timer.clearAll(target);
    }
}