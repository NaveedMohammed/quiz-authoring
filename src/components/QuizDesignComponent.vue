<template>
  <div class="container">
    <h1>Quiz Design</h1>
    <form>
      <div class="mb-3">
        <label for="questionLabel" class="form-label">Question: </label>
        <input
          type="text"
          class="form-control"
          id="questionLabel"
          :value="this.quizQuestion['question']"
          :disabled="disabledFlag"
          @change="handle($event)"
        />
      </div>
      <div class="image-header">
        <!-- <label for="formImage" class="form-label">Add Image</label>
        <input
          class="form-control invisible"
          type="file"
          id="formImage"
          accept=".jpg,.gif,.png"
        /> -->
        <p class="pe-2">Images:</p>
        <Button v-if="!disabledFlag" @click="openFileDialog()"
          >Add Image</Button
        >
        <input
          className="form-control d-none"
          id="imageFileInput"
          type="file"
          onChange="{imageSelected}"
        />
      </div>
      <div v-if="quizQuestion['image'].length" class="image-group">
        <div
          v-for="(img, index) in quizQuestion['image']"
          :key="index"
          class="images"
        >
          <img :src="img" width="100" />
          <button
            v-if="!disabledFlag"
            type="button"
            class="btn btn-lg btn-link rounded-pill icon-link"
            @click="deleteImage(index)"
          >
            <i class="bi bi-trash icon-red"></i>
          </button>
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
    openFileDialog() {
      var fileInput = document.getElementById("imageFileInput");
      fileInput.click();
    },
    deleteImage(index) {
      this.$store.dispatch("deleteQuizImage", {
        index: this.quizQuestionIndex,
        imgIndex: index,
      });
    },
  },
};
</script>

<style scoped>
.image-group {
  display: flex;
  justify-content: space-evenly;
}
.icon-red {
  color: red;
}
.image-header {
  display: flex;
  align-items: baseline;
}
.images {
  position: relative;
}
.icon-link {
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  max-height: 100%;
}
.images:hover .icon-link {
  opacity: 1;
}
.images:hover img {
  opacity: 0.3;
}
</style>
