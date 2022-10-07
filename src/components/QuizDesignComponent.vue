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
        <button v-if="!disabledFlag" @click="openFileDialog()">
          Add Image
        </button>
        <input
          className="form-control d-none"
          id="imageFileInput"
          type="file"
          onChange="{imageSelected}"
        />
      </div>
      <div v-if="this.quizQuestion['images'].length" class="image-group">
        <div
          v-for="(img, index) in this.quizQuestion['images']"
          :key="index"
          class="images"
        >
          <img v-if="!deleteImgIndex.includes(index)" :src="img" width="100" />
          <button
            v-if="!disabledFlag && !deleteImgIndex.includes(index)"
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
    <div class="button-grp">
      <button
        id="editBtn"
        type="button"
        class="btn btn-primary"
        @click="editQuizQuestion"
      >
        Edit Question
      </button>
      <button
        v-if="!disabledFlag"
        id="CancelBtn"
        type="button"
        class="btn btn-primary"
        @click="removeChanges"
      >
        Cancel
      </button>
    </div>
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
      imageList: [...this.quizQuestion["images"]],
      undoQueue: {},
      deleteImgIndex: [],
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
        this.deleteImgIndex.length = 0;
        this.$store.dispatch("updateQuizQuestion", {
          index: this.quizQuestionIndex,
          question: this.question,
          options: this.options,
          imageList: this.imageList.filter(() => {return true}),
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
      delete this.imageList[index];
      this.deleteImgIndex.push(index);
      // this.$store.dispatch("deleteQuizImage", {
      //   index: this.quizQuestionIndex,
      //   imgIndex: index,
      // });
    },
    removeChanges() {
      const editBttn = document.getElementById("editBtn");
      this.question = this.quizQuestion["question"];
      this.options = {
        a: this.quizQuestion["options"]["a"],
        b: this.quizQuestion["options"]["b"],
        c: this.quizQuestion["options"]["c"],
        d: this.quizQuestion["options"]["d"],
      };
      this.imageList.length = 0;
      this.imageList = [...this.quizQuestion["images"]];
      this.deleteImgIndex.length = 0;
      this.disabledFlag = true;
      editBttn.innerText = "Edit Question";
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
.button-grp button {
  margin: 5px;
}
</style>
