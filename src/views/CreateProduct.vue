<template>
  <form v-on:submit.prevent="saveProduct()" method="POST" name="create_product">
    <div class="row form-create" @click="closeSearchResult()">
      <div class="col-xl-6">
        <div class="form-group mb-3">
          <label class="form-label" for="name">Tên sản phẩm</label>
          <input
            v-model="createProduct.name"
            type="text"
            class="form-control"
            id="name"
            placeholder="Your name"
            name="product_name"
          />
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group mb-3">
          <div class="form-group mb-3">
            <label class="form-label" for="description">Mô tả</label>
            <input
              v-model="createProduct.description"
              type="text"
              class="form-control"
              id="description"
              placeholder="Your description"
              name="description"
            />
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group mb-3">
          <label class="form-label" for="addinfo">Add info</label>
          <input
            v-model="createProduct.addinfo"
            type="text"
            class="form-control"
            id="addinfo"
            placeholder="0123456789"
            name="add_info"
          />
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group mb-3">
          <label class="form-label" for="default_price">Giá mặc định</label>
          <input
            v-model="createProduct.default_price"
            type="text"
            class="form-control"
            id="default_price"
            placeholder="default_price"
            name="default_price"
          />
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group mb-3">
          <label class="form-label" for="selling_price">Giá bán</label>
          <input
            v-model="createProduct.selling_price"
            type="text"
            class="form-control"
            id="selling_price"
            placeholder="selling_price"
            name="selling_price"
          />
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group mb-3">
          <label class="form-label" for="sku">SKU</label>
          <input
            v-model="createProduct.sku"
            type="text"
            class="form-control"
            id="sku"
            placeholder="your sku"
            name="sku"
          />
        </div>
      </div>
      <div class="col-xl-6">
        <div class="form-group mb-3">
          <label class="form-label" for="quantity">Số lượng hàng có sẵn</label>
          <input
            v-model="createProduct.quantity"
            type="text"
            class="form-control"
            id="quantity"
            placeholder="your quantity"
            name="quantity"
          />
        </div>
      </div>
      <!-- <div class="col-xl-6">
        <div class="form-group mb-3">
          <label class="form-label" for="saleCount">Số lượng hàng đã bán</label>
          <input
            v-model="createProduct.sale_count"
            type="text"
            class="form-control"
            id="saleCount"
            placeholder="your saleCount"
            name="sale_count"
          />
        </div>
      </div> -->
      <div class="col-xl-6">
        <div class="form-group mb-3">
          <label class="form-label" for="role">Danh mục</label>
          <search-category></search-category>
        </div>
      </div>
      <div class="col-xl-12">
        <div class="form-group mb-3">
          <label class="form-label" for="role">Ảnh</label>
          <input
            type="file"
            multiple="multiple"
            @change="previewMultiImages"
            class="form-control-file"
            id="my-file"
          />
          <div class="border p-2 mt-3 row" style="overflow-x: auto">
            <p>Preview Here:</p>
            <template v-if="previewImages.length">
              <div
                v-for="(item, index) in previewImages"
                :key="index"
                class="preview-image col-xl-3"
              >
                <img
                  :src="item"
                  class="img-fluid"
                  v-if="isImageFile(previewImages[index])"
                />
                <video v-else width="320" height="240" controls>
                  <source :src="item" />
                </video>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="col-xl-12">
        <div class="form-group mb-3">
          <label class="form-label" for="role">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            multiple="multiple"
            @change="previewMultiThumbnail"
            class="form-control-file"
            id="my-file"
          />
          <div class="border p-2 mt-3 row" style="overflow-x: auto">
            <p>Preview Here:</p>
            <template v-if="previewThumbnails.length">
              <div
                v-for="(item, index) in previewThumbnails"
                :key="index"
                class="preview-image col-xl-3"
              >
                <img
                  :src="item"
                  class="img-fluid"
                  v-if="isImageFile(previewThumbnails[index])"
                />

                <video v-else width="320" height="240" controls>
                  <source :src="item" />
                </video>
              </div>
            </template>
          </div>
        </div>
      </div>
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
                      id="name"
                      placeholder="Tên thuộc tính"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Giá trị</td>
                  <td>
                    <input
                      v-model="prop.value[jndex]"
                      type="text"
                      class="form-control"
                      id="value"
                      placeholder="Giá trị"
                      v-for="(text, jndex) in prop.value"
                      :key="jndex"
                      @input="(event) => addOrDelTextProp(event, index, jndex)"
                    />
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
      <div class="col-xl-12">
        <div class="form-group mb-3">
          <label class="form-label" for="phone">Các filters</label>
          <div v-for="(filter, index) in filters" :key="index">
            <div class="form-group mb-3">
              <table>
                <tr>
                  <td>Tên filters</td>
                  <td>
                    <input
                      v-model="filter.name"
                      type="text"
                      class="form-control"
                      id="filter_name"
                      name="filter_name"
                      placeholder="Tên filter"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Giá trị</td>
                  <td>
                    <input
                      v-model="filter.value[jndex]"
                      type="text"
                      class="form-control"
                      id="filter_values"
                      name="filter_values"
                      placeholder="Giá trị"
                      v-for="(text, jndex) in filter.value"
                      :key="jndex"
                      @input="
                        (event) => addOrDelTextFilter(event, index, jndex)
                      "
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
                        @click="addFilter"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td rowspan="2">
                    <button
                      type="button"
                      class="btn btn-default"
                      style="width: 100%"
                      @click="deleteFilters(index)"
                    >
                      Xoa
                    </button>
                  </td>
                </tr>
              </table>
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
          <div class="toast-body">{{ success_message }}</div>
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
        @click="(event) => saveProduct(event, createProduct)"
      >
        Save
      </button>
    </div>
  </form>
  <!-- toasts-container -->
</template>
<script>
import { delayTime, closeSearchResult } from "../mixin/mixin";
import * as lodash from "lodash";
import { CategoryService } from "../services/category.service";
import { Toast } from "bootstrap";
import { ProductService } from "../services/product.service";
import { ImageService } from "../services/image.service";
import SearchCategory from "../components/form/SearchCategory.vue";
const DefaultProp = {
  name: "",
  value: [""],
};

const DefaultFilter = {
  name: "",
  value: [""],
};

export default {
  components: {
    SearchCategory,
  },
  mixins: [
    {
      methods: {
        delayTime,
        closeSearchResult,
      },
    },
  ],
  data() {
    return {
      createProduct: {},
      error_message: "",
      success_message: "",
      categories: [],
      previewImages: [],
      imageList: [],
      previewThumbnails: [],
      thumbnailList: [],
      properties: [lodash.cloneDeep(DefaultProp)],
      filters: [lodash.cloneDeep(DefaultFilter)],
    };
  },
  async mounted() {
    this.$store.commit("setCategory", {});
    this.categories = await CategoryService().getAllNotPage();
  },
  methods: {
    // async test() {
    //   return await ImageService.getMediaSrc(
    //     "9J00FBao2FthWq6QGa43cbs5lRMzQUNsSJ9nv41n8"
    //   );
    // },
    isImageFile(file) {
      return new RegExp(/^data:image/).test(file);
    },

    async getPresignFileURL(listFile = []) {
      const presignDatas = [];
      for (const thumb of listFile) {
        const response = await ImageService.getPresignUrlImageProduct(
          thumb.name,
          thumb.type
        );
        presignDatas.push(JSON.parse(response.data.data).formData);
      }
      return presignDatas;
    },

    upLoadPresignImage(listFile, presignDatas) {
      listFile.forEach((file, index) => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(presignDatas[index])) {
          formData.append(key, value);
        }
        formData.append("file", file);
        ImageService.uploadFile(formData);
      });
    },

    filterPresignMediaData(listFile, presignData) {
      const listData = [];
      for (const [index, image] of listFile.entries()) {
        let type = "image";
        if (!this.isImageFile(image)) {
          type = "video";
        }

        listData.push({
          type,
          url: presignData[index].key,
        });
      }
      return listData;
    },

    async saveProduct() {
      try {
        const thumbNailPresignedData = await this.getPresignFileURL(
          this.thumbnailList
        );
        const imagePresignData = await this.getPresignFileURL(this.imageList);

        this.createProduct.images = this.filterPresignMediaData(
          this.previewImages,
          imagePresignData
        );
        this.createProduct.thumb_image = this.filterPresignMediaData(
          this.previewThumbnails,
          thumbNailPresignedData
        );

        if (this.$store.state.category) {
          this.createProduct.category = this.$store.state.category.id;
        }

        this.createProduct.filters = this.extractFilters();
        this.createProduct.properties = this.properties;

        this.upLoadPresignImage(this.imageList, imagePresignData);
        this.upLoadPresignImage(this.thumbnailList, thumbNailPresignedData);

        await ProductService().createOne(this.createProduct);

        const toast = new Toast(
          document.getElementById("toast-create-success")
        );
        this.success_message = "Tạo sản phẩm thành công";
        toast.show();
        await this.delayTime();
        this.$router.push("/product");
      } catch (e) {
        // console.log(e);
        const toast = new Toast(
          document.getElementById("toast-create-success")
        );
        this.success_message = e;
        toast.show();
      }
    },

    extractFilters() {
      const refFilters = lodash.cloneDeep(this.filters);
      return refFilters.map((filter) => {
        filter.value = filter.value.filter((e) => e);
        if (filter.value.length == 1) {
          filter.value = filter.value[0];
        }
        return filter;
      });
    },

    previewMultiImages: function (event) {
      this.previewImages = [];
      this.imageList = [];

      const input = event.target;
      let count = input.files.length;
      let index = 0;
      if (input.files) {
        while (count--) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewImages.push(e.target.result);
          };
          this.imageList.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    },
    previewMultiThumbnail: function (event) {
      this.previewThumbnails = [];
      this.thumbnailList = [];

      const input = event.target;
      let count = input.files.length;
      let index = 0;
      if (input.files) {
        while (count--) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewThumbnails.push(e.target.result);
          };
          this.thumbnailList.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    },

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
    addFilter() {
      this.filters.push(lodash.cloneDeep(DefaultFilter));
    },

    deleteProp(index) {
      if (this.properties.length > 1) this.properties.splice(index, 1);
    },

    deleteFilters(index) {
      if (this.filters.length > 1) this.filters.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.form-create {
  max-width: 80%;
}

table {
  margin-left: 30px;
}
</style>
