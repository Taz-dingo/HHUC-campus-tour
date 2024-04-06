<template>
    <div>
        <el-container class="home-container">
            <!-- header -->
            <el-header>
                <el-row>
                    <el-col :span="4">
                        <p class="system-name">Admin</p>
                    </el-col>
                    <el-col :offset="12" :span="8" style="min-width: 150px">
                        <el-dropdown style="float: right; margin: 20px 10px">
                            <span class="el-dropdown-link" style="color: #fff; cursor: pointer">
                                taz &nbsp;&nbsp; <el-icon class="el-icon--right">
                                    <arrow-down />
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <el-avatar shape="square" style="margin: 10px; float: right"></el-avatar>
                    </el-col>
                </el-row>
            </el-header>

            <el-container style="overflow: auto">
                <!-- 菜单 -->
                <el-aside>
                    <div class="toggle-button" @click="isCollapse = !isCollapse">
                        <el-icon :size="20">
                            <Expand v-if="isCollapse" />
                            <Fold v-if="!isCollapse" />
                        </el-icon>
                    </div>

                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">

                        <el-menu-item index="1" @click="selectMenu('userInfo')">
                            <el-icon>
                                <user />
                            </el-icon>
                            <span>个人信息</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="selectMenu('myArticles')">
                            <el-icon>
                                <document />
                            </el-icon>
                            <span>我的文章</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="selectMenu('post')">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>发表文章</span>
                        </el-menu-item>
                        <el-menu-item index="4" @click="selectMenu('security')">
                            <el-icon>
                                <Edit />
                            </el-icon>
                            <span>账号与信息</span>
                        </el-menu-item>
                    </el-menu>



                </el-aside>
                <el-container>
                    <el-main>
                        <UserInfo v-if="panel === 'userInfo'"></UserInfo>
                        <MyArticles v-if="panel === 'myArticles'"></MyArticles>
                        <Post v-if="panel === 'post'"></Post>
                        <Security v-if="panel === 'security'"></Security>

                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import { onBeforeMount, ref, watch } from 'vue';
// import avatar from "../assets/img/avator.jpg"
import { useRouter } from 'vue-router'
import UserInfo from '@/components/menu/UserInfo.vue'
import MyArticles from '@/components/menu/MyArticles.vue'
import Post from '@/components/menu/Post.vue'
import Security from '@/components/menu/Security.vue'

const panel = ref();
const router = useRouter();
// 挂载 DOM 之前
onBeforeMount(() => {
    activePath.value = sessionStorage.getItem("activePath")
        ? sessionStorage.getItem("activePath")
        : "/index"
})
let isCollapse = ref(false);
let activePath = ref("");
// 保存链接的激活状态
const selectMenu = (val) => {
    panel.value = val;
    console.log(panel.value);
}
const logout = () => {
    // 清除缓存
    sessionStorage.clear();
    router.push("/login");
}

</script>

<style scoped>
.home-container {
    position: positive;
    opacity: 1;
    height: 100%;
    top: 0px;
    left: 0px;
    width: 100%;
    background: #f2f3f5;
}

.el-header {
    background: #567edb;
    padding: 0 10px;
    overflow: hidden;
}

.system-name {
    color: #fff;
    font-size: 18px;
}

.el-aside {
    background: white;
    width: auto !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-footer {
    color: #cccccc;
    text-align: center;
    line-height: 60px;
}

.el-footer:hover {
    color: #2661ef;
}

.toggle-button {
    background-color: #d9e0e7;
    font-size: 18px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
    color: black;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu-item.is-active {
    color: #fff !important;
    font-size: 15px;
    font-weight: bold;
    background-color: #2661ef !important;
    border-radius: 2px;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    margin: 2px 5px 0px 2px;
}
</style>