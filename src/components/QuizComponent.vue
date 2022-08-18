<template>
  <div class="container">
    <h1>Quiz Questions</h1>
    <ul>
      <li v-for="(questions, index) in quizQuestions" :key="index">
        {{ questions["question"] }}
      </li>
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
    quizQuestions() {
      return this.$store.getters.getQuizQuestions;
    },
    quizLength() {
      return this.$store.getters.getQuizLength;
    },
  },
};
</script>
