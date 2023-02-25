import { nextTick } from "vue";
import { createRouter, createWebHistory } from 'vue-router';
const StartPage = () => import('../pages/start-page');
const Auth = () => import('../pages/auth-page');
const NotFound = () => import('../pages/404-page');

export const routes = [
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'start',
    component: StartPage,
    meta: {
      title: 'Welcome Page',
      requiresAuth: false
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    meta: {
      title: 'Auth Page',
      requiresAuth: false
    }
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach((to, from) => {
  nextTick(() => {
    document.title = to.meta.title || 'Web Chat';
  });
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    // const currentUser = await getCurrentUser();
    // if (!currentUser) {
    //   return {
    //     path: '/auth',
    //     query: {
    //       // we keep the current path in the query so we can redirect to it after login
    //       // with `router.push(route.query.redirectTo || '/')`
    //       redirectTo: to.fullPath,
    //     },
    //   };
    // }
  }
});
