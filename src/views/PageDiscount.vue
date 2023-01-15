<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Trang</a></li>
        <li class="breadcrumb-item active">Chương trình khuyến mãi</li>
      </ul>
      <h1 class="page-header mb-0">Chương trình khuyến mãi</h1>
    </div>

    <div class="ms-auto">
      <a href="/discount/create" class="btn btn-primary"
        ><i class="fa fa-plus-circle fa-fw me-1"></i> Tạo chương trình mới</a
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
                <th class="border-top-0 pt-0 pb-2">Tên</th>
                <th class="border-top-0 pt-0 pb-2">Bắt đầu</th>
                <th class="border-top-0 pt-0 pb-2">Kết thúc</th>
                <th class="border-top-0 pt-0 pb-2">Giảm giá mặc định</th>
                <th class="border-top-0 pt-0 pb-2">Loại giảm giá</th>
                <th class="border-top-0 pt-0 pb-2">Mã giảm giá</th>
                <th class="border-top-0 pt-0 pb-2">Danh sách sản phẩm</th>
                <th class="border-top-0 pt-0 pb-2">#</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(discount, index) in listDiscount"
                :class="getClassEditted(index)"
                :key="index"
              >
                <td class="align-middle">
                  <input
                    @input="checkRowEdit(index)"
                    type="text"
                    name="discountName"
                    id="discountName"
                    v-model="discount.name"
                  />
                </td>
                <td class="align-middle">
                  <datepicker
                    v-model="discount.start_time"
                    class="dateSelectDiscount"
                    :clearable="false"
                    hideInputIcon
                  />
                </td>
                <td class="align-middle">
                  <datepicker
                    v-model="discount.end_time"
                    class="dateSelectDiscount"
                    :clearable="false"
                    hideInputIcon
                  />
                </td>
                <td class="align-middle">
                  <input
                    @input="checkRowEdit(index)"
                    type="text"
                    name="default_discount"
                    id="default_discount"
                    v-model="discount.default_value"
                    style="text-align: right"
                  />
                  %
                </td>
                <td class="align-middle">
                  <select
                    class="form-select"
                    id="select-discount-type"
                    v-model="discount.type"
                  >
                    <option :value="DiscountType.DISCOUNT">
                      {{ DiscountType.DISCOUNT }}
                    </option>
                    <option :value="DiscountType.VOUCHER">
                      {{ DiscountType.VOUCHER }}
                    </option>
                  </select>
                </td>
                <td class="align-middle">
                  <input
                    v-if="discount.type === DiscountType.VOUCHER"
                    v-model="discount.voucher_code"
                    type="text"
                    class="form-control"
                    id="voucher_code"
                    placeholder="your location"
                    name="voucher_code"
                  />
                </td>
                <td class="py-1 align-middle">
                  <button
                    type="button"
                    class="btn btn-default me-2"
                    data-bs-toggle="modal"
                    :data-bs-target="'#modalListProductsOfDiscount' + index"
                  >
                    Xem
                  </button>

                  <search-product-modal
                    :index="index"
                    :listUpdatedSelectedProduct="discount.listproduct"
                  ></search-product-modal>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary pr-2"
                    @click="saveDiscount(index)"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger me-2"
                    data-bs-toggle="modal"
                    :data-bs-target="'#modalDeleteDiscount' + index"
                  >
                    Delete
                  </button>
                  <div class="modal fade" :id="'modalDeleteDiscount' + index">
                    <div class="modal-dialog modal-sm">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Xác nhận xóa User</h5>
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
                              <td>: {{ discount.id }}</td>
                            </tr>
                            <tr>
                              <td><b>Tên</b></td>
                              <td>: {{ discount.name }}</td>
                            </tr>
                            <tr>
                              <td><b>Ngày bắt đầu</b></td>
                              <td>: {{ discount.start_time }}</td>
                            </tr>
                            <tr>
                              <td><b>Ngày kết thúc</b></td>
                              <td>: {{ discount.end_time }}</td>
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
                            @click="deleteDiscount(discount, index)"
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
import { DiscountService } from "../services/discount.service";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import SearchProductModal from "../components/product/SearchProductModal.vue";
import { DiscountType } from "../enums/Discount.enum";
import { toastSuccess, toastError } from "../mixin/mixin";
import ToastMessage from "../components/toast/ToastMessage.vue";

export default {
  components: {
    Datepicker,
    SearchProductModal,
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
      DiscountType,
      listDiscount: [],
      listEditted: [],
      success_message: "",
      error_message: "",
    };
  },
  async mounted() {
    const response = await DiscountService().getAll();
    this.listDiscount = response.data;
    this.listEditted = Array(this.listDiscount.length).fill(false);

    const listProductDiscount = this.listDiscount.map(
      (discount) => discount.listproduct
    );
    this.$store.commit("setListproduct", listProductDiscount);
  },
  methods: {
    async saveDiscount(index) {
      try {
        event.preventDefault();
        const discount = this.listDiscount[index];

        const productDiscount = this.$store.state.listProduct?.[index];
        if (discount.type !== DiscountType.VOUCHER)
          delete discount.voucher_code;

        discount.listproduct = productDiscount;
        await DiscountService().editOne(discount);
        this.toastSuccess("Cập nhật chương trình giảm giá thành công");
      } catch (e) {
        this.toastError(e);
      }
    },
    async deleteDiscount(discount) {
      try {
        await DiscountService().deleteOne(discount.id);
        this.toastSuccess("Xoá giảm giá thành công");
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
#default_discount {
  max-width: 30px;
}

input {
  border: none;
}
</style>