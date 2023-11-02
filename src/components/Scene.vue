<template>
    
    <div id="container">
        <!-- <div style="color: #ff0000;z-index:2;position: absolute;">111111111111111红色</div> -->
        <!-- <div  id="red"  class="btn">红</div>
        <div  id="green" class="btn">绿</div> -->

    </div>

</template>

<script lang="ts" setup>
// 引入three.js
import * as THREE from 'three';
import { onMounted  } from 'vue'

// 引入扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// // 引入扩展库GLTFLoader.js
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// console.log(THREE.Scene);  // 测试是否引入成功
// obj加载器
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
// 引入性能监视器stats.js
import Stats from 'three/addons/libs/stats.module.js';

// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


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
// const material = new THREE.MeshBasicMaterial({
//     color:0xff0000,  //设置材质颜色
//     transparent:true, //开启透明
//     opacity:0.5, //设置透明度
// })
//MeshLambertMaterial受光照影响
const material = new THREE.MeshLambertMaterial(); 


// 创建网格模型，：表示物体
const mesh = new THREE.Mesh(geometry,material);
mesh.position.set(0,0,0);

// 创建精灵材质对象SpriteMaterial
const spriteMaterial = new THREE.SpriteMaterial({
  color:0x00ffff,//设置颜色
});
// 创建精灵模型对象，不需要几何体geometry参数
const sprite = new THREE.Sprite(spriteMaterial);
// 设置精灵位置
sprite.position.set(0,50,0);
// 设置精灵大小
sprite.scale.set(50, 25, 1); //只需要设置x、y两个分量就可以

// 把mesh添加到场景中
scene.add(mesh);
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

// // 材质loader
// const mtlLoader = new MTLLoader()
// // 模型loader
// const objLoader = new OBJLoader();

// // load a resource
// mtlLoader.load(
// 	// resource URL
// 	'/static/models/materials/whole.obj.mtl',
// 	// 成功完成回调函数
// 	 ( materials) => {
//         // 返回一个包含材质的对象MaterialCreator
//         console.log(materials);
//         // 设置材质
//         objLoader.setMaterials(materials);
//         objLoader.load(
//             // resource URL
//             '/static/models/whole.obj',
//             // 成功完成回调函数
//             function ( object ) {
                
//                 scene.add( object );

//             },
//             // 加载过程回调函数
//             function ( xhr ) {

//                 console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

//             },
//             // called when loading has errors
//             function ( error ) {

//                 console.log( 'An error happened' );

//             }
//         );

// 	},
// 	// 加载过程回调函数
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	// called when loading has errors
// 	function ( error ) {

// 		console.log( 'An error happened' );

// 	}
// );




// 渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(width,height);
// 执行渲染
renderer.render(scene,camera);

// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});//监听鼠标、键盘事件



// 渲染函数
var statsFPS = new Stats();
// var statsMS = new Stats();
// var statsMB = new Stats();
// FPS Frames rendered in the last second. The higher the number the better.
// MS Milliseconds needed to render a frame. The lower the number the better.
// MB MBytes of allocated memory. (Run Chrome with --enable-precise-memory-info)
// CUSTOM User-defined panel support.
statsFPS.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom]
// statsMS.showPanel( 1 );
// statsMB.showPanel( 2 );
document.body.appendChild( statsFPS.dom );
// document.body.appendChild( statsMS.dom );
// document.body.appendChild( statsMB.dom );

const clock = new THREE.Clock();



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
    mesh.material.color.set(value);
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
	raycaster.setFromCamera( pointer, camera );

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.children );

    for ( let i = 0; i < intersects.length; i ++ ) {
        intersects[ i ].object.material.color.set( 0xff0000 );
    }
    // const spt = clock.getDelta()*1000;//毫秒
    // console.log('两帧渲染时间间隔(毫秒)',spt);
    // console.log('帧率FPS',1000/spt);
    statsFPS.begin();
    renderer.render(scene, camera); //执行渲染操作
    // mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度

    statsFPS.end();

    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}
render();

window.addEventListener( 'click', onPointerClick );



onMounted(()=>{
    document.getElementById('container')?.appendChild(renderer.domElement);
    document.getElementById('red')?.addEventListener('click',function(){
        mesh.material.color.set(0xff0000);
        console.log("red is clicked");
    });
    document.getElementById('green')?.addEventListener('click',function(){
        mesh.material.color.set(0x00ff00);
    });
})

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