<template>
  <div>
    <h1>Страница с постами</h1>

    <MyInput
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
        v-focus
    />

    <div class="app__btns">
      <MyButton
          @click="showDialog"
      >
        Создать пост
      </MyButton>
      <MySelect
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>

    <MyDialog
        v-model:show="dialogVisible"
    >
      <PostForm
          @create="createPost"
      />
    </MyDialog>

    <PostList
        v-if="!isPostsLoading"
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
    />

    <h4 v-if="isPostsLoading">
      Загрузка постов...
    </h4>

    <div
        ref="observer"
        class="observer"
        v-intersection="{loadMorePosts, page, totalPages}"
    >
    </div>

  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MySelect from '@/components/UI/MySelect.vue'
import MyInput from '@/components/UI/MyInput.vue'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {

  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList,
    PostForm,
  },

  data() {
   return {
     dialogVisible: false
   }
  },

  methods: {
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/loadMorePosts'
    }),
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },

  },

  mounted() {
    this.fetchPosts()
  },

  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  }

}
</script>

<style lang="scss" scoped>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.observer {
  height: 30px;
  background: teal;
}
</style>