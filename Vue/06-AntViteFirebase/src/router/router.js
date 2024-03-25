// router.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "../store/userStore";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  try {
    userStore.loading = true;
    userStore.loadingSession = true;
    const user = await userStore.currentUser();
    if (user) {
      next();
    } else {
      next("/login");
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    next("/login"); // Redirect to login page on error
  } finally {
    userStore.loading = false;
    userStore.loadingSession = false;
  }
};

const routes = [
  { path: "/", name: "home", component: HomeView, beforeEnter: requireAuth },
  {
    path: "/editar/:id",
    name: "edit",
    component: () => import("../views/EditView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
