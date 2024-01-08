import { createRouter, createWebHistory } from "vue-router";
import ScanView from "../views/ScanView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "loginpage",
      component: LoginView,
    },
    {
      path: "/thescan",
      name: "thescan",
      component: ScanView,
    },
  ],
});

export default router;
