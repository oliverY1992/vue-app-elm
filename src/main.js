import Vue from 'vue';
import VueRouter from 'vue-router';
import App from 'pages/app';
import Goods from 'pages/goods';
import Comments from 'pages/comments';
import Seller from 'pages/seller';
import GoodsMain from 'pages/goods/main';
import GoodsDetail from 'pages/goods/detail';
import 'styles/icons.scss';
import 'styles/normalize.scss';
import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/goods'
  }, {
    path: '/goods',
    component: Goods,
    children: [{
      path: '',
      component: GoodsMain
    }, {
      path: ':id',
      component: GoodsDetail
    }]
  }, {
    path: '/comments',
    component: Comments
  }, {
    path: '/seller',
    component: Seller
  }],
  linkActiveClass: 'link-active'
});

new Vue({
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
}).$mount('#app');
