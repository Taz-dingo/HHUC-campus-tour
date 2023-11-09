<template>

    
    <div class="common-layout" >
        <el-container>
            <el-header>Header</el-header>
            <div id="container" ref="containerRef">
                <div id="tag" ref="tagRef" >
                    1234567654321345678
                </div>
            </div>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
// 引入three.js
import * as THREE from 'three';
import { defineCustomElement, onMounted, ref  } from 'vue'

// 引入扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入性能监视器stats.js
import Stats from 'three/addons/libs/stats.module.js';

// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// 引入CSS2模型对象CSS2DObject
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
// 引入CSS2渲染器CSS2DRenderer
import {CSS2DRenderer} from 'three/addons/renderers/CSS2DRenderer.js';

// 引入后处理扩展库EffectComposer.js
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

const containerRef = ref();
const tagRef = ref();

// 创建一个CSS2渲染器CSS2DRenderer
const css2Renderer = new CSS2DRenderer();
css2Renderer.setSize(100, 100);
// HTML标签<div id="tag"></div>外面父元素叠加到canvas画布上且重合
css2Renderer.domElement.style.position = 'absolute';
css2Renderer.domElement.style.top = '0px';
//设置.pointerEvents=none，解决HTML元素标签对threejs canvas画布鼠标事件的遮挡
css2Renderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(css2Renderer.domElement);
css2Renderer.domElement.style.zIndex = '1';

// 实例化一个gui对象
const gui = new GUI();
//改变交互界面style属性
gui.domElement.style.right = '0px';
gui.domElement.style.width = '300px';

// 三维场景scene
const scene = new THREE.Scene();
// 添加物体----------------------------------------------------

// 立方体
const geometry = new THREE.BoxGeometry(100,60,20);
// 材质对象
const material = new THREE.MeshBasicMaterial({
    color:0xff0000,  //设置材质颜色
    transparent:true, //开启透明
    opacity:0.5, //设置透明度
})
//MeshLambertMaterial受光照影响
// const material = new THREE.MeshLambertMaterial(); 


// 创建网格模型，：表示物体
const mesh1 = new THREE.Mesh(geometry,material);
const mesh2 = new THREE.Mesh(geometry,material);
mesh1.material.color.set(0x00ff00);
mesh1.name='mesh1';
mesh1.position.set(0,0,0);

mesh2.position.set(100,100,0);
mesh2.name='mesh2';

// 创建精灵材质对象SpriteMaterial
const spriteMaterial = new THREE.SpriteMaterial({
  color:0x00ffff,//设置颜色
});
// 创建精灵模型对象，不需要几何体geometry参数
const sprite = new THREE.Sprite(spriteMaterial);
sprite.name='sprite';
// 设置精灵位置
sprite.position.set(0,50,0);
// 设置精灵大小
sprite.scale.set(50, 25, 1); //只需要设置x、y两个分量就可以

// 把mesh添加到场景中
scene.add(mesh1);
scene.add(mesh2);
scene.add(sprite);

// 光源-----------------------------------------
// 点光源：两个参数分别表示光源颜色和光照强度
// 参数1：0xffffff是纯白光,表示光源颜色
// 参数2：1.0,表示光照强度，可以根据需要调整
const pointLight = new THREE.PointLight(0xffffff, 1.0);
// 点光源位置
pointLight.position.set(400, 200, 100);//点光源放在x轴上
scene.add(pointLight);
// 光源辅助观察
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
scene.add(pointLightHelper);

//环境光:没有特定方向，整体改变场景的光照明暗
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(100, 60, 50);
// // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
// directionalLight.target = mesh;
scene.add(directionalLight);
// DirectionalLightHelper：可视化平行光
const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5,0xff0000);
scene.add(dirLightHelper);


// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);

// 相机输出画布尺寸(px)
const width = window.innerWidth;
const height = window.innerHeight;

// 相机对象----------------------------------------
const camera = new THREE.PerspectiveCamera(50,width/height,0.1,4000);
camera.position.set(200,200,200);
camera.lookAt(0,0,0);

// 渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(width,height);
// 执行渲染
renderer.render(scene,camera);

// 创建后处理对象EffectComposer，WebGL渲染器作为参数
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
// 设置renderPass通道
composer.addPass(renderPass);

// 创建OutlinePass通道
// v2的尺寸和canvas画布保持
const v2 = new THREE.Vector2(window.innerWidth, window.innerHeight);
const outlinePass = new OutlinePass(v2, scene, camera);
outlinePass.selectedObjects = [mesh1];
outlinePass.visibleEdgeColor.set(0x00ffff);
outlinePass.edgeThickness = 4;
outlinePass.edgeStrength = 6;
composer.addPass(outlinePass);



// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景

controls.enableRotate=false;

controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});//监听鼠标、键盘事件



// 渲染函数
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom]
// document.body.appendChild( stats.dom );


// 设置背景颜色(color,alpha)
renderer.setClearColor(0x808080,1);

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
        // 重置渲染器输出画布canvas尺寸
        renderer.setSize(window.innerWidth, window.innerHeight);
        // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
        camera.aspect = window.innerWidth / window.innerHeight;
        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        camera.updateProjectionMatrix();
};

// 通过GUI改变mesh.position对象的xyz属性
gui.add(ambient, 'intensity', 0, 2.0);

const obj = {
    color:0x00ffff,
};
// .addColor()生成颜色值改变的交互界面
gui.addColor(obj, 'color').onChange(function(value: THREE.ColorRepresentation){
    mesh1.material.color.set(value);
});



// canvas画布绝对定位
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0px';
renderer.domElement.style.left = '0px';
renderer.domElement.style.zIndex = '0';


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerClick( event: { clientX: number; clientY: number; } ) {

    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components
    // HTML.client坐标 -> threejs标准设备坐标
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function render() {
    
    // update the picking ray with the camera and pointer position
	
    stats.begin();
    composer.render();
    renderer.render(scene, camera); //执行渲染操作
    css2Renderer.render(scene, camera); //渲染CSS2D
    
    stats.end();

    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}

window.addEventListener('click',onPointerClick);

// HTML元素转化为threejs的CSS2模型对象
const tag = new CSS2DObject(tagRef.value);
scene.add(tag);

tag.position.set(50,0,50);
var chooseObj = null;
renderer.domElement.addEventListener('click',function(event) {
    onPointerClick(event);
    // 在点击位置生成raycaster射线ray
    raycaster.setFromCamera( pointer, camera );
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.children );
    console.log(intersects);
    if(intersects.length > 0 ){
        chooseObj = intersects[0].object;
        const name = intersects[0].object.name;
        console.log(name);
        chooseObj.material.color.set( 0xff0000 );
        chooseObj.add(tag);
        console.log(chooseObj.id);
        outlinePass.selectedObjects = [chooseObj];
    }
})

// // HTML元素转化为threejs的CSS2模型对象
// const tag = new CSS2DObject(tagRef.value);

// var chooseObj: { remove: (arg0: any) => void; } | null = null;
// renderer.domElement.addEventListener('click', function (event) {
//     const px = event.offsetX;
//     const py = event.offsetY;
//     //屏幕坐标转标准设备坐标
//     const x = (px / window.innerWidth) * 2 - 1;
//     const y = -(py / window.innerHeight) * 2 + 1;
//     const raycaster = new THREE.Raycaster();
//     //.setFromCamera()在点击位置生成raycaster的射线ray
//     raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
//     const cunchu = new THREE.Group();
//     cunchu.add(mesh);

//     // 射线拾取模型对象(包含多个Mesh)
//     // 可以给待选对象的所有子孙后代Mesh，设置一个祖先属性ancestors,值指向祖先(待选对象)    
//     for (let i = 0; i < cunchu.children.length; i++) {
//         const group = cunchu.children[i];
//         //递归遍历chooseObj，并给chooseObj的所有子孙后代设置一个ancestors属性指向自己
//         group.traverse(function (obj) {
//             if (obj.isMesh) {
//                 obj.ancestors = group;
//             }
//         })
//     }
//     // 射线交叉计算拾取模型
//     const intersects = raycaster.intersectObjects(cunchu.children);
//     if (intersects.length > 0) {
//         // 通过.ancestors属性判断那个模型对象被选中了
//         outlinePass.selectedObjects = [intersects[0].object.ancestors];
//         //tag会标注在intersects[0].object.ancestors模型的局部坐标系原点位置
//         intersects[0].object.ancestors.add(tag);
//         chooseObj = intersects[0].object.ancestors;
//     }else{
//         if(chooseObj){//把原来选中模型对应的标签和发光描边隐藏
//             outlinePass.selectedObjects = [];//无发光描边
//             chooseObj.remove(tag);//从场景移除
//         }
//     }
// })

// renderer.domElement.addEventListener('click', function (event) {
//     const px = event.offsetX;
//     const py = event.offsetY;
//     //屏幕坐标转标准设备坐标
//     const x = (px / window.innerWidth) * 2 - 1;
//     const y = -(py / window.innerHeight) * 2 + 1;
//     const raycaster = new THREE.Raycaster();
//     //.setFromCamera()在点击位置生成raycaster的射线ray
//     raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
//     const cunchu = new THREE.Group();
//     cunchu.add(mesh1);
//     cunchu.add(mesh2);
//     cunchu.add(sprite);

//     // // 射线拾取模型对象(包含多个Mesh)
//     // // 可以给待选对象的所有子孙后代Mesh，设置一个祖先属性ancestors,值指向祖先(待选对象)    
//     // for (let i = 0; i < cunchu.children.length; i++) {
//     //     const group = cunchu.children[i];
//     //     //递归遍历chooseObj，并给chooseObj的所有子孙后代设置一个ancestors属性指向自己
//     //     group.traverse(function (obj) {
//     //         if (obj.isMesh) {
//     //             obj.ancestors = group;
//     //         }
//     //     })
//     // }

//     // 射线交叉计算拾取模型
//     const intersects = raycaster.intersectObjects(cunchu.children);
//     console.log('intersects', intersects);
//     if (intersects.length > 0) {
//         // 通过.ancestors属性判断那个模型对象被选中了
//         // outlinePass.selectedObjects = [intersects[0].object.ancestors];
//         // outlinePass.selectedObjects = [intersects[0].object];
//     }
// })

render();


onMounted(()=>{
    console.log(containerRef.value);
    console.log(tagRef.value);
    containerRef.value.appendChild(renderer.domElement);
    gui.domElement.style.top = containerRef.value.getBoundingClientRect().top.toString() + 'px';
    stats.dom.style.top = containerRef.value.getBoundingClientRect().top.toString() + 'px';

    // document.getElementById('red')?.addEventListener('click',function(){
    //     mesh.material.color.set(0xff0000);
    //     console.log("red is clicked");
    // });
    // document.getElementById('green')?.addEventListener('click',function(){
    //     mesh.material.color.set(0x00ff00);
});

</script>

<style>
    #container {
        position: relative;
        width: 100vw;
        height: 100vh;
    }


    .btn{
        position: relative;
        display: block;
        margin: auto;
        z-index: 1;
        left: 50%;
    }

    body{
        margin:0;
        overflow: hidden;
        /* z-index: 2; */
    }



</style>