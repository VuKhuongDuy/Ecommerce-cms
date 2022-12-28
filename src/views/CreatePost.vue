<template>
  <div class="row form-create">
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="title">Tiêu đề</label>
        <input v-model="createPost.title" type="text" class="form-control" id="title" placeholder="Tiêu đề">
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="description">Mô tả</label>
        <input v-model="createPost.description" type="text" class="form-control" id="description" placeholder="Mô tả">
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="Slug">Slug</label>
        <input v-model="createPost.slug" type="text" class="form-control" id="Slug" placeholder="Slug">
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="password">Ảnh đại diện</label>
        <input type="file" accept="image/*" multiple="multiple" @change="previewImage" class="form-control-file"
          id="my-file">
        <img :src="preview" class="img-fluid" />

      </div>
    </div>
    <div class="">
      <div class="form-group mb-3">
        <label class="form-label" for="birthday">Nội dung</label>
        <ckeditor :editor="editor" v-model="createPost.post_content" :config="configEdit"></ckeditor>
      </div>
    </div>
  </div>

  <div class="toasts-container">
    <div class="toast fade hide mb-3" data-autohide="false" id="toast-create-success">
      <div class="toast-header">
        <i class="far fa-bell text-muted me-2"></i>
        <strong class="me-auto">Thông báo</strong>
        <small>Vừa xong</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        Tạo bài viết thành công
      </div>
    </div>
    <div class="toast fade hide mb-3" data-autohide="false" id="toast-create-error">
      <div class="toast-header">
        <i class="far fa-bell text-muted me-2"></i>
        <strong class="me-auto">Thông báo</strong>
        <small>Vừa xong</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        {{ error_message }}
      </div>
    </div>
  </div>

  <button type="button" class="btn btn-primary pr-2" @click="(event) => savePost(event, createPost)">Save</button>
  <!-- toasts-container -->
</template>
<script>
import {
  getRoleString,
  getGenderString,
  getBirthdayFormat,
  delayTime
} from '../mixin/mixin'
import { RoleUserString, RoleUser, GenderUser, GenderUserString } from "../enums/user.enum";

import { PostService } from "../services/post.service";
import { Toast } from 'bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {

  mixins: [{
    methods: {
      getRoleString,
      getGenderString,
      getBirthdayFormat,
      delayTime,
    }
  }],
  data() {
    return {
      editor: ClassicEditor,
      RoleUser: RoleUser,
      RoleUserString: RoleUserString,
      GenderUser: GenderUser,
      GenderUserString: GenderUserString,
      createPost: {},
      error_message: "",
      preview: null,
      image: null,
      preview_list: [],
      image_list: []
    }
  },
  methods: {
    async savePost(event, user) {
      event.preventDefault();
      try {
        const formData = new FormData()
        Object.keys(this.createPost).forEach(k => {
          formData.append(k, this.createPost[k])
        })
        formData.append('thumbnail', this.image)
        console.log(formData)
        await PostService().createOne(formData)
        const toast = new Toast(document.getElementById('toast-create-success'));
        toast.show();
        await this.delayTime();
        this.$router.push("/post");
      } catch (e) {
        this.error_message = e;
        const toast = new Toast(document.getElementById('toast-create-error'));
        toast.show();
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
  }
}
</script>
<style>
.form-create {
  max-width: 80%;
}

.ck-editor__editable {
  min-height: 40vh;
  max-height: 40vh;
}
</style>