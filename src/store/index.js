import { createStore } from "vuex";

export default createStore({
  state: {
    quizQuestions: [
      {
        id: 0,
        question: "What is c2stem?",
        image: [require("../assets/item3a.png"), require("../assets/item3b.png")],
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
        image: [require("../assets/item3a.png"), require("../assets/item3b.png"),],
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
        id: state.quizQuestions.length,
        question: "New Question",
        image: "",
        options: {
          a: "",
          b: "",
          c: "",
          d: "",
        },
      };
      state.quizQuestions = [...state.quizQuestions, newQuestion];
    },
    /**
     * Delete the question based on the index provided from state.
     * @param {state} state
     * @param {Integer} index
     */
    deleteQuizQuestion(state, index) {
      state.quizQuestions.splice(index, 1);
    },
  },
  actions: {
    addQuizQuestion(context) {
      context.commit("addQuizQuestion");
    },
    deleteQuizQuestion(context, index) {
      context.commit("deleteQuizQuestion", index);
    },
  },
  modules: {},
});
