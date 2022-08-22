<template>
  <div class="container">
    <h1>Quiz Design</h1>
    <form>
      <div class="mb-3">
        <label for="questionLabel" class="form-label">Question</label>
        <input type="text" class="form-control" id="questionLabel"
        :value='quizQuestion["question"]' />
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
      <div v-if='quizQuestion["images"].length'>
        <div v-for='(img, index) in quizQuestion["images"]' :key="index">
          <img :src="img" class="img-thumbnail" width="100" />
        </div>
      </div>
      <div
        v-for='(option, index) in Object.keys(quizQuestion["options"])'
        class="mb-3"
        :key="index"
      >
        <label for="optionLabel" class="form-label">Option {{ option }}</label>
        <input
          type="text"
          class="form-control"
          id="optionLabel"
          :value='quizQuestion["options"][option]'
        />
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: "QuizDesignComponent",
  props: {
    quizQuestion: {
        type: Object,
        required: true
    }
  },
};
</script>
