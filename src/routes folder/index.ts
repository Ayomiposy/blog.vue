import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue";
import blogs from "../views/blogs.vue";
import notFound from "../views/not-found.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      meta: { title: "Home", description: "Welcome to the Home Page" },
    },

    {
      path: "/",
      name: "home",
      component: notFound,
      meta: { title: "Home", description: "Welcome to the Home Page" },
    },

    {
      path: "/",
      name: "blogs",
      component: blogs,
      meta: { title: "Blogs", description: "Welcome to the Blogs Page" },
    },
  ],
});

export default router;
