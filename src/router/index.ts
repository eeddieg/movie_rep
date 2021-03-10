import store from "@/store";
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
        meta: { requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "movies" */ "../views/Movies.vue")
      },
      {
        path: "dashboard/search",
        meta: { requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "search" */ "../views/Search.vue")
      },
    ]
  },
  {
    path: "/account",
    name: "Account",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Account.vue"),
    meta: { requiresAuth: true }      
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuth) {   
    console.log("user not logged in...redirecting to login");
    next("/login");
  } else {
    next();
  }
});

export default router;
