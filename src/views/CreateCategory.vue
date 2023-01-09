<template>
  <div class="row form-create">
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="username">Tên danh mục</label>
        <input
          v-model="createCategory.name"
          type="text"
          class="form-control"
          id="username"
          placeholder="Your username"
        />
      </div>
    </div>
    <div class="col-xl-12" v-for="(prop, index) in list_props">
      <div class="form-group mb-3">
        <label class="form-label" for="phone">Các thuộc tính</label>
        <form action="POST" name="create_category">
          <table>
            <tr>
              <td>Tên thuộc tính</td>
              <td>
                <input v-model="prop.name" type="text" class="form-control" />
              </td>
            </tr>
            <tr>
              <td>Loại thuộc tính</td>
              <td>
                <select v-model="prop.type" class="form-control">
                  <option :value="PropTypes.text">
                    {{ PropTypesString.text }}
                  </option>
                  <option :value="PropTypes.number">
                    {{ PropTypesString.number }}
                  </option>
                </select>
              </td>
              <td rowspan="2">
                <button
                  type="button"
                  class="btn btn-default"
                  style="width: 100%"
                  @click="deleteProp(index)"
                >
                  Xoa
                </button>
              </td>
            </tr>

            <tr v-if="prop.type === PropTypes.number">
              <td>Khoảng</td>
              <td>
                <input
                  v-model="prop.defaultNumber[0]"
                  type="number"
                  class="form-control"
                  id="username"
                  placeholder="Bắt đầu"
                />
                <input
                  v-model="prop.defaultNumber[1]"
                  type="number"
                  class="form-control"
                  id="username"
                  placeholder="Kết thúc"
                />
              </td>
            </tr>
            <tr v-else>
              <td>Danh sách</td>
              <td>
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
              </td>
            </tr>

            <tr v-if="index === list_props.length - 1 && list_props.length < 3">
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
        </form>
      </div>
    </div>

    <div class="col-xl-12">
      <div class="form-group mb-3">
        <label class="form-label" for="role">Images</label>
        <input
          type="file"
          accept="image/*"
          @change="previewImage"
          class="form-control-file"
          id="my-file"
        />
        <div class="border p-2 mt-3 row" style="overflow-x: auto">
          <p>Preview Here:</p>
          <img :src="preview" class="img-fluid" />
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
    class="btn btn-primary pr-2"
    @click="(event) => saveCategory(event, createCategory)"
  >
    Save
  </button>
  <!-- toasts-container -->
</template>
<script>
import {
  getRoleString,
  getGenderString,
  getBirthdayFormat,
  delayTime,
  previewImage,
} from "../mixin/mixin";
import * as lodash from "lodash";

import { Toast } from "bootstrap";
import { CategoryService } from "../services/category.service";
import { ImageService } from "../services/image.service";
const PropTypes = {
  text: "text",
  number: "number",
};
const PropTypesString = {
  text: "Chữ",
  number: "Số",
};
const PropDefault = {
  type: PropTypes.text,
  name: "",
  defaultNumber: [],
  defaultText: [""],
};

export default {
  mixins: [
    {
      methods: {
        getRoleString,
        getGenderString,
        getBirthdayFormat,
        delayTime,
        previewImage,
      },
    },
  ],
  data() {
    return {
      createCategory: {},
      error_message: "",
      number_props: 1,
      list_props: [lodash.cloneDeep(PropDefault)],
      PropTypes: PropTypes,
      PropTypesString: PropTypesString,
      PropDefault: PropDefault,
      preview: null,
      image: null,
    };
  },
  methods: {
    async saveCategory(event, createCategory) {
      event.preventDefault();
      const categoryService = CategoryService();
      try {
        let data = [];
        await Promise.all(
          this.list_props.map((p) => {
            const propValue = lodash.cloneDeep(p);
            data.push({
              name: propValue.name,
              values:
                propValue.type === PropTypes.text
                  ? propValue.defaultText.filter((e) => e)
                  : propValue.defaultNumber,
              type: propValue.type === PropTypes.text ? "string" : "number",
            });
          })
        );

        let presignImage = "";
        if (this.preview) {
          const responsePresign =
            await ImageService.getPresignUrlImageProduct();
        }
        await categoryService.createOne({
          name: createCategory.name,
          filters: data,
        });
        const toast = new Toast(
          document.getElementById("toast-create-success")
        );
        toast.show();
        await this.delayTime();
        this.$router.push("/category");
      } catch (e) {
        this.error_message = e;
        const toast = new Toast(document.getElementById("toast-create-error"));
        toast.show();
      }
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
      if (this.list_props.length > 1) this.list_props.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.form-create {
  max-width: 50%;
}
</style>