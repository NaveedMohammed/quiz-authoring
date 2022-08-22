<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Quiz Questions</h1>
        <div class="list-group">
          <button
            @mouseover="deleteIndex = index"
            @mouseleave="deleteIndex = null"
            v-for="(questions, index) in quizQuestions"
            :key="index"
            type="button"
            class="
              list-group-item list-group-item-action
              quiz-list
              d-flex
              justify-content-between
              align-items-center
            "
            aria-current="true"
          >
            {{ questions["question"] }}
            <button
              v-if="deleteIndex === index"
              type="button"
              class="btn btn-lg btn-link rounded-pill"
              @click="deleteQuestion(index)"
            >
              <i class="bi bi-trash icon-red"></i>
            </button>
          </button>
        </div>
        <button
          type="button"
          class="btn btn-primary add-btn"
          @click="createQuizQuestion"
        >
          Add Question
        </button>
      </div>
      <div class="col">
        <quiz-design-component :quizQuestion="quizQuestions[0]"></quiz-design-component>
      </div>
    </div>
  </div>
</template>

<script>
import QuizDesignComponent from "../components/QuizDesignComponent.vue";

export default {
  name: "QuizComponent",
  components: {
    QuizDesignComponent,
  },
  data() {
    return {
      /**
       * Index used to display the delete icon on hover.
       */
      deleteIndex: null,
    };
  },
  computed: {
    /**
     * Gets the list of questiosn from store.
     */
    quizQuestions() {
      return this.$store.getters.getQuizQuestions;
    },
    /**
     * Gets quiz list length from store.
     */
    quizLength() {
      return this.$store.getters.getQuizLength;
    },
  },
  methods: {
    /**
     * Triggered when new question button is clicked.
     * Adds a new quiz question to store and in turn to the view
     */
    createQuizQuestion() {
      this.$store.dispatch("addQuizQuestion");
    },
    /**
     * Delete the question from the list based on index.
     * @param {Integer} index
     */
    deleteQuestion(index) {
      this.$store.dispatch("deleteQuizQuestion", index);
    },
  },
};
</script>

<style scoped>
.quiz-list:hover {
  background: lightgray;
}
.icon-red {
  color: red;
}
.add-btn {
  margin: 5px;
}
</style>
