<template>
  <div>
    <input
      type="file"
      :accept="onlyImage ? 'image/*' : 'image/*,video/*'"
      :multiple="isMultiple"
      @change="previewMultiFile"
      class="form-control-file"
      id="my-file"
    />
    <div class="border p-2 mt-3 row" style="overflow-x: auto">
      <p>Preview Here:</p>
      <template v-if="previewFiles.length">
        <div
          v-for="(item, index) in previewFiles[index]"
          :key="index"
          class="preview-image col-xl-2"
        >
          <img
            :src="item.data"
            class="img-fluid"
            v-if="isImageFile(item.type)"
          />

          <video v-else width="320" height="240" controls>
            <source :src="item.data" />
          </video>

          <a
            href="#"
            class="btn btn-outline-default btn-sm delete-button"
            @click="deletefile(index)"
          >
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    keyListFile: "",
    keyUploadFile: "",
    mutationListFile: "",
    mutationUpload: "",
    isMultiple: true,
    onlyImage: false,
  },
  computed: {
    previewFiles: {
      get() {
        return this.$store.state[this.keyListFile];
      },
      set(data) {
        this.$store.commit(this.keyListFile, data);
      },
    },
  },
  methods: {
    isImageFile(file) {
      return new RegExp(/image/).test(file);
    },
    async previewMultiFile(event) {
      const input = event.target;
      let count = input.files.length;
      let index = 0;
      const files = [];
      const previewFiles = this.previewFiles[this.index];
      const lastLength = previewFiles.length;

      if (input.files) {
        while (count--) {
          const reader = new FileReader();
          reader.onload = (e) => {
            previewFiles.push({
              data: e.target.result,
              type: "",
            });

            //add file to both preview and upload state
            this.$store.commit("addFiles", {
              keyListFile: this.keyListFile,
              keyUploadFile: this.keyUploadFile,
              index1: this.index,
              src: e.target.result,
              file: "",
            });

            files.map((file, index) => {
              let currentListFile = this.$store.state[this.keyListFile];
              currentListFile[this.index][index + lastLength].type = file.type;
              this.$store.commit(this.mutationListFile, currentListFile);
            });
          };
          files.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }

      let currentUpload = this.$store.state[this.keyUploadFile];
      currentUpload[this.index] = [
        ...currentUpload[this.index],
        ...input.files,
      ];
      this.$store.commit(this.mutationUpload, currentUpload);
    },
    deletefile(index) {
      this.$store.commit("removeFileAtIndex", {
        keyListFile: this.keyListFile,
        keyUploadFile: this.keyUploadFile,
        index1: this.index,
        index2: index,
      });
    },
  },
};
</script>

<style scoped>
img.img-fluid,
video {
  width: 200px;
  max-width: 200px;
  height: 200px;
  object-fit: fill;
  border: 1px solid black;
}

.preview-image {
  margin: 20px 0;
  position: relative;
}

.preview-image .delete-button {
  position: absolute;
  transform: translate(-50%, -50%);
  background: white;
  bottom: 00px;
  right: 30px;
}
</style>
