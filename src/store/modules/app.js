import {
    SELLER_FAILURE,
    SELLER_REQUEST,
    SELLER_SUCCESS
} from '../mutation-types';
import {getSeller} from 'services/app';

const state = {
  seller: {},
  isFetching: false,
  isFailed: false
};

const mutations = {
  [SELLER_REQUEST] (state) {
    state.isFetching = true;
  },
  [SELLER_SUCCESS] (state, seller) {
    state.seller = seller;
    state.isFetching = false;
  },
  [SELLER_FAILURE] (state, err) {
    state.isFailed = true;
    state.isFetching = false;
  }
};

const actions = {
  async fetchSeller ({commit}) {
    commit(SELLER_REQUEST);
    try {
      const seller = await getSeller();
      commit(SELLER_SUCCESS, seller);
    } catch (err) {
      commit(SELLER_FAILURE, err);
    }
  }
};

export default {
  state,
  actions,
  mutations
}
