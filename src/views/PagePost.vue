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
      <a href="/Post/create" class="btn btn-primary"><i class="fa fa-plus-circle fa-fw me-1"></i> Tạo bài viết
        mới</a>
    </div>
  </div>

  <card>
    <div class="tab-content p-4">
      <div class="tab-pane fade show active" id="allTab">
        <!-- BEGIN input-group -->
        <div class="input-group mb-4">
          <div class="flex-fill position-relative">
            <div class="input-group">
              <input type="text" class="form-control ps-35px" placeholder="Filter orders" />
              <div class="input-group-text position-absolute top-0 bottom-0 bg-none border-0" style="z-index: 1020">
                <i class="fa fa-search opacity-5"></i>
              </div>
            </div>
          </div>
          <button class="btn btn-default dropdown-toggle rounded-0" type="button" data-bs-toggle="dropdown">
            <span class="d-none d-md-inline">Payment Status</span><span class="d-inline d-md-none"><i
                class="fa fa-credit-card"></i></span>
            &nbsp;
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
          <button class="btn btn-default dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <span class="d-none d-md-inline">Fulfillment status</span><span class="d-inline d-md-none"><i
                class="fa fa-check"></i></span>
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
                <th class="border-top-0 pt-0 pb-2">ID</th>
                <th class="border-top-0 pt-0 pb-2">Tiêu đề</th>
                <th class="border-top-0 pt-0 pb-2">Mô tả</th>
                <th class="border-top-0 pt-0 pb-2">Slug</th>
                <th class="border-top-0 pt-0 pb-2">Ảnh đại diện</th>
                <th class="border-top-0 pt-0 pb-2">Nội dung</th>
                <th class="border-top-0 pt-0 pb-2">#</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(Post, index) in listPost" :class="getClassEditted(index)">
                <td class=" w-10px align-middle">
                  <div class="form-check">
                    {{ Post.id }}
                  </div>
                </td>
                <td class="align-middle">
                  <input @input="checkRowEdit(index)" type="text" name="post-title" id="post-title"
                    v-model="Post.title">
                </td>
                <td class="align-middle">
                  <input @input="checkRowEdit(index)" type="text" name="post-description" id="post-description"
                    v-model="Post.description">
                </td>
                <td class="align-middle">
                  <input @input="checkRowEdit(index)" type="text" name="post-slug" id="post-slug" v-model="Post.slug">
                </td>

                <td class="align-middle">
                  <input type="file" accept="image/*" multiple="multiple" @change="previewMultiImage"
                    class="form-control-file" id="my-file">
                  <div class="border p-2 mt-3" style="  overflow-x: auto;">
                    <p>Preview Here:</p>
                    <template v-if="preview_list.length">
                      <div v-for="item, index in preview_list" :key="index" class="preview-image">
                        <img :src="item" class="img-fluid" />
                      </div>
                    </template>
                  </div>
                </td>

                <td class="align-middle">
                  <button type="button" class="btn btn-default me-2" data-bs-toggle="modal"
                    :data-bs-target="'#modalCoverExample' + index">Xem</button>

                  <div class="modal modal-cover fade" :id="'modalCoverExample' + index">
                    <div class="modal-dialog" style="width:100%">
                      <div class="modal-content">

                        <ckeditor :editor="editor" v-model="Post.post_content" :config="configEdit"></ckeditor>
                        <button type="button" data-bs-dismiss="modal" class="btn btn-primary pr-2">Save</button>

                      </div>
                    </div>
                  </div>
                </td>


                <td>
                  <button type="button" class="btn btn-primary pr-2" @click="savePost(Post)">Save</button>
                  <button type="button" class="btn btn-danger me-2" data-bs-toggle="modal"
                    :data-bs-target="('#modalDeletePost' + index)">Delete</button>
                  <div class="modal fade" :id="('modalDeletePost' + index)">
                    <div class="modal-dialog modal-sm">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Xác nhận xóa User</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                          <table style="border:none">
                            <tr>
                              <td><b>ID</b></td>
                              <td>: {{ Post.id }}</td>
                            </tr>
                            <tr>
                              <td><b>Tên</b></td>
                              <td>: {{ Post.name }}</td>
                            </tr>
                            <tr>
                              <td><b>Ngày bắt đầu</b></td>
                              <td>: {{ Post.start_time }}</td>
                            </tr>
                            <tr>
                              <td><b>Ngày kết thúc</b></td>
                              <td>: {{ Post.end_time }}</td>
                            </tr>
                          </table>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-bs-dismiss="modal">Hủy</button>
                          <button type="button" class="btn btn-primary" @click="event => deletePost(event, user)">Xác
                            nhận</button>
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
</template>
<script>
import { PostService } from '../services/post.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  data() {
    return {
      editor: ClassicEditor,
      configEdit: {
        width: '1000px',
        height: '80%'
      },
      listPost: [],
      listEditted: [],
      preview: null,
      image: null,
      preview_list: [],
      image_list: []
    }
  },
  async mounted() {
    this.listPost = await PostService().getAll()
    this.listEditted = Array(this.listPost.length).fill(false)
  },
  methods: {
    async savePost(Post) {
      await PostService().editOne(Post);
    },
    async deletePost(Post) {
      await PostService().deleteOne(Post);
    },
    checkRowEdit(index) {
      this.listEditted[index] = true
    },
    getClassEditted(index) {
      return this.listEditted[index] ? ['row-editted'] : [];
    },
    previewImage: function (event) {
      const input = event.target;
      if (input.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewMultiImage: function (event) {
      const input = event.target;
      let count = input.files.length;
      let index = 0;
      if (input.files) {
        while (count--) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.preview_list.push(e.target.result);
          }
          this.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    },
    reset: function () {
      this.image = null;
      this.preview = null;
      this.image_list = [];
      this.preview_list = [];
    }
  }
}
</script>
<style>
#default_Post {
  max-width: 30px;
}

input,
textarea {
  border: none;
}

.table-hover>tbody>tr.row-editted>* {
  background: #bcd3ff !important;
}

.table-hover>tbody>tr.row-editted input,
.table-hover>tbody>tr.row-editted textarea {
  background: #bcd3ff !important;
}

.table-hover>tbody>tr:hover input,
.table-hover>tbody>tr:hover textarea {
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
</style>