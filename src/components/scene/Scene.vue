<template>
    <div class="common-layout">
        <el-container>
            <el-header style="z-index: 1;">Header</el-header>
            <div id="container" ref="containerRef">

                <div class="infoContainer" style="pointer-events: auto;" ref="descRef">
                    <div ref="closeRef">
                        <el-icon>
                            <Close />
                        </el-icon>
                    </div>

                    <BDInfo :name="chooseObjName"
                        :intro="'学校中最亮眼的当属图书馆，其以方中带圆、中正大气的形态立于校园中央。图书馆流动起伏的水波纹外形，象征河海大学缘水而生、因水而为、顺水而长的办学特色。然而别致的造型，也让施工难度倍增。'">
                    </BDInfo>
                    <!-- <ScrollList></ScrollList> -->
                    <!-- <PostList :posts="posts"></PostList> -->
                </div>


            </div>

        </el-container>
    </div>
</template>

<script lang="ts" setup>
// 引入three.js
import * as THREE from 'three';
import { onMounted, ref } from 'vue'

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
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
// 引入CSS3渲染器CSS3DRenderer
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
// 引入后处理扩展库EffectComposer.js
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import PostList from '../PostList.vue';
import BDInfo from '../BDInfo.vue';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
// import store from '@/store/store.js';
import axios from 'axios';
import { stat } from 'fs';
import type ScrollListVue from '../ScrollList.vue';

const containerRef = ref();
const descRef = ref();
const closeRef = ref();         // 关闭窗口dom
let chooseObjName = '';    // 被选中建筑的name

// 相机输出画布尺寸(px)
const width = window.innerWidth; //窗口文档显示区的宽度作为画布宽度
const height = window.innerHeight; //窗口文档显示区的高度作为画布高度


// 性能可视化表
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom]
document.body.appendChild(stats.dom);

const cameraConfg = {
    fov: 40,
    near: 1,
    far: 1000
};

// 实例化一个gui对象
const gui = new GUI();
//改变交互界面style属性
gui.domElement.style.right = '0px';
gui.domElement.style.width = '300px';

const cameraFolder = gui.addFolder("相机属性设置");
const camera = new THREE.PerspectiveCamera(cameraConfg.fov, width / height, cameraConfg.near, cameraConfg.far);
{
    cameraFolder.add(camera, 'fov', 20, 100).name('视角').onChange((num) => {
        camera.fov = num;
        camera.updateProjectionMatrix();
    });
    cameraFolder.add(camera, 'near', 1, 10).name('近端视野').onChange((num) => {
        camera.near = num;
        camera.updateProjectionMatrix();
    });
    cameraFolder.add(camera, 'far', 100, 1000).name('远端视野').onChange((num) => {
        camera.far = num;
        camera.updateProjectionMatrix();
    });
}

camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

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

// antialias抗锯齿
const renderer = new THREE.WebGLRenderer({ antialias: true });
// 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// 从立方体贴图环境纹理生成经过预过滤的Mipmapped辐射环境贴图(PMREM)
const pmremGenerator = new THREE.PMREMGenerator(renderer);

// 设置相机控件轨道控制器OrbitControls
// camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = true;     // 摄像机平移
controls.enableDamping = true;  // 摄像机阻尼
// 是否允许旋转摄像机
// controls.enableRotate=false;

controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});//监听鼠标、键盘事件

// 三维场景scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3dd);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(renderer), 0.04).texture;

// 添加物体----------------------------------------------------


// 创建精灵材质对象SpriteMaterial
const spriteMaterial = new THREE.SpriteMaterial({
    color: 0x00ffff,//设置颜色
});
// 创建精灵模型对象，不需要几何体geometry参数
const sprite = new THREE.Sprite(spriteMaterial);
sprite.name = 'sprite';
// 设置精灵位置
sprite.position.set(0, 50, 0);
// 设置精灵大小
sprite.scale.set(50, 25, 1); //只需要设置x、y两个分量就可以

// 把mesh添加到场景中
// scene.add(mesh1);
// scene.add(mesh2);
// scene.add(sprite);

// draco压缩解码导入
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/static/jsm/libs/draco/gltf/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load('/static/model3/library.gltf', function (gltf) {

    const model = gltf.scene;
    const modelConfg = {
        x: 455,
        y: 0,
        z: 280
    }
    model.position.set(modelConfg.x, modelConfg.y, modelConfg.z);
    const modelFolder = gui.addFolder("模型属性设置");
    modelFolder.add(model.position, 'x', 0, 1000);
    modelFolder.add(model.position, 'y', 0, 1000);
    modelFolder.add(model.position, 'z', 0, 1000);

    // model.scale.set( 0.01, 0.01, 0.01 );
    scene.add(model);


    animate();

}, onProgress, function (e) {

    console.error(e);

});

// 加载过程回调函数-可以获得加载进度
function onProgress(xhr) {
    // 后台打印查看模型文件加载进度
    console.log('加载完成的百分比' + (xhr.loaded / xhr.total * 100) + '%');
}

const geometryConfig = {
    width: 100,
    height: 100,
    depth: 100
}
//创建一个长方体几何对象Geometry
const geometry = new THREE.BoxGeometry(geometryConfig.depth, geometryConfig.height, geometryConfig.depth);
//创建一个材质对象Material
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,//0xff0000设置材质颜色为红色
    transparent: true,
    opacity: 0
});

function generateGeometry() {
    updateGroupGeometry(mesh,
        new THREE.BoxGeometry(
            geometryConfig.width, geometryConfig.height, geometryConfig.depth
        )
    );
}

const boxFolder = gui.addFolder('方块属性设置');
boxFolder.add(geometryConfig, 'width', 0, 1000).onChange(generateGeometry);
boxFolder.add(geometryConfig, 'height', 0, 1000).onChange(generateGeometry);
boxFolder.add(geometryConfig, 'depth', 0, 1000).onChange(generateGeometry);

// 两个参数分别为几何体geometry、材质material
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
const meshFolder = gui.addFolder('网格属性设置');
meshFolder.add(mesh.position, 'x', -500, 1000);
meshFolder.add(mesh.position, 'y', -500, 1000);
meshFolder.add(mesh.position, 'z', -500, 1000);


// 创建网格模型，：表示物体
const mesh0 = new THREE.Mesh(new THREE.BoxGeometry(80, 32, 80), material);  // library
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(75, 25, 70), material);   // A
const mesh2 = new THREE.Mesh(new THREE.BoxGeometry(75, 25, 70), material);   // B
const mesh3 = new THREE.Mesh(new THREE.BoxGeometry(71, 20, 75), material);   // C
const mesh4 = new THREE.Mesh(new THREE.BoxGeometry(71, 20, 75), material);   // D    
const mesh5 = new THREE.Mesh(new THREE.BoxGeometry(65, 26, 65), material);   // E

mesh0.name = 'library';
mesh0.position.set(-5, 26, -1);
mesh1.name = 'A';
mesh1.position.set(56, 20, -144);
mesh2.name = 'B';
mesh2.position.set(-65, 20, -144);
mesh3.name = 'C';
mesh3.position.set(-147, 20, -61);
mesh4.name = 'D';
mesh4.position.set(-149, 20, 59);
mesh5.name = 'E';
mesh5.position.set(-111, 10, 110);


generateGeometry();

// 添加到场景中
scene.add(mesh);
scene.add(mesh0);
scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);
scene.add(mesh5);

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150);
// scene.add(axesHelper);


// 执行渲染
renderer.render(scene, camera);
renderer.domElement.style.zIndex = '0';

// 创建后处理对象EffectComposer，WebGL渲染器作为参数
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
// 设置renderPass通道
composer.addPass(renderPass);


// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // css3Renderer.setSize(window.innerWidth,window.innerHeight);
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
};

// canvas画布绝对定位
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0px';
renderer.domElement.style.left = '0px';
// renderer.domElement.style.zIndex = '1';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// 清除与更新
function updateGroupGeometry(mesh, geometry) {

    // mesh.children[ 0 ].geometry.dispose();
    mesh.geometry.dispose();

    // mesh.children[ 0 ].geometry = new WireframeGeometry( geometry );
    mesh.geometry = geometry;

    // these do not update nicely together if shared

}

function onPointerClick(event: { clientX: number; clientY: number; }) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components
    // HTML.client坐标 -> threejs标准设备坐标
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

}


function animate() {
    requestAnimationFrame(animate);

    controls.update();

    stats.update();
    css2Renderer.render(scene, camera); // 渲染CSS2D
    renderer.render(scene, camera);
}

window.addEventListener('click', onPointerClick);

const posts = ref(Array);

var tagtest: THREE.Object3D<THREE.Event>;
var chooseObj: THREE.Object3D<THREE.Event> | null = null;
var descObj: THREE.Object3D<THREE.Event>;
var desc3DObj: THREE.Object3D<THREE.Event>;

const emit = defineEmits(['clickChild']);

// 点击检测事件    
const clickChild = renderer.domElement.addEventListener('click', function (event) {
    // 先清空之前的信息
    posts.value = []
    // chooseObj?.remove(descObj);

    onPointerClick(event);
    // 在点击位置生成raycaster射线ray
    raycaster.setFromCamera(pointer, camera);
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);

    console.log(intersects);
    if (intersects.length > 0) {
        chooseObj = intersects[0].object;
        chooseObjName = chooseObj.name;
        // 向父组件传值
        emit('clickChild', chooseObjName);
        // load();
        console.log(chooseObjName);
        // outlinePass.selectedObjects = [chooseObj];
        // chooseObj.add(tagtest);
        chooseObj.add(descObj);

        // chooseObj.add(desc3DObj);
        descObj.position.set(60, 0, -50);
        descObj.scale.set(10, 10, 10);
        // scene.add(descObj);
    } else if (intersects.length == 0) {
        // posts.value=[];
        chooseObj?.remove(descObj);
    }
})


// const posts:Array<any> = [];

onMounted(() => {
    // dom操作
    console.log(containerRef.value);
    console.log(descRef.value);
    console.log(closeRef.value);

    // 鼠标单击按钮，关闭HTML标签
    closeRef.value.addEventListener('click', function () {
        console.log("clicked")
        console.log(chooseObj);
        if (chooseObj) {
            chooseObj.remove(descObj); //从场景移除
        }
    })

    containerRef.value.appendChild(renderer.domElement);
    gui.domElement.style.top = containerRef.value.getBoundingClientRect().top.toString() + 'px';
    stats.dom.style.top = containerRef.value.getBoundingClientRect().top.toString() + 'px';
    // stats.dom.style.right='0px';
    // stats.dom.style.bottom='0px';
    // stats.dom.style.display='flex';

    descObj = new CSS2DObject(descRef.value);
    desc3DObj = new CSS3DObject(descRef.value);

});

</script>




<style>
#container {
    position: absolute;
    top: 0px;
    width: 100vw;
    height: 100vh;
}

.infoContainer {
    background-color: azure;
    margin: 10px;
    opacity: 0.9;
}

.post {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: gray;
}

.btn {
    position: relative;
    display: block;
    margin: auto;
    z-index: 1;
    left: 50%;
}

body {
    margin: 0;
    overflow: hidden;
}
</style>@/store/store.js