<template>
  <div class="container">
    <h1>Quiz Design</h1>
    <form>
      <div class="mb-3">
        <label for="questionLabel" class="form-label">Question</label>
        <input
          type="text"
          class="form-control"
          id="questionLabel"
          :value="this.quizQuestion['question']"
          :disabled="disabledFlag"
          @change="handle($event)"
        />
      </div>
      <!-- <div class="mb-3">
        <label for="formImage" class="form-label">Add Image</label>
        <input
          class="form-control"
          type="file"
          id="formImage"
          accept=".jpg,.gif,.png"
        />
      </div> -->
      <div v-if="quizQuestion['image'].length" class="image-group">
        <div v-for="(img, index) in quizQuestion['image']" :key="index">
          <img :src="img" width="100" />
        </div>
      </div>
      <div
        v-for="(option, index) in Object.keys(this.quizQuestion['options'])"
        class="mb-3"
        :key="index"
      >
        <label :for="option" class="form-label">Option {{ option }}</label>
        <input
          type="text"
          class="form-control"
          :id="option"
          :value="this.quizQuestion['options'][option]"
          :disabled="disabledFlag"
          @change="handle($event)"
        />
      </div>
    </form>
    <button
      id="editBtn"
      type="button"
      class="btn btn-primary"
      @click="editQuizQuestion"
    >
      Edit Question
    </button>
  </div>
</template>

<script>
export default {
  name: "QuizDesignComponent",
  data() {
    return {
      disabledFlag: true,
      question: this.quizQuestion["question"],
      options: {
        a: this.quizQuestion["options"]["a"],
        b: this.quizQuestion["options"]["b"],
        c: this.quizQuestion["options"]["c"],
        d: this.quizQuestion["options"]["d"],
      },
    };
  },
  props: {
    quizQuestion: {
      type: Object,
      required: true,
    },
    quizQuestionIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    editQuizQuestion() {
      const editBttn = document.getElementById("editBtn");
      if (this.disabledFlag) {
        this.disabledFlag = false;
        editBttn.innerText = "Save Changes";
      } else {
        this.disabledFlag = true;
        editBttn.innerText = "Edit Question";
        this.$store.dispatch("updateQuizQuestion", {
          index: this.quizQuestionIndex,
          question: this.question,
          options: this.options,
        });
      }
    },
    handle(event) {
      var eventData = event.target;
      if (eventData.id === "questionLabel") {
        this.question = eventData.value;
      } else {
        this.options[eventData.id] = eventData.value;
      }
    },
  },
};
</script>

<style scoped>
.image-group {
  display: flex;
  justify-content: space-evenly;
}
</style>
