<template>
    <el-form
        label-position="left"
        label-width="100px"
        :model="LoginForm"
        style="max-width: 460px"
    >
        <el-form-item label="Name">
            <!-- 用户名 -->
            <el-input 
                v-model="LoginForm.username" 
                placeholder="Please input" 
            />
        </el-form-item>

        <el-form-item label="Password">
            <!-- 密码 -->
            <el-input
                v-model="LoginForm.password"
                type="password"
                placeholder="Please input password"
                show-password
            />
        </el-form-item>

        <el-form-item>
            <el-button type="primary">Login</el-button>
        </el-form-item>
    </el-form>
    <div style="color: #ff0000;">红色</div>


    

</template>

<script lang="ts" setup>

import { ref,reactive } from 'vue'


const LoginForm = reactive({
    username:"",
    password:""
})

</script>