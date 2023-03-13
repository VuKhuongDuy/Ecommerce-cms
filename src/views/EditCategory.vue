<template>
  <div class="row mt-3" style="overflow: auto">
    <label class="form-label" for="listCategoryValue">Các thuộc tính</label>
    <div
      class="col-xl-12"
      id="listCategoryValue"
      v-for="(prop, index) in list_props"
      :key="index"
    >
      <div class="form-group mb-3">
        <div class="row mt-2">
          <div class="col-1">{{ index + 1 }}.</div>
          <div class="col-3">
            <label class="form-label" for="name">Tên thuộc tính</label>
          </div>

          <div class="col-6">
            <input v-model="prop.name" type="text" class="form-control" />
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-1"></div>
          <div class="col-3">
            <label class="form-label" for="name">Loại thuộc tính</label>
          </div>

          <div class="col-6">
            <select v-model="prop.type" class="form-control">
              <option :value="PropTypes.string">
                {{ PropTypesString.string }}
              </option>
              <option :value="PropTypes.number">
                {{ PropTypesString.number }}
              </option>
            </select>
          </div>
          <div class="col-2">
            <button
              type="button"
              class="btn btn-danger"
              style="width: 100%"
              @click="deleteProp"
            >
              Xoa
            </button>
          </div>
        </div>

        <div class="row mt-2" v-if="prop.type === PropTypes.number">
          <div class="col-1"></div>
          <div class="col-3">
            <label class="form-label" for="name">Khoảng</label>
          </div>

          <div class="col-3">
            <input
              v-model="prop.defaultNumber[0]"
              type="number"
              class="form-control"
              id="username"
              placeholder="Bắt đầu"
            />
          </div>
          <div class="col-3">
            <input
              v-model="prop.defaultNumber[1]"
              type="number"
              class="form-control"
              id="username"
              placeholder="Kết thúc"
            />
          </div>
        </div>

        <div class="row mt-2" v-else>
          <div class="col-1"></div>
          <div class="col-3">
            <label class="form-label" for="name">Giá trị</label>
          </div>

          <div class="col-6">
            <input
              v-model="prop.defaultText[jndex]"
              type="text"
              class="form-control"
              id="username"
              placeholder="Giá trị"
              v-for="(text, jndex) in prop.defaultText"
              :key="jndex"
              @input="(event) => addOrDelTextProp(event, index, jndex)"
            />
          </div>
        </div>

        <div
          class="row mt-2"
          v-if="index === list_props.length - 1 && list_props.length < 3"
        >
          <div style="width: 100%">
            <button
              type="button"
              class="btn btn-success mt-3"
              style="width: 100%"
              @click="addProp"
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="toasts-container">
    <div
      class="toast fade hide mb-3"
      data-autohide="false"
      id="toast-create-success"
    >
      <div class="toast-header">
        <i class="far fa-bell text-muted me-2"></i>
        <strong class="me-auto">Thông báo</strong>
        <small>Vừa xong</small>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
        ></button>
      </div>
      <div class="toast-body">Tạo danh mục thành công</div>
    </div>
    <div
      class="toast fade hide mb-3"
      data-autohide="false"
      id="toast-create-error"
    >
      <div class="toast-header">
        <i class="far fa-bell text-muted me-2"></i>
        <strong class="me-auto">Thông báo</strong>
        <small>Vừa xong</small>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
        ></button>
      </div>
      <div class="toast-body">
        {{ error_message }}
      </div>
    </div>
  </div>

  <button
    type="button"
    data-bs-dismiss="modal"
    class="btn btn-primary mx-2"
    @click="(event) => saveCategory(event, createCategory)"
  >
    Save
  </button>
  <!-- toasts-container props-->
</template>
<script>
import * as lodash from "lodash";

import { Toast } from "bootstrap";
import { CategoryService } from "../services/category.service";
const PropTypes = {
  string: "string",
  number: "number",
};
const PropTypesString = {
  string: "Chữ",
  number: "Số",
};
const PropDefault = {
  type: PropTypes.string,
  name: "",
  defaultNumber: [],
  defaultText: [""],
};

export default {
  props: {
    listProp: {},
  },
  emits: ["saveProp"],
  data() {
    return {
      createCategory: {},
      error_message: "",
      number_props: 1,
      list_props: [lodash.cloneDeep(PropDefault)],
      PropTypes: PropTypes,
      PropTypesString: PropTypesString,
      PropDefault: PropDefault,
    };
  },
  async mounted() {
    this.list_props = await Promise.all(
      lodash.cloneDeep(this.listProp).map((p) => {
        let defaultText = [];
        let defaultNumber = [];
        if (p.type === PropTypes.string) {
          defaultText = [...p.values, ""];
        } else {
          defaultNumber = p.values;
        }

        return {
          name: p.name,
          type: p.type,
          defaultText,
          defaultNumber,
        };
      })
    );
  },
  methods: {
    async saveCategory(event, createCategory) {
      let data = [];
      await Promise.all(
        this.list_props.map((p) => {
          const propValue = lodash.cloneDeep(p);
          data.push({
            name: propValue.name,
            values:
              propValue.type === PropTypes.string
                ? propValue.defaultText.filter((e) => e)
                : propValue.defaultNumber,
            type: propValue.type === PropTypes.string ? "string" : "number",
          });
          console.log(data);
        })
      );
      this.$emit("saveProp", lodash.cloneDeep(data));
    },

    addProp() {
      this.list_props.push(lodash.cloneDeep(PropDefault));
    },

    addOrDelTextProp(event, index, jindex) {
      console.log(1);
      const text = event.target.value;
      // console.log("text", text)
      if (!text && this.list_props[index].defaultText.length > 2) {
        this.list_props[index].defaultText.splice(jindex, 1);
      }

      const lengthNotNull = this.list_props[index].defaultText.filter(
        (t) => t
      ).length;
      // console.log(lengthNotNull, this.list_props[index].defaultText.length)
      if (lengthNotNull === this.list_props[index].defaultText.length) {
        this.list_props[index].defaultText.push("");
      }
    },

    deleteProp(index) {
      this.list_props.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.form-create {
  max-width: 50%;
}
</style>
