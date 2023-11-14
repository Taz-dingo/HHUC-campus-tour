<template>
    <el-button class="button" type="primary" style="margin-left: 16px" @click="drawer = true">
      open
    </el-button>
  
    <el-drawer 
    v-model="drawer" 
    title="I'm outer Drawer" 
    size="20%" 
    :modal="false"
    :close-on-click-modal="false"
    modal-class="modal"
    direction="ltr"
    >
    
      <ScrollList ref="scrollRef"></ScrollList>

      <div>
        
        <el-button @click="innerDrawer = true">Click me!</el-button>
        
        <el-drawer
          v-model="innerDrawer"
          title="I'm inner Drawer"
          :append-to-body="true"
          :modal="false"
          :close-on-click-modal="false"
          modal-class="modal"
          aria-modal="false"
          size="19%"
          direction="ltr"
        >
          <p>_(:зゝ∠)_</p>
        </el-drawer>
      </div>
    </el-drawer>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref, toRefs } from 'vue';  
  import ScrollList from './ScrollList.vue';

  const drawer = ref(false);
  const innerDrawer = ref(false);
  </script>
  
<style>
    .modal{
      pointer-events: none;
      opacity: 0.9;
    }
    .el-drawer{
      pointer-events: auto;
    }
    .button{
      position: absolute;
      top:0px;
      left: 100px;
      z-index: 1000;
    }

</style>