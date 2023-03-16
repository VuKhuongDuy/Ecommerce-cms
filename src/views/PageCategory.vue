<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Trang</a></li>
        <li class="breadcrumb-item active">Danh mục</li>
      </ul>
      <h1 class="page-header mb-0">Danh mục</h1>
    </div>

    <div class="ms-auto">
      <a href="/category/create" class="btn btn-primary"
        ><i class="fa fa-plus-circle fa-fw me-1"></i> Tạo danh mục mới</a
      >
    </div>
  </div>

  <card>
    <div class="tab-content p-4">
      <div class="tab-pane fade show active" id="allTab">
        <!-- BEGIN input-group -->
        <div class="input-group mb-3">
          <div class="flex-fill position-relative">
            <div class="input-group">
              <input
                type="text"
                class="form-control ps-35px"
                placeholder="Tìm danh mục"
                v-model="searchData"
                @change="(event) => search()"
              />
              <div
                class="
                  input-group-text
                  position-absolute
                  top-0
                  bottom-0
                  bg-none
                  border-0
                "
                style="z-index: 1020"
              >
                <i class="fa fa-search opacity-5"></i>
              </div>
            </div>
          </div>
          <button class="btn btn-default dropdown-toggle" type="button">
            <span class="d-none d-md-inline">Tìm kiếm</span>
          </button>
        </div>

        <!-- END input-group -->

        <!-- BEGIN table -->
        <div class="table-responsive">
          <table class="table table-hover text-nowrap">
            <thead>
              <tr>
                <th class="border-top-0 pt-0 pb-2">STT</th>
                <th class="border-top-0 pt-0 pb-2">Image</th>
                <th class="border-top-0 pt-0 pb-2">Tên</th>
                <th class="border-top-0 pt-0 pb-2">Thuộc tính</th>
                <th class="border-top-0 pt-0 pb-2">#</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(category, index) in listCategory"
                :class="getClassEditted(index)"
                :key="category.id"
              >
                <td class="w-10px align-middle">
                  <div class="form-check">
                    {{ index + 1 }}
                  </div>
                </td>
                <td class="w-10px align-middle">
                  <div class="form-check">
                    <input
                      type="file"
                      accept="image/*"
                      @change="(event) => previewImage(event, index)"
                      class="form-control-file"
                      id="my-file"
                    />

                    <img
                      :src="preview_list[index]"
                      alt=""
                      v-if="category.image || image_list[index]"
                      class="category_image"
                    />
                  </div>
                </td>
                <td class="align-middle">
                  <input
                    @input="checkRowEdit(index)"
                    type="text"
                    name="categoryName"
                    id="categoryName"
                    v-model="category.name"
                  />
                </td>

                <td class="py-1 align-middle">
                  <p>
                    <span
                      v-for="(filter, findex) in category.filters"
                      :key="findex"
                    >
                      {{ filter.name }} : {{ filter.values }} <br />
                    </span>
                  </p>
                  <button
                    type="button"
                    class="btn btn-default me-2"
                    data-bs-toggle="modal"
                    :data-bs-target="'#modalCoverExample' + index"
                  >
                    Xem/Sửa
                  </button>

                  <div class="modal fade" :id="'modalCoverExample' + index">
                    <div class="modal-dialog modal-xl">
                      <div class="modal-content p-5">
                        <div class="modal-header">
                          <h5 class="modal-title">Sửa thông tin danh mục</h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                          ></button>
                        </div>
                        <edit-category
                          @saveProp="setParentFilters($event, index)"
                          :listProp="category.filters"
                        ></edit-category>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary mx-2 mx-2"
                    @click="savecategory(category, index)"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger me-2"
                    data-bs-toggle="modal"
                    :data-bs-target="'#modalDeletecategory' + index"
                  >
                    Delete
                  </button>
                  <div class="modal fade" :id="'modalDeletecategory' + index">
                    <div class="modal-dialog modal-sm">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Xác nhận xóa danh mục</h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <table style="border: none">
                            <tr>
                              <td><b>ID</b></td>
                              <td>: {{ category.id }}</td>
                            </tr>
                            <tr>
                              <td><b>Tên</b></td>
                              <td>: {{ category.name }}</td>
                            </tr>
                            <tr>
                              <td><b>Thuôc tính</b></td>
                              <td>
                                :
                                <span
                                  v-for="(filter, findex) in category.filters"
                                  :key="findex"
                                >
                                  {{ filter.name }} : {{ filter.values }}
                                  <br />
                                </span>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-default"
                            data-bs-dismiss="modal"
                          >
                            Hủy
                          </button>
                          <button
                            type="button"
                            data-bs-dismiss="modal"
                            class="btn btn-primary"
                            @click="(event) => deletecategory(category.id)"
                          >
                            Xác nhận
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- END table -->

        <div class="d-md-flex align-items-center mt-3">
          <div class="me-md-auto text-md-left text-center mb-2 mb-md-0"></div>
          <ul class="pagination mb-0 justify-content-center">
            <li class="page-item" v-if="this.page - 2 > 0">
              <a class="page-link" @click="goToPage(this.page - 2)">{{
                this.page - 2
              }}</a>
            </li>
            <li class="page-item" v-if="this.page - 1 > 0">
              <a class="page-link" @click="goToPage(this.page - 1)">{{
                this.page - 1
              }}</a>
            </li>
            <li class="page-item active" v-if="this.page - 0 > 0">
              <a class="page-link" @click="goToPage(this.page)">{{
                this.page - 0
              }}</a>
            </li>
            <li
              class="page-item"
              v-if="this.page + 1 > 0 && this.page + 1 <= this.totalPage"
            >
              <a class="page-link" @click="goToPage(this.page + 1)">{{
                this.page + 1
              }}</a>
            </li>
            <li
              class="page-item"
              v-if="this.page + 2 > 0 && this.page + 2 <= this.totalPage"
            >
              <a class="page-link" @click="goToPage(this.page + 2)">{{
                this.page + 2
              }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </card>
  <div class="toasts-container">
    <div
      class="toast fade hide mb-3"
      data-autohide="false"
      id="toast-update-success"
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
        {{ success_message }}
      </div>
    </div>
    <div
      class="toast fade hide mb-3"
      data-autohide="false"
      id="toast-update-error"
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
</template>
<script>
import { CategoryService } from "../services/category.service";
import EditCategory from "./EditCategory.vue";
import { Toast } from "bootstrap";
import { delayTime, isEmptyObject } from "../mixin/mixin";
import { ImageService } from "../services/image.service";
const PERPAGE = import.meta.env.VITE_PERPAGE;

export default {
  mixins: [
    {
      methods: {
        delayTime,
      },
    },
  ],
  components: {
    EditCategory,
  },
  data() {
    return {
      listCategory: [],
      listEditted: [],
      preview_list: [],
      image_list: [],
      error_message: "",
      success_message: "",
      searchData: "",
      page: 1,
      totalData: 0,
    };
  },
  computed: {
    searchQuery: {
      get() {
        const page = this.page;
        let query = { page, limit: PERPAGE };
        if (this.searchData) {
          query.q = this.searchData;
        }
        return query;
      },
    },
    totalPage: {
      get() {
        return Math.ceil(this.totalData / PERPAGE) || 1;
      },
    },
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      if (this.page < 1) {
        this.page = 1;
      }
      const response = await CategoryService().findCategory(this.searchQuery);
      this.listCategory = response.data;
      this.totalData = response.total;
      this.preview_list = await Promise.all(
        this.listCategory.map(async (category) => {
          if (category.image) return ImageService.getMediaSrc(category.image);
        })
      );
      this.image_list = Array(this.preview_list.length).fill("");
    },
    async search(searchEvent = true) {
      if (searchEvent) {
        this.page = 1;
      }
      this.listEditted = [];
      this.fetchData();
    },
    async savecategory(category, index) {
      try {
        let presignData = {};
        //get presign url image
        if (this.image_list[index]) {
          const responsePresign = await ImageService.getPresignUrlImageProduct(
            this.image_list[index].name,
            this.image_list[index].type
          );
          presignData = JSON.parse(responsePresign.data.data);
          category.image = presignData.formData.key;
        }

        await CategoryService().updateOne(category);
        //upload image
        if (!isEmptyObject(presignData)) {
          console.log(presignData);
          console.log(this.image_list[index]);
          ImageService.uploadMultiplePresign(
            [this.image_list[index]],
            [presignData.formData]
          );
        }

        const toast = new Toast(
          document.getElementById("toast-update-success")
        );
        this.success_message = "Cập nhật category thành công";
        toast.show();
      } catch (e) {
        console.log(e);
        this.error_message = e;
        const toast = new Toast(document.getElementById("toast-update-error"));
        toast.show();
      }
    },
    async deletecategory(categoryId) {
      try {
        await CategoryService().deleteOne(categoryId);
        const toast = new Toast(
          document.getElementById("toast-update-success")
        );
        toast.show();

        this.success_message = "Xóa category thành công";

        //mounted
        await this.search(false);
      } catch (e) {
        this.error_message = e;
        const toast = new Toast(document.getElementById("toast-update-error"));
        toast.show();
      }
    },
    checkRowEdit(index) {
      this.listEditted[index] = true;
    },
    getClassEditted(index) {
      return this.listEditted[index] ? ["row-editted"] : [];
    },
    setParentFilters(event, index) {
      this.listCategory[index].filters = event;
    },

    previewImage(event, index) {
      const input = event.target;
      if (input.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.preview_list[index] = e.target.result;
        };
        this.image_list[index] = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    goToPage(page) {
      this.page = page;
      this.search(false);
    },
  },
};
</script>
<style>
#default_category {
  max-width: 30px;
}

input {
  border: none;
}

.table-hover > tbody > tr.row-editted > * {
  background: #bcd3ff !important;
}

.table-hover > tbody > tr.row-editted input {
  background: #bcd3ff !important;
}

.table-hover > tbody > tr:hover input {
  background: rgba(218, 224, 236, 0.85) !important;
}

.category_image {
  width: 150px;
  height: 150px;
  max-width: 150px;
  display: block;
}

.modal-content {
  height: 100%;
  padding: 50px;
}
</style>