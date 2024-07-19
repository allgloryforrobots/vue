import Main from '@/pages/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PostPage from '@/pages/PostPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import PostIdPage from '@/pages/PostIdPage.vue';
import PostPageWithStore from '@/pages/PostPageWithStore.vue';

const routes = [
    { path: '/', component: Main },
    { path: '/posts', component: PostPage },
    { path: '/about', component: AboutPage },
    { path: '/posts/:id', component: PostIdPage },
    { path: '/store', component: PostPageWithStore },
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})
