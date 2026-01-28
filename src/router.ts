import { createRouter, createWebHistory } from "vue-router";
import home from "./views/home.vue";
import blogs from "./views/blogs.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/blogs/:id",
    name: "blogs",
    component: blogs,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("./views/home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
