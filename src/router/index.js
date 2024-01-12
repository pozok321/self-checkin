import { createRouter, createWebHistory } from "vue-router";
import ScanView from "../views/ScanView.vue";
import LoginView from "../views/LoginView.vue";
import AgendaView from "../views/AgendaView.vue";
import EventDetailView from "../views/EventDetailView.vue";

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
    {
      path: "/agendapage",
      name: "agendapage",
      component: AgendaView,
    },
    {
      path: "/eventdetailpage",
      name: "eventdetailpage",
      component: EventDetailView,
    },
    {
      path: "/scanpage",
      name: "scanpage",
      component: ScanView,
    },
  ],
});

export default router;
