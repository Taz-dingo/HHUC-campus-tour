<template>
    <div id="container">

    </div>
</template>

<script lang="ts" setup>
import * as THREE from 'three';
// 引入扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Stats from 'three/addons/libs/stats.module.js';
import { onMounted } from 'vue';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const stats = new Stats();
document.body.appendChild(stats.dom);

// antialias抗锯齿
const renderer = new THREE.WebGLRenderer({ antialias: true });
// 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// 从立方体贴图环境纹理生成经过预过滤的Mipmapped辐射环境贴图(PMREM)
const pmremGenerator = new THREE.PMREMGenerator(renderer);

// 渲染器
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3dd);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(renderer), 0.04).texture;

const gui = new GUI();

// 相机对象----------------------------------------
// 相机输出画布尺寸(px)
const width = window.innerWidth; //窗口文档显示区的宽度作为画布宽度
const height = window.innerHeight; //窗口文档显示区的高度作为画布高度

const cameraConfg = {
    fov: 40,
    near: 1,
    far: 1000
};
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

// 设置相机控件轨道控制器OrbitControls
// camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = true;     // 摄像机平移
controls.enableDamping = true;  // 摄像机阻尼

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);

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


    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "Bold 20px Arial";
    context.fillStyle = "rgba(255,255,255,1)";
    context.fillText('图书馆', 0, 20);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;


    var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(100, 50, 1.0);
    sprite.position.set(20,40,-5  );
    scene.add(sprite);

    // context.fillText('图书馆11  ', 0, 20);
    // model.scale.set( 0.01, 0.01, 0.01 );
    scene.add(model);

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
        opacity: 0.4
    });

    function generateGeometry() {
        updateGroupGeometry(mesh,
            new THREE.BoxGeometry(
                geometryConfig.width, geometryConfig.height, geometryConfig.depth
            )
        );
    }

    // 清除与更新
    function updateGroupGeometry(mesh, geometry) {

        // mesh.children[ 0 ].geometry.dispose();
        mesh.geometry.dispose();

        // mesh.children[ 0 ].geometry = new WireframeGeometry( geometry );
        mesh.geometry = geometry;

        // these do not update nicely together if shared

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

    generateGeometry();

    scene.add(mesh);  // 添加到场景中


    animate();

}, undefined, function (e) {

    console.error(e);

});



// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {

    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
};



function animate() {
    requestAnimationFrame(animate);

    controls.update();

    stats.update();

    renderer.render(scene, camera);
}


// 渲染结果画布添加到网页
onMounted(() => {
    document.getElementById('container')?.appendChild(renderer.domElement);
})

</script>

<style>
body {
    overflow: hidden;
    margin: 0px;
    background-color: #bfe3dd;
    color: #000;
}

#container {
    widows: 100vw;
    height: 100vh;
}
</style>
