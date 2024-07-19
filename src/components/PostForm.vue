<template>
  <form @submit.prevent class="form">
    <h4>Создание поста</h4>
    <MyInput
        placeholder="Название"
        v-model="post.title"
        v-focus
    />
    <MyInput
        placeholder="Описание"
        v-model="post.body"
    />
    <MyButton
        style="align-self: flex-end;"
        @click="createPost"
    >
      Создать
    </MyButton>
  </form>
</template>

<script>

export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
        id: null
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
        id: null
      }
    }
  },
  // watch: {
  //   post: {
  //     // глубокое отслеживание для объектов
  //     handler(newVal) {
  //       console.log(newVal)
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.form {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
}
</style>