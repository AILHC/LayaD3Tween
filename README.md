# LayaD3Tween
基于Laya Tween做的3d缓动拓展，现在支持Sprite3d的transform里的旋转，位移，缩放，支持Vector3和Vector4属性的缓动
# 使用方法
拷贝TweenExt.ts到项目中，在使用这个扩展之前先初始化，TweenExt.init();
### 3d对象的缓动使用
1. transform 对象的缓动
```ts
//可以缓动position，rotationEuler ,scale 等
await Tween.to(box, { position: { x: 0, y: 0, z: 0 } }, 10000, null);
console.log("complete");
console.log(box.transform.position);
```
2. 材质属性缓动
```ts
//可以缓动position，rotationEuler ,scale 等
await Tween.to(box.meshRenderer.sharedMaterial, { albedoColor: { x: 0.5, y: 0.6, z: 0.7, w: 0.8 } }, 10000, null);
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
```
3. 其他更多支持，可以看源码
