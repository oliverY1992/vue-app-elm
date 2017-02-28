import {COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAILURE} from '../mutation-types';
import {getComments} from 'services/comments';

const state = {
  all: [],
  isFetching: false,
  isFailed: false
};

const getters = {
  positiveComments: state => state.all.filter(c => c.rateType === 0),
  negativeComments: state => state.all.filter(c => c.rateType === 1)
};

const mutations = {
  [COMMENTS_REQUEST] (state) {
    state.isFailed = false;
    state.isFetching = true;
  },
  [COMMENTS_SUCCESS] (state, allComments) {
    state.all = allComments;
    state.isFetching = false;
    state.isFailed = false;
  },
  [COMMENTS_FAILURE] (state, err) {
    state.isFetching = false;
    state.isFailed = true;
  }
};

const actions = {
  async fetchComments ({commit}) {
    commit(COMMENTS_REQUEST);
    try {
      const allComments = await getComments();
      commit(COMMENTS_SUCCESS, allComments);
    } catch (err) {
      commit(COMMENTS_FAILURE, err);
    }
  }
};

export default {
  actions,
  mutations,
  state,
  getters
}
