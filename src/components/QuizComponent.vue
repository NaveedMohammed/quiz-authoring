<template>
  <div class="container">
    <h1>Quiz Questions</h1>
    <ul>
      <li v-for="(questions, index) in quizQuestions" :key="index">
        {{ questions["question"] }}
      </li>
      <button type="button" class="btn btn-primary" @click="createQuizQuestion">Add Question</button>
    </ul>
  </div>
</template>

<script>
export default {
  name: "QuizComponent",
  data() {
    return {};
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
  methods:{
    /**
     * Triggered when new question button is clicked.
     * Adds a new quiz question to store and in turn to the view
     */
    createQuizQuestion(){
      this.$store.dispatch("addQuizQuestion");
    }
  }
};
</script>
