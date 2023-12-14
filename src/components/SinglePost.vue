<template>
  <div class="post">
    <h3 @click="clickChild">{{ post?.title }}</h3>
    <p>{{ post?.summary }}</p>

    <div class="footer">
      <span>{{ post?.creatorName }}</span>
      <span class="tag">{{ post?.tagOne }}</span>
      <div>
        <el-icon>
          <Clock />
        </el-icon>
        <span class="time">{{ post?.createTime }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const emit = defineEmits(['clickChild']);

const clickChild = () => {
  emit('clickChild', props.post?.articleId);
  console.log(props.post?.articleId);
}

const props = defineProps({
  post: Object
});



</script>

<style>
.footer {
  display: flex;
  align-content: space-between;
}

.footer>div {
  flex: 1;
}

.post {
  margin: 0 40px 30px;
  padding-bottom: 30px;
  border-bottom: 1px dashed #e7e7e7;
  border-radius: 10px;
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