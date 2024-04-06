<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>修改信息</span>
                </div>
            </template>
            <el-form :model="userDetail" class="form" :inline="false">


                <el-form-item label="名称">
                    <el-input class="input" v-model="postForm.userName" />
                </el-form-item>

                <el-form-item label="密码">
                    <el-input class="input" type="password" v-model="postForm.userPassword" />
                </el-form-item>

                <el-form-item label="性别">
                    <el-input class="input" v-model="postForm.userSex" />
                </el-form-item>
                <el-form-item label="生日">
                    <el-input class="input" v-model="postForm.userBirthday" />
                </el-form-item>
                <el-form-item label="简介">
                    <el-input class="input" v-model="postForm.userSummary" />
                </el-form-item>

                <el-form-item label="提交">
                    <el-button style="width:20px;background-color:#2661ef;" @click="submitForm" />
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">

import { onBeforeMount, reactive, ref } from 'vue';
import { getUserDetail } from '@/api/administrator.ts';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { addArticle, updateInfo } from '@/api/user.ts'
import getTime from '@/utils/getTime.ts'
import { ElMessage, ElMessageBox } from 'element-plus';

const store = useStore();
const route = useRoute();
const router = useRouter();
let userObj;
const userDetail = reactive({
    // userName:userObj.
})

const postForm = reactive({
    userId: "",
    userName: '',
    userPassword: '',
    userSex: '',
    userBirthday: '',
    userSummary: ''
})

const submitForm = () => {
    let temp = {
        ...postForm,
        userId: userObj.userId

    }
    updateInfo(
        {
            ...temp
        }
    ).then((response) => {
        if (response.data.success) {
            // 更新user信息
            store.dispatch('user/updateUserInfo', temp);
            localStorage.setItem("userInfo", JSON.stringify(store.getters['user/getUserInfo']));
            console.log(store.getters['user/getUserInfo']);
            ElMessage.success("更新成功！");

        } else {
            ElMessage.error("更新失败");
        }
    })
    //     ...postForm,
    //     createTime: getTime(),
    // }
    // console.log(a)
}


onBeforeMount(() => {
    userObj = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userObj.userName);
    console.log(userObj.userId);
    console.log(getTime())
})

</script>

<style lang="scss" scoped>
.input {
    width: 200px;
}
</style>