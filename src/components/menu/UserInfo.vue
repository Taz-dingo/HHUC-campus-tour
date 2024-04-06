<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>用户详情</span>
                </div>
            </template>
            <el-form :model="userDetail">
                <el-form-item label="名称">
                    {{ userObj.userName }}
                </el-form-item>
                <el-form-item label="性别:">
                    {{ userObj.userSex }}
                </el-form-item>

                <el-form-item label="简介:">
                    {{ userObj.userSummary }}
                </el-form-item>

            </el-form>
        </el-card>
    </div>
</template>

<script setup>

import { onBeforeMount, reactive, ref } from 'vue';
import { getUserDetail } from '@/api/administrator.ts';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
// import userApi from "../../api/user";

const store = useStore();
const route = useRoute();
const router = useRouter();
let userObj;
const userDetail = reactive({
    // userName:userObj.
})

onBeforeMount(() => {
    // getUserDetail(
    //     userId: JSON.parse(localStorage.getItem("userInfo").userId
    //     ).then((response) => {
    //         if (response.data.success) [

    //         ]
    //     })
    userObj = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userObj.userName);
})

</script>

<style lang="scss" scoped></style>