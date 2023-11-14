<template>
    <div class="post">
      <router-link to="/scene/posts">
        <h3>{{ post?.title }}</h3>
      </router-link>
        <p>{{ post?.summary }}</p>
        <div class="footer">
            <span>{{ post?.creatorName }}</span>
            <span class="tag">{{ post?.tagOne }}</span>
            <div>
              
              <el-icon><Clock /></el-icon>
              <span class="time">{{ post?.createTime }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    post:Object
});

</script>

<style>
.footer{
    display: flex;
}
.footer > div {
  flex: 1;
}

.post {
  margin: 0 40px 30px;
  padding-bottom: 30px;
  border-bottom: 1px dashed #e7e7e7;
}
.post h3 {
  display: inline-block;
  position: relative;
  font-size: 26px;
  color: black;
  margin-bottom: 10px;
  max-width: 400px;
}

</style>