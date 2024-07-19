<template>
  <div>
    <h1>Страница с постами</h1>

    <MyInput
        v-model="searchQuery"
        placeholder="Поиск..."
        v-focus
    />

    <div class="app__btns">
      <MySelect
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>



    <PostList
        v-if="!isPostsLoading"
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
    />

    <h4 v-if="isPostsLoading">
      Загрузка постов...
    </h4>


  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MySelect from '@/components/UI/MySelect.vue'
import MyInput from '@/components/UI/MyInput.vue'
import {ref} from 'vue'
import {usePosts} from '@/hooks/usePosts.js';
import useSortedPosts from '@/hooks/useSortedPosts.js';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts.js';

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
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ]
    }
  },

  setup(props) {

    const {
      posts,
      isPostsLoading,
      totalPages
    } = usePosts()

    const {
      selectedSort,
      sortedPosts
    } = useSortedPosts(posts)

    const {
      searchQuery,
      sortedAndSearchedPosts
    } = useSortedAndSearchedPosts(sortedPosts)


      return {
        posts,
        isPostsLoading,
        totalPages,
        selectedSort,
        searchQuery,
        sortedAndSearchedPosts
      }
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