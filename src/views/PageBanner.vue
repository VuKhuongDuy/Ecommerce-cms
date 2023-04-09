<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Trang</a></li>
        <li class="breadcrumb-item active">Banner</li>
      </ul>
      <h1 class="page-header mb-0">Banner</h1>
    </div>

    <div class="ms-auto">
      <a href="/banner/create" class="btn btn-primary"
        ><i class="fa fa-plus-circle fa-fw me-1"></i> Tạo banner mới</a
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
                placeholder="Tìm banner"
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
                <th class="border-top-0 pt-0 pb-2">Tên</th>
                <th class="border-top-0 pt-0 pb-2">Hình ảnh</th>
                <th class="border-top-0 pt-0 pb-2">URL</th>
                <th class="border-top-0 pt-0 pb-2">Tiêu đề</th>
                <th class="border-top-0 pt-0 pb-2">Tiêu đề 2</th>
                <th class="border-top-0 pt-0 pb-2">Loại</th>
                <th class="border-top-0 pt-0 pb-2">#</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(banner, index) in listBanner"
                :class="getClassEditted(index)"
                :key="banner.id"
              >
                <td class="align-middle">
                  <input
                    @input="checkRowEdit(index)"
                    type="text"
                    name="banner-name"
                    id="banner-name"
                    v-model="banner.name"
                  />
                </td>
                <td class="align-middle">
                  <img
                    class="preview-media"
                    alt=""
                    :src="listImages?.[index]?.[0]?.data"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-default btn-sm d-block"
                    data-bs-toggle="modal"
                    :data-bs-target="'#modalThumbnail' + index"
                  >
                    Sửa
                  </button>
                  <div class="modal fade" :id="'modalThumbnail' + index">
                    <div class="modal-dialog modal-xl">
                      <div class="modal-content">
                        <input-multiple-file
                          :index="index"
                          :keyListFile="'previewThumbnail'"
                          :keyUploadFile="'uploadThumbnail'"
                          :mutationListFile="'setPreviewThumbnail'"
                          :mutationUpload="'setUploadThumbnail'"
                          :multiple="false"
                        ></input-multiple-file>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  <input
                    @input="checkRowEdit(index)"
                    type="text"
                    name="banner-redirect-url"
                    id="banner-redirect-url"
                    v-model="banner.redirect_url"
                  />
                </td>
                <td class="align-middle">
                  <input
                    @input="checkRowEdit(index)"
                    type="text"
                    name="banner-title"
                    id="banner-title"
                    v-model="banner.title"
                  />
                </td>
                <td class="align-middle">
                  <input
                    @input="checkRowEdit(index)"
                    type="text"
                    name="banner-title2"
                    id="banner-title2"
                    v-model="banner.title2"
                  />
                </td>

                <td class="align-middle">
                  <select
                    class="form-select"
                    id="select-banner-type"
                    v-model="banner.type"
                  >
                    <option :value="BannerType.HomeBanner">
                      {{ BannerType.HomeBanner }}
                    </option>
                    <option :value="BannerType.HomeCenter">
                      {{ BannerType.HomeCenter }}
                    </option>
                    <option :value="BannerType.HomeSlide">
                      {{ BannerType.HomeSlide }}
                    </option>
                    <option :value="BannerType.ProductSidebarLeft">
                      {{ BannerType.ProductSidebarLeft }}
                    </option>
                  </select>
                </td>

                <td>
                  <button
                    type="button"
                    class="btn btn-primary mx-2"
                    @click="saveBanner(index)"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger me-2"
                    data-bs-toggle="modal"
                    :data-bs-target="'#modalDeleteBanner' + index"
                  >
                    Delete
                  </button>
                  <div class="modal fade" :id="'modalDeleteBanner' + index">
                    <div class="modal-dialog modal-sm">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Xác nhận xóa banner</h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <table style="border: none">
                            <tr>
                              <td><b>Tiêu đề</b></td>
                              <td>: {{ banner.name }}</td>
                            </tr>
                            <tr>
                              <td><b>Mô tả</b></td>
                              <td>
                                : {{ banner.title }} <br />
                                {{ banner.title2 }}
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
                            class="btn btn-primary"
                            @click="deleteBanner(banner.id)"
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

  <toast-message
    :success_message="success_message"
    :error_message="error_message"
  ></toast-message>
</template>
<script>
import { BannerService } from "../services/banner.service";
import { ImageService } from "../services/image.service";
import InputMultipleFile from "../components/form/InputMultipleFile.vue";
import ToastMessage from "../components/toast/ToastMessage.vue";
import { toastSuccess, toastError } from "../mixin/mixin";
import * as lodash from "lodash";
import { BannerType } from "../enums/banner.enum";

const PERPAGE = import.meta.env.VITE_PERPAGE;

export default {
  components: {
    InputMultipleFile,
    ToastMessage,
  },
  mixins: [
    {
      methods: {
        toastSuccess,
        toastError,
      },
    },
  ],
  data() {
    return {
      listBanner: [],
      listEditted: [],
      preview: null,
      image: null,
      preview_list: [],
      image_list: [],
      listImages: [],
      success_message: "",
      error_message: "",
      searchData: "",
      page: 1,
      totalData: 0,
      BannerType,
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
    await this.search(false);

    //get image
    const listUploadFiles = [];
    await Promise.all(
      this.listBanner.map(async (banner, index) => {
        //images detail
        if (banner.image) {
          listUploadFiles[index] = [banner.image];
          this.listImages[index] = [
            {
              data: await ImageService.getMediaSrc(banner.image),
              type: "image",
            },
          ];
        }
      })
    );

    //save thumbnail to store
    this.$store.commit("setPreviewThumbnail", this.listImages);
    this.$store.commit("setUploadThumbnail", listUploadFiles);
  },
  methods: {
    async search(searchEvent = true) {
      if (searchEvent) {
        this.page = 1;
      }
      this.listEditted = [];
      const response = await BannerService().findBanner(this.searchQuery);
      this.listBanner = response.data;
      console.log(response);
      this.totalData = response.total;
      this.$router.push({
        path: "banner",
        query: this.searchQuery,
      });
    },
    goToPage(page) {
      this.page = page;
      this.search(false);
    },
    async saveBanner(index) {
      try {
        const banner = lodash.cloneDeep(this.listBanner[index]);

        delete banner.slug;

        const file = this.$store.state.uploadThumbnail?.[index]?.[0];
        let presignFormData;
        if (file instanceof File) {
          const response = await ImageService.getPresignUrlImageProduct(
            file.name,
            file.type
          );
          presignFormData = JSON.parse(response.data.data).formData;
          banner.image = presignFormData.key;
        }
        await BannerService().editOne(banner);
        if (presignFormData) {
          ImageService.uploadMultiplePresign([file], [presignFormData]);
        }
        this.toastSuccess("Cập nhật banner thành công");
      } catch (e) {
        this.toastError(e);
      }
    },
    async deleteBanner(id) {
      try {
        this.toastSuccess("Xoa banner thành công");
        await BannerService().deleteOne(id);
        window.location.reload();
      } catch (e) {
        this.toastError(e);
      }
    },
    checkRowEdit(index) {
      this.listEditted[index] = true;
    },
    getClassEditted(index) {
      return this.listEditted[index] ? ["row-editted"] : [];
    },
  },
};
</script>
<style>
#default_banner {
  max-width: 30px;
}

input,
textarea {
  border: none;
}

.table-hover > tbody > tr.row-editted > * {
  background: #bcd3ff !important;
}

.table-hover > tbody > tr.row-editted input,
.table-hover > tbody > tr.row-editted textarea {
  background: #bcd3ff !important;
}

.table-hover > tbody > tr:hover input,
.table-hover > tbody > tr:hover textarea {
  background: rgba(218, 224, 236, 0.85) !important;
}

.img-fluid {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.preview-image {
  display: inline;
}

.ck-editor__editable {
  min-height: 60vh;
  max-height: 60vh;
  min-width: 80%;
}

/*Toolbar*/
.ck-editor__top {
  min-width: 80%;
}

.modal-dialog {
  max-width: 80%;
  min-width: 80%;
}

table img.preview-media,
table video.preview-media {
  width: 50px;
  height: 50px;
  object-fit: fill;
  display: block;
}

.modal-content {
  height: 100%;
  padding: 50px;
}
</style>