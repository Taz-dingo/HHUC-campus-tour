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
    import { onMounted } from 'vue';
    import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
    // 引入dat.gui.js的一个类GUI
    import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


    const scene = new THREE.Scene();
    const gui = new GUI();

    // 相机对象----------------------------------------
    // 相机输出画布尺寸(px)
    const width = window.innerWidth; //窗口文档显示区的宽度作为画布宽度
    const height = window.innerHeight; //窗口文档显示区的高度作为画布高度

    const cameraConfg = {
        fov: 45,
        near: 0.25,
        far: 1000
    };
    const cameraFolder = gui.addFolder("相机属性设置");
    const camera = new THREE.PerspectiveCamera(cameraConfg.fov,width/height,cameraConfg.near,cameraConfg.far);
    {
        cameraFolder.add(camera,'fov',20,100).name('视角').onChange((num) => {
            camera.fov = num;
            camera.updateProjectionMatrix();
        });
        cameraFolder.add(camera,'near',0.1,100).name('近端视野').onChange((num) => {
            camera.near = num;
            camera.updateProjectionMatrix();
        });
        cameraFolder.add(camera,'far',1,3000).name('远端视野').onChange((num) => {
            camera.far = num;
            camera.updateProjectionMatrix();
        });
    }
    

    camera.position.set(200,200,200);
    camera.lookAt(0,0,0);

    // 渲染器
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(width,height);

    
    // 设置相机控件轨道控制器OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    controls.addEventListener('change', function () {
        renderer.render(scene, camera); //执行渲染操作
    });//监听鼠标、键盘事件

    function render() {
        renderer.render(scene, camera); //执行渲染操作
        requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
        // 浏览器控制台查看controls.target变化，辅助设置lookAt参数
        console.log('controls.target',controls.target);
    }

    render();


    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(150);
    scene.add(axesHelper);

    // const urls = [
    //     {
    //         key:'park1',
    //         url:'/static/model2/Tile__000__000.gltf'
    //     },{
    //         key:'park2',
    //         url:'/static/model2/Tile__000__001.gltf'
    //     },{
    //         key:'park3',
    //         url:'/static/model2/Tile__000__002.gltf'
    //     },{
    //         key:'park4',
    //         url:'/static/model2/Tile__000__003.gltf'
    //     },{
    //         key:'park5',
    //         url:'/static/model2/Tile__000__004.gltf'
    //     },{
    //         key:'park6',
    //         url:'/static/model2/Tile__001__000.gltf'
    //     },{
    //         key:'park7',
    //         url:'/static/model2/Tile__001__001.gltf'
    //     },{
    //         key:'park8',
    //         url:'/static/model2/Tile__001__002.gltf'
    //     },{
    //         key:'park9',
    //         url:'/static/model2/Tile__001__003.gltf'
    //     },{
    //         key:'park10',
    //         url:'/static/model2/Tile__001__004.gltf'
    //     },{
    //         key:'park11',
    //         url:'/static/model2/Tile__002__000.gltf'
    //     },{
    //         key:'park12',
    //         url:'/static/model2/Tile__002__001.gltf'
    //     },{
    //         key:'park13',
    //         url:'/static/model2/Tile__002__002.gltf'
    //     },{
    //         key:'park14',
    //         url:'/static/model2/Tile__002__003.gltf'
    //     },{
    //         key:'park15',
    //         url:'/static/model2/Tile__002__004.gltf'
    //     },{
    //         key:'park16',
    //         url:'/static/model2/Tile__003__000.gltf'
    //     },{
    //         key:'park17',
    //         url:'/static/model2/Tile__003__001.gltf'
    //     },{
    //         key:'park18',
    //         url:'/static/model2/Tile__003__002.gltf'
    //     },{
    //         key:'park19',
    //         url:'/static/model2/Tile__003__003.gltf'
    //     },{
    //         key:'park20',
    //         url:'/static/model2/Tile__003__004.gltf'
    //     },{
    //         key:'park21',
    //         url:'/static/model2/Tile__004__000.gltf'
    //     },{
    //         key:'park22',
    //         url:'/static/model2/Tile__004__001.gltf'
    //     },{
    //         key:'park23',
    //         url:'/static/model2/Tile__004__002.gltf'
    //     },{
    //         key:'park24',
    //         url:'/static/model2/Tile__004__003.gltf'
    //     },{
    //         key:'park25',
    //         url:'/static/model2/Tile__004__004.gltf'
    //     },
    // ]

    // const  loadModel = (data) => {
    //     const { url} = data;
    //     const gltfloader = new GLTFLoader();
    //     gltfloader.load(url, function (gltf) {
    //         scene.add(gltf.scene)
    //         gltf.scene.position.set(-5, 0, 0);
    //     },
    //     // 加载过程回调函数
    //     function ( xhr ) {

    //         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    //     },
    //     // called when loading has errors
    //     function ( error ) {

    //         console.log( 'An error happened' );

    //     }
    //     );
    // }
    
    
    // urls.map((d) => {
    //     loadModel(d);
    // })




    // ------------------------

    // 创建GLTF加载器对象
    const loader = new GLTFLoader();

    loader.load( '/static/model3/output3.glb', function ( gltf ) {
        console.log('控制台查看加载gltf文件返回的对象结构',gltf);
        console.log('gltf对象场景属性',gltf.scene);
        // 返回的场景对象gltf.scene插入到threejs场景中
        scene.add( gltf.scene );
        gltf.scene.children.name = 'library'; 
    })

    // ------------------------

    // DACRO
    // Instantiate a loader
    // const loader = new DRACOLoader();

    // // Specify path to a folder containing WASM/JS decoding libraries.
    // loader.setDecoderPath( '/examples/jsm/libs/draco/' );

    // // Optional: Pre-fetch Draco WASM/JS module.
    // loader.preload();

    // // Load a Draco geometry
    // loader.load(
    //     // resource URL
    //     '/static/model3/output2.glb',
    //     // called when the resource is loaded
    //     function ( geometry ) {

    //         const material = new THREE.MeshStandardMaterial( { color: 0x606060 } );
    //         const mesh = new THREE.Mesh( geometry, material );
    //         scene.add( mesh );

    //     },
    //     // called as loading progresses
    //     function ( xhr ) {

    //         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    //     },
    //     // called when loading has errors
    //     function ( error ) {

    //         console.log( 'An error happened' );

    //     }
    // );


    //环境光:没有特定方向，整体改变场景的光照明暗
    const ambient = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambient);
    gui.add(ambient,'intensity',0,2.0).name('环境光强度');

    const pointLight = new THREE.PointLight(0xffffff, 1.0);
    // 点光源位置
    pointLight.position.set(400, 2000, 100);//点光源放在x轴上
    scene.add(pointLight);

    // 设置背景颜色(color,alpha)
    renderer.setClearColor(0xFFFFFF,0);

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


    // 渲染结果画布添加到网页
    onMounted(() => {
        document.getElementById('container')?.appendChild(renderer.domElement);
    })

</script>

<style>
    body{
        overflow: hidden;
        margin: 0px;
    }

    #container{
        widows: 100vw;
        height: 100vh;
    }
</style>
