import { createStore } from "vuex";

export default createStore({
  state: {
    quizQuestions: [
      {
        id: 0,
        question: "What is c2stem?",
        image: "",
        options: {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
        },
      },
      {
        id: 1,
        question: "What language is c2stem written in?",
        image: "",
        options: {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
        },
      },
    ],
    quizLength: 0,
  },
  getters: {
    getQuizQuestions(state) {
      return state.quizQuestions;
    },
    getQuizLength(state) {
      state.quizLength = state.quizQuestions.length;
      return state.quizLength;
    },
  },
  mutations: {
    /**
     * Add a new empty question to the store.
     * @param {state} state 
     */
    addQuizQuestion(state) {
      let newQuestion = {
        id: state.quizLength,
        question: "New Question",
        image: "",
        options: {
          a: "",
          b: "",
          c: "",
          d: "",
        },
      };
      state.quizQuestions = [...state.quizQuestions, newQuestion]
    },
  },
  actions: {
    addQuizQuestion(context) {
      context.commit("addQuizQuestion");
    }
  },
  modules: {},
});
