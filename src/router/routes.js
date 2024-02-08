import Login from '@/views/Login/Login.vue'
import Home from '@/views/Home/routes/routes'
import NotFound from '@/views/404/NotFound';
export default [
    {
      path: '/',
      redirect: '/Login'
    },

    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      component: NotFound
    },
    Home
];