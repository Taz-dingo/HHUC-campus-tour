<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>用户详情</span>
                    <el-button size="mini" style="float:right" @click="router.go(-1)">返回</el-button>
                </div>
            </template>
            <el-form :model="userDetail">
                <el-form-item label="姓名:">
                    {{ userDetail.value.userId }}
                </el-form-item>
                <el-form-item label="性别:">
                    {{ userDetail.value.userSex }}
                </el-form-item>
                <p>性别</p>
                <el-input style="width: 200px;" prop="userId" />

            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { getUserDetail } from '@/api/administrator.ts'
import { useRouter, useRoute } from 'vue-router'
// import userApi from "../../api/user";
const route = useRoute();
const router = useRouter();
const userDetail = reactive({

});

onBeforeMount(async () => {
    if (route.query.id) {
        const res = await getUserDetail({
            "userId": route.query.id
        })
        console.log(route.query.id)
        userDetail.value = res.data.data;

        console.log(userDetail.value)

    }
})
</script>

<style lang="scss" scoped></style>