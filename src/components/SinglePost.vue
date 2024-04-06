<template>
  <div class="post">
    <h3 @click="clickChild">{{ post?.title }}</h3>
    <p>{{ post?.summary }}</p>

    <div class="footer">
      <div>
        <span>{{ post?.creatorName }}</span>
      </div>
      <div>
        <span class="tag">{{ post?.tagOne }}</span>
      </div>
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
  display: grid;
  grid-template-columns: 20% 20% 60%;
}


.post {
  margin: 0 40px 15px;
  border-radius: 10px;
}

.post h3 {
  display: inline-block;
  position: relative;
  font-size: 25px;
  color: black;
  margin-bottom: 10px;
  max-width: 400px;
}
</style>