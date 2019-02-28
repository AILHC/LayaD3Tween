export class TweenExt {
    public static init(){
        for(let key in TweenExt){
            if(key==="init")continue
            laya.utils.Tween.prototype[key] = TweenExt[key];
        }
    }
    private static _initProps(target, props, isTo) {
        for (let p in props) {
            if ((typeof (target[p]) == 'number')) {
                let start = isTo ? target[p] : props[p];
                let end = isTo ? props[p] : target[p];
                this["_props"].push([p, start, end - start]);
                if (!isTo) target[p] = start;
            }
            if (target[p] instanceof Laya.Vector4) {
                let v4_lerp = new Laya.Vector4();
                let v4_start = isTo ? target[p].clone() : props[p];
                let v4_end = isTo ? props[p] : target[p].clone();
                if (!(v4_start instanceof Laya.Vector4)) {
                    v4_start = new Laya.Vector4(v4_start.x, v4_start.y, v4_start.z, v4_start.w);
                }
                v4_end = new Laya.Vector4(v4_end.x, v4_end.y, v4_end.z, v4_end.w);
                Laya.Vector4.subtract(v4_end, v4_start, v4_lerp);
                this["_props"].push([p, v4_start, v4_lerp, v4_end]);
                if (!isTo) target[p] = v4_start;
            }
            if (target.transform && target.transform[p] instanceof Laya.Vector3) {
                let v3_lerp = new Laya.Vector3();
                let v3_start = isTo ? target.transform[p].clone() : props[p];
                let v3_end = isTo ? props[p] : target.transform[p].clone();
                if (!(v3_start instanceof Laya.Vector3)) {
                    v3_start = new Laya.Vector3(v3_start.x, v3_start.y, v3_start.z);
                }
                v3_end = new Laya.Vector3(v3_end.x, v3_end.y, v3_end.z);
                Laya.Vector3.subtract(v3_end, v3_start, v3_lerp);

                this["_props"].push([p, v3_start, v3_lerp, v3_end]);
                if (!isTo) target[p] = v3_start;
            }
        }
    }
    private static _updateEase(time: number) {
        var target = this["_target"];
        if (!target) return;
        if (target.destroyed) return this["clearTween"](target);
        var usedTimer = this["_usedTimer"] = time - this["_startTimer"] - this["_delay"];
        if (usedTimer < 0) return;
        if (usedTimer >= this["_duration"]) return this["complete"]();
        var ratio = usedTimer > 0 ? this["_ease"](usedTimer, 0, 1, this["_duration"]) : 0;
        var props = this["_props"];
        for (var i = 0, n = props.length; i < n; i++) {
            var prop = props[i];
            //对象的
            if (typeof target[prop[0]] === "number") {
                target[prop[0]] = prop[1] + (ratio * prop[2]);
            }
            //3d的

            if (target[prop[0]] instanceof Laya.Vector4) {
                let x = prop[1].x + (ratio * prop[2].x);
                let y = prop[1].y + (ratio * prop[2].y);
                let z = prop[1].z + (ratio * prop[2].z);
                let w = prop[1].w + (ratio * prop[2].w);
                target[prop[0]] = new Laya.Vector4(
                    x,
                    y,
                    z,
                    w);
            }
            if (target[prop[0]] instanceof Laya.Vector3) {
                let x = prop[1].x + (ratio * prop[2].x);
                let y = prop[1].y + (ratio * prop[2].y);
                let z = prop[1].z + (ratio * prop[2].z);
                target[prop[0]] = new Laya.Vector3(
                    x,
                    y,
                    z);
            }
            if (target.transform && target.transform[prop[0]] instanceof Laya.Vector3) {
                let x = prop[1].x + (ratio * prop[2].x);
                let y = prop[1].y + (ratio * prop[2].y);
                let z = prop[1].z + (ratio * prop[2].z);
                target.transform[prop[0]] = new Laya.Vector3(
                    x,
                    y,
                    z);
            }
        }

        if (this["update"]) this["update"].run();
    }
    private static complete() {
        if (!this["_target"]) return;
        Laya.timer.runTimer(this, this["firstStart"]);
        var handler = this["_complete"];
        this.completData()
        if (this["update"]) this["update"].run();
        this["_count"]++;
        if (this["repeat"] != 0 && this["_count"] >= this["repeat"]) {
            this["clear"]();
            handler && handler.run();
        } else {
            this["restart"]();
        }
    }
    private static completData() {
        var target = this["_target"];
        var props = this["_props"];
        for (var i = 0, n = props.length; i < n; i++) {
            var prop = props[i];
            if (typeof target[prop[0]] === "number") {
                target[prop[0]] = prop[1] + prop[2];
            }
            if (target[prop[0]] instanceof Laya.Vector4) {
                target[prop[0]] = prop[3]
            }
            if (target[prop[0]] instanceof Laya.Vector3) {
                target[prop[0]] = prop[3]
            }
            if (target.transform && target.transform[prop[0]] instanceof Laya.Vector3) {
                target.transform[prop[0]] = prop[3];
            }
        }
        
    }
}


