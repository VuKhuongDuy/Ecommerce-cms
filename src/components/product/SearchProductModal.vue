<template>
  <div class="modal fade" :id="'modalListProductsOfDiscount' + index">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Danh sách sản phẩm</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-xl-4">
              <div class="input-group mb-4 search_product">
                <div class="flex-fill position-relative">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control ps-35px"
                      placeholder="Tìm kiếm sản phẩm"
                      @keyup="(event) => findProduct(event)"
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

                <div class="preview_product">
                  <ul>
                    <li
                      v-for="(product, index) in listSearchProduct"
                      :key="product.id"
                    >
                      <div
                        class="list-group"
                        @click="switchSelectProduct(product, index)"
                      >
                        <div class="list-group-item d-flex align-items-center">
                          <div class="flex-fill">
                            <div class="fw-600">{{ product.name }}</div>
                            <div class="fs-12px text-muted">
                              <span>
                                {{ product.description }} <br />
                                {{ product.sku }}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div class="form-check me-n1">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                :checked="product?.selected == true"
                                @onchange="switchSelectProduct(product, index)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <!-- <li v-if="listSearchProduct.length">
                      <div class="list-group" @click="switchSelectAllProduct()">
                        <div class="list-group-item d-flex align-items-center">
                          <div class="flex-fill">
                            <div class="fw-600">
                              {{ selectAll ? "Chọn tất cả" : "Bỏ chọn tất cả" }}
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </li> -->
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-xl-8 selected_product">
              <div
                class="list-group mb-3"
                v-for="(product, index) in listSelectedProduct"
                :key="index"
              >
                <div class="list-group-item d-flex align-items-center">
                  <div
                    class="
                      w-40px
                      h-40px
                      d-flex
                      align-items-center
                      justify-content-center
                      bg-gradient-cyan-blue
                      text-white
                      rounded-2
                      ms-n1
                    "
                  >
                    <i class="fab fa-apple fa-lg"></i>
                  </div>
                  <div class="flex-fill ps-3 pe-3">
                    <div class="fw-600">{{ product?.name }}</div>
                    <div class="fs-12px text-muted">
                      <span>
                        {{ product?.description }} <br />
                        {{ product?.sku }}
                      </span>
                    </div>
                  </div>
                  <div class="flex-fill ps-3 pe-3">
                    <div class="fw-600">Giá khuyễn mãi</div>
                    <input />
                  </div>
                  <div class="flex-fill ps-3 pe-3">
                    <div class="fw-600">Phần trăm khuyễn mãi</div>
                    <input />
                  </div>
                  <div class="dropdown">
                    <a href="#" data-bs-toggle="dropdown" class="text-muted"
                      ><i class="fa fa-ellipsis-h"></i
                    ></a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a
                        @click="deleteProduct(product.id)"
                        class="dropdown-item"
                        >Delete</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductService } from "../../services/product.service";

const productService = ProductService();
export default {
  props: {
    listSeletedProduct: [],
    index: Number,
  },
  data() {
    return {
      listSearchProduct: [],
      listSelectedProduct: [],
      selectAll: true,
    };
  },
  mounted() {
    if (this.listSelectedProduct?.length) {
      console.log(this.listSelectedProduct);
      this.$store.commit("setListproduct", []);
    }
  },
  methods: {
    async findProduct(event) {
      const text = event.target.value;
      const response = await productService.findProduct(text);
      const totalPage = Math.round(response.total / 10);
      this.listSearchProduct = response.data;

      const listSelectedProduct = this.$store.state.listProduct;
      this.listSearchProduct.map((product) => {
        if (
          listSelectedProduct.find(
            (selectedProduct) => selectedProduct.id === product.id
          )
        ) {
          product.selected = true;
        }
      });
    },

    switchSelectProduct(product, index, select = undefined) {
      const findSelect = this.listSelectedProduct.find(
        (p) => p.id === product.id
      );
      if (findSelect || select === false) {
        this.listSelectedProduct = this.listSelectedProduct.filter(
          (p) => p.id === product.id
        );
      } else if (!findSelect || select === true) {
        this.listSearchProduct[index].selected =
          !this.listSearchProduct[index].selected;
        this.listSelectedProduct.push(product);
      }
    },

    deleteProduct(id) {
      this.pr;
    },

    switchSelectAllProduct() {
      console.log(JSON.stringify(this.listSearchProduct));
      this.listSearchProduct.map((product, index) => {
        this.switchSelectProduct(product, index);
      });
    },
  },
};
</script>

<style scoped>
.search_product {
  position: relative;
}

.preview_product {
  cursor: pointer;
  z-index: 9;
  position: absolute;
  top: 35px;
  left: 0;
  width: 100%;
  height: 100%;
}

.preview_product ul {
  list-style: none;
  padding-left: 0px;
}

.preview_product .list-group-item:hover {
  background: antiquewhite;
}

.modal-dialog {
  max-width: 80%;
  align-items: start !important;
  height: 90vh;
}

.modal-content {
  height: 100%;
}

input {
  border: solid 0.3px grey;
}
</style>