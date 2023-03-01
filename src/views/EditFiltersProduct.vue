<template>
  <div class="col-xl-12">
    <div class="form-group mb-3">
      <!-- <label class="form-label" for="phone">Các filters</label> -->
      <div v-for="(filter, index) in filters" :key="index">
        <div class="form-group mb-3 mt-3 container text-center">
          <div class="row">
            <div class="col-1">{{ index + 1 }}.</div>
            <div class="col-3 text-start">Tên thuộc tính</div>
            <div class="col-6">
              <input
                v-model="filter.name"
                type="text"
                class="form-control"
                id="username"
                placeholder="Giá trị"
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-1"></div>
            <div class="col-3 text-start">Giá trị</div>
            <div class="col-6">
              <input
                v-model="filter.value[jndex]"
                type="text"
                class="form-control"
                id="username"
                placeholder="Giá trị"
                v-for="(text, jndex) in filter.value"
                :key="jndex"
                @input="(event) => addOrDelTextFilter(event, index, jndex)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button
    type="button"
    class="btn btn-default mb-1 mx-2"
    style="backgroundColor: #4aca4a; color: #fff"
    @click="addFilters"
  >
    Thêm thuộc tính
  </button>
  <button
    type="button"
    data-bs-dismiss="modal"
    class="btn btn-primary mx-2"
    @click="(event) => saveParentFilter(event, filters)"
  >
    Save
  </button>
  <!-- toasts-container props-->
</template>
<script>
import * as lodash from "lodash";

const DefaultFilter = {
  name: "Tên filter",
  value: ["Giá trị 1"],
};

export default {
  props: {
    filtersList: Array,
  },
  emits: ["saveParentFilter"],
  data() {
    return {
      filters: [],
    };
  },
  mounted() {
    this.filters = lodash.cloneDeep(
      this.filtersList.map((filter) => {
        if (Array.isArray(filter.value)) filter.value.push("");
        else filter.value = [filter.value, ""];
        return filter;
      })
    );
  },
  methods: {
    addOrDelTextFilter(event, index, jindex) {
      const text = event.target.value;
      if (!text && this.filters[index].value.length > 2) {
        this.filters[index].value.splice(jindex, 1);
      }

      const lengthNotNull = this.filters[index].value.filter((t) => t).length;
      if (lengthNotNull === this.filters[index].value.length) {
        this.filters[index].value.push("");
      }
    },
    addFilters() {
      this.filters.push(lodash.cloneDeep(DefaultFilter));
    },
    saveParentFilter(event, filters) {
      this.$emit("saveParentFilter", lodash.cloneDeep(this.filters));
    },
  },
};
</script>
<style scoped>
.form-create {
  max-width: 50%;
}
</style>
