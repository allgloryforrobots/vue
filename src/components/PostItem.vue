<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>

    <div class="post_btns">
      <MyButton
          @click="$router.push('posts/' + post.id)"
      >
        Открыть
      </MyButton>
      <MyButton
          @click="$emit('remove', post)"
      >
        Удалить
      </MyButton>
    </div>
  </div>
</template>

<script>

import MyButton from '@/components/UI/MyButton.vue';

export default {
  components: {MyButton},
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  border: 2px solid grey;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post_btns {
  display: flex;
  gap: 5px;
}
</style>