<template>
  <div class="container-fluid overflow-hidden">
    <div class="row">
      <div class="col-4 shadow p-3 mb-3 bg-body rounded quiz-panel">
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
            @click="editQuizQuestion(index)"
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
      <div v-if="editFlag && quizQuestions[editIndex]" class="col-7 shadow p-3 mb-3 bg-body rounded quiz-panel">
        <quiz-design-component :quizQuestion="quizQuestions[editIndex]"></quiz-design-component>
      </div>
      <div v-else class="col-7 shadow p-3 mb-3 bg-body rounded quiz-panel">
        <h1>Please select a Quiz question to edit</h1>
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
      editIndex: null,
      editFlag: false,
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
    editQuizQuestion(index){
      this.editFlag = true;
      this.editIndex = index;

    }
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
.container-fluid, .row{
  height: 100%;
}
.quiz-panel{
  margin-left: 1rem;
  margin-top: 1rem;
}
</style>
