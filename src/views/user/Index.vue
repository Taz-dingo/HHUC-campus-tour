<template>
    <div>
        <el-card>
            <el-input style="width:440px" @clear="searchUser" clearable v-model="searchForm.name" placeholder="请输入用户名"
                class="input-with-select">
                <template #append>
                    <el-button icon="Search" @click="searchUser" />
                </template>
            </el-input>
            <el-table :data="tableData" border style="width: 100%;margin-top:20px">
                <el-table-column prop="userId" label="ID" width="180" />
                <el-table-column prop="userName" label="姓名" width="180" />
                <el-table-column prop="userSex" label="性别" width="180" />
                <el-table-column prop="userBirthday" label="生日" width="180" />
                <el-table-column prop="userSummary" label="简介" width="350" />
                <el-table-column prop="authority" label="权限" width="180" />
                <el-table-column label="操作" width="330">
                    <template #default="scope">
                        <el-button type="danger" size="small" @click="delUser(scope.row.userId)">删除</el-button>
                        <el-button size="small"
                            @click="() => router.push({ path: '/user/detail', query: { id: scope.row.userId } })">修改</el-button>
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
import { getUsers, deleteUser } from '@/api/administrator.ts'
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router'
const router = useRouter();
// Dom 挂载之后
onMounted(() => {
    getUserList();
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
const getUserList = async () => {
    const res = await getUsers({
        "page": 1,
        "pagesize": 10
    });
    console.log(res);
    tableData.value = res.data.data;
    console.log(tableData.value);
    total.value = 100;
}
const handleSizeChange = (size) => {
    searchForm.size = size;
    getUserList();
}
const handleCurrentChange = (current) => {
    searchForm.current = current;
    getUserList();
}
const searchUser = () => {
    searchForm.current = 1;
    getUserList();
}
// 删除用户
const delUser = (id) => {
    ElMessageBox.confirm(
        '确定要删除该用户信息吗?',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        const res = await deleteUser({
            "userId": id
        });
        if (res.data.success) {
            ElMessage.success("删除成功")
            getUserList();
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