<template>
  <div class="row form-create">
    <form action="POST" name="create_category">
      <div class="col-xl-6">
        <div class="form-group mb-3">
          <label class="form-label" for="category_name">Tên danh mục</label>
          <input
            v-model="createCategory.name"
            type="text"
            class="form-control"
            id="category_name"
            placeholder=""
          />
        </div>
      </div>
      <label class="form-label mt-3 text-md-left">Danh sách thuộc tính: </label>
      <p style="font-style: italic; opacity: 0.5">dùng để filter sản phẩm</p>
      <hr />
      <div class="col-xl-12" v-for="(prop, index) in list_props" :key="index">
        <div class="form-group mb-3">
          <div class="row mt-2">
            <div class="col-3">
              <label class="form-label" for="name">Tên thuộc tính</label>
            </div>
            <div class="col-6">
              <input
                v-model="prop.name"
                type="text"
                class="form-control"
                name="category_prop_name"
              />
            </div>
            <div class="col-3">
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteProp(index)"
              >
                Xoa
              </button>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-3">
              <label class="form-label" for="name">Loại thuộc tính</label></div>
            <div class="col-6">
            <select v-model="prop.type" class="form-control">
              <option :value="PropTypes.text">
                {{ PropTypesString.text }}
              </option>
              <option :value="PropTypes.number">
                {{ PropTypesString.number }}
              </option>
            </select>
            </div>
          </div>
          <div class="row mt-2">
            <template v-if="prop.type === PropTypes.number">
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
            </template>
            <template v-else>
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
            </template>
          </div>
            <div
              class="form-group mb-3 row mt-5"
              v-if="index === list_props.length - 1 && list_props.length < 3"
            >
              <div>
                <button
                  type="button"
                  class="btn btn-success"
                  style="width: 100%"
                  @click="addProp"
                >
                  Thêm
                </button>
              </div>
          </div>
        </div>
      </div>

      <div class="col-xl-12 preview-create-category">
        <div class="form-group mb-3 mt-5">
          <label class="form-label" for="role">Ảnh: </label>
          <input
            type="file"
            accept="image/*"
            @change="previewImage"
            class="form-control-file mx-2"
            id="my-file"
          />
          <div class="border p-2 mt-3 row" style="overflow-x: auto">
            <p>Preview Here:</p>
            <img :src="preview" class="img-fluid" />
          </div>
        </div>
      </div>
    </form>
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
    class="btn btn-primary mx-2"
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
import { isEmptyObject } from "../mixin/mixin";
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
        const category = {
          name: createCategory.name,
          filters: data,
        };

        let presignData = {};
        //get presign url image
        if (this.preview) {
          const responsePresign = await ImageService.getPresignUrlImageProduct(
            this.image.name,
            this.image.type
          );
          presignData = JSON.parse(responsePresign.data.data);
          category.image = presignData.formData.key;
        }
        //create category
        await categoryService.createOne(category);

        //upload image
        if (!isEmptyObject(presignData)) {
          ImageService.uploadMultiplePresign(
            [this.image],
            [presignData.formData]
          );
        }
        const toast = new Toast(
          document.getElementById("toast-create-success")
        );
        toast.show();
        await this.delayTime();
        this.$router.push("/category");
      } catch (e) {
        console.log(e);
        this.error_message = e;
        const toast = new Toast(document.getElementById("toast-create-error"));
        toast.show();
      }
    },

    addProp() {
      this.list_props.push(lodash.cloneDeep(PropDefault));
    },

    addOrDelTextProp(event, index, jindex) {
      const text = event.target.value;
      if (!text && this.list_props[index].defaultText.length > 2) {
        this.list_props[index].defaultText.splice(jindex, 1);
      }

      const lengthNotNull = this.list_props[index].defaultText.filter(
        (t) => t
      ).length;
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

.preview-create-category img {
  max-width: 350px;
}
</style>
