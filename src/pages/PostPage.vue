<template>
  <div>
    <h1>Страница с постами</h1>

    <MyInput
        v-model="searchQuery"
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
          v-model="selectedSort"
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

    <!--    <PostPages-->
    <!--        @changePage="changePage"-->
    <!--        :total-pages="totalPages"-->
    <!--        :page="page"-->
    <!--    />-->

  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import axios from 'axios'
import MySelect from '@/components/UI/MySelect.vue'
import MyInput from '@/components/UI/MyInput.vue';
// import PostPages from '@/components/PostPages.vue'

export default {

  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList,
    PostForm,
    // PostPages
  },

  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ]
    }
  },

  methods: {

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
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts`,
            {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            }
        )
        this.posts = response.data
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
      } catch (e) {
        alert('Ошибка')
      } finally {
        this.isPostsLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts`,
            {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            }
        )
        this.posts = [...this.posts, ...response.data]
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
      } catch (e) {
        alert('Ошибка')
      }
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // }
    // observerController() {
    //   const options = {
    //     rootMargin: "0px",
    //     threshold: 1.0,
    //   }
    //   const callback = (entries) => {
    //     if (entries[0].isIntersecting && this.page < this.totalPages) {
    //       this.loadMorePosts()
    //     }
    //   }
    //   const observer = new IntersectionObserver(callback, options)
    //   observer.observe(this.$refs.observer)
    // }

  },

  mounted() {
    this.fetchPosts()
    // this.observerController()
  },

  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(
          post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },

  watch: {
    // selectedSort() {
    //   this.posts.sort((post1, post2) => {
    //     return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
    //   })
    // }

    // функция-наблюдатель срабатывает на изменение переменной page
    // page() {
    //   this.fetchPosts()
    // }
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