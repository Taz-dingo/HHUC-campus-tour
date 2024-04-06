<template>
    <div class="container">
        <div class="formContainer">
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="ruleForm">

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
        </div>

    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { login, signUp } from '@/api/user'
import router from '@/router';
import { useStore } from 'vuex';

const store = useStore();

const ruleFormRef = ref<FormInstance>();

const switchToRegister = () => {
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
                await login({
                    userId: ruleForm.uname,
                    userPassword: ruleForm.pass,
                }).then(function (response) {
                    console.log(response.headers);
                    console.log(response.headers['authorization']);
                    console.log(response.data.success);

                    //  如果登录成功
                    if (response.data.success) {
                        alert('登录成功！');
                        // login信息为true，更新token
                        store.dispatch('user/updateLogin', true);
                        store.dispatch('user/updateUserToken', response.headers['authorization']);
                        localStorage.token = store.getters['user/getUserToken'];
                        // 更新user信息
                        store.dispatch('user/updateUserInfo', response.data.data);
                        localStorage.setItem("userInfo", JSON.stringify(store.getters['user/getUserInfo']));
                        console.log(store.getters['user/getUserInfo']);

                        console.log(JSON.parse(localStorage.getItem("userInfo")));
                        // 跳转到'/'
                        router.push('/');
                    }
                    else {  // 用户名正确密码错误
                        alert('密码错误！');
                        // 重置密码
                        // ruleForm.uname='';
                        // ruleForm.pass='';
                        resetForm(ruleFormRef.value);
                    }
                }).catch(function (response) {
                    // 账号错误
                    alert('账号不存在！');
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
.container {
    position: absolute;
    width: 99.5%;
    height: 99%;
    overflow: hidden;
    background-image: url('/static/img/background2.png');
    background-size: cover;
    /* background-position: 10%; */
}

.ruleForm {
    width: 600px;
    margin: auto auto;
}

.formContainer {
    top: 20%;
    left: 35%;
    position: absolute;
}

.title {
    text-align: center;
}
</style>