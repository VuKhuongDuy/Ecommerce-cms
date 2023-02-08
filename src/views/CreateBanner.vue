<template>
  <div class="row form-create">
    <div class="col-xl-12">
      <div class="form-group mb-3">
        <label class="form-label" for="password">Ảnh đại diện</label>
        <input-multiple-file
          :isMultiple="false"
          :onlyImage="true"
          :index="0"
          :keyListFile="'previewThumbnail'"
          :keyUploadFile="'uploadThumbnail'"
          :mutationListFile="'setPreviewThumbnail'"
          :mutationUpload="'setUploadThumbnail'"
        ></input-multiple-file>
        <img :src="preview" class="img-fluid" />
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="name">Tên banner</label>
        <input
          v-model="createBanner.name"
          type="text"
          class="form-control"
          id="name"
          name="banner-name"
          placeholder="Tên banner"
        />
      </div>
    </div>

    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="redirect_url">Đường dẫn</label>
        <input
          v-model="createBanner.redirect_url"
          type="text"
          class="form-control"
          id="redirect_url"
          name="banner-redirect-url"
          placeholder="Đường dẫn"
        />
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="title">Tiêu đề 1</label>
        <input
          v-model="createBanner.title"
          type="text"
          class="form-control"
          name="banner-title"
          id="title"
          placeholder="Tiêu đề 1"
        />
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="title2">Tiêu đề 2</label>
        <input
          v-model="createBanner.title2"
          type="text"
          class="form-control"
          name="banner-title2"
          id="title2"
          placeholder="Tiêu đề 2"
        />
      </div>
    </div>

    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="type">Loại banner</label>
        <select class="form-select" id="type" v-model="createBanner.type">
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
      <div class="toast-body">Tạo banner thành công</div>
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
    @click="(event) => saveBanner(event, createBanner)"
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
} from "../mixin/mixin";
import {
  RoleUserString,
  RoleUser,
  GenderUser,
  GenderUserString,
} from "../enums/user.enum";

import { BannerService } from "../services/banner.service";
import { Toast } from "bootstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputMultipleFile from "../components/form/InputMultipleFile.vue";
import { ImageService } from "../services/image.service";
import { BannerType } from "../enums/banner.enum";

export default {
  components: {
    InputMultipleFile,
  },
  mixins: [
    {
      methods: {
        getRoleString,
        getGenderString,
        getBirthdayFormat,
        delayTime,
      },
    },
  ],
  data() {
    return {
      editor: ClassicEditor,
      RoleUser: RoleUser,
      RoleUserString: RoleUserString,
      GenderUser: GenderUser,
      GenderUserString: GenderUserString,
      createBanner: {},
      error_message: "",
      preview: null,
      image: null,
      preview_list: [],
      image_list: [],
      BannerType: BannerType,
    };
  },
  mounted() {
    this.$store.commit("setPreviewThumbnail", [[]]);
    this.$store.commit("setUploadThumbnail", [[]]);
  },
  methods: {
    async saveBanner(event, user) {
      event.preventDefault();

      try {
        const file = this.$store.state.uploadThumbnail?.[0]?.[0];
        let presignFormData;
        if (file) {
          const response = await ImageService.getPresignUrlImageProduct(
            file.name,
            file.type
          );
          presignFormData = JSON.parse(response.data.data).formData;
          this.createBanner.image = presignFormData.key;
        }

        await BannerService().createOne(this.createBanner);
        if (presignFormData) {
          ImageService.uploadMultiplePresign([file], [presignFormData]);
        }

        const toast = new Toast(
          document.getElementById("toast-create-success")
        );
        toast.show();
        await this.delayTime();
        this.$router.push("/banner");
      } catch (e) {
        this.error_message = e;
        const toast = new Toast(document.getElementById("toast-create-error"));
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
          };
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
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
};
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