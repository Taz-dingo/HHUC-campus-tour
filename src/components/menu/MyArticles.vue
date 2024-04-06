<template>
    <div>
        <el-card>
            <el-input style="width:440px" @clear="searchUser" clearable v-model="searchForm.name" placeholder="请输入区域号"
                class="input-with-select">
                <template #append>
                    <el-button icon="Search" @click="searchUser" />
                </template>
            </el-input>
            <el-table :data="tableData" border style="width: 100%;margin-top:20px">
                <el-table-column prop="title" label="标题" width="250" />
                <el-table-column prop="areaId" label="区域" width="100" />
                <el-table-column prop="creatorId" label="作者ID" width="180" />
                <el-table-column prop="creatorName" label="作者" width="350" />
                <el-table-column prop="createTime" label="创建时间" width="180" />
                <el-table-column prop="summary" label="概览" width="180" />
                <el-table-column label="操作" width="330">
                    <template #default="scope">
                        <el-button type="danger" size="small" @click="delArticle(scope.row.articleId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination style="margin-top:20px" :current-page="searchForm.current" :page-size="searchForm.size"
                :page-sizes="[10, 20, 30, 40]" layout="->,total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<script setup>
import { getArticles, deleteArticle } from '@/api/administrator.ts'
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router'
const router = useRouter();
// Dom 挂载之后
onMounted(() => {
    getArticleList();
})
// 用户数据
let tableData = ref([]);
let total = ref(0);
// 搜索条件
const searchForm = reactive({
    current: 1,
    size: 10,
    name: ''
})
// 获取用户列表
const getArticleList = async () => {
    const res = await getArticles({
        "userId": JSON.parse(localStorage.getItem("userInfo")).userId,
        "page": searchForm.current,
        "pagesize": searchForm.size
    });
    console.log(res);
    tableData.value = res.data.data;
    console.log(tableData.value);
    total.value = 100;
}
const handleSizeChange = (size) => {
    searchForm.size = size;
    getArticleList();
}
const handleCurrentChange = (current) => {
    searchForm.current = current;
    getArticleList();
}
const searchUser = () => {
    searchForm.current = 1;
    getArticleList();
}
// 删除用户
const delArticle = (id) => {
    ElMessageBox.confirm(
        '确定要删除该文章吗?',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        const res = await deleteArticle({
            "articleId": id
        });
        if (res.data.success) {
            ElMessage.success("删除成功")
            getArticleList();
        } else {
            ElMessage.error("删除失败")
        }
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '取消删除',
        })
    })
}
</script>

<style lang="scss" scoped></style>