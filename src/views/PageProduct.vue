<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Trang</a></li>
        <li class="breadcrumb-item active">Sản phẩm</li>
      </ul>
      <h1 class="page-header mb-0">Sản phẩm</h1>
    </div>

    <div class="ms-auto">
      <a href="#" class="btn btn-primary"><i class="fa fa-plus-circle fa-fw me-1"></i> Add Product</a>
    </div>
  </div>

  <card>
    <div class="tab-content p-4">
      <div class="tab-pane fade show active" id="allTab">
        <!-- BEGIN input-group -->
        <div class="input-group mb-4">
          <button class="btn btn-default dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            Filter products &nbsp;
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
          <div class="flex-fill position-relative">
            <div class="input-group">
              <div class="input-group-text position-absolute top-0 bottom-0 bg-none border-0" style="z-index: 1020">
                <i class="fa fa-search opacity-5"></i>
              </div>
              <input type="text" class="form-control ps-35px" placeholder="Search products" />
            </div>
          </div>
        </div>
        <!-- END input-group -->

        <!-- BEGIN table -->
        <div class="table-responsive">
          <table class="table table-hover text-nowrap">
            <thead>
              <tr>
                <th class="pt-0 pb-2"></th>
                <th class="pt-0 pb-2">Ảnh chính</th>
                <th class="pt-0 pb-2">Ảnh chi tiết</th>
                <th class="pt-0 pb-2">Tên</th>
                <th class="pt-0 pb-2">Mô tả</th>
                <th class="pt-0 pb-2">Thông tin thêm</th>
                <th class="pt-0 pb-2">Giá mặc định</th>
                <th class="pt-0 pb-2">Giá bán</th>
                <th class="pt-0 pb-2">Mã SKU</th>
                <th class="pt-0 pb-2">Slug</th>
                <th class="pt-0 pb-2">SaleCount</th>
                <th class="pt-0 pb-2">Danh mục</th>
                <th class="pt-0 pb-2">Thuộc tính</th>
                <th class="pt-0 pb-2">Filters</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in listProducts" :key="index">
                <td class="w-10px align-middle">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="product1" />
                    <label class="form-check-label" for="product1"></label>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="w-60px h-60px bg-gray-100 d-flex align-items-center justify-content-center">
                      <img alt="" class="mw-100 mh-100" src="/assets/img/product/product-6.jpg" />
                    </div>
                  </div>
                </td>
                <td class="align-middle">83 in stock for 3 variants</td>
                <td class="align-middle">
                  <input @input="checkRowEdit(index)" type="text" name="discountName" id="discountName"
                    v-model="product.name">
                </td>
                <td class="align-middle">
                  <textarea @input="checkRowEdit(index)" type="text" name="discountName" id="discountName"
                    v-model="product.description"></textarea>
                </td>
                <td class="align-middle">
                  <input @input="checkRowEdit(index)" type="text" name="discountName" id="discountName"
                    v-model="product.addinfo">
                </td>
                <td class="align-middle">
                  <input @input="checkRowEdit(index)" type="text" name="discountName" id="discountName"
                    v-model="product.default_price">
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
import { ProductService } from '../services/product.service'
export default {
  methods: {
    viewProductDetail: function (id) {
      alert('asdas')
      this.$router.push(`/product/${id}`);
    },
  },
  data() {
    return {
      listProducts: []
    }
  },
  async mounted() {
    this.listProducts = await ProductService().getAll()
  }
};
</script>