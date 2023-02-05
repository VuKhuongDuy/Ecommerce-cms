<template>
  <div @click="closeSearchResult()">
    <div class="modal fade" :id="'modalCategory' + index">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <search-category></search-category>
          <button
            type="button"
            data-bs-dismiss="modal"
            class="btn btn-primary mx-2"
            @click="(event) => saveCategory(event)"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchCategory from "../form/SearchCategory.vue";
import * as lodash from "lodash";
import { closeSearchResult } from "../../mixin/mixin";

export default {
  mixins: [
    {
      methods: {
        closeSearchResult,
      },
    },
  ],
  components: {
    SearchCategory,
  },
  props: {
    index: Number,
  },
  mounted() {
    this.$store.commit("setCategory", {});
  },
  methods: {
    saveCategory(event) {
      console.log(
        "lodash.cloneDeep(this.$store.state.category)",
        lodash.cloneDeep(this.$store.state.category)
      );
      this.$emit(
        "setProductCategory",
        lodash.cloneDeep(this.$store.state.category)
      );
    },
  },
};
</script>

<style>
.modal-dialog {
  max-width: 80%;
  align-items: start !important;
  height: 90vh;
}

.modal-content {
  height: 100%;
}
</style>