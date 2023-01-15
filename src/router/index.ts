import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/user", component: () => import("../views/PageUser.vue") },
    {
      path: "/user/create",
      component: () => import("../views/CreateUser.vue"),
    },
    { path: "/product", component: () => import("../views/PageProduct.vue") },
    {
      path: "/product/create",
      component: () => import("../views/CreateProduct.vue"),
    },
    { path: "/category", component: () => import("../views/PageCategory.vue") },
    {
      path: "/category/create",
      component: () => import("../views/CreateCategory.vue"),
    },
    
    { path: "/order", component: () => import("../views/PageOrder.vue") },
    { path: "/discount", component: () => import("../views/PageDiscount.vue") },
    {
      path: "/discount/create",
      component: () => import("../views/CreateDiscount.vue"),
    },
    { path: "/post", component: () => import("../views/PagePost.vue") },
    {
      path: "/post/create",
      component: () => import("../views/CreatePost.vue"),
    },
    { path: "/log", component: () => import("../views/PageLog.vue") },

    /////////////////////////
  ],
});

export default router;
