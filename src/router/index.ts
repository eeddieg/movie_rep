import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: login */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: login */ "../views/Register.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard/movies",
        component: () =>
          import(/* webpackChunkName: "movies" */ "../views/Movies.vue")
      },
      {
        path: "dashboard/search",
        component: () =>
          import(/* webpackChunkName: "search" */ "../views/Search.vue")
      },

    ]
  },
  {
    path: "/about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
