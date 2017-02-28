import {
    GOODS_SUCCESS,
    GOODS_REQUEST,
    GOODS_FAILURE,
    GOODS_DECREMENT,
    GOODS_INCREMENT,
    GOODS_CLEAR,
    GOODS_SELECTED} from '../mutation-types';
import {getGoods} from 'services/goods';

const state = {
  goods: [],
  selectedGoods: [],
  detailGoods: null,
  isFetching: false,
  isFailed: false,
  error: null
};

const actions = {
  async fetchGoods ({commit}) {
    commit(GOODS_REQUEST);
    try {
      const goods = await getGoods();
      commit(GOODS_SUCCESS, goods);
    } catch (err) {
      commit(GOODS_FAILURE, err);
    }
  }
};

const mutations = {
  [GOODS_REQUEST] (state) {
    state.isFetching = true;
  },
  [GOODS_SUCCESS] (state, goods) {
    state.goods = goods;
    state.isFetching = false;
  },
  [GOODS_FAILURE] (state, err) {
    state.isFailed = true;
    state.isFetching = false;
    state.error = err;
  },
  [GOODS_INCREMENT] (state, food) {
    const id = food.id;
        // 购物车里没有该项
    if (!state.selectedGoods.some((goods, index) => goods.id === id)) {
      state.selectedGoods.push(food);
    } else {
      state.selectedGoods.forEach((goods, index) => {
        state.selectedGoods.splice(index, 1, food);
      })
    }
  },
  [GOODS_DECREMENT] (state, food) {
    const id = food.id;
    state.selectedGoods.forEach((goods, index) => {
      if (goods.id === id) {
                // 当前商品数量为0时直接删除
        if (food.count === 0) {
          state.selectedGoods.splice(index, 1);
        } else {
          state.selectedGoods.splice(index, 1, food);
        }
      }
    })
  },
  [GOODS_CLEAR] (state) {
    state.selectedGoods.forEach(function (goods, index) {
      goods.count = 0;
    });
    state.selectedGoods = [];
  },
  [GOODS_SELECTED] (state, detail) {
    state.detailGoods = detail;
  }
};

export default {
  actions,
  mutations,
  state
}

