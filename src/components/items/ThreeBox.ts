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
