<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>发表文章</span>
                </div>
            </template>
            <el-form :model="userDetail" class="form" :inline="false">
                <el-form-item label="区域">
                    <el-select v-model="postForm.areaId" class="m-2" placeholder="Select" size="large">
                        <el-option label="图书馆" value="L"></el-option>
                        <el-option label="A" value="a"></el-option>
                        <el-option label="B" value="b"></el-option>
                        <el-option label="C" value="c"></el-option>
                        <el-option label="D" value="d"></el-option>
                        <el-option label="E" value="e"></el-option>
                        <el-option label="F" value="f"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="标题">
                    <el-input class="input" v-model="postForm.title" />
                </el-form-item>


                <el-form-item label="内容">
                    <el-input class="input" v-model="postForm.content" type="textarea" />
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
import { addArticle } from '@/api/user.ts'
import getTime from '@/utils/getTime.ts'
import { ElMessage, ElMessageBox } from 'element-plus';
// import userApi from "../../api/user";

const store = useStore();
const route = useRoute();
const router = useRouter();
let userObj;
const userDetail = reactive({
    // userName:userObj.
})

const postForm = reactive({
    areaId: "",
    creatorId: "",
    title: "",
    createtime: "",
    summary: "",
    content: ""
})

const submitForm = () => {
    addArticle(
        {
            ...postForm,
            creatorId: userObj.userId,
            createtime: getTime(),
            summary: postForm.content.substring(0, 10)
        }
    ).then((response) => {
        if (response.data.success) {
            ElMessage.success("发表成功！");

        } else {
            ElMessage.error("发表失败");
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
    width: 70%;
}
</style>