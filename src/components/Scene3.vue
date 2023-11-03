<template>
    <div id="container">
  
    </div>
  </template>
  
  <script lang="ts" setup>
      import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { onMounted } from 'vue';

// let mixer;

const clock = new THREE.Clock();
// const container = document.getElementById( 'container' );

const stats = new Stats();
document.body.appendChild( stats.dom );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const pmremGenerator = new THREE.PMREMGenerator( renderer );

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xbfe3dd );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment( renderer ), 0.04 ).texture;

const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
camera.position.set( 5, 2, 8 );

// camera controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

// draco压缩解码导入
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'static/jsm/libs/draco/gltf/' );

const loader = new GLTFLoader();
loader.setDRACOLoader( dracoLoader );
loader.load( 'static/model3/library.gltf', function ( gltf ) {

    const model = gltf.scene;
    model.position.set( 1, 1, 0 );
    model.scale.set( 0.01, 0.01, 0.01 );
    scene.add( model );

    // mixer = new THREE.AnimationMixer( model );
    // mixer.clipAction( gltf.animations[ 0 ] ).play();

    animate();

}, undefined, function ( e ) {

    console.error( e );

} );


window.onresize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

};


function animate() {

    requestAnimationFrame( animate );

    // const delta = clock.getDelta();

    // mixer.update( delta );

    controls.update();

    stats.update();

    renderer.render( scene, camera );

}
  
  
      // 渲染结果画布添加到网页
      onMounted(() => {
          document.getElementById('container')?.appendChild(renderer.domElement);
      })
  
  </script>
  
  <style>
      body{
          overflow: hidden;
          margin: 0px;
          background-color: #bfe3dd;
          color: #000;
      }
  
      #container{
          widows: 100vw;
          height: 100vh;
      }
  </style>
  