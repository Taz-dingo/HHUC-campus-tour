<template>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">

        <h1 class="title">注册</h1>
        <h2 class="title">Register</h2>
        <el-form-item label="昵称" prop="uname">
            <el-input v-model="ruleForm.uname" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="账号" prop="uid">
            <el-input v-model="ruleForm.uid" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
            
            <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            <el-button @click="goBack">返回</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios';
import router from '@/router';

const ruleFormRef = ref<FormInstance>()

const goBack = () => {
    router.go(-1);
}

const validateUname = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入昵称'))
    } else {
        if (ruleForm.uname !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('uname', () => null)
        }
        callback()
    }
}

const validateUid = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        if (ruleForm.uid !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('uid', () => null)
        }
        callback()
    }
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("两次密码不一致!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
    uname:'',
    uid:'',
    pass: '',
    checkPass:'',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    uname: [{ validator: validateUname, trigger: 'blur' }],
    uid:[{ validator: validateUid, trigger: 'blur' }],
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            try {
                console.log('submit!')
                console.log(ruleForm.uid);
                console.log(ruleForm.uname);
                console.log(ruleForm.pass);
                await axios({
                    method: 'post',
                    url: '/signup',
                    data: {
                        userId: ruleForm.uid,
                        userName: ruleForm.uname,
                        userPassword: ruleForm.pass
                    }
                }).then(function (response) {
                    console.log(response.data.success);
                    //  如果登录成功
                    if (response.data.success) {
                        alert('注册成功！');
                        router.push('/login');
                    } else {  // 用户名正确密码错误
                        alert('error1！');
                        // 重置密码
                        resetForm(ruleFormRef.value);
                    }
                }).catch(function (response) {
                    // 账号错误
                    alert('error2!')
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