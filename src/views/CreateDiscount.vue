<template>
  <div class="row form-create">
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="username">Tên chương trình</label>
        <input
          v-model="createDiscount.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Tên chương trình"
        />
      </div>
    </div>
    <div class="col-xl-6"></div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="birthday">Ngày bắt đầu</label>
        <datepicker
          id="birthday"
          v-model="createDiscount.start_time"
          class="dateSelect"
          :clearable="false"
          hideInputIcon
        />
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="birthday">Ngày kết thúc</label>
        <datepicker
          id="birthday"
          v-model="createDiscount.end_time"
          class="dateSelect"
          :clearable="false"
          hideInputIcon
        />
      </div>
    </div>

    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="address">Giảm giá mặc định</label>
        <input
          v-model="createDiscount.default_percent_discount"
          type="text"
          class="form-control"
          id="default_percent_discount"
          placeholder="your location"
        />
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="gender">Danh sách sản phẩm</label>
        <select v-model="createDiscount.sex" class="form-control">
          <option :value="GenderUser.MALE">{{ GenderUserString.MALE }}</option>
          <option :value="GenderUser.FEMALE">
            {{ GenderUserString.FEMALE }}
          </option>
          <option :value="GenderUser.OTHER">
            {{ GenderUserString.OTHER }}
          </option>
        </select>
      </div>
    </div>
    <div class="col-xl-12">
      <div class="form-group mb-3">
        <label class="form-label" for="phone">Sản phẩm áp dụng</label>
        <br />
        <button
          type="button"
          class="btn btn-default me-2"
          data-bs-toggle="modal"
          data-bs-target="#modalListProductsOfDiscount0"
        >
          Chọn sản phẩm
        </button>

        <search-product-modal :index="0"></search-product-modal>
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
      <div class="toast-body">Tạo chương trình giảm giá thành công</div>
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
    @click="(event) => saveDiscount(event, createDiscount)"
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

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { DiscountService } from "../services/discount.service";
import { Toast } from "bootstrap";
import SearchProductModal from "../components/product/SearchProductModal.vue";

export default {
  components: {
    Datepicker,
    SearchProductModal,
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
      RoleUser: RoleUser,
      RoleUserString: RoleUserString,
      GenderUser: GenderUser,
      GenderUserString: GenderUserString,
      createDiscount: {},
      error_message: "",
    };
  },
  methods: {
    async saveDiscount(event, createDiscount) {
      event.preventDefault();
      const discountService = DiscountService();
      try {
        discountService.createOne(createDiscount);
        const toast = new Toast(
          document.getElementById("toast-create-success")
        );
        toast.show();
        await this.delayTime();
        this.$router.push("/discount");
      } catch (e) {
        this.error_message = e;
        const toast = new Toast(document.getElementById("toast-create-error"));
        toast.show();
      }
    },
  },
};
</script>
<style scoped>
.form-create {
  max-width: 50%;
}
</style>