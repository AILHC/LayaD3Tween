import { TweenExt } from "./TweenExt";

export class D3TweenTest {
    startTest() {
        TweenExt.init();
        var scene = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;
        var camera = scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 2, 5));
        camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);

        camera.clearColor = new Laya.Vector4(0.2, 0.2, 0.2, 1.0);
        scene.ambientColor = new Laya.Vector3(1, 1, 1);
        // var directionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        // directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1.0, -1.0, -1.0));
        let mat = new Laya.UnlitMaterial();
        mat.albedoColor = new Laya.Vector4(0.1, 0.1, 0.1, 0.1);
        var box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.5, 0.5, 0.5))) as Laya.MeshSprite3D;
        box.meshRenderer.material = mat;
        Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function (tex: Laya.Texture2D) {
            mat.albedoTexture = tex;
        }));
        box.transform.position = new Laya.Vector3(2.0, 0.25, 0.6);
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        let label_rotate = new Laya.Label();
        label_rotate.fontSize = 35;
        label_rotate.text = "旋转";
        label_rotate.color = "#ffffff";
        label_rotate.x = Laya.stage.width / 5;
        label_rotate.y = Laya.stage.height / 3;
        let label_move = new Laya.Label();
        label_move.fontSize = 35;
        label_move.text = "位移";
        label_move.color = "#ffffff";
        label_move.x = Laya.stage.width / 5 * 2;
        label_move.y = Laya.stage.height / 3;
        let label_scale = new Laya.Label();
        label_scale.fontSize = 35;
        label_scale.text = "缩放";
        label_scale.color = "#ffffff";
        label_scale.x = Laya.stage.width / 2;
        label_scale.y = Laya.stage.height / 3;
        let label_color = new Laya.Label();
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
            } else {
                label_move["to"] = true;
                Laya.Tween.from(box, { position: { x: 1, y: 1, z: 2 } }, 10000, null, Laya.Handler.create(this, function () {
                    console.log("complete");
                    console.log(box.transform.position);
                }))
            }

        });
        label_rotate.on(Laya.Event.CLICK, this, function () {
            console.log(`rotation:x:${box.transform.rotationEuler.x},y:${box.transform.rotationEuler.y},z:${box.transform.rotationEuler.z}`);
            if (label_rotate["to"]) {
                label_rotate["to"] = false;

                Laya.Tween.to(box, { rotationEuler: { x: 120, y: 0, z: 0 } }, 5000, null, Laya.Handler.create(this, function () {
                    console.log("complete");
                    console.log(box.transform.rotationEuler);
                }))
            } else {
                label_rotate["to"] = true;
                Laya.Tween.from(box, { rotationEuler: { x: 30, y: 90, z: 90 } }, 5000, null, Laya.Handler.create(this, function () {
                    console.log("complete");
                    console.log(box.transform.rotationEuler);
                }))
            }
        });
        let scale_complete = function () {
            console.log("complete");
            console.log(`scale:x:${box.transform.scale.x},y:${box.transform.scale.y},z:${box.transform.scale.z}`);
        };
        label_scale.on(Laya.Event.CLICK, this, function () {
            console.log(`scale:x:${box.transform.scale.x},y:${box.transform.scale.y},z:${box.transform.scale.z}`);
            if (label_scale["to"]) {
                label_scale["to"] = false;

                Laya.Tween.to(box, { scale: { x: 1, y: 5, z: 1 } }, 5000, null,
                    Laya.Handler.create(this, scale_complete), 0, true);
            } else {
                label_scale["to"] = true;

                Laya.Tween.to(box, { scale: { x: 2, y: 1, z: 1 } }, 5000, null, Laya.Handler.create(this, scale_complete), 10, true)
            }
        });
        let color_complete = function () {
            console.log("complete");
            console.log(`label_color:x:
            ${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColor.x}
            ,y:${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColor.y}
            ,z:${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColor.z}
            ,w:${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColor.w}`);
            console.log(`label_color:a:
            ${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColorA}
            ,r:${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColorR}
            ,g:${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColorG}
            ,b:${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColorB}`);
        };
        label_color.on(Laya.Event.CLICK, this, function () {
            console.log(`label_color:x:
            ${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColor.x}
            ,y:${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColor.y}
            ,z:${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColor.z}
            ,w:${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColor.w}`);
            console.log(`label_color:a:
            ${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColorA}
            ,r:${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColorR}
            ,g:${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColorG}
            ,b:${(box.meshRenderer.sharedMaterial as Laya.UnlitMaterial).albedoColorB}`);
            if (label_color["to"]) {
                label_color["to"] = false;

                Laya.Tween.to(box.meshRenderer.sharedMaterial, { albedoColor: { x: 0.1, y: 0.2, z: 0.3, w: 0.4 } }, 5000, null,
                    Laya.Handler.create(this, color_complete), 0, true);
            } else {
                label_color["to"] = true;

                Laya.Tween.to(box.meshRenderer.sharedMaterial
                    , { albedoColor: { x: 0.5, y: 0.6, z: 0.7, w: 0.8 } }, 5000, Laya.Ease.quadInOut
                    , Laya.Handler.create(this, color_complete), 10, true)
            }
        })


    }
}