<template>
  <div class="modal fade" :id="'modalListProductsOfDiscount' + index">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Giá trị sản phẩm</h3>
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

                <div class="preview_product" v-if="showSearchResult">
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
                              <p class="product_detail">
                                {{ product.description }} <br />
                                {{ product.sku }}
                              </p>
                            </div>
                          </div>
                          <div>
                            <div class="form-check me-n1">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                :checked="
                                  listSelectedProduct.find(
                                    (select) => select.id === product.id
                                  )
                                "
                                @onchange="switchSelectProduct(product, index)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li v-if="listSearchProduct.length">
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
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-xl-8 selected_product" @click="closeSearchResult">
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
                  <div class="flex-fill ps-3 pe-3 col-xl-3">
                    <div class="fw-600">{{ product?.name }}</div>
                    <div class="fs-12px text-muted">
                      <p class="product_detail">
                        {{ product?.description }}
                        {{ product?.sku }}
                      </p>
                    </div>
                  </div>
                  <div class="col-xl-3">
                    <div class="fw-600">Loại hình khuyễn mãi</div>
                    <select
                      v-model="product.product_discount_type"
                      class="form-select"
                      value="amount"
                    >
                      <option value="amount" selected="selected">
                        Giá cố định
                      </option>
                      <option value="percent">Phần trăm</option>
                    </select>
                  </div>
                  <div
                    class="col-xl-3 ps-3 pe-3"
                    v-if="product.product_discount_type === 'amount'"
                  >
                    <div class="fw-600">Giá khuyễn mãi</div>
                    <input
                      type="number"
                      name="product_price"
                      v-model="product.price"
                      class="form-control"
                    />
                  </div>
                  <div class="col-xl-3 ps-3 pe-3" v-else>
                    <div class="fw-600">Phần trăm khuyễn mãi</div>
                    <input
                      type="number"
                      name="product_percent"
                      v-model="product.percent"
                      class="form-control"
                    />
                  </div>
                  <div class="dropdown">
                    <a href="#" data-bs-toggle="dropdown" class="text-muted"
                      ><i class="fa fa-ellipsis-h"></i
                    ></a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a @click="deleteProduct(index)" class="dropdown-item"
                        >Delete</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- -->

        <button
          type="button"
          class="btn btn-primary mx-2 mb-3"
          @click="(event) => saveProductDiscount(event)"
          data-bs-dismiss="modal"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductService } from "../../services/product.service";
import { closeSearchResult } from "../../mixin/mixin";
const PERPAGE = import.meta.env.VITE_PERPAGE;

const productService = ProductService();
export default {
  props: {
    listUpdatedSelectedProduct: Array,
    index: Number,
  },
  mixins: [
    {
      methods: {
        closeSearchResult,
      },
    },
  ],
  data() {
    return {
      listSearchProduct: [],
      listSelectedProduct: [],
      selectAll: true,
    };
  },
  mounted() {
    if (this.listUpdatedSelectedProduct) {
      this.listSelectedProduct = this.listUpdatedSelectedProduct.map((p) => {
        if (!p) {
          return p;
        }
        if (p.price != undefined) {
          p.product_discount_type = "amount";
        }
        if (p.percent != undefined) {
          p.product_discount_type = "percent";
        }
        return p;
      });
    }
    // if (this.listSelectedProduct?.length) {
    //   this.$store.commit("setListproduct", []);
    // }
  },
  computed: {
    showSearchResult: {
      get() {
        return this.$store.state.showSearchResult;
      },
    },
  },
  methods: {
    async findProduct(event) {
      this.$store.commit("setShowSearchResult", true);

      const text = event.target.value;
      const response = await productService.findProduct({
        q: text,
        limit: PERPAGE,
        offset: 1,
      });
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
        console.log("find");
        this.listSelectedProduct = this.listSelectedProduct.filter(
          (p) => p.id !== product.id
        );
      } else if (!findSelect || select === true) {
        console.log("not find");
        this.listSearchProduct[index].selected =
          !this.listSearchProduct[index].selected;
        this.listSelectedProduct.push({
          ...product,
          product_discount_type: "amount",
          price: 0,
          percent: 0,
        });
      }
    },

    deleteProduct(index) {
      this.listSelectedProduct.splice(index, 1);
    },

    switchSelectAllProduct() {
      this.listSelectedProduct = this.listSelectedProduct.filter(
        (p) => !this.listSearchProduct.find((search) => search.id == p.id)
      );
      this.listSearchProduct.map((product, index) => {
        this.switchSelectProduct(product, index);
      });
    },
    saveProductDiscount() {
      const selectedProductDiscount = this.listSelectedProduct.map(
        (product) => {
          const discount = {
            id: product.id,
          };
          if (product.product_discount_type === "amount") {
            discount.price = product.price;
          } else {
            discount.percent = product.percent;
          }
          return discount;
        }
      );
      const listProductState = this.$store.state.listProduct;
      console.log(listProductState);
      listProductState[this.index] = selectedProductDiscount;
      this.$store.commit("setListproduct", this.$store.state.listProduct);
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

.modal-body .row > div,
.modal-body .row {
  height: 100%;
}

.modal-body {
  overflow: auto;
}

.product_detail {
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 15px;
  display: inline-block;
  max-width: 100%;
}

.preview_product .flex-fill {
  max-width: 90%;
}
</style>