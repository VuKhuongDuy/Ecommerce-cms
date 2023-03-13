<template>
  <div class="col-xl-12 mt-3">
    <div class="form-group mb-3">
      <!-- <label class="form-label" for="phone">Các thuộc tính</label> -->
      <div v-for="(prop, index) in properties" :key="index">
        <div class="form-group mb-3 container text-center">
          <!-- <table> -->
          <div class="row">
            <div class="col-1">{{ index + 1 }}.</div>
            <div class="col-3 text-start">Tên thuộc tính</div>
            <div class="col-6">
              <input
                v-model="prop.name"
                type="text"
                class="form-control"
                id="prop_name"
                placeholder="Tên thuộc tính"
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-1"></div>
            <div class="col-3 text-start">Giá trị</div>
            <div class="col-6">
              <input
                v-model="prop.value[jndex]"
                type="text"
                class="form-control mt-1"
                id="username"
                placeholder="Giá trị"
                v-for="(text, jndex) in prop.value"
                :key="jndex"
                @input="(event) => addOrDelTextProp(event, index, jndex)"
              />
            </div>
          </div>
          <!-- </table> -->
        </div>
      </div>
    </div>
  </div>
  <button type="button" class="btn btn-success mb-1 mx-2" @click="addProp">
    Thêm thuộc tính
  </button>
  <button
    type="button"
    data-bs-dismiss="modal"
    class="btn btn-primary mx-2"
    @click="(event) => saveParentProp(event, properties)"
  >
    Save
  </button>
  <!-- toasts-container props-->
</template>
<script>
import * as lodash from "lodash";

const DefaultProp = {
  name: "",
  value: [""],
};

export default {
  props: {
    propertiesList: Array,
  },
  emits: ["setParentProps"],
  data() {
    return {
      properties: [],
    };
  },
  mounted() {
    if (this.propertiesList.length == 0) {
      this.properties = [DefaultProp];
    } else {
      this.properties = lodash.cloneDeep(
        this.propertiesList.map((props) => {
          props.value.push("");
          return props;
        })
      );
    }
  },
  methods: {
    addOrDelTextProp(event, index, jindex) {
      const text = event.target.value;
      if (!text && this.properties[index].value.length > 2) {
        this.properties[index].value.splice(jindex, 1);
      }

      const lengthNotNull = this.properties[index].value.filter(
        (t) => t
      ).length;
      if (lengthNotNull === this.properties[index].value.length) {
        this.properties[index].value.push("");
      }
    },
    addProp() {
      this.properties.push(lodash.cloneDeep(DefaultProp));
    },
    saveParentProp(event, properties) {
      this.$emit("setParentProps", lodash.cloneDeep(this.properties));
    },
  },
};
</script>
<style scoped>
.form-create {
  max-width: 50%;
}
</style>
