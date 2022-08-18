<template>
  <div class="container">
    <h1>Quiz Questions</h1>
    <ul class="list-group">
      <li @mouseover="deleteIndex= index" @mouseleave="deleteIndex= null"  v-for="(questions, index) in quizQuestions" :key="index" class="quiz-list list-group-item d-flex justify-content-between align-items-center">
        {{ questions["question"] }}
       <button v-if="deleteIndex === index" type="button" class="btn btn-lg btn-link rounded-pill" @click="deleteQuestion(index)"><i class="bi bi-trash icon-red"></i></button>
      </li>
      <button type="button" class="btn btn-primary" @click="createQuizQuestion">
        Add Question
      </button>
    </ul>
  </div>
</template>

<script>
export default {
  name: "QuizComponent",
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
    deleteQuestion(index){
      this.$store.dispatch("deleteQuizQuestion", index);
    }
  },
};
</script>

<style scoped>
.quiz-list:hover{
  background: lightgray;
}
.icon-red{
  color: red;
}

</style>