<template>
  <div class="col-xl-12">
    <div class="form-group mb-3">
      <label class="form-label" for="phone">Các thuộc tính</label>
      <div v-for="(prop, index) in properties" :key="index">
        <div class="form-group mb-3">
          <table>
            <tr>
              <td>Tên thuộc tính</td>
              <td>
                <input
                  v-model="prop.name"
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Giá trị"
                />
              </td>
            </tr>
            <tr>
              <td>Danh sách</td>
              <td>
                <input
                  v-model="prop.value[jndex]"
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Giá trị"
                  v-for="(text, jndex) in prop.value"
                  :key="jndex"
                  @input="(event) => addOrDelTextProp(event, index, jndex)"
                />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <div style="width: 100%">
                  <button
                    type="button"
                    class="btn btn-default"
                    style="width: 100%"
                    @click="addProp"
                  >
                    +
                  </button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
  <button
    type="button"
    data-bs-dismiss="modal"
    class="btn btn-primary pr-2"
    @click="(event) => saveParentProp(event, properties)"
  >
    Save
  </button>
  <!-- toasts-container props-->
</template>
<script>
import * as lodash from "lodash";

const DefaultProp = {
  name: "Tên thuộc tính",
  value: ["Giá trị 1"],
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
    this.properties = lodash.cloneDeep(
      this.propertiesList.map((props) => {
        props.value.push("");
        return props;
      })
    );
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