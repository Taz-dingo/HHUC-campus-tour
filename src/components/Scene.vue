<template>    
    <div class="common-layout" >
        <el-container>
            <el-header style="z-index: 1;">Header</el-header>
            <div id="container" ref="containerRef">
                
            </div>
            <div id="tag" style="z-index: 1;pointer-events: none;" ref="tagRef" >
                    1145141919
            </div>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
// 引入three.js
import * as THREE from 'three';
import { onMounted, ref  } from 'vue'

// 引入扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入性能监视器stats.js
import Stats from 'three/addons/libs/stats.module.js';

// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// 引入CSS2模型对象CSS2DObject
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
// 引入CSS3模型对象CSS3DObject
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
// 引入CSS2渲染器CSS2DRenderer
import {CSS2DRenderer} from 'three/addons/renderers/CSS2DRenderer.js';
// 引入CSS3渲染器CSS3DRenderer
import {CSS3DRenderer} from 'three/addons/renderers/CSS3DRenderer.js';
// 引入后处理扩展库EffectComposer.js
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

const containerRef = ref();
const tagRef = ref();


// 相机输出画布尺寸(px)
const width = window.innerWidth;
const height = window.innerHeight;

// 创建一个CSS2渲染器CSS2DRenderer
const css2Renderer = new CSS2DRenderer();
css2Renderer.setSize(width, height);
// HTML标签<div id="tag"></div>外面父元素叠加到canvas画布上且重合
css2Renderer.domElement.style.position = 'absolute';
css2Renderer.domElement.style.top = '0px';
//设置.pointerEvents=none，解决HTML元素标签对threejs canvas画布鼠标事件的遮挡
css2Renderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(css2Renderer.domElement);
css2Renderer.domElement.style.zIndex = '1';

// 创建一个CSS3渲染器CSS3DRenderer
const css3Renderer = new CSS3DRenderer();
css3Renderer.setSize(width, height);
// HTML标签<div id="tag"></div>外面父元素叠加到canvas画布上且重合
css3Renderer.domElement.style.position = 'absolute';
css3Renderer.domElement.style.top = '0px';
//设置.pointerEvents=none，解决HTML元素标签对threejs canvas画布鼠标事件的遮挡
css3Renderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(css3Renderer.domElement);

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
mesh2.name='mesh2';
mesh2.position.set(100,100,0);


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

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);

// 相机对象----------------------------------------
const camera = new THREE.PerspectiveCamera(50,width/height,0.1,4000);
camera.position.set(200,200,200);
camera.lookAt(0,0,0);

// 渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(width,height);
// 执行渲染
renderer.render(scene,camera);
renderer.domElement.style.zIndex='0';

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
// 是否允许旋转摄像机
// controls.enableRotate=false;

controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});//监听鼠标、键盘事件



// 性能可视化表
const stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom]
document.body.appendChild( stats.dom );


// 设置背景颜色(color,alpha)
renderer.setClearColor(0x808080,1);

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
        // 重置渲染器输出画布canvas尺寸
        renderer.setSize(window.innerWidth, window.innerHeight);
        // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
        camera.aspect = window.innerWidth / window.innerHeight;
        css3Renderer.setSize(window.innerWidth,window.innerHeight);
        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        camera.updateProjectionMatrix();
};

// canvas画布绝对定位
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0px';
renderer.domElement.style.left = '0px';
// renderer.domElement.style.zIndex = '1';

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
    renderer.render(scene, camera); // 执行渲染操作
    css2Renderer.render(scene, camera); // 渲染CSS2D
    
    css3Renderer.render(scene, camera); // 渲染CSS3D
    
    stats.end();

    requestAnimationFrame(render);// 请求再次执行渲染函数render，渲染下一帧
}

window.addEventListener('click',onPointerClick);

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
        console.log(chooseObj.id);
        outlinePass.selectedObjects = [chooseObj];
    }
})

render();


onMounted(()=>{
    console.log(containerRef.value);
    console.log(tagRef.value);
    containerRef.value.appendChild(renderer.domElement);
    gui.domElement.style.top = containerRef.value.getBoundingClientRect().top.toString() + 'px';
    stats.dom.style.top = containerRef.value.getBoundingClientRect().top.toString() + 'px';

    const tagtest = new CSS3DObject(tagRef.value);
    mesh2.add(tagtest);
});

</script>

<style>
    #container {
        position: absolute;
        top: 0px;
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
    }



</style>