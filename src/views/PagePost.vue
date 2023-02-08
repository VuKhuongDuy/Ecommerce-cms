<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Trang</a></li>
        <li class="breadcrumb-item active">Bài viết</li>
      </ul>
      <h1 class="page-header mb-0">Bài viết</h1>
    </div>

    <div class="ms-auto">
      <a href="/Post/create" class="btn btn-primary"
        ><i class="fa fa-plus-circle fa-fw me-1"></i> Tạo bài viết mới</a
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
                placeholder="Tìm bài viết"
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
                <th class="border-top-0 pt-0 pb-2">Tiêu đề</th>
                <th class="border-top-0 pt-0 pb-2">Mô tả</th>
                <th class="border-top-0 pt-0 pb-2">Ảnh đại diện</th>
                <th class="border-top-0 pt-0 pb-2">Nội dung</th>
                <th class="border-top-0 pt-0 pb-2">#</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(Post, index) in listPost"
                :class="getClassEditted(index)"
                :key="Post.id"
              >
                <td class="align-middle">
                  <input
                    @input="checkRowEdit(index)"
                    type="text"
                    name="post-title"
                    id="post-title"
                    v-model="Post.title"
                  />
                </td>
                <td class="align-middle">
                  <input
                    @input="checkRowEdit(index)"
                    type="text"
                    name="post-description"
                    id="post-description"
                    v-model="Post.description"
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
                    Sủa
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
                  <button
                    type="button"
                    class="btn btn-default me-2"
                    data-bs-toggle="modal"
                    :data-bs-target="'#modalCoverExample' + index"
                  >
                    Xem / Sửa
                  </button>

                  <div class="modal fade" :id="'modalCoverExample' + index">
                    <div class="modal-dialog modal-xl" style="width: 100%">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Sửa nội dung</h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                          ></button>
                        </div>
                        <ckeditor
                          :editor="editor"
                          v-model="Post.content"
                          :config="configEdit"
                        ></ckeditor>
                        <button
                          type="button"
                          data-bs-dismiss="modal"
                          class="btn btn-primary mx-2"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <button
                    type="button"
                    class="btn btn-primary mx-2"
                    @click="savePost(index)"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger me-2"
                    data-bs-toggle="modal"
                    :data-bs-target="'#modalDeletePost' + index"
                  >
                    Delete
                  </button>
                  <div class="modal fade" :id="'modalDeletePost' + index">
                    <div class="modal-dialog modal-sm">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Xác nhận xóa bai viet</h5>
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
                              <td>: {{ Post.title }}</td>
                            </tr>
                            <tr>
                              <td><b>Mô tả</b></td>
                              <td>: {{ Post.description }}</td>
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
                            @click="deletePost(Post.id)"
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
import { PostService } from "../services/post.service";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ImageService } from "../services/image.service";
import InputMultipleFile from "../components/form/InputMultipleFile.vue";
import ToastMessage from "../components/toast/ToastMessage.vue";
import { toastSuccess, toastError } from "../mixin/mixin";
import * as lodash from "lodash";
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
      editor: ClassicEditor,
      configEdit: {
        width: "1000px",
        height: "80%",
      },
      listPost: [],
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
      this.listPost.map(async (post, index) => {
        //images detail
        if (post.image) {
          listUploadFiles[index] = [post.image];
          this.listImages[index] = [
            {
              data: await ImageService.getMediaSrc(post.image),
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
      const response = await PostService().findPost(this.searchQuery);
      this.listPost = response.data;
      console.log(response);
      this.totalData = response.total;
      this.$router.push({
        path: "post",
        query: this.searchQuery,
      });
    },
    goToPage(page) {
      this.page = page;
      this.search(false);
    },
    async savePost(index) {
      try {
        const post = lodash.cloneDeep(this.listPost[index]);

        delete post.slug;

        const file = this.$store.state.uploadThumbnail?.[index]?.[0];
        let presignFormData;
        if (file instanceof File) {
          const response = await ImageService.getPresignUrlImageProduct(
            file.name,
            file.type
          );
          presignFormData = JSON.parse(response.data.data).formData;
          post.image = presignFormData.key;
        }
        await PostService().editOne(post);
        if (presignFormData) {
          ImageService.uploadMultiplePresign([file], [presignFormData]);
        }
        this.toastSuccess("Cập nhật bài viết thành công");
      } catch (e) {
        this.toastError(e);
      }
    },
    async deletePost(id) {
      try {
        this.toastSuccess("Xoa bài viết thành công");
        await PostService().deleteOne(id);
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
#default_Post {
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