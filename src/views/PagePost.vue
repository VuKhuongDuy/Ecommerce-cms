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
        <div class="input-group mb-4">
          <div class="flex-fill position-relative">
            <div class="input-group">
              <input
                type="text"
                class="form-control ps-35px"
                placeholder="Filter orders"
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
          <button
            class="btn btn-default dropdown-toggle rounded-0"
            type="button"
            data-bs-toggle="dropdown"
          >
            <span class="d-none d-md-inline">Payment Status</span
            ><span class="d-inline d-md-none"
              ><i class="fa fa-credit-card"></i
            ></span>
            &nbsp;
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
          <button
            class="btn btn-default dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            <span class="d-none d-md-inline">Fulfillment status</span
            ><span class="d-inline d-md-none"><i class="fa fa-check"></i></span>
          </button>
          <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </div>
        <!-- END input-group -->

        <!-- BEGIN table -->
        <div class="table-responsive">
          <table class="table table-hover text-nowrap">
            <thead>
              <tr>
                <th class="border-top-0 pt-0 pb-2">Tiêu đề</th>
                <th class="border-top-0 pt-0 pb-2">Mô tả</th>
                <th class="border-top-0 pt-0 pb-2">Slug</th>
                <th class="border-top-0 pt-0 pb-2">Ảnh đại diện</th>
                <th class="border-top-0 pt-0 pb-2">Nội dung</th>
                <th class="border-top-0 pt-0 pb-2">#</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(Post, index) in listPost"
                :class="getClassEditted(index)"
                :key="index"
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
                  <input
                    @input="checkRowEdit(index)"
                    type="text"
                    name="post-slug"
                    id="post-slug"
                    v-model="Post.slug"
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
                    Xem
                  </button>

                  <div
                    class="modal modal-cover fade"
                    :id="'modalCoverExample' + index"
                  >
                    <div class="modal-dialog" style="width: 100%">
                      <div class="modal-content">
                        <ckeditor
                          :editor="editor"
                          v-model="Post.content"
                          :config="configEdit"
                        ></ckeditor>
                        <button
                          type="button"
                          data-bs-dismiss="modal"
                          class="btn btn-primary pr-2"
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
                    class="btn btn-primary pr-2"
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

        <div class="d-md-flex align-items-center">
          <div class="me-md-auto text-md-left text-center mb-2 mb-md-0">
            Showing 1 to 10 of 57 entries
          </div>
          <ul class="pagination mb-0 justify-content-center">
            <li class="page-item disabled">
              <a class="page-link">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">4</a></li>
            <li class="page-item"><a class="page-link" href="#">5</a></li>
            <li class="page-item"><a class="page-link" href="#">6</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
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
    };
  },
  async mounted() {
    this.listPost = await PostService().getAll();
    this.listEditted = Array(this.listPost.length).fill(false);

    //get image
    const listUploadFiles = [];
    await Promise.all(
      this.listPost.map(async (post, index) => {
        //images detail
        if (post.image) {
          listUploadFiles[index] = [post.image];
          this.listImages[index] = [
            {
              data: await ImageService.getBlobSrc(post.image),
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
    async savePost(index) {
      try {
        const post = lodash.cloneDeep(this.listPost[index]);

        delete post.slug;

        const file = this.$store.state.uploadThumbnail?.[index]?.[0];
        let presignFormData;
        if (file instanceof File) {
          const response = await ImageService.getPresignUrlImageProduct(
            file.name
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
  min-height: 80vh;
  max-height: 80vh;
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