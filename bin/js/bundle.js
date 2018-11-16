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
},{}],2:[function(require,module,exports){
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
},{"./script/GameUI":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
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
        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene);
    };
    return Main;
}());
//激活启动类
new Main();
},{"./GameConfig":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./../ui/layaMaxUI");
var D3Tween_1 = require("../D3Tween");
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
        var box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1)));
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
            D3Tween_1.default.MoveTo(box, toPos1, 1000, this, null, function () {
                var toPos2 = new Laya.Vector3(box.transform.position.x, box.transform.position.y - 2, box.transform.position.z);
                D3Tween_1.default.MoveTo(box, toPos2, 1000, self, Laya.Ease.quadInOut, function () {
                    self.moveB.mouseEnabled = true;
                });
            });
        });
        _this.rotateB.on(Laya.Event.CLICK, _this, function () {
            self.rotateB.mouseEnabled = false;
            var toRot1 = new Laya.Vector3(box.transform.localRotationEuler.x, box.transform.localRotationEuler.y + 60, box.transform.localRotationEuler.z);
            D3Tween_1.default.RotateTo(box, toRot1, 1000, this, null, function () {
                var toRot2 = new Laya.Vector3(box.transform.localRotationEuler.x, box.transform.localRotationEuler.y, box.transform.localRotationEuler.z + 60);
                D3Tween_1.default.RotateTo(box, toRot2, 1000, this, Laya.Ease.expoInOut, function () {
                    self.rotateB.mouseEnabled = true;
                });
            });
        });
        _this.scaleB.on(Laya.Event.CLICK, _this, function () {
            self.scaleB.mouseEnabled = false;
            var toScale1 = new Laya.Vector3(box.transform.localScale.x, box.transform.localScale.y + 2, box.transform.localScale.z);
            D3Tween_1.default.ScaleTo(box, toScale1, 1000, this, null, function () {
                var toScale2 = new Laya.Vector3(box.transform.localScale.x, box.transform.localScale.y - 2, box.transform.localScale.z);
                D3Tween_1.default.ScaleTo(box, toScale2, 1000, self, Laya.Ease.quadInOut, function () {
                    self.scaleB.mouseEnabled = true;
                });
            });
        });
        return _this;
    }
    return GameUI;
}(layaMaxUI_1.ui.test.TestSceneUI));
exports.default = GameUI;
},{"../D3Tween":1,"./../ui/layaMaxUI":5}],5:[function(require,module,exports){
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
},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0xheWEyLjAvTGF5YUFpcklERV9iZXRhL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9EM1R3ZWVuLnRzIiwic3JjL0dhbWVDb25maWcudHMiLCJzcmMvTWFpbi50cyIsInNyYy9zY3JpcHQvR2FtZVVJLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNUQTs7OztHQUlHO0FBQ0g7SUFBQTtJQWdJQSxDQUFDO0lBN0hHOzs7Ozs7Ozs7Ozs7T0FZRztJQUNXLGNBQU0sR0FBcEIsVUFBcUIsTUFBcUIsRUFBRSxLQUFtQixFQUFFLFFBQWdCLEVBQUUsTUFBVyxFQUN4RixJQUFlLEVBQUUsUUFBbUIsRUFBRSxLQUFlLEVBQUUsV0FBMkIsRUFBRSxNQUFpQixFQUFDLEtBQWE7UUFBN0Usc0JBQUEsRUFBQSxTQUFlO1FBQUUsNEJBQUEsRUFBQSxrQkFBMkI7UUFDcEYsSUFBSSxRQUFRLEdBQWlCLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9ELGtEQUFrRDtRQUNsRCxJQUFJLFFBQVEsSUFBSSxDQUFDLElBQUUsUUFBUSxLQUFHLFNBQVMsSUFBRSxRQUFRLEtBQUcsSUFBSSxFQUFFO1lBQ3RELE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMxQyxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxPQUFPO1NBQ1Y7UUFDRCxJQUFHLEtBQUssSUFBRSxDQUFDLElBQUUsS0FBSyxLQUFHLFNBQVMsSUFBRSxLQUFLLEtBQUcsSUFBSSxFQUFDO1lBQ3pDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxlQUFlLEdBQUc7WUFDbEIsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO2dCQUNsQixNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7YUFDeEM7WUFDRCxNQUFNLElBQUksTUFBTSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLEdBQUc7WUFDWCxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2FBQzdDO1lBQ0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFBO1FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdkosSUFBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV6QyxDQUFDO0lBQ2EsZ0JBQVEsR0FBdEIsVUFBdUIsTUFBb0IsRUFBQyxVQUF1QixFQUFDLFFBQWUsRUFBRSxNQUFXLEVBQzFGLElBQWUsRUFBRSxRQUFtQixFQUFFLEtBQWMsRUFBRSxXQUFxQixFQUFFLE1BQWlCLEVBQUMsS0FBYTtRQUMxRyxJQUFJLFFBQVEsR0FBaUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6RSxJQUFJLFFBQVEsSUFBSSxDQUFDLElBQUUsUUFBUSxLQUFHLFNBQVMsSUFBRSxRQUFRLEtBQUcsSUFBSSxFQUFFO1lBQ3RELE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pELFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLE9BQU87U0FDVjtRQUNELElBQUcsS0FBSyxJQUFFLENBQUMsSUFBRSxLQUFLLEtBQUcsU0FBUyxJQUFFLEtBQUssS0FBRyxJQUFJLEVBQUM7WUFDekMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDdEI7UUFDRCxJQUFJLG9CQUFvQixHQUFHO1lBQ3ZCLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUM7YUFDbEQ7WUFDRCxNQUFNLElBQUksTUFBTSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsR0FBRztZQUNYLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO2FBQ2xEO1lBQ0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFBO1FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdEssSUFBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUV4QyxDQUFDO0lBQ1MsZUFBTyxHQUFyQixVQUFzQixNQUFxQixFQUFFLE9BQXFCLEVBQUUsUUFBZ0IsRUFBRSxNQUFXLEVBQzNGLElBQWUsRUFBRSxRQUFtQixFQUFFLEtBQWMsRUFBRSxXQUFxQixFQUFFLE1BQWlCLEVBQUMsS0FBYTtRQUM5RyxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyRCxJQUFJLFFBQVEsSUFBSSxDQUFDLElBQUUsUUFBUSxLQUFHLFNBQVMsSUFBRSxRQUFRLEtBQUcsSUFBSSxFQUFFO1lBQ3RELE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM5QyxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxPQUFPO1NBQ1Y7UUFDRCxJQUFHLEtBQUssSUFBRSxDQUFDLElBQUUsS0FBSyxLQUFHLFNBQVMsSUFBRSxLQUFLLEtBQUcsSUFBSSxFQUFDO1lBQ3pDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxlQUFlLEdBQUc7WUFDbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pELE1BQU0sSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLFFBQVEsR0FBRztZQUNYLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDMUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDL0osSUFBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ2Esa0JBQVUsR0FBeEIsVUFBeUIsTUFBb0I7UUFDekMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFzQixDQUFDO1FBQzNELElBQUcsTUFBTSxJQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUM7WUFDckIsT0FBTSxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQztnQkFDbEIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN6QixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDakI7U0FDSjtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUE5SGMsZ0JBQVEsR0FBTSxFQUFFLENBQUM7SUFDakIsYUFBSyxHQUFVLENBQUMsQ0FBQztJQThIcEMsY0FBQztDQWhJRCxBQWdJQyxJQUFBO2tCQWhJb0IsT0FBTzs7OztBQ041QixnR0FBZ0c7QUFDaEcsMENBQW9DO0FBQ3BDOztFQUVFO0FBQ0Y7SUFhSTtJQUFjLENBQUM7SUFDUixlQUFJLEdBQVg7UUFDSSxJQUFJLEdBQUcsR0FBYSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxHQUFHLENBQUMsa0JBQWtCLEVBQUMsZ0JBQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFoQk0sZ0JBQUssR0FBUSxHQUFHLENBQUM7SUFDakIsaUJBQU0sR0FBUSxJQUFJLENBQUM7SUFDbkIsb0JBQVMsR0FBUSxZQUFZLENBQUM7SUFDOUIscUJBQVUsR0FBUSxNQUFNLENBQUM7SUFDekIsaUJBQU0sR0FBUSxLQUFLLENBQUM7SUFDcEIsaUJBQU0sR0FBUSxNQUFNLENBQUM7SUFDckIscUJBQVUsR0FBSyxzQkFBc0IsQ0FBQztJQUN0QyxvQkFBUyxHQUFRLEVBQUUsQ0FBQztJQUNwQixnQkFBSyxHQUFTLEtBQUssQ0FBQztJQUNwQixlQUFJLEdBQVMsS0FBSyxDQUFDO0lBQ25CLHVCQUFZLEdBQVMsS0FBSyxDQUFDO0lBQzNCLDRCQUFpQixHQUFTLElBQUksQ0FBQztJQU0xQyxpQkFBQztDQWxCRCxBQWtCQyxJQUFBO2tCQWxCb0IsVUFBVTtBQW1CL0IsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDOzs7O0FDeEJsQiwyQ0FBc0M7QUFDdEM7SUFDQztRQUNDLGdCQUFnQjtRQUNoQixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFVLENBQUMsS0FBSyxFQUFFLG9CQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7O1lBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxLQUFLLEVBQUUsb0JBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLG9CQUFVLENBQUMsU0FBUyxDQUFDO1FBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLG9CQUFVLENBQUMsVUFBVSxDQUFDO1FBQzlDLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLG9CQUFVLENBQUMsaUJBQWlCLENBQUM7UUFFMUQsb0RBQW9EO1FBQ3BELElBQUksb0JBQVUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTTtZQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzlGLElBQUksb0JBQVUsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDM0YsSUFBSSxvQkFBVSxDQUFDLElBQUk7WUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFFN0IsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNySSxDQUFDO0lBRUQsOEJBQWUsR0FBZjtRQUNDLCtDQUErQztRQUMvQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRUQsNkJBQWMsR0FBZDtRQUNDLFlBQVk7UUFDWixvQkFBVSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFDRixXQUFDO0FBQUQsQ0EvQkEsQUErQkMsSUFBQTtBQUNELE9BQU87QUFDUCxJQUFJLElBQUksRUFBRSxDQUFDOzs7O0FDbENYLCtDQUF1QztBQUN2QyxzQ0FBaUM7QUFDakM7Ozs7R0FJRztBQUNIO0lBQW9DLDBCQUFtQjtJQUNuRDtRQUFBLFlBQ0ksaUJBQU8sU0F5RFY7UUF2REcsUUFBUTtRQUNSLElBQUksS0FBSyxHQUFpQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBaUIsQ0FBQztRQUVsRixPQUFPO1FBQ1AsSUFBSSxNQUFNLEdBQWdCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFnQixDQUFDO1FBQ3hGLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFbEUsT0FBTztRQUNQLElBQUksY0FBYyxHQUF3QixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUF3QixDQUFDO1FBQzNHLGNBQWMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkQsY0FBYyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1RSxTQUFTO1FBQ1QsSUFBSSxHQUFHLEdBQXNCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQXNCLENBQUM7UUFDbkgsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9ELElBQUksUUFBUSxHQUE0QixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzVFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxVQUFTLEdBQWtCO1lBQzFGLFFBQVEsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDRSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDckMsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDO1FBQ2hCLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLEtBQUksRUFBQztZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDaEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTVHLGlCQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUM7Z0JBQ3JDLElBQUksTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUcsaUJBQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDO29CQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLEtBQUksRUFBQztZQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDbEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTNJLGlCQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUM7Z0JBQ3ZDLElBQUksTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0ksaUJBQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDO29CQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLEtBQUksRUFBQztZQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDakMsSUFBSSxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBILGlCQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUM7Z0JBQ3hDLElBQUksUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEgsaUJBQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDO29CQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQzs7SUFDUCxDQUFDO0lBQ0wsYUFBQztBQUFELENBNURBLEFBNERDLENBNURtQyxjQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsR0E0RHREOzs7OztBQ2hFRCxJQUFPLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3hCLElBQWMsRUFBRSxDQVdmO0FBWEQsV0FBYyxFQUFFO0lBQUMsSUFBQSxJQUFJLENBV3BCO0lBWGdCLFdBQUEsSUFBSTtRQUNqQjtZQUFpQywrQkFBSztZQUlsQzt1QkFBZSxpQkFBTztZQUFBLENBQUM7WUFDdkIsb0NBQWMsR0FBZDtnQkFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFDTCxrQkFBQztRQUFELENBVEEsQUFTQyxDQVRnQyxLQUFLLEdBU3JDO1FBVFksZ0JBQVcsY0FTdkIsQ0FBQTtJQUNMLENBQUMsRUFYZ0IsSUFBSSxHQUFKLE9BQUksS0FBSixPQUFJLFFBV3BCO0FBQUQsQ0FBQyxFQVhhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQVdmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxyXG4vKipcclxuICogYXV0aG9yOkFJTEhDXHJcbiAqIGVtYWlsOjUwNTEyNjA1N0BxcS5jb21cclxuICogZ2l0SHViOmh0dHBzOi8vZ2l0aHViLmNvbS9BSUxIQ1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRDNUd2VlbiB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyB0d2Vlbk1hcDogYW55PXt9O1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZnJhbWU6bnVtYmVyID0gMjtcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOebruagh+eJqeS9k1xyXG4gICAgICogQHBhcmFtIHRvUG9zIOimgeWOu+eahOebrueahOWcsFxyXG4gICAgICogQHBhcmFtIGR1cmF0aW9uIOmXtOmalFxyXG4gICAgICogQHBhcmFtIGNhbGxlciDlm57osIPmiafooYzpoobln59cclxuICAgICAqIEBwYXJhbSBlYXNlIOe8k+WKqOWHveaVsFxyXG4gICAgICogQHBhcmFtIGNvbXBsZXRlIOaSreaUvuWujOaIkOWbnuiwgyBcclxuICAgICAqIEBwYXJhbSBkZWxheSDlu7bov59cclxuICAgICAqIEBwYXJhbSBjb3ZlckJlZm9yZSDmmK/lkKbopobnm5bkuIrkuIDkuKrnvJPliqhcclxuICAgICAqIEBwYXJhbSB1cGRhdGUg5pu05paw5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gZnJhbWUg5bin5pWw6Ze06ZqUXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgTW92ZVRvKHRhcmdldDogTGF5YS5TcHJpdGUzRCwgdG9Qb3M6IExheWEuVmVjdG9yMywgZHVyYXRpb246IG51bWJlciwgY2FsbGVyOiBhbnlcclxuICAgICAgICAsIGVhc2U/OiBGdW5jdGlvbiwgY29tcGxldGU/OiBGdW5jdGlvbiwgZGVsYXk6IG51bWJlcj0wLCBjb3ZlckJlZm9yZTogYm9vbGVhbiA9IHRydWUsIHVwZGF0ZT86IEZ1bmN0aW9uLGZyYW1lPzpudW1iZXIpIHtcclxuICAgICAgICBsZXQgcG9zaXRpb246IExheWEuVmVjdG9yMyA9IHRhcmdldC50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICAvLyB0YXJnZXRbXCJwb3NpdGlvblwiXSA9IHRhcmdldC50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgaWYgKGR1cmF0aW9uID09IDB8fGR1cmF0aW9uPT09dW5kZWZpbmVkfHxkdXJhdGlvbj09PW51bGwpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LnRyYW5zZm9ybS5wb3NpdGlvbiA9IHRvUG9zLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGNvbXBsZXRlICYmIGNvbXBsZXRlLmFwcGx5KGNhbGxlcik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZnJhbWU8PTB8fGZyYW1lPT09dW5kZWZpbmVkfHxmcmFtZT09PW51bGwpe1xyXG4gICAgICAgICAgICBmcmFtZSA9IHRoaXMuZnJhbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB1cGRhdGVSZW5kZXJQb3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQudHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXBkYXRlICYmIHVwZGF0ZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGF5YS50aW1lci5vbmNlKGRlbGF5LCB0YXJnZXQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoZnJhbWUsIHRhcmdldCwgdXBkYXRlUmVuZGVyUG9zKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGVuZFR3ZWVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LnRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnRyYW5zZm9ybS5wb3NpdGlvbiA9IHRvUG9zLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRhcmdldCwgdXBkYXRlUmVuZGVyUG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21wbGV0ZSAmJiBjb21wbGV0ZS5hcHBseShjYWxsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgdHdlZW4gPSBMYXlhLlR3ZWVuLnRvKHBvc2l0aW9uLCB7IHg6IHRvUG9zLngsIHk6IHRvUG9zLnksIHo6IHRvUG9zLnogfSwgZHVyYXRpb24sIGVhc2UsIExheWEuSGFuZGxlci5jcmVhdGUodGFyZ2V0LCBlbmRUd2VlbiksIGRlbGF5LCBjb3ZlckJlZm9yZSk7XHJcbiAgICAgICAgaWYoIXRoaXMudHdlZW5NYXBbdGFyZ2V0LmlkXSl7XHJcbiAgICAgICAgICAgIHRoaXMudHdlZW5NYXBbdGFyZ2V0LmlkXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnR3ZWVuTWFwW3RhcmdldC5pZF0ucHVzaCh0d2Vlbik7XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBSb3RhdGVUbyh0YXJnZXQ6TGF5YS5TcHJpdGUzRCx0b1JvdGF0aW9uOkxheWEuVmVjdG9yMyxkdXJhdGlvbjpudW1iZXIsIGNhbGxlcjogYW55XHJcbiAgICAgICAgLCBlYXNlPzogRnVuY3Rpb24sIGNvbXBsZXRlPzogRnVuY3Rpb24sIGRlbGF5PzogbnVtYmVyLCBjb3ZlckJlZm9yZT86IGJvb2xlYW4sIHVwZGF0ZT86IEZ1bmN0aW9uLGZyYW1lPzpudW1iZXIpIHtcclxuICAgICAgICAgICAgbGV0IHJvdGF0aW9uOiBMYXlhLlZlY3RvcjMgPSB0YXJnZXQudHJhbnNmb3JtLmxvY2FsUm90YXRpb25FdWxlci5jbG9uZSgpO1xyXG4gICAgICAgICAgICBpZiAoZHVyYXRpb24gPT0gMHx8ZHVyYXRpb249PT11bmRlZmluZWR8fGR1cmF0aW9uPT09bnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uRXVsZXIgPSB0b1JvdGF0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSAmJiBjb21wbGV0ZS5hcHBseShjYWxsZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGZyYW1lPD0wfHxmcmFtZT09PXVuZGVmaW5lZHx8ZnJhbWU9PT1udWxsKXtcclxuICAgICAgICAgICAgICAgIGZyYW1lID0gdGhpcy5mcmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdXBkYXRlUmVuZGVyUm90YXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LnRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbkV1bGVyID0gcm90YXRpb247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1cGRhdGUgJiYgdXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIExheWEudGltZXIub25jZShkZWxheSwgdGFyZ2V0LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBMYXlhLnRpbWVyLmZyYW1lTG9vcChmcmFtZSwgdGFyZ2V0LCB1cGRhdGVSZW5kZXJSb3RhdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBlbmRUd2VlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQudHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uRXVsZXIgPSB0b1JvdGF0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0YXJnZXQsIHVwZGF0ZVJlbmRlclJvdGF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlICYmIGNvbXBsZXRlLmFwcGx5KGNhbGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0d2VlbiA9IExheWEuVHdlZW4udG8ocm90YXRpb24sIHsgeDogdG9Sb3RhdGlvbi54LCB5OiB0b1JvdGF0aW9uLnksIHo6IHRvUm90YXRpb24ueiB9LCBkdXJhdGlvbiwgZWFzZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0YXJnZXQsIGVuZFR3ZWVuKSwgZGVsYXksIGNvdmVyQmVmb3JlKTtcclxuICAgICAgICAgICAgaWYoIXRoaXMudHdlZW5NYXBbdGFyZ2V0LmlkXSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR3ZWVuTWFwW3RhcmdldC5pZF0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnR3ZWVuTWFwW3RhcmdldC5pZF0ucHVzaCh0d2VlbilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBTY2FsZVRvKHRhcmdldDogTGF5YS5TcHJpdGUzRCwgdG9TY2FsZTogTGF5YS5WZWN0b3IzLCBkdXJhdGlvbjogbnVtYmVyLCBjYWxsZXI6IGFueVxyXG4gICAgICAgICwgZWFzZT86IEZ1bmN0aW9uLCBjb21wbGV0ZT86IEZ1bmN0aW9uLCBkZWxheT86IG51bWJlciwgY292ZXJCZWZvcmU/OiBib29sZWFuLCB1cGRhdGU/OiBGdW5jdGlvbixmcmFtZT86bnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGxvY2FsU2NhbGUgPSB0YXJnZXQudHJhbnNmb3JtLmxvY2FsU2NhbGUuY2xvbmUoKTtcclxuICAgICAgICBpZiAoZHVyYXRpb24gPT0gMHx8ZHVyYXRpb249PT11bmRlZmluZWR8fGR1cmF0aW9uPT09bnVsbCkge1xyXG4gICAgICAgICAgICB0YXJnZXQudHJhbnNmb3JtLmxvY2FsU2NhbGUgPSB0b1NjYWxlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGNvbXBsZXRlICYmIGNvbXBsZXRlLmFwcGx5KGNhbGxlcik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZnJhbWU8PTB8fGZyYW1lPT09dW5kZWZpbmVkfHxmcmFtZT09PW51bGwpe1xyXG4gICAgICAgICAgICBmcmFtZSA9IHRoaXMuZnJhbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB1cGRhdGVSZW5kZXJQb3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRhcmdldC50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IGxvY2FsU2NhbGUuY2xvbmUoKTtcclxuICAgICAgICAgICAgdXBkYXRlICYmIHVwZGF0ZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGF5YS50aW1lci5vbmNlKGRlbGF5LCB0aGlzLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIExheWEudGltZXIuZnJhbWVMb29wKGZyYW1lLCB0YXJnZXQsIHVwZGF0ZVJlbmRlclBvcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGVuZFR3ZWVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0YXJnZXQudHJhbnNmb3JtLmxvY2FsU2NhbGUgPSB0b1NjYWxlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGFyZ2V0LCB1cGRhdGVSZW5kZXJQb3MpO1xyXG4gICAgICAgICAgICBjb21wbGV0ZSAmJiBjb21wbGV0ZS5hcHBseShjYWxsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdHdlZW4gPSBMYXlhLlR3ZWVuLnRvKGxvY2FsU2NhbGUsIHsgeDogdG9TY2FsZS54LCB5OiB0b1NjYWxlLnksIHo6IHRvU2NhbGUueiB9LCBkdXJhdGlvbiwgZWFzZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0YXJnZXQsIGVuZFR3ZWVuKSwgZGVsYXksIGNvdmVyQmVmb3JlKTtcclxuICAgICAgICBpZighdGhpcy50d2Vlbk1hcFt0YXJnZXQuaWRdKXtcclxuICAgICAgICAgICAgdGhpcy50d2Vlbk1hcFt0YXJnZXQuaWRdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHdlZW5NYXBbdGFyZ2V0LmlkXS5wdXNoKHR3ZWVuKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgQ2xlYXJUd2Vlbih0YXJnZXQ6TGF5YS5TcHJpdGUzRCl7XHJcbiAgICAgICAgbGV0IHR3ZWVucyA9IHRoaXMudHdlZW5NYXBbdGFyZ2V0LmlkXSBhcyBBcnJheTxMYXlhLlR3ZWVuPjtcclxuICAgICAgICBpZih0d2VlbnMmJnR3ZWVucy5sZW5ndGgpe1xyXG4gICAgICAgICAgICB3aGlsZSh0d2VlbnMubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHR3ZWVuID0gdHdlZW5zLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgdHdlZW4uY2xlYXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhLnRpbWVyLmNsZWFyQWxsKHRhcmdldCk7XHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IEdhbWVVSSBmcm9tIFwiLi9zY3JpcHQvR2FtZVVJXCJcclxuLypcclxuKiDmuLjmiI/liJ3lp4vljJbphY3nva47XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWd7XHJcbiAgICBzdGF0aWMgd2lkdGg6bnVtYmVyPTY0MDtcclxuICAgIHN0YXRpYyBoZWlnaHQ6bnVtYmVyPTExMzY7XHJcbiAgICBzdGF0aWMgc2NhbGVNb2RlOnN0cmluZz1cImZpeGVkd2lkdGhcIjtcclxuICAgIHN0YXRpYyBzY3JlZW5Nb2RlOnN0cmluZz1cIm5vbmVcIjtcclxuICAgIHN0YXRpYyBhbGlnblY6c3RyaW5nPVwidG9wXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25IOnN0cmluZz1cImxlZnRcIjtcclxuICAgIHN0YXRpYyBzdGFydFNjZW5lOmFueT1cInRlc3QvVGVzdFNjZW5lLnNjZW5lXCI7XHJcbiAgICBzdGF0aWMgc2NlbmVSb290OnN0cmluZz1cIlwiO1xyXG4gICAgc3RhdGljIGRlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHQvR2FtZVVJLnRzXCIsR2FtZVVJKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCI7XHJcbmNsYXNzIE1haW4ge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0Ly/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcblx0XHRpZiAod2luZG93W1wiTGF5YTNEXCJdKSBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcblx0XHRlbHNlIExheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgTGF5YVtcIldlYkdMXCJdKTtcclxuXHRcdExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YVtcIkRlYnVnUGFuZWxcIl0gJiYgTGF5YVtcIkRlYnVnUGFuZWxcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IEdhbWVDb25maWcuc2NhbGVNb2RlO1xyXG5cdFx0TGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gR2FtZUNvbmZpZy5zY3JlZW5Nb2RlO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblx0XHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cdH1cclxufVxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuLy4uL3VpL2xheWFNYXhVSVwiO1xyXG5pbXBvcnQgRDNUd2VlbiBmcm9tIFwiLi4vRDNUd2VlblwiO1xyXG4vKipcclxuICog5pys56S65L6L6YeH55So6Z2e6ISa5pys55qE5pa55byP5a6e546w77yM6ICM5L2/55So57un5om/6aG16Z2i5Z+657G777yM5a6e546w6aG16Z2i6YC76L6R44CC5ZyoSURF6YeM6Z2i6K6+572u5Zy65pmv55qEUnVudGltZeWxnuaAp+WNs+WPr+WSjOWcuuaZr+i/m+ihjOWFs+iBlFxyXG4gKiDnm7jmr5TohJrmnKzmlrnlvI/vvIznu6fmib/lvI/pobXpnaLnsbvvvIzlj6/ku6Xnm7TmjqXkvb/nlKjpobXpnaLlrprkuYnnmoTlsZ7mgKfvvIjpgJrov4dJREXlhoV2YXLlsZ7mgKflrprkuYnvvInvvIzmr5TlpoJ0aGlzLnRpcExibGzvvIx0aGlzLnNjb3JlTGJs77yM5YW35pyJ5Luj56CB5o+Q56S65pWI5p6cXHJcbiAqIOW7uuiuru+8muWmguaenOaYr+mhtemdoue6p+eahOmAu+i+ke+8jOmcgOimgemikee5geiuv+mXrumhtemdouWGheWkmuS4quWFg+e0oO+8jOS9v+eUqOe7p+aJv+W8j+WGmeazle+8jOWmguaenOaYr+eLrOeri+Wwj+aooeWdl++8jOWKn+iDveWNleS4gO+8jOW7uuiurueUqOiEmuacrOaWueW8j+WunueOsO+8jOavlOWmguWtkOW8ueiEmuacrOOAglxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVVJIGV4dGVuZHMgdWkudGVzdC5UZXN0U2NlbmVVSSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cdFx0XHJcbiAgICAgICAgLy/mt7vliqAzROWcuuaZr1xyXG4gICAgICAgIHZhciBzY2VuZTogTGF5YS5TY2VuZTNEID0gTGF5YS5zdGFnZS5hZGRDaGlsZChuZXcgTGF5YS5TY2VuZTNEKCkpIGFzIExheWEuU2NlbmUzRDtcclxuXHJcbiAgICAgICAgLy/mt7vliqDnhafnm7jmnLpcclxuICAgICAgICB2YXIgY2FtZXJhOiBMYXlhLkNhbWVyYSA9IChzY2VuZS5hZGRDaGlsZChuZXcgTGF5YS5DYW1lcmEoMCwgMC4xLCAxMDApKSkgYXMgTGF5YS5DYW1lcmE7XHJcbiAgICAgICAgY2FtZXJhLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IExheWEuVmVjdG9yMygwLCAzLCAzKSk7XHJcbiAgICAgICAgY2FtZXJhLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygtMzAsIDAsIDApLCB0cnVlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIC8v5re75Yqg5pa55ZCR5YWJXHJcbiAgICAgICAgdmFyIGRpcmVjdGlvbkxpZ2h0OiBMYXlhLkRpcmVjdGlvbkxpZ2h0ID0gc2NlbmUuYWRkQ2hpbGQobmV3IExheWEuRGlyZWN0aW9uTGlnaHQoKSkgYXMgTGF5YS5EaXJlY3Rpb25MaWdodDtcclxuICAgICAgICBkaXJlY3Rpb25MaWdodC5jb2xvciA9IG5ldyBMYXlhLlZlY3RvcjMoMC42LCAwLjYsIDAuNik7XHJcbiAgICAgICAgZGlyZWN0aW9uTGlnaHQudHJhbnNmb3JtLndvcmxkTWF0cml4LnNldEZvcndhcmQobmV3IExheWEuVmVjdG9yMygxLCAtMSwgMCkpO1xyXG5cclxuICAgICAgICAvL+a3u+WKoOiHquWumuS5ieaooeWei1xyXG4gICAgICAgIHZhciBib3g6IExheWEuTWVzaFNwcml0ZTNEID0gc2NlbmUuYWRkQ2hpbGQobmV3IExheWEuTWVzaFNwcml0ZTNEKG5ldyBMYXlhLkJveE1lc2goMSwgMSwgMSkpKSBhcyBMYXlhLk1lc2hTcHJpdGUzRDtcclxuICAgICAgICBib3gudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDQ1LCAwKSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB2YXIgbWF0ZXJpYWw6IExheWEuQmxpbm5QaG9uZ01hdGVyaWFsID0gbmV3IExheWEuQmxpbm5QaG9uZ01hdGVyaWFsKCk7XHJcblx0XHRMYXlhLlRleHR1cmUyRC5sb2FkKFwicmVzL2xheWFib3gucG5nXCIsIExheWEuSGFuZGxlci5jcmVhdGUobnVsbCwgZnVuY3Rpb24odGV4OkxheWEuVGV4dHVyZTJEKSB7XHJcblx0XHRcdFx0bWF0ZXJpYWwuYWxiZWRvVGV4dHVyZSA9IHRleDtcclxuXHRcdH0pKTtcclxuICAgICAgICBib3gubWVzaFJlbmRlcmVyLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubW92ZUIub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYubW92ZUIubW91c2VFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCB0b1BvczEgPSBuZXcgTGF5YS5WZWN0b3IzKGJveC50cmFuc2Zvcm0ucG9zaXRpb24ueCxib3gudHJhbnNmb3JtLnBvc2l0aW9uLnkrMixib3gudHJhbnNmb3JtLnBvc2l0aW9uLnopO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgRDNUd2Vlbi5Nb3ZlVG8oYm94LHRvUG9zMSwxMDAwLHRoaXMsbnVsbCxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvUG9zMiA9IG5ldyBMYXlhLlZlY3RvcjMoYm94LnRyYW5zZm9ybS5wb3NpdGlvbi54LGJveC50cmFuc2Zvcm0ucG9zaXRpb24ueS0yLGJveC50cmFuc2Zvcm0ucG9zaXRpb24ueik7XHJcbiAgICAgICAgICAgICAgICBEM1R3ZWVuLk1vdmVUbyhib3gsdG9Qb3MyLDEwMDAsc2VsZixMYXlhLkVhc2UucXVhZEluT3V0LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tb3ZlQi5tb3VzZUVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucm90YXRlQi5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5yb3RhdGVCLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgdG9Sb3QxID0gbmV3IExheWEuVmVjdG9yMyhib3gudHJhbnNmb3JtLmxvY2FsUm90YXRpb25FdWxlci54LGJveC50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbkV1bGVyLnkrNjAsYm94LnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uRXVsZXIueik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBEM1R3ZWVuLlJvdGF0ZVRvKGJveCx0b1JvdDEsMTAwMCx0aGlzLG51bGwsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxldCB0b1JvdDIgPSBuZXcgTGF5YS5WZWN0b3IzKGJveC50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbkV1bGVyLngsYm94LnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uRXVsZXIueSxib3gudHJhbnNmb3JtLmxvY2FsUm90YXRpb25FdWxlci56KzYwKTtcclxuICAgICAgICAgICAgICAgIEQzVHdlZW4uUm90YXRlVG8oYm94LHRvUm90MiwxMDAwLHRoaXMsTGF5YS5FYXNlLmV4cG9Jbk91dCxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucm90YXRlQi5tb3VzZUVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2NhbGVCLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcyxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmLnNjYWxlQi5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHRvU2NhbGUxID0gbmV3IExheWEuVmVjdG9yMyhib3gudHJhbnNmb3JtLmxvY2FsU2NhbGUueCxib3gudHJhbnNmb3JtLmxvY2FsU2NhbGUueSsyLGJveC50cmFuc2Zvcm0ubG9jYWxTY2FsZS56KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEQzVHdlZW4uU2NhbGVUbyhib3gsdG9TY2FsZTEsMTAwMCx0aGlzLG51bGwsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxldCB0b1NjYWxlMiA9IG5ldyBMYXlhLlZlY3RvcjMoYm94LnRyYW5zZm9ybS5sb2NhbFNjYWxlLngsYm94LnRyYW5zZm9ybS5sb2NhbFNjYWxlLnktMixib3gudHJhbnNmb3JtLmxvY2FsU2NhbGUueik7XHJcbiAgICAgICAgICAgICAgICBEM1R3ZWVuLlNjYWxlVG8oYm94LHRvU2NhbGUyLDEwMDAsc2VsZixMYXlhLkVhc2UucXVhZEluT3V0LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zY2FsZUIubW91c2VFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbmV4cG9ydCBtb2R1bGUgdWkudGVzdCB7XHJcbiAgICBleHBvcnQgY2xhc3MgVGVzdFNjZW5lVUkgZXh0ZW5kcyBTY2VuZSB7XHJcblx0XHRwdWJsaWMgbW92ZUI6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIHJvdGF0ZUI6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIHNjYWxlQjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcInRlc3QvVGVzdFNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyIl19
