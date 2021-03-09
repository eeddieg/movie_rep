import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import ApiCalls from "../mixins/apiCalls";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    user: {
      token: "",
    },
    config: {},
    genre: {},
    trendingMovies: [],
    discover: {},
  },
  getters: {
    isAuth: (state) => {
      if (JSON.stringify(state.user) === "{}") {
        return false;
      }
      return true;
    },
    getConfig: (state) => {
      return state.config;
    },
    getGenre: (state) => {
      return state.genre;
    },
    getTrendingMovies: (state) => {
      return state.trendingMovies;
    },
    getDiscover: (state) => {
      return state.discover;
    },
  },
  mutations: {
    SET_USER(state, payload: string) {
      state.user.token = payload;
    },
    SET_CONFIG(state, payload: {}) {
      state.config = payload;
    },
    SET_GENRE(state, payload: []) {
      state.genre = payload;
    },
    SET_TRENDING_MOVIES(state, payload: any[]) {
      console.log();
    },
    SET_DISCOVER_MOVIES(state, payload) {
      const resObj: any = {};
      state.discover = payload;
    },
  },
  actions: {
    async createGuestSession() {
      const SUCCESS = 200;
      await axios
        .get(ApiCalls.ACTIONS.GUEST_SESSION)
        .then((res) => {
          if ((res.status = SUCCESS)) {
            if(res.data.success) {
              localStorage.setItem("guest_session_id", res.data.guest_session_id);
              localStorage.setItem("expires_at", res.data.expires_at);
            }
          } 
        })
        .catch((err) => console.log(err));
    },
    async validateUser({commit}, user) {
      const SUCCESS = 200;
      await axios
        .get(ApiCalls.ACTIONS.REQUEST_TOKEN)
        .then(res => {
          if (res.status == SUCCESS){
            if (res.data.success){
              localStorage.setItem("temporary_request_token", res.data.request_token)
              commit("SET_USER", res.data.request_token);
            }
          } else {
            console.log("error");
          }
        })
        .then(() => {
          axios.get(ApiCalls.ACTIONS.VALIDATE_WITH_LOGIN)
        })
        .catch((err) => console.log(err));
    },
    async fetchConfig({ commit }) {
      await axios
        .get(ApiCalls.ACTIONS.CONFIG)
        .then((res) => commit("SET_CONFIG", res.data))
        .catch((err) => console.log(err));
      return this.state.config!;
    },
    async queryGenre({ commit }) {
      await axios
        .get(ApiCalls.ACTIONS.GENRE)
        .then((res) => commit("SET_GENRE", res.data))
        .catch((err) => console.log(err));
    },
    async fetchTrending({ commit }) {
      await axios
        .get(ApiCalls.ACTIONS.TRENDING)
        .then((res) => commit("SET_TRENDING_MOVIES", res.data.results)) //page 1 out of 10000
        .catch((err) => console.log(err));
    },
    async discoverMovies({ commit }) {
      await axios
        .get(ApiCalls.ACTIONS.DISCOVER)
        .then((res) => commit("SET_DISCOVER_MOVIES", res.data)) //page 1 out of 10000
        .catch((err) => console.log(err));
      return this.state.discover;
    },
    configImageUrl() {
      const conf = this.getters.getConfig;
      const imageConf = [conf.change_keys, conf.images];
      const baseImgUrl = imageConf[1].base_url + imageConf[1].logo_sizes[4];
      return { imageConf, baseImgUrl };
    },
    async deleteSession() {
      localStorage.removeItem("guest_session_id");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("temporary_request_token");
    }
  },
  modules: {},
});
