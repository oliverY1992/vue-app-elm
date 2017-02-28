import Vuex from 'vuex';
import Vue from 'vue';
import goods from './modules/goods';
import app from './modules/app';
import comments from './modules/comments';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    goods,
    app,
    comments
  }
});

if (module.hot) {
  module.hot.accept([
    './modules/goods.js',
    './modules/app.js',
    './modules/comments.js'
  ], () => {
    store.hotUpdate({
      modules: {
        app: require('./modules/app'),
        comments: require('./modules/comments'),
        goods: require('./modules/goods')
      }
    })
  })
}

export default store;
