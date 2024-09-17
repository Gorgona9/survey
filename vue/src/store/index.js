import {createStore} from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 1,
    title: "Hello World",
    slug: "hello-world",
    status: "draft",
    image: "https://s3.amazonaws.com/images/logo.png",
    description: "",
    created_at: "2024-09-18 01:00:00",
    updated_at: "2024-09-18 01:00:00",
    expire_date: "2024-09-18 01:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From which country are you?",
        description: null,
        data: {
          options: [
            {
              uuid: "", text: ""
            }
          ]
        }
      }
    ],
  }
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    }
  },
  getters: {},
  actions: {
    register({commit}, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        })
    },
    login({commit}, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        })
    },
    logout({commit}) {
      return axiosClient.post('/logout')
        .then((response) => {
          commit('logout')
          return response;
        })
    }
  },
  mutations: {
    logout: state => {
      state.user.data = {};
        state.user.token = null
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    }
  }
})

export default store;
