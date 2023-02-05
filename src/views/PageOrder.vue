<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Trang</a></li>
        <li class="breadcrumb-item active">Đơn hàng</li>
      </ul>
      <h1 class="page-header mb-0">Đơn hàng</h1>
    </div>

    <div class="ms-auto">
      <a href="#" class="btn btn-primary"
        ><i class="fa fa-plus-circle fa-fw me-1"></i> Create Orders</a
      >
    </div>
  </div>

  <div class="mb-md-4 mb-3 d-md-flex">
    <div class="mt-md-0 mt-2">
      <a href="#" class="text-dark text-decoration-none"
        ><i class="fa fa-download fa-fw me-1 text-muted"></i> Export</a
      >
    </div>
    <div class="ms-md-4 mt-md-0 mt-2 dropdown-toggle">
      <a
        href="#"
        data-bs-toggle="dropdown"
        class="text-dark text-decoration-none"
        >More Actions</a
      >
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
        <div role="separator" class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Separated link</a>
      </div>
    </div>
  </div>

  <card>
    <ul class="nav nav-tabs nav-tabs-v2 px-4">
      <li class="nav-item me-3">
        <a href="#allTab" class="nav-link active px-2" data-bs-toggle="tab"
          >All</a
        >
      </li>
      <li class="nav-item me-3">
        <a href="#publishedTab" class="nav-link px-2" data-bs-toggle="tab"
          >Unfulfilled</a
        >
      </li>
      <li class="nav-item me-3">
        <a href="#expiredTab" class="nav-link px-2" data-bs-toggle="tab"
          >Unpaid</a
        >
      </li>
      <li class="nav-item me-3">
        <a href="#deletedTab" class="nav-link px-2" data-bs-toggle="tab"
          >Open</a
        >
      </li>
      <li class="nav-item me-3">
        <a href="#deletedTab" class="nav-link px-2" data-bs-toggle="tab"
          >Closed</a
        >
      </li>
      <li class="nav-item me-3">
        <a href="#deletedTab" class="nav-link px-2" data-bs-toggle="tab"
          >Local delivery</a
        >
      </li>
    </ul>
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
                <th class="border-top-0 pt-0 pb-2">#</th>
                <th class="border-top-0 pt-0 pb-2">Người mua</th>
                <th class="border-top-0 pt-0 pb-2">Giá trị sản phẩm</th>
                <th class="border-top-0 pt-0 pb-2">Trạng thái</th>
                <th class="border-top-0 pt-0 pb-2">Mã giảm giả</th>
                <th class="border-top-0 pt-0 pb-2">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in listOrder" :key="index">
                <td class="w-10px align-middle">
                  {{ order.id }}
                </td>
                <td class="w-10px align-middle">
                  {{ order.user_order_id.username }}
                </td>
                <td>
                  <div
                    v-for="(product, index2) in order.list_prodcuct"
                    :key="index2"
                  >
                    <p>
                      {{ product.product.name }} -
                      {{ product.discountEvent.name }} -
                      {{ product.property.name }}
                    </p>
                  </div>
                </td>
                <td class="w-10px align-middle">
                  {{ order.state }}
                </td>
                <td class="w-10px align-middle">
                  {{ order.voucher.name }}
                </td>
                <td class="w-10px align-middle">
                  {{ formatFullDatetime(order.create_at) }}
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
import { OrderService } from "../services/order.service";
import { formatFullDatetime } from "../mixin/mixin";
export default {
  mixins: [
    {
      methods: {
        formatFullDatetime,
      },
    },
  ],
  data() {
    return {
      listOrder: [],
    };
  },
  async mounted() {
    this.listOrder = await OrderService().getAll();
  },
};
</script>

