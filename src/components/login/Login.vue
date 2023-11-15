<template>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">

        <h1 class="title">登录</h1>
        <h2 class="title">Login</h2>
        <el-form-item label="账号" prop="uname">
            <el-input v-model="ruleForm.uname" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            <el-button @click="switchToRegister">注册</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios';
import router from '@/router';

const ruleFormRef = ref<FormInstance>();

const switchToRegister = () =>{
    router.push('/register');
};

const validateUname = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else {
        if (ruleForm.uname !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkUname', () => null)
        }
        callback()
    }
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (ruleForm.pass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}


const ruleForm = reactive({
    uname: '',
    pass: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    uname: [{ validator: validateUname, trigger: 'blur' }],
    pass: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            try {
                console.log('submit!')
                console.log(ruleForm.uname);
                const response = await axios({
                    method: 'post',
                    url: '/load',
                    data: {
                        userId: ruleForm.uname,
                        userPassword: ruleForm.pass,
                    }
                }).then(function (response) {
                    console.log(response.data.success);
                    //  如果登录成功
                    if (response.data.success) {
                        alert('登录成功！');
                        router.push('/');
                    }
                     else {  // 用户名正确密码错误
                        alert('密码错误！');
                        // 重置密码
                        // ruleForm.uname='';
                        // ruleForm.pass='';
                        resetForm(ruleFormRef.value);
                    }
                }).catch(function (response){
                    // 账号错误
                    alert('账号错误！');
                    resetForm(ruleFormRef.value);
                });

            } catch (e) {
                console.log(e);
            }

        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}




</script>


<style>
.demo-ruleForm {
    width: 600px;
    margin: auto auto;
}

.title {
    text-align: center;
}
</style>