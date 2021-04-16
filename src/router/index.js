import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NotFoundPage from '../views/NotFound.vue';
import store from '../store'
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "LoginForm",
    component: () =>
      import(/* webpackChunkName: "LoginForm" */ "../views/LoginForm.vue"),
    meta: {
      public: true,
      disableIfLoggedIn: true
    }
  },
  {
    path: "/",
    redirect: {
      name: "LoginForm"
    }
    
  },
  {
    path: "/products",
    name: "Products",
    component: () =>
      import(/* webpackChunkName: "products" */ "../views/product/Product.vue"),
    meta: { requiresLogin: true }
  },
  {
    path: "/create/product",
    name: "CreateProduct",
    component: () =>
      import(/* webpackChunkName: "create product" */ "../views/product/CreateProduct.vue"),
    meta: { requiresLogin: true }
  },
  {
    path: "/edit/product",
    name: "EditProduct",
    component: () =>
      import(/* webpackChunkName: "edit product" */ "../views/product/EditProduct.vue"),
    meta: { requiresLogin: true }
  },
  {
    path: "/view/product",
    name: "ViewProduct",
    component: () =>
      import(/* webpackChunkName: "view product"*/ "../views/product/ViewProduct.vue"),
    meta: { requiresLogin: true }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: { requiresLogin: true }
  },
  {
    path: '*',
    component: NotFoundPage
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, form, next) => {

  if (to.matched.some(record => record.meta.requiresLogin) && store.state.auth.authenticated === false) {
    next({ name: 'LoginForm' })
  } else {
    next()
  }
    
});
export default router;
