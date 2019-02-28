var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TweenExt_1 = require("./TweenExt");
var D3TweenTest = /** @class */ (function () {
    function D3TweenTest() {
    }
    D3TweenTest.prototype.startTest = function () {
        TweenExt_1.TweenExt.init();
        var scene = Laya.stage.addChild(new Laya.Scene3D());
        var camera = scene.addChild(new Laya.Camera(0, 0.1, 100));
        camera.transform.translate(new Laya.Vector3(0, 2, 5));
        camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
        camera.clearColor = new Laya.Vector4(0.2, 0.2, 0.2, 1.0);
        scene.ambientColor = new Laya.Vector3(1, 1, 1);
        // var directionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        // directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1.0, -1.0, -1.0));
        var mat = new Laya.UnlitMaterial();
        mat.albedoColor = new Laya.Vector4(0.1, 0.1, 0.1, 0.1);
        var box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.5, 0.5, 0.5)));
        box.meshRenderer.material = mat;
        Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function (tex) {
            mat.albedoTexture = tex;
        }));
        box.transform.position = new Laya.Vector3(2.0, 0.25, 0.6);
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var label_rotate = new Laya.Label();
        label_rotate.fontSize = 35;
        label_rotate.text = "旋转";
        label_rotate.color = "#ffffff";
        label_rotate.x = Laya.stage.width / 5;
        label_rotate.y = Laya.stage.height / 3;
        var label_move = new Laya.Label();
        label_move.fontSize = 35;
        label_move.text = "位移";
        label_move.color = "#ffffff";
        label_move.x = Laya.stage.width / 5 * 2;
        label_move.y = Laya.stage.height / 3;
        var label_scale = new Laya.Label();
        label_scale.fontSize = 35;
        label_scale.text = "缩放";
        label_scale.color = "#ffffff";
        label_scale.x = Laya.stage.width / 2;
        label_scale.y = Laya.stage.height / 3;
        var label_color = new Laya.Label();
        label_color.fontSize = 35;
        label_color.text = "改颜色";
        label_color.color = "#ffffff";
        label_color.x = Laya.stage.width / 5 * 3;
        label_color.y = Laya.stage.height / 3;
        Laya.stage.addChild(label_rotate);
        Laya.stage.addChild(label_move);
        Laya.stage.addChild(label_scale);
        Laya.stage.addChild(label_color);
        label_move.on(Laya.Event.CLICK, this, function () {
            if (label_move["to"]) {
                label_move["to"] = false;
                Laya.Tween.to(box, { position: { x: 0, y: 0, z: 0 } }, 10000, null, Laya.Handler.create(this, function () {
                    console.log("complete");
                    console.log(box.transform.position);
                }));
            }
            else {
                label_move["to"] = true;
                Laya.Tween.from(box, { position: { x: 1, y: 1, z: 2 } }, 10000, null, Laya.Handler.create(this, function () {
                    console.log("complete");
                    console.log(box.transform.position);
                }));
            }
        });
        label_rotate.on(Laya.Event.CLICK, this, function () {
            console.log("rotation:x:" + box.transform.rotationEuler.x + ",y:" + box.transform.rotationEuler.y + ",z:" + box.transform.rotationEuler.z);
            if (label_rotate["to"]) {
                label_rotate["to"] = false;
                Laya.Tween.to(box, { rotationEuler: { x: 120, y: 0, z: 0 } }, 5000, null, Laya.Handler.create(this, function () {
                    console.log("complete");
                    console.log(box.transform.rotationEuler);
                }));
            }
            else {
                label_rotate["to"] = true;
                Laya.Tween.from(box, { rotationEuler: { x: 30, y: 90, z: 90 } }, 5000, null, Laya.Handler.create(this, function () {
                    console.log("complete");
                    console.log(box.transform.rotationEuler);
                }));
            }
        });
        var scale_complete = function () {
            console.log("complete");
            console.log("scale:x:" + box.transform.scale.x + ",y:" + box.transform.scale.y + ",z:" + box.transform.scale.z);
        };
        label_scale.on(Laya.Event.CLICK, this, function () {
            console.log("scale:x:" + box.transform.scale.x + ",y:" + box.transform.scale.y + ",z:" + box.transform.scale.z);
            if (label_scale["to"]) {
                label_scale["to"] = false;
                Laya.Tween.to(box, { scale: { x: 1, y: 5, z: 1 } }, 5000, null, Laya.Handler.create(this, scale_complete), 0, true);
            }
            else {
                label_scale["to"] = true;
                Laya.Tween.to(box, { scale: { x: 2, y: 1, z: 1 } }, 5000, null, Laya.Handler.create(this, scale_complete), 10, true);
            }
        });
        var color_complete = function () {
            console.log("complete");
            console.log("label_color:x:\n            " + box.meshRenderer.sharedMaterial.albedoColor.x + "\n            ,y:" + box.meshRenderer.sharedMaterial.albedoColor.y + "\n            ,z:" + box.meshRenderer.sharedMaterial.albedoColor.z + "\n            ,w:" + box.meshRenderer.sharedMaterial.albedoColor.w);
            console.log("label_color:a:\n            " + box.meshRenderer.sharedMaterial.albedoColorA + "\n            ,r:" + box.meshRenderer.sharedMaterial.albedoColorR + "\n            ,g:" + box.meshRenderer.sharedMaterial.albedoColorG + "\n            ,b:" + box.meshRenderer.sharedMaterial.albedoColorB);
        };
        label_color.on(Laya.Event.CLICK, this, function () {
            console.log("label_color:x:\n            " + box.meshRenderer.sharedMaterial.albedoColor.x + "\n            ,y:" + box.meshRenderer.sharedMaterial.albedoColor.y + "\n            ,z:" + box.meshRenderer.sharedMaterial.albedoColor.z + "\n            ,w:" + box.meshRenderer.sharedMaterial.albedoColor.w);
            console.log("label_color:a:\n            " + box.meshRenderer.sharedMaterial.albedoColorA + "\n            ,r:" + box.meshRenderer.sharedMaterial.albedoColorR + "\n            ,g:" + box.meshRenderer.sharedMaterial.albedoColorG + "\n            ,b:" + box.meshRenderer.sharedMaterial.albedoColorB);
            if (label_color["to"]) {
                label_color["to"] = false;
                Laya.Tween.to(box.meshRenderer.sharedMaterial, { albedoColor: { x: 0.1, y: 0.2, z: 0.3, w: 0.4 } }, 5000, null, Laya.Handler.create(this, color_complete), 0, true);
            }
            else {
                label_color["to"] = true;
                Laya.Tween.to(box.meshRenderer.sharedMaterial, { albedoColor: { x: 0.5, y: 0.6, z: 0.7, w: 0.8 } }, 5000, Laya.Ease.quadInOut, Laya.Handler.create(this, color_complete), 10, true);
            }
        });
    };
    return D3TweenTest;
}());
exports.D3TweenTest = D3TweenTest;
},{"./TweenExt":5}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * author:AILHC
 * email:505126057@qq.com
 * gitHub:https://github.com/AILHC
 */
var D3Tween = /** @class */ (function () {
    function D3Tween() {
    }
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
    D3Tween.MoveTo = function (target, toPos, duration, caller, ease, complete, delay, coverBefore, update, frame) {
        if (delay === void 0) { delay = 0; }
        if (coverBefore === void 0) { coverBefore = true; }
        var position = target.transform.position.clone();
        // target["position"] = target.transform.position;
        if (duration == 0 || duration === undefined || duration === null) {
            target.transform.position = toPos.clone();
            complete && complete.apply(caller);
            return;
        }
        if (frame <= 0 || frame === undefined || frame === null) {
            frame = this.frame;
        }
        var updateRenderPos = function () {
            if (target.transform) {
                target.transform.position = position;
            }
            update && update();
        };
        Laya.timer.once(delay, target, function () {
            Laya.timer.frameLoop(frame, target, updateRenderPos);
        });
        var endTween = function () {
            if (target.transform) {
                target.transform.position = toPos.clone();
                Laya.timer.clear(target, updateRenderPos);
            }
            complete && complete.apply(caller);
        };
        var tween = Laya.Tween.to(position, { x: toPos.x, y: toPos.y, z: toPos.z }, duration, ease, Laya.Handler.create(target, endTween), delay, coverBefore);
        if (!this.tweenMap[target.id]) {
            this.tweenMap[target.id] = [];
        }
        this.tweenMap[target.id].push(tween);
    };
    D3Tween.RotateTo = function (target, toRotation, duration, caller, ease, complete, delay, coverBefore, update, frame) {
        var rotation = target.transform.localRotationEuler.clone();
        if (duration == 0 || duration === undefined || duration === null) {
            target.transform.localRotationEuler = toRotation.clone();
            complete && complete.apply(caller);
            return;
        }
        if (frame <= 0 || frame === undefined || frame === null) {
            frame = this.frame;
        }
        var updateRenderRotation = function () {
            if (target.transform) {
                target.transform.localRotationEuler = rotation;
            }
            update && update();
        };
        Laya.timer.once(delay, target, function () {
            Laya.timer.frameLoop(frame, target, updateRenderRotation);
        });
        var endTween = function () {
            if (target.transform) {
                target.transform.localRotationEuler = toRotation.clone();
                Laya.timer.clear(target, updateRenderRotation);
            }
            complete && complete.apply(caller);
        };
        var tween = Laya.Tween.to(rotation, { x: toRotation.x, y: toRotation.y, z: toRotation.z }, duration, ease, Laya.Handler.create(target, endTween), delay, coverBefore);
        if (!this.tweenMap[target.id]) {
            this.tweenMap[target.id] = [];
        }
        this.tweenMap[target.id].push(tween);
    };
    D3Tween.ScaleTo = function (target, toScale, duration, caller, ease, complete, delay, coverBefore, update, frame) {
        var localScale = target.transform.localScale.clone();
        if (duration == 0 || duration === undefined || duration === null) {
            target.transform.localScale = toScale.clone();
            complete && complete.apply(caller);
            return;
        }
        if (frame <= 0 || frame === undefined || frame === null) {
            frame = this.frame;
        }
        var updateRenderPos = function () {
            target.transform.localScale = localScale.clone();
            update && update();
        };
        Laya.timer.once(delay, this, function () {
            Laya.timer.frameLoop(frame, target, updateRenderPos);
        });
        var endTween = function () {
            target.transform.localScale = toScale.clone();
            Laya.timer.clear(target, updateRenderPos);
            complete && complete.apply(caller);
        };
        var tween = Laya.Tween.to(localScale, { x: toScale.x, y: toScale.y, z: toScale.z }, duration, ease, Laya.Handler.create(target, endTween), delay, coverBefore);
        if (!this.tweenMap[target.id]) {
            this.tweenMap[target.id] = [];
        }
        this.tweenMap[target.id].push(tween);
    };
    /**
     * 清除3d物体上的所有缓动动画
     * @param target
     */
    D3Tween.ClearTween = function (target) {
        var tweens = this.tweenMap[target.id];
        if (tweens && tweens.length) {
            while (tweens.length > 0) {
                var tween = tweens.pop();
                tween.clear();
            }
        }
        Laya.timer.clearAll(target);
    };
    D3Tween.tweenMap = {};
    D3Tween.frame = 2;
    return D3Tween;
}());
exports.default = D3Tween;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var GameUI_1 = require("./script/GameUI");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
        reg("script/GameUI.ts", GameUI_1.default);
    };
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/TestScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/GameUI":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var D3TweenTest_1 = require("./D3TweenTest");
var Main = /** @class */ (function () {
    function Main() {
        //根据IDE设置初始化引擎		
        if (window["Laya3D"])
            Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height);
        else
            Laya.init(GameConfig_1.default.width, GameConfig_1.default.height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = GameConfig_1.default.scaleMode;
        Laya.stage.screenMode = GameConfig_1.default.screenMode;
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig_1.default.exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig_1.default.debug || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (GameConfig_1.default.physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (GameConfig_1.default.stat)
            Laya.Stat.show();
        Laya.alertGlobalError = true;
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }
    Main.prototype.onVersionLoaded = function () {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    };
    Main.prototype.onConfigLoaded = function () {
        //加载IDE指定的场景
        // GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        var test = new D3TweenTest_1.D3TweenTest();
        test.startTest();
    };
    return Main;
}());
//激活启动类
new Main();
},{"./D3TweenTest":1,"./GameConfig":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TweenExt = /** @class */ (function () {
    function TweenExt() {
    }
    TweenExt.init = function () {
        for (var key in TweenExt) {
            if (key === "init")
                continue;
            laya.utils.Tween.prototype[key] = TweenExt[key];
        }
    };
    TweenExt._initProps = function (target, props, isTo) {
        for (var p in props) {
            if ((typeof (target[p]) == 'number')) {
                var start = isTo ? target[p] : props[p];
                var end = isTo ? props[p] : target[p];
                this["_props"].push([p, start, end - start]);
                if (!isTo)
                    target[p] = start;
            }
            if (target[p] instanceof Laya.Vector4) {
                var v4_lerp = new Laya.Vector4();
                var v4_start = isTo ? target[p].clone() : props[p];
                var v4_end = isTo ? props[p] : target[p].clone();
                if (!(v4_start instanceof Laya.Vector4)) {
                    v4_start = new Laya.Vector4(v4_start.x, v4_start.y, v4_start.z, v4_start.w);
                }
                v4_end = new Laya.Vector4(v4_end.x, v4_end.y, v4_end.z, v4_end.w);
                Laya.Vector4.subtract(v4_end, v4_start, v4_lerp);
                this["_props"].push([p, v4_start, v4_lerp, v4_end]);
                if (!isTo)
                    target[p] = v4_start;
            }
            if (target.transform && target.transform[p] instanceof Laya.Vector3) {
                var v3_lerp = new Laya.Vector3();
                var v3_start = isTo ? target.transform[p].clone() : props[p];
                var v3_end = isTo ? props[p] : target.transform[p].clone();
                if (!(v3_start instanceof Laya.Vector3)) {
                    v3_start = new Laya.Vector3(v3_start.x, v3_start.y, v3_start.z);
                }
                v3_end = new Laya.Vector3(v3_end.x, v3_end.y, v3_end.z);
                Laya.Vector3.subtract(v3_end, v3_start, v3_lerp);
                this["_props"].push([p, v3_start, v3_lerp, v3_end]);
                if (!isTo)
                    target[p] = v3_start;
            }
        }
    };
    TweenExt._updateEase = function (time) {
        var target = this["_target"];
        if (!target)
            return;
        if (target.destroyed)
            return this["clearTween"](target);
        var usedTimer = this["_usedTimer"] = time - this["_startTimer"] - this["_delay"];
        if (usedTimer < 0)
            return;
        if (usedTimer >= this["_duration"])
            return this["complete"]();
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
                var x = prop[1].x + (ratio * prop[2].x);
                var y = prop[1].y + (ratio * prop[2].y);
                var z = prop[1].z + (ratio * prop[2].z);
                var w = prop[1].w + (ratio * prop[2].w);
                target[prop[0]] = new Laya.Vector4(x, y, z, w);
            }
            if (target[prop[0]] instanceof Laya.Vector3) {
                var x = prop[1].x + (ratio * prop[2].x);
                var y = prop[1].y + (ratio * prop[2].y);
                var z = prop[1].z + (ratio * prop[2].z);
                target[prop[0]] = new Laya.Vector3(x, y, z);
            }
            if (target.transform && target.transform[prop[0]] instanceof Laya.Vector3) {
                var x = prop[1].x + (ratio * prop[2].x);
                var y = prop[1].y + (ratio * prop[2].y);
                var z = prop[1].z + (ratio * prop[2].z);
                target.transform[prop[0]] = new Laya.Vector3(x, y, z);
            }
        }
        if (this["update"])
            this["update"].run();
    };
    TweenExt.complete = function () {
        if (!this["_target"])
            return;
        Laya.timer.runTimer(this, this["firstStart"]);
        var handler = this["_complete"];
        this.completData();
        if (this["update"])
            this["update"].run();
        this["_count"]++;
        if (this["repeat"] != 0 && this["_count"] >= this["repeat"]) {
            this["clear"]();
            handler && handler.run();
        }
        else {
            this["restart"]();
        }
    };
    TweenExt.completData = function () {
        var target = this["_target"];
        var props = this["_props"];
        for (var i = 0, n = props.length; i < n; i++) {
            var prop = props[i];
            if (typeof target[prop[0]] === "number") {
                target[prop[0]] = prop[1] + prop[2];
            }
            if (target[prop[0]] instanceof Laya.Vector4) {
                target[prop[0]] = prop[3];
            }
            if (target[prop[0]] instanceof Laya.Vector3) {
                target[prop[0]] = prop[3];
            }
            if (target.transform && target.transform[prop[0]] instanceof Laya.Vector3) {
                target.transform[prop[0]] = prop[3];
            }
        }
    };
    return TweenExt;
}());
exports.TweenExt = TweenExt;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./../ui/layaMaxUI");
var D3Tween_old_1 = require("../D3Tween_old");
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super.call(this) || this;
        //添加3D场景
        var scene = Laya.stage.addChild(new Laya.Scene3D());
        //添加照相机
        var camera = (scene.addChild(new Laya.Camera(0, 0.1, 100)));
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        //添加方向光
        var directionLight = scene.addChild(new Laya.DirectionLight());
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
        //添加自定义模型
        var box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1)));
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material = new Laya.BlinnPhongMaterial();
        Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function (tex) {
            material.albedoTexture = tex;
        }));
        box.meshRenderer.material = material;
        var self = _this;
        _this.moveB.on(Laya.Event.CLICK, _this, function () {
            self.moveB.mouseEnabled = false;
            var toPos1 = new Laya.Vector3(box.transform.position.x, box.transform.position.y + 2, box.transform.position.z);
            D3Tween_old_1.default.MoveTo(box, toPos1, 1000, this, null, function () {
                var toPos2 = new Laya.Vector3(box.transform.position.x, box.transform.position.y - 2, box.transform.position.z);
                D3Tween_old_1.default.MoveTo(box, toPos2, 1000, self, Laya.Ease.quadInOut, function () {
                    self.moveB.mouseEnabled = true;
                });
            });
        });
        _this.rotateB.on(Laya.Event.CLICK, _this, function () {
            self.rotateB.mouseEnabled = false;
            var toRot1 = new Laya.Vector3(box.transform.localRotationEuler.x, box.transform.localRotationEuler.y + 60, box.transform.localRotationEuler.z);
            D3Tween_old_1.default.RotateTo(box, toRot1, 1000, this, null, function () {
                var toRot2 = new Laya.Vector3(box.transform.localRotationEuler.x, box.transform.localRotationEuler.y, box.transform.localRotationEuler.z + 60);
                D3Tween_old_1.default.RotateTo(box, toRot2, 1000, this, Laya.Ease.expoInOut, function () {
                    self.rotateB.mouseEnabled = true;
                });
            });
        });
        _this.scaleB.on(Laya.Event.CLICK, _this, function () {
            self.scaleB.mouseEnabled = false;
            var toScale1 = new Laya.Vector3(box.transform.localScale.x, box.transform.localScale.y + 2, box.transform.localScale.z);
            D3Tween_old_1.default.ScaleTo(box, toScale1, 1000, this, null, function () {
                var toScale2 = new Laya.Vector3(box.transform.localScale.x, box.transform.localScale.y - 2, box.transform.localScale.z);
                D3Tween_old_1.default.ScaleTo(box, toScale2, 1000, self, Laya.Ease.quadInOut, function () {
                    self.scaleB.mouseEnabled = true;
                });
            });
        });
        return _this;
    }
    return GameUI;
}(layaMaxUI_1.ui.test.TestSceneUI));
exports.default = GameUI;
},{"../D3Tween_old":2,"./../ui/layaMaxUI":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = Laya.Scene;
var ui;
(function (ui) {
    var test;
    (function (test) {
        var TestSceneUI = /** @class */ (function (_super) {
            __extends(TestSceneUI, _super);
            function TestSceneUI() {
                return _super.call(this) || this;
            }
            TestSceneUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadScene("test/TestScene");
            };
            return TestSceneUI;
        }(Scene));
        test.TestSceneUI = TestSceneUI;
    })(test = ui.test || (ui.test = {}));
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L1NvZnR3YXJlU3BhY2UvTGF5YUFpcklERS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvRDNUd2VlblRlc3QudHMiLCJzcmMvRDNUd2Vlbl9vbGQudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9NYWluLnRzIiwic3JjL1R3ZWVuRXh0LnRzIiwic3JjL3NjcmlwdC9HYW1lVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBLHVDQUFzQztBQUV0QztJQUFBO0lBMklBLENBQUM7SUExSUcsK0JBQVMsR0FBVDtRQUNJLG1CQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQWlCLENBQUM7UUFDcEUsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBZ0IsQ0FBQztRQUN6RSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWxFLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0MseUZBQXlGO1FBQ3pGLHNGQUFzRjtRQUN0RixJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNuQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN2RCxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQXNCLENBQUM7UUFDbEgsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxVQUFVLEdBQW1CO1lBQzFGLEdBQUcsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDSixHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRCxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0QsSUFBSSxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEMsWUFBWSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDM0IsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDekIsWUFBWSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDL0IsWUFBWSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDdEMsWUFBWSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsVUFBVSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDekIsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDdkIsVUFBVSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDN0IsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksV0FBVyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLFdBQVcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQzFCLFdBQVcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLFdBQVcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQzlCLFdBQVcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksV0FBVyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLFdBQVcsQ0FBQyxR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LEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFXZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBUd2VlbkV4dCB9IGZyb20gXCIuL1R3ZWVuRXh0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRDNUd2VlblRlc3Qge1xyXG4gICAgc3RhcnRUZXN0KCkge1xyXG4gICAgICAgIFR3ZWVuRXh0LmluaXQoKTtcclxuICAgICAgICB2YXIgc2NlbmUgPSBMYXlhLnN0YWdlLmFkZENoaWxkKG5ldyBMYXlhLlNjZW5lM0QoKSkgYXMgTGF5YS5TY2VuZTNEO1xyXG4gICAgICAgIHZhciBjYW1lcmEgPSBzY2VuZS5hZGRDaGlsZChuZXcgTGF5YS5DYW1lcmEoMCwgMC4xLCAxMDApKSBhcyBMYXlhLkNhbWVyYTtcclxuICAgICAgICBjYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDIsIDUpKTtcclxuICAgICAgICBjYW1lcmEudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKC0xNSwgMCwgMCksIHRydWUsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgY2FtZXJhLmNsZWFyQ29sb3IgPSBuZXcgTGF5YS5WZWN0b3I0KDAuMiwgMC4yLCAwLjIsIDEuMCk7XHJcbiAgICAgICAgc2NlbmUuYW1iaWVudENvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKTtcclxuICAgICAgICAvLyB2YXIgZGlyZWN0aW9uTGlnaHQgPSBzY2VuZS5hZGRDaGlsZChuZXcgTGF5YS5EaXJlY3Rpb25MaWdodCgpKSBhcyBMYXlhLkRpcmVjdGlvbkxpZ2h0O1xyXG4gICAgICAgIC8vIGRpcmVjdGlvbkxpZ2h0LnRyYW5zZm9ybS53b3JsZE1hdHJpeC5zZXRGb3J3YXJkKG5ldyBMYXlhLlZlY3RvcjMoMS4wLCAtMS4wLCAtMS4wKSk7XHJcbiAgICAgICAgbGV0IG1hdCA9IG5ldyBMYXlhLlVubGl0TWF0ZXJpYWwoKTtcclxuICAgICAgICBtYXQuYWxiZWRvQ29sb3IgPSBuZXcgTGF5YS5WZWN0b3I0KDAuMSwgMC4xLCAwLjEsIDAuMSk7XHJcbiAgICAgICAgdmFyIGJveCA9IHNjZW5lLmFkZENoaWxkKG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuNSwgMC41LCAwLjUpKSkgYXMgTGF5YS5NZXNoU3ByaXRlM0Q7XHJcbiAgICAgICAgYm94Lm1lc2hSZW5kZXJlci5tYXRlcmlhbCA9IG1hdDtcclxuICAgICAgICBMYXlhLlRleHR1cmUyRC5sb2FkKFwicmVzL2xheWFib3gucG5nXCIsIExheWEuSGFuZGxlci5jcmVhdGUobnVsbCwgZnVuY3Rpb24gKHRleDogTGF5YS5UZXh0dXJlMkQpIHtcclxuICAgICAgICAgICAgbWF0LmFsYmVkb1RleHR1cmUgPSB0ZXg7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGJveC50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKDIuMCwgMC4yNSwgMC42KTtcclxuICAgICAgICBib3gudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDQ1LCAwKSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBsZXQgbGFiZWxfcm90YXRlID0gbmV3IExheWEuTGFiZWwoKTtcclxuICAgICAgICBsYWJlbF9yb3RhdGUuZm9udFNpemUgPSAzNTtcclxuICAgICAgICBsYWJlbF9yb3RhdGUudGV4dCA9IFwi5peL6L2sXCI7XHJcbiAgICAgICAgbGFiZWxfcm90YXRlLmNvbG9yID0gXCIjZmZmZmZmXCI7XHJcbiAgICAgICAgbGFiZWxfcm90YXRlLnggPSBMYXlhLnN0YWdlLndpZHRoIC8gNTtcclxuICAgICAgICBsYWJlbF9yb3RhdGUueSA9IExheWEuc3RhZ2UuaGVpZ2h0IC8gMztcclxuICAgICAgICBsZXQgbGFiZWxfbW92ZSA9IG5ldyBMYXlhLkxhYmVsKCk7XHJcbiAgICAgICAgbGFiZWxfbW92ZS5mb250U2l6ZSA9IDM1O1xyXG4gICAgICAgIGxhYmVsX21vdmUudGV4dCA9IFwi5L2N56e7XCI7XHJcbiAgICAgICAgbGFiZWxfbW92ZS5jb2xvciA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIGxhYmVsX21vdmUueCA9IExheWEuc3RhZ2Uud2lkdGggLyA1ICogMjtcclxuICAgICAgICBsYWJlbF9tb3ZlLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAvIDM7XHJcbiAgICAgICAgbGV0IGxhYmVsX3NjYWxlID0gbmV3IExheWEuTGFiZWwoKTtcclxuICAgICAgICBsYWJlbF9zY2FsZS5mb250U2l6ZSA9IDM1O1xyXG4gICAgICAgIGxhYmVsX3NjYWxlLnRleHQgPSBcIue8qeaUvlwiO1xyXG4gICAgICAgIGxhYmVsX3NjYWxlLmNvbG9yID0gXCIjZmZmZmZmXCI7XHJcbiAgICAgICAgbGFiZWxfc2NhbGUueCA9IExheWEuc3RhZ2Uud2lkdGggLyAyO1xyXG4gICAgICAgIGxhYmVsX3NjYWxlLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAvIDM7XHJcbiAgICAgICAgbGV0IGxhYmVsX2NvbG9yID0gbmV3IExheWEuTGFiZWwoKTtcclxuICAgICAgICBsYWJlbF9jb2xvci5mb250U2l6ZSA9IDM1O1xyXG4gICAgICAgIGxhYmVsX2NvbG9yLnRleHQgPSBcIuaUueminOiJslwiO1xyXG4gICAgICAgIGxhYmVsX2NvbG9yLmNvbG9yID0gXCIjZmZmZmZmXCI7XHJcbiAgICAgICAgbGFiZWxfY29sb3IueCA9IExheWEuc3RhZ2Uud2lkdGggLyA1ICogMztcclxuICAgICAgICBsYWJlbF9jb2xvci55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLyAzO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQobGFiZWxfcm90YXRlKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKGxhYmVsX21vdmUpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQobGFiZWxfc2NhbGUpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQobGFiZWxfY29sb3IpO1xyXG4gICAgICAgIGxhYmVsX21vdmUub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobGFiZWxfbW92ZVtcInRvXCJdKSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbF9tb3ZlW1widG9cIl0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIExheWEuVHdlZW4udG8oYm94LCB7IHBvc2l0aW9uOiB7IHg6IDAsIHk6IDAsIHo6IDAgfSB9LCAxMDAwMCwgbnVsbCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib3gudHJhbnNmb3JtLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsX21vdmVbXCJ0b1wiXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBMYXlhLlR3ZWVuLmZyb20oYm94LCB7IHBvc2l0aW9uOiB7IHg6IDEsIHk6IDEsIHo6IDIgfSB9LCAxMDAwMCwgbnVsbCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib3gudHJhbnNmb3JtLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxhYmVsX3JvdGF0ZS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGByb3RhdGlvbjp4OiR7Ym94LnRyYW5zZm9ybS5yb3RhdGlvbkV1bGVyLnh9LHk6JHtib3gudHJhbnNmb3JtLnJvdGF0aW9uRXVsZXIueX0sejoke2JveC50cmFuc2Zvcm0ucm90YXRpb25FdWxlci56fWApO1xyXG4gICAgICAgICAgICBpZiAobGFiZWxfcm90YXRlW1widG9cIl0pIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsX3JvdGF0ZVtcInRvXCJdID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgTGF5YS5Ud2Vlbi50byhib3gsIHsgcm90YXRpb25FdWxlcjogeyB4OiAxMjAsIHk6IDAsIHo6IDAgfSB9LCA1MDAwLCBudWxsLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJveC50cmFuc2Zvcm0ucm90YXRpb25FdWxlcik7XHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsX3JvdGF0ZVtcInRvXCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIExheWEuVHdlZW4uZnJvbShib3gsIHsgcm90YXRpb25FdWxlcjogeyB4OiAzMCwgeTogOTAsIHo6IDkwIH0gfSwgNTAwMCwgbnVsbCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib3gudHJhbnNmb3JtLnJvdGF0aW9uRXVsZXIpO1xyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc2NhbGVfY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzY2FsZTp4OiR7Ym94LnRyYW5zZm9ybS5zY2FsZS54fSx5OiR7Ym94LnRyYW5zZm9ybS5zY2FsZS55fSx6OiR7Ym94LnRyYW5zZm9ybS5zY2FsZS56fWApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGFiZWxfc2NhbGUub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgc2NhbGU6eDoke2JveC50cmFuc2Zvcm0uc2NhbGUueH0seToke2JveC50cmFuc2Zvcm0uc2NhbGUueX0sejoke2JveC50cmFuc2Zvcm0uc2NhbGUuen1gKTtcclxuICAgICAgICAgICAgaWYgKGxhYmVsX3NjYWxlW1widG9cIl0pIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsX3NjYWxlW1widG9cIl0gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBMYXlhLlR3ZWVuLnRvKGJveCwgeyBzY2FsZTogeyB4OiAxLCB5OiA1LCB6OiAxIH0gfSwgNTAwMCwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHNjYWxlX2NvbXBsZXRlKSwgMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbF9zY2FsZVtcInRvXCJdID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBMYXlhLlR3ZWVuLnRvKGJveCwgeyBzY2FsZTogeyB4OiAyLCB5OiAxLCB6OiAxIH0gfSwgNTAwMCwgbnVsbCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBzY2FsZV9jb21wbGV0ZSksIDEwLCB0cnVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGNvbG9yX2NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgbGFiZWxfY29sb3I6eDpcclxuICAgICAgICAgICAgJHsoYm94Lm1lc2hSZW5kZXJlci5zaGFyZWRNYXRlcmlhbCBhcyBMYXlhLlVubGl0TWF0ZXJpYWwpLmFsYmVkb0NvbG9yLnh9XHJcbiAgICAgICAgICAgICx5OiR7KGJveC5tZXNoUmVuZGVyZXIuc2hhcmVkTWF0ZXJpYWwgYXMgTGF5YS5VbmxpdE1hdGVyaWFsKS5hbGJlZG9Db2xvci55fVxyXG4gICAgICAgICAgICAsejokeyhib3gubWVzaFJlbmRlcmVyLnNoYXJlZE1hdGVyaWFsIGFzIExheWEuVW5saXRNYXRlcmlhbCkuYWxiZWRvQ29sb3Iuen1cclxuICAgICAgICAgICAgLHc6JHsoYm94Lm1lc2hSZW5kZXJlci5zaGFyZWRNYXRlcmlhbCBhcyBMYXlhLlVubGl0TWF0ZXJpYWwpLmFsYmVkb0NvbG9yLnd9YCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBsYWJlbF9jb2xvcjphOlxyXG4gICAgICAgICAgICAkeyhib3gubWVzaFJlbmRlcmVyLnNoYXJlZE1hdGVyaWFsIGFzIExheWEuVW5saXRNYXRlcmlhbCkuYWxiZWRvQ29sb3JBfVxyXG4gICAgICAgICAgICAscjokeyhib3gubWVzaFJlbmRlcmVyLnNoYXJlZE1hdGVyaWFsIGFzIExheWEuVW5saXRNYXRlcmlhbCkuYWxiZWRvQ29sb3JSfVxyXG4gICAgICAgICAgICAsZzokeyhib3gubWVzaFJlbmRlcmVyLnNoYXJlZE1hdGVyaWFsIGFzIExheWEuVW5saXRNYXRlcmlhbCkuYWxiZWRvQ29sb3JHfVxyXG4gICAgICAgICAgICAsYjokeyhib3gubWVzaFJlbmRlcmVyLnNoYXJlZE1hdGVyaWFsIGFzIExheWEuVW5saXRNYXRlcmlhbCkuYWxiZWRvQ29sb3JCfWApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGFiZWxfY29sb3Iub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgbGFiZWxfY29sb3I6eDpcclxuICAgICAgICAgICAgJHsoYm94Lm1lc2hSZW5kZXJlci5zaGFyZWRNYXRlcmlhbCBhcyBMYXlhLlVubGl0TWF0ZXJpYWwpLmFsYmVkb0NvbG9yLnh9XHJcbiAgICAgICAgICAgICx5OiR7KGJveC5tZXNoUmVuZGVyZXIuc2hhcmVkTWF0ZXJpYWwgYXMgTGF5YS5VbmxpdE1hdGVyaWFsKS5hbGJlZG9Db2xvci55fVxyXG4gICAgICAgICAgICAsejokeyhib3gubWVzaFJlbmRlcmVyLnNoYXJlZE1hdGVyaWFsIGFzIExheWEuVW5saXRNYXRlcmlhbCkuYWxiZWRvQ29sb3Iuen1cclxuICAgICAgICAgICAgLHc6JHsoYm94Lm1lc2hSZW5kZXJlci5zaGFyZWRNYXRlcmlhbCBhcyBMYXlhLlVubGl0TWF0ZXJpYWwpLmFsYmVkb0NvbG9yLnd9YCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBsYWJlbF9jb2xvcjphOlxyXG4gICAgICAgICAgICAkeyhib3gubWVzaFJlbmRlcmVyLnNoYXJlZE1hdGVyaWFsIGFzIExheWEuVW5saXRNYXRlcmlhbCkuYWxiZWRvQ29sb3JBfVxyXG4gICAgICAgICAgICAscjokeyhib3gubWVzaFJlbmRlcmVyLnNoYXJlZE1hdGVyaWFsIGFzIExheWEuVW5saXRNYXRlcmlhbCkuYWxiZWRvQ29sb3JSfVxyXG4gICAgICAgICAgICAsZzokeyhib3gubWVzaFJlbmRlcmVyLnNoYXJlZE1hdGVyaWFsIGFzIExheWEuVW5saXRNYXRlcmlhbCkuYWxiZWRvQ29sb3JHfVxyXG4gICAgICAgICAgICAsYjokeyhib3gubWVzaFJlbmRlcmVyLnNoYXJlZE1hdGVyaWFsIGFzIExheWEuVW5saXRNYXRlcmlhbCkuYWxiZWRvQ29sb3JCfWApO1xyXG4gICAgICAgICAgICBpZiAobGFiZWxfY29sb3JbXCJ0b1wiXSkge1xyXG4gICAgICAgICAgICAgICAgbGFiZWxfY29sb3JbXCJ0b1wiXSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIExheWEuVHdlZW4udG8oYm94Lm1lc2hSZW5kZXJlci5zaGFyZWRNYXRlcmlhbCwgeyBhbGJlZG9Db2xvcjogeyB4OiAwLjEsIHk6IDAuMiwgejogMC4zLCB3OiAwLjQgfSB9LCA1MDAwLCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgY29sb3JfY29tcGxldGUpLCAwLCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsX2NvbG9yW1widG9cIl0gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIExheWEuVHdlZW4udG8oYm94Lm1lc2hSZW5kZXJlci5zaGFyZWRNYXRlcmlhbFxyXG4gICAgICAgICAgICAgICAgICAgICwgeyBhbGJlZG9Db2xvcjogeyB4OiAwLjUsIHk6IDAuNiwgejogMC43LCB3OiAwLjggfSB9LCA1MDAwLCBMYXlhLkVhc2UucXVhZEluT3V0XHJcbiAgICAgICAgICAgICAgICAgICAgLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIGNvbG9yX2NvbXBsZXRlKSwgMTAsIHRydWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9XHJcbn0iLCJcclxuLyoqXHJcbiAqIGF1dGhvcjpBSUxIQ1xyXG4gKiBlbWFpbDo1MDUxMjYwNTdAcXEuY29tXHJcbiAqIGdpdEh1YjpodHRwczovL2dpdGh1Yi5jb20vQUlMSENcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEQzVHdlZW4ge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdHdlZW5NYXA6IGFueT17fTtcclxuICAgIHByaXZhdGUgc3RhdGljIGZyYW1lOm51bWJlciA9IDI7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHRhcmdldCDnm67moIfniankvZNcclxuICAgICAqIEBwYXJhbSB0b1BvcyDopoHljrvnmoTnm67nmoTlnLBcclxuICAgICAqIEBwYXJhbSBkdXJhdGlvbiDpl7TpmpRcclxuICAgICAqIEBwYXJhbSBjYWxsZXIg5Zue6LCD5omn6KGM6aKG5Z+fXHJcbiAgICAgKiBAcGFyYW0gZWFzZSDnvJPliqjlh73mlbBcclxuICAgICAqIEBwYXJhbSBjb21wbGV0ZSDmkq3mlL7lrozmiJDlm57osIMgXHJcbiAgICAgKiBAcGFyYW0gZGVsYXkg5bu26L+fXHJcbiAgICAgKiBAcGFyYW0gY292ZXJCZWZvcmUg5piv5ZCm6KaG55uW5LiK5LiA5Liq57yT5YqoXHJcbiAgICAgKiBAcGFyYW0gdXBkYXRlIOabtOaWsOWHveaVsFxyXG4gICAgICogQHBhcmFtIGZyYW1lIOW4p+aVsOmXtOmalFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIE1vdmVUbyh0YXJnZXQ6IExheWEuU3ByaXRlM0QsIHRvUG9zOiBMYXlhLlZlY3RvcjMsIGR1cmF0aW9uOiBudW1iZXIsIGNhbGxlcjogYW55XHJcbiAgICAgICAgLCBlYXNlPzogRnVuY3Rpb24sIGNvbXBsZXRlPzogRnVuY3Rpb24sIGRlbGF5OiBudW1iZXI9MCwgY292ZXJCZWZvcmU6IGJvb2xlYW4gPSB0cnVlLCB1cGRhdGU/OiBGdW5jdGlvbixmcmFtZT86bnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uOiBMYXlhLlZlY3RvcjMgPSB0YXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgLy8gdGFyZ2V0W1wicG9zaXRpb25cIl0gPSB0YXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgIGlmIChkdXJhdGlvbiA9PSAwfHxkdXJhdGlvbj09PXVuZGVmaW5lZHx8ZHVyYXRpb249PT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRhcmdldC50cmFuc2Zvcm0ucG9zaXRpb24gPSB0b1Bvcy5jbG9uZSgpO1xyXG4gICAgICAgICAgICBjb21wbGV0ZSAmJiBjb21wbGV0ZS5hcHBseShjYWxsZXIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZyYW1lPD0wfHxmcmFtZT09PXVuZGVmaW5lZHx8ZnJhbWU9PT1udWxsKXtcclxuICAgICAgICAgICAgZnJhbWUgPSB0aGlzLmZyYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdXBkYXRlUmVuZGVyUG9zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LnRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHVwZGF0ZSAmJiB1cGRhdGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExheWEudGltZXIub25jZShkZWxheSwgdGFyZ2V0LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIExheWEudGltZXIuZnJhbWVMb29wKGZyYW1lLCB0YXJnZXQsIHVwZGF0ZVJlbmRlclBvcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBlbmRUd2VlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC50cmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC50cmFuc2Zvcm0ucG9zaXRpb24gPSB0b1Bvcy5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0YXJnZXQsIHVwZGF0ZVJlbmRlclBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29tcGxldGUgJiYgY29tcGxldGUuYXBwbHkoY2FsbGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHR3ZWVuID0gTGF5YS5Ud2Vlbi50byhwb3NpdGlvbiwgeyB4OiB0b1Bvcy54LCB5OiB0b1Bvcy55LCB6OiB0b1Bvcy56IH0sIGR1cmF0aW9uLCBlYXNlLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRhcmdldCwgZW5kVHdlZW4pLCBkZWxheSwgY292ZXJCZWZvcmUpO1xyXG4gICAgICAgIGlmKCF0aGlzLnR3ZWVuTWFwW3RhcmdldC5pZF0pe1xyXG4gICAgICAgICAgICB0aGlzLnR3ZWVuTWFwW3RhcmdldC5pZF0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50d2Vlbk1hcFt0YXJnZXQuaWRdLnB1c2godHdlZW4pO1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgUm90YXRlVG8odGFyZ2V0OkxheWEuU3ByaXRlM0QsdG9Sb3RhdGlvbjpMYXlhLlZlY3RvcjMsZHVyYXRpb246bnVtYmVyLCBjYWxsZXI6IGFueVxyXG4gICAgICAgICwgZWFzZT86IEZ1bmN0aW9uLCBjb21wbGV0ZT86IEZ1bmN0aW9uLCBkZWxheT86IG51bWJlciwgY292ZXJCZWZvcmU/OiBib29sZWFuLCB1cGRhdGU/OiBGdW5jdGlvbixmcmFtZT86bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGxldCByb3RhdGlvbjogTGF5YS5WZWN0b3IzID0gdGFyZ2V0LnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uRXVsZXIuY2xvbmUoKTtcclxuICAgICAgICAgICAgaWYgKGR1cmF0aW9uID09IDB8fGR1cmF0aW9uPT09dW5kZWZpbmVkfHxkdXJhdGlvbj09PW51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbkV1bGVyID0gdG9Sb3RhdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUgJiYgY29tcGxldGUuYXBwbHkoY2FsbGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihmcmFtZTw9MHx8ZnJhbWU9PT11bmRlZmluZWR8fGZyYW1lPT09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICBmcmFtZSA9IHRoaXMuZnJhbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHVwZGF0ZVJlbmRlclJvdGF0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC50cmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQudHJhbnNmb3JtLmxvY2FsUm90YXRpb25FdWxlciA9IHJvdGF0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXBkYXRlICYmIHVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBMYXlhLnRpbWVyLm9uY2UoZGVsYXksIHRhcmdldCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoZnJhbWUsIHRhcmdldCwgdXBkYXRlUmVuZGVyUm90YXRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICBsZXQgZW5kVHdlZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LnRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbkV1bGVyID0gdG9Sb3RhdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGFyZ2V0LCB1cGRhdGVSZW5kZXJSb3RhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSAmJiBjb21wbGV0ZS5hcHBseShjYWxsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdHdlZW4gPSBMYXlhLlR3ZWVuLnRvKHJvdGF0aW9uLCB7IHg6IHRvUm90YXRpb24ueCwgeTogdG9Sb3RhdGlvbi55LCB6OiB0b1JvdGF0aW9uLnogfSwgZHVyYXRpb24sIGVhc2UsIExheWEuSGFuZGxlci5jcmVhdGUodGFyZ2V0LCBlbmRUd2VlbiksIGRlbGF5LCBjb3ZlckJlZm9yZSk7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnR3ZWVuTWFwW3RhcmdldC5pZF0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50d2Vlbk1hcFt0YXJnZXQuaWRdID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50d2Vlbk1hcFt0YXJnZXQuaWRdLnB1c2godHdlZW4pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgU2NhbGVUbyh0YXJnZXQ6IExheWEuU3ByaXRlM0QsIHRvU2NhbGU6IExheWEuVmVjdG9yMywgZHVyYXRpb246IG51bWJlciwgY2FsbGVyOiBhbnlcclxuICAgICAgICAsIGVhc2U/OiBGdW5jdGlvbiwgY29tcGxldGU/OiBGdW5jdGlvbiwgZGVsYXk/OiBudW1iZXIsIGNvdmVyQmVmb3JlPzogYm9vbGVhbiwgdXBkYXRlPzogRnVuY3Rpb24sZnJhbWU/Om51bWJlcikge1xyXG4gICAgICAgIGxldCBsb2NhbFNjYWxlID0gdGFyZ2V0LnRyYW5zZm9ybS5sb2NhbFNjYWxlLmNsb25lKCk7XHJcbiAgICAgICAgaWYgKGR1cmF0aW9uID09IDB8fGR1cmF0aW9uPT09dW5kZWZpbmVkfHxkdXJhdGlvbj09PW51bGwpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gdG9TY2FsZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBjb21wbGV0ZSAmJiBjb21wbGV0ZS5hcHBseShjYWxsZXIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZyYW1lPD0wfHxmcmFtZT09PXVuZGVmaW5lZHx8ZnJhbWU9PT1udWxsKXtcclxuICAgICAgICAgICAgZnJhbWUgPSB0aGlzLmZyYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdXBkYXRlUmVuZGVyUG9zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0YXJnZXQudHJhbnNmb3JtLmxvY2FsU2NhbGUgPSBsb2NhbFNjYWxlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHVwZGF0ZSAmJiB1cGRhdGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExheWEudGltZXIub25jZShkZWxheSwgdGhpcywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBMYXlhLnRpbWVyLmZyYW1lTG9vcChmcmFtZSwgdGFyZ2V0LCB1cGRhdGVSZW5kZXJQb3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBlbmRUd2VlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gdG9TY2FsZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRhcmdldCwgdXBkYXRlUmVuZGVyUG9zKTtcclxuICAgICAgICAgICAgY29tcGxldGUgJiYgY29tcGxldGUuYXBwbHkoY2FsbGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHR3ZWVuID0gTGF5YS5Ud2Vlbi50byhsb2NhbFNjYWxlLCB7IHg6IHRvU2NhbGUueCwgeTogdG9TY2FsZS55LCB6OiB0b1NjYWxlLnogfSwgZHVyYXRpb24sIGVhc2UsIExheWEuSGFuZGxlci5jcmVhdGUodGFyZ2V0LCBlbmRUd2VlbiksIGRlbGF5LCBjb3ZlckJlZm9yZSk7XHJcbiAgICAgICAgaWYoIXRoaXMudHdlZW5NYXBbdGFyZ2V0LmlkXSl7XHJcbiAgICAgICAgICAgIHRoaXMudHdlZW5NYXBbdGFyZ2V0LmlkXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnR3ZWVuTWFwW3RhcmdldC5pZF0ucHVzaCh0d2Vlbik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpDNk54mp5L2T5LiK55qE5omA5pyJ57yT5Yqo5Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIENsZWFyVHdlZW4odGFyZ2V0OkxheWEuU3ByaXRlM0Qpe1xyXG4gICAgICAgIGxldCB0d2VlbnMgPSB0aGlzLnR3ZWVuTWFwW3RhcmdldC5pZF0gYXMgQXJyYXk8TGF5YS5Ud2Vlbj47XHJcbiAgICAgICAgaWYodHdlZW5zJiZ0d2VlbnMubGVuZ3RoKXtcclxuICAgICAgICAgICAgd2hpbGUodHdlZW5zLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGxldCB0d2VlbiA9IHR3ZWVucy5wb3AoKTtcclxuICAgICAgICAgICAgICAgIHR3ZWVuLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS50aW1lci5jbGVhckFsbCh0YXJnZXQpO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBHYW1lVUkgZnJvbSBcIi4vc2NyaXB0L0dhbWVVSVwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZHdpZHRoXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJ0ZXN0L1Rlc3RTY2VuZS5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwic2NyaXB0L0dhbWVVSS50c1wiLEdhbWVVSSk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBEM1R3ZWVuVGVzdCB9IGZyb20gXCIuL0QzVHdlZW5UZXN0XCI7XHJcbmNsYXNzIE1haW4ge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0Ly/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcblx0XHRpZiAod2luZG93W1wiTGF5YTNEXCJdKSBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcblx0XHRlbHNlIExheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgTGF5YVtcIldlYkdMXCJdKTtcclxuXHRcdExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YVtcIkRlYnVnUGFuZWxcIl0gJiYgTGF5YVtcIkRlYnVnUGFuZWxcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IEdhbWVDb25maWcuc2NhbGVNb2RlO1xyXG5cdFx0TGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gR2FtZUNvbmZpZy5zY3JlZW5Nb2RlO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblx0XHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdFx0Ly8gR2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cdFx0bGV0IHRlc3QgPSBuZXcgRDNUd2VlblRlc3QoKTtcclxuXHRcdHRlc3Quc3RhcnRUZXN0KCk7XHJcblx0fVxyXG59XHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7XHJcbiIsImV4cG9ydCBjbGFzcyBUd2VlbkV4dCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoKXtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiBUd2VlbkV4dCl7XHJcbiAgICAgICAgICAgIGlmKGtleT09PVwiaW5pdFwiKWNvbnRpbnVlXHJcbiAgICAgICAgICAgIGxheWEudXRpbHMuVHdlZW4ucHJvdG90eXBlW2tleV0gPSBUd2VlbkV4dFtrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbml0UHJvcHModGFyZ2V0LCBwcm9wcywgaXNUbykge1xyXG4gICAgICAgIGZvciAobGV0IHAgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgaWYgKCh0eXBlb2YgKHRhcmdldFtwXSkgPT0gJ251bWJlcicpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBpc1RvID8gdGFyZ2V0W3BdIDogcHJvcHNbcF07XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0gaXNUbyA/IHByb3BzW3BdIDogdGFyZ2V0W3BdO1xyXG4gICAgICAgICAgICAgICAgdGhpc1tcIl9wcm9wc1wiXS5wdXNoKFtwLCBzdGFydCwgZW5kIC0gc3RhcnRdKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNUbykgdGFyZ2V0W3BdID0gc3RhcnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhcmdldFtwXSBpbnN0YW5jZW9mIExheWEuVmVjdG9yNCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHY0X2xlcnAgPSBuZXcgTGF5YS5WZWN0b3I0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdjRfc3RhcnQgPSBpc1RvID8gdGFyZ2V0W3BdLmNsb25lKCkgOiBwcm9wc1twXTtcclxuICAgICAgICAgICAgICAgIGxldCB2NF9lbmQgPSBpc1RvID8gcHJvcHNbcF0gOiB0YXJnZXRbcF0uY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgIGlmICghKHY0X3N0YXJ0IGluc3RhbmNlb2YgTGF5YS5WZWN0b3I0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHY0X3N0YXJ0ID0gbmV3IExheWEuVmVjdG9yNCh2NF9zdGFydC54LCB2NF9zdGFydC55LCB2NF9zdGFydC56LCB2NF9zdGFydC53KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHY0X2VuZCA9IG5ldyBMYXlhLlZlY3RvcjQodjRfZW5kLngsIHY0X2VuZC55LCB2NF9lbmQueiwgdjRfZW5kLncpO1xyXG4gICAgICAgICAgICAgICAgTGF5YS5WZWN0b3I0LnN1YnRyYWN0KHY0X2VuZCwgdjRfc3RhcnQsIHY0X2xlcnApO1xyXG4gICAgICAgICAgICAgICAgdGhpc1tcIl9wcm9wc1wiXS5wdXNoKFtwLCB2NF9zdGFydCwgdjRfbGVycCwgdjRfZW5kXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVG8pIHRhcmdldFtwXSA9IHY0X3N0YXJ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQudHJhbnNmb3JtICYmIHRhcmdldC50cmFuc2Zvcm1bcF0gaW5zdGFuY2VvZiBMYXlhLlZlY3RvcjMpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2M19sZXJwID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHYzX3N0YXJ0ID0gaXNUbyA/IHRhcmdldC50cmFuc2Zvcm1bcF0uY2xvbmUoKSA6IHByb3BzW3BdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHYzX2VuZCA9IGlzVG8gPyBwcm9wc1twXSA6IHRhcmdldC50cmFuc2Zvcm1bcF0uY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgIGlmICghKHYzX3N0YXJ0IGluc3RhbmNlb2YgTGF5YS5WZWN0b3IzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHYzX3N0YXJ0ID0gbmV3IExheWEuVmVjdG9yMyh2M19zdGFydC54LCB2M19zdGFydC55LCB2M19zdGFydC56KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHYzX2VuZCA9IG5ldyBMYXlhLlZlY3RvcjModjNfZW5kLngsIHYzX2VuZC55LCB2M19lbmQueik7XHJcbiAgICAgICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QodjNfZW5kLCB2M19zdGFydCwgdjNfbGVycCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpc1tcIl9wcm9wc1wiXS5wdXNoKFtwLCB2M19zdGFydCwgdjNfbGVycCwgdjNfZW5kXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVG8pIHRhcmdldFtwXSA9IHYzX3N0YXJ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3VwZGF0ZUVhc2UodGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXNbXCJfdGFyZ2V0XCJdO1xyXG4gICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRhcmdldC5kZXN0cm95ZWQpIHJldHVybiB0aGlzW1wiY2xlYXJUd2VlblwiXSh0YXJnZXQpO1xyXG4gICAgICAgIHZhciB1c2VkVGltZXIgPSB0aGlzW1wiX3VzZWRUaW1lclwiXSA9IHRpbWUgLSB0aGlzW1wiX3N0YXJ0VGltZXJcIl0gLSB0aGlzW1wiX2RlbGF5XCJdO1xyXG4gICAgICAgIGlmICh1c2VkVGltZXIgPCAwKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHVzZWRUaW1lciA+PSB0aGlzW1wiX2R1cmF0aW9uXCJdKSByZXR1cm4gdGhpc1tcImNvbXBsZXRlXCJdKCk7XHJcbiAgICAgICAgdmFyIHJhdGlvID0gdXNlZFRpbWVyID4gMCA/IHRoaXNbXCJfZWFzZVwiXSh1c2VkVGltZXIsIDAsIDEsIHRoaXNbXCJfZHVyYXRpb25cIl0pIDogMDtcclxuICAgICAgICB2YXIgcHJvcHMgPSB0aGlzW1wiX3Byb3BzXCJdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gcHJvcHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9wID0gcHJvcHNbaV07XHJcbiAgICAgICAgICAgIC8v5a+56LGh55qEXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BbMF1dID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcFswXV0gPSBwcm9wWzFdICsgKHJhdGlvICogcHJvcFsyXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8zZOeahFxyXG5cclxuICAgICAgICAgICAgaWYgKHRhcmdldFtwcm9wWzBdXSBpbnN0YW5jZW9mIExheWEuVmVjdG9yNCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHggPSBwcm9wWzFdLnggKyAocmF0aW8gKiBwcm9wWzJdLngpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBwcm9wWzFdLnkgKyAocmF0aW8gKiBwcm9wWzJdLnkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHogPSBwcm9wWzFdLnogKyAocmF0aW8gKiBwcm9wWzJdLnopO1xyXG4gICAgICAgICAgICAgICAgbGV0IHcgPSBwcm9wWzFdLncgKyAocmF0aW8gKiBwcm9wWzJdLncpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BbMF1dID0gbmV3IExheWEuVmVjdG9yNChcclxuICAgICAgICAgICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICAgICAgICAgIHksXHJcbiAgICAgICAgICAgICAgICAgICAgeixcclxuICAgICAgICAgICAgICAgICAgICB3KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0W3Byb3BbMF1dIGluc3RhbmNlb2YgTGF5YS5WZWN0b3IzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHByb3BbMV0ueCArIChyYXRpbyAqIHByb3BbMl0ueCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHByb3BbMV0ueSArIChyYXRpbyAqIHByb3BbMl0ueSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeiA9IHByb3BbMV0ueiArIChyYXRpbyAqIHByb3BbMl0ueik7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcFswXV0gPSBuZXcgTGF5YS5WZWN0b3IzKFxyXG4gICAgICAgICAgICAgICAgICAgIHgsXHJcbiAgICAgICAgICAgICAgICAgICAgeSxcclxuICAgICAgICAgICAgICAgICAgICB6KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LnRyYW5zZm9ybSAmJiB0YXJnZXQudHJhbnNmb3JtW3Byb3BbMF1dIGluc3RhbmNlb2YgTGF5YS5WZWN0b3IzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHByb3BbMV0ueCArIChyYXRpbyAqIHByb3BbMl0ueCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHByb3BbMV0ueSArIChyYXRpbyAqIHByb3BbMl0ueSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeiA9IHByb3BbMV0ueiArIChyYXRpbyAqIHByb3BbMl0ueik7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQudHJhbnNmb3JtW3Byb3BbMF1dID0gbmV3IExheWEuVmVjdG9yMyhcclxuICAgICAgICAgICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICAgICAgICAgIHksXHJcbiAgICAgICAgICAgICAgICAgICAgeik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzW1widXBkYXRlXCJdKSB0aGlzW1widXBkYXRlXCJdLnJ1bigpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY29tcGxldGUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzW1wiX3RhcmdldFwiXSkgcmV0dXJuO1xyXG4gICAgICAgIExheWEudGltZXIucnVuVGltZXIodGhpcywgdGhpc1tcImZpcnN0U3RhcnRcIl0pO1xyXG4gICAgICAgIHZhciBoYW5kbGVyID0gdGhpc1tcIl9jb21wbGV0ZVwiXTtcclxuICAgICAgICB0aGlzLmNvbXBsZXREYXRhKClcclxuICAgICAgICBpZiAodGhpc1tcInVwZGF0ZVwiXSkgdGhpc1tcInVwZGF0ZVwiXS5ydW4oKTtcclxuICAgICAgICB0aGlzW1wiX2NvdW50XCJdKys7XHJcbiAgICAgICAgaWYgKHRoaXNbXCJyZXBlYXRcIl0gIT0gMCAmJiB0aGlzW1wiX2NvdW50XCJdID49IHRoaXNbXCJyZXBlYXRcIl0pIHtcclxuICAgICAgICAgICAgdGhpc1tcImNsZWFyXCJdKCk7XHJcbiAgICAgICAgICAgIGhhbmRsZXIgJiYgaGFuZGxlci5ydW4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzW1wicmVzdGFydFwiXSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIGNvbXBsZXREYXRhKCkge1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzW1wiX3RhcmdldFwiXTtcclxuICAgICAgICB2YXIgcHJvcHMgPSB0aGlzW1wiX3Byb3BzXCJdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gcHJvcHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9wID0gcHJvcHNbaV07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BbMF1dID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcFswXV0gPSBwcm9wWzFdICsgcHJvcFsyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0W3Byb3BbMF1dIGluc3RhbmNlb2YgTGF5YS5WZWN0b3I0KSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcFswXV0gPSBwcm9wWzNdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhcmdldFtwcm9wWzBdXSBpbnN0YW5jZW9mIExheWEuVmVjdG9yMykge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BbMF1dID0gcHJvcFszXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQudHJhbnNmb3JtICYmIHRhcmdldC50cmFuc2Zvcm1bcHJvcFswXV0gaW5zdGFuY2VvZiBMYXlhLlZlY3RvcjMpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC50cmFuc2Zvcm1bcHJvcFswXV0gPSBwcm9wWzNdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi8uLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IEQzVHdlZW4gZnJvbSBcIi4uL0QzVHdlZW5fb2xkXCI7XHJcbi8qKlxyXG4gKiDmnKznpLrkvovph4fnlKjpnZ7ohJrmnKznmoTmlrnlvI/lrp7njrDvvIzogIzkvb/nlKjnu6fmib/pobXpnaLln7rnsbvvvIzlrp7njrDpobXpnaLpgLvovpHjgILlnKhJREXph4zpnaLorr7nva7lnLrmma/nmoRSdW50aW1l5bGe5oCn5Y2z5Y+v5ZKM5Zy65pmv6L+b6KGM5YWz6IGUXHJcbiAqIOebuOavlOiEmuacrOaWueW8j++8jOe7p+aJv+W8j+mhtemdouexu++8jOWPr+S7peebtOaOpeS9v+eUqOmhtemdouWumuS5ieeahOWxnuaAp++8iOmAmui/h0lEReWGhXZhcuWxnuaAp+WumuS5ie+8ie+8jOavlOWmgnRoaXMudGlwTGJsbO+8jHRoaXMuc2NvcmVMYmzvvIzlhbfmnInku6PnoIHmj5DnpLrmlYjmnpxcclxuICog5bu66K6u77ya5aaC5p6c5piv6aG16Z2i57qn55qE6YC76L6R77yM6ZyA6KaB6aKR57mB6K6/6Zeu6aG16Z2i5YaF5aSa5Liq5YWD57Sg77yM5L2/55So57un5om/5byP5YaZ5rOV77yM5aaC5p6c5piv54us56uL5bCP5qih5Z2X77yM5Yqf6IO95Y2V5LiA77yM5bu66K6u55So6ISa5pys5pa55byP5a6e546w77yM5q+U5aaC5a2Q5by56ISa5pys44CCXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyB1aS50ZXN0LlRlc3RTY2VuZVVJIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblx0XHRcclxuICAgICAgICAvL+a3u+WKoDNE5Zy65pmvXHJcbiAgICAgICAgdmFyIHNjZW5lOiBMYXlhLlNjZW5lM0QgPSBMYXlhLnN0YWdlLmFkZENoaWxkKG5ldyBMYXlhLlNjZW5lM0QoKSkgYXMgTGF5YS5TY2VuZTNEO1xyXG5cclxuICAgICAgICAvL+a3u+WKoOeFp+ebuOaculxyXG4gICAgICAgIHZhciBjYW1lcmE6IExheWEuQ2FtZXJhID0gKHNjZW5lLmFkZENoaWxkKG5ldyBMYXlhLkNhbWVyYSgwLCAwLjEsIDEwMCkpKSBhcyBMYXlhLkNhbWVyYTtcclxuICAgICAgICBjYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDMsIDMpKTtcclxuICAgICAgICBjYW1lcmEudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKC0zMCwgMCwgMCksIHRydWUsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy/mt7vliqDmlrnlkJHlhYlcclxuICAgICAgICB2YXIgZGlyZWN0aW9uTGlnaHQ6IExheWEuRGlyZWN0aW9uTGlnaHQgPSBzY2VuZS5hZGRDaGlsZChuZXcgTGF5YS5EaXJlY3Rpb25MaWdodCgpKSBhcyBMYXlhLkRpcmVjdGlvbkxpZ2h0O1xyXG4gICAgICAgIGRpcmVjdGlvbkxpZ2h0LmNvbG9yID0gbmV3IExheWEuVmVjdG9yMygwLjYsIDAuNiwgMC42KTtcclxuICAgICAgICBkaXJlY3Rpb25MaWdodC50cmFuc2Zvcm0ud29ybGRNYXRyaXguc2V0Rm9yd2FyZChuZXcgTGF5YS5WZWN0b3IzKDEsIC0xLCAwKSk7XHJcblxyXG4gICAgICAgIC8v5re75Yqg6Ieq5a6a5LmJ5qih5Z6LXHJcbiAgICAgICAgdmFyIGJveDogTGF5YS5NZXNoU3ByaXRlM0QgPSBzY2VuZS5hZGRDaGlsZChuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgxLCAxLCAxKSkpIGFzIExheWEuTWVzaFNwcml0ZTNEO1xyXG4gICAgICAgIGJveC50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgNDUsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHZhciBtYXRlcmlhbDogTGF5YS5CbGlublBob25nTWF0ZXJpYWwgPSBuZXcgTGF5YS5CbGlublBob25nTWF0ZXJpYWwoKTtcclxuXHRcdExheWEuVGV4dHVyZTJELmxvYWQoXCJyZXMvbGF5YWJveC5wbmdcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZShudWxsLCBmdW5jdGlvbih0ZXg6TGF5YS5UZXh0dXJlMkQpIHtcclxuXHRcdFx0XHRtYXRlcmlhbC5hbGJlZG9UZXh0dXJlID0gdGV4O1xyXG5cdFx0fSkpO1xyXG4gICAgICAgIGJveC5tZXNoUmVuZGVyZXIubWF0ZXJpYWwgPSBtYXRlcmlhbDtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5tb3ZlQi5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5tb3ZlQi5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHRvUG9zMSA9IG5ldyBMYXlhLlZlY3RvcjMoYm94LnRyYW5zZm9ybS5wb3NpdGlvbi54LGJveC50cmFuc2Zvcm0ucG9zaXRpb24ueSsyLGJveC50cmFuc2Zvcm0ucG9zaXRpb24ueik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBEM1R3ZWVuLk1vdmVUbyhib3gsdG9Qb3MxLDEwMDAsdGhpcyxudWxsLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9Qb3MyID0gbmV3IExheWEuVmVjdG9yMyhib3gudHJhbnNmb3JtLnBvc2l0aW9uLngsYm94LnRyYW5zZm9ybS5wb3NpdGlvbi55LTIsYm94LnRyYW5zZm9ybS5wb3NpdGlvbi56KTtcclxuICAgICAgICAgICAgICAgIEQzVHdlZW4uTW92ZVRvKGJveCx0b1BvczIsMTAwMCxzZWxmLExheWEuRWFzZS5xdWFkSW5PdXQsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm1vdmVCLm1vdXNlRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yb3RhdGVCLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcyxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnJvdGF0ZUIubW91c2VFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCB0b1JvdDEgPSBuZXcgTGF5YS5WZWN0b3IzKGJveC50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbkV1bGVyLngsYm94LnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uRXVsZXIueSs2MCxib3gudHJhbnNmb3JtLmxvY2FsUm90YXRpb25FdWxlci56KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEQzVHdlZW4uUm90YXRlVG8oYm94LHRvUm90MSwxMDAwLHRoaXMsbnVsbCxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvUm90MiA9IG5ldyBMYXlhLlZlY3RvcjMoYm94LnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uRXVsZXIueCxib3gudHJhbnNmb3JtLmxvY2FsUm90YXRpb25FdWxlci55LGJveC50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbkV1bGVyLnorNjApO1xyXG4gICAgICAgICAgICAgICAgRDNUd2Vlbi5Sb3RhdGVUbyhib3gsdG9Sb3QyLDEwMDAsdGhpcyxMYXlhLkVhc2UuZXhwb0luT3V0LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yb3RhdGVCLm1vdXNlRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zY2FsZUIub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYuc2NhbGVCLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgdG9TY2FsZTEgPSBuZXcgTGF5YS5WZWN0b3IzKGJveC50cmFuc2Zvcm0ubG9jYWxTY2FsZS54LGJveC50cmFuc2Zvcm0ubG9jYWxTY2FsZS55KzIsYm94LnRyYW5zZm9ybS5sb2NhbFNjYWxlLnopO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgRDNUd2Vlbi5TY2FsZVRvKGJveCx0b1NjYWxlMSwxMDAwLHRoaXMsbnVsbCxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvU2NhbGUyID0gbmV3IExheWEuVmVjdG9yMyhib3gudHJhbnNmb3JtLmxvY2FsU2NhbGUueCxib3gudHJhbnNmb3JtLmxvY2FsU2NhbGUueS0yLGJveC50cmFuc2Zvcm0ubG9jYWxTY2FsZS56KTtcclxuICAgICAgICAgICAgICAgIEQzVHdlZW4uU2NhbGVUbyhib3gsdG9TY2FsZTIsMTAwMCxzZWxmLExheWEuRWFzZS5xdWFkSW5PdXQsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNjYWxlQi5tb3VzZUVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xuZXhwb3J0IG1vZHVsZSB1aS50ZXN0IHtcclxuICAgIGV4cG9ydCBjbGFzcyBUZXN0U2NlbmVVSSBleHRlbmRzIFNjZW5lIHtcclxuXHRcdHB1YmxpYyBtb3ZlQjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgcm90YXRlQjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgc2NhbGVCOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwidGVzdC9UZXN0U2NlbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHIiXX0=
