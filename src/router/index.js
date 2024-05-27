import { createRouter, createWebHistory } from "vue-router";
import ContactListView from "../views/ContactListView.vue";
import EditContactView from "../views/EditContactView.vue";
import ViewContactView from "../views/ViewContactView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ContactListView,
    },
    {
      path: "/edit/:id",
      name: "edit-contact",
      component: EditContactView,
    },
    {
      path: "/contact/:id",
      name: "View",
      component: ViewContactView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
