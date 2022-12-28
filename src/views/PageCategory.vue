<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Trang</a></li>
        <li class="breadcrumb-item active">Danh mục</li>
      </ul>
      <h1 class="page-header mb-0">Danh mục</h1>
    </div>

    <div class="ms-auto">
      <a href="/category/create" class="btn btn-primary"><i class="fa fa-plus-circle fa-fw me-1"></i> Tạo danh mục
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
                <th class="border-top-0 pt-0 pb-2">Tên</th>
                <th class="border-top-0 pt-0 pb-2">Thuộc tính</th>
                <th class="border-top-0 pt-0 pb-2">#</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(category, index) in listCategory" :class="getClassEditted(index)" :key="index">
                <td class=" w-10px align-middle">
                  <div class="form-check">
                    {{ category.id }}
                  </div>
                </td>
                <td class="align-middle">
                  <input @input="checkRowEdit(index)" type="text" name="categoryName" id="categoryName"
                    v-model="category.name">
                </td>

                <td class="py-1 align-middle">
                  <p>
                    <span v-for="(filter, findex) in category.filters" :key="findex">
                      {{ filter.name }} : {{ filter.values }} <br>
                    </span>
                  </p>
                  <button type="button" class="btn btn-default me-2" data-bs-toggle="modal"
                    :data-bs-target="'#modalCoverExample' + index">Xem</button>

                  <div class="modal modal-cover fade" :id="'modalCoverExample' + index">
                    <div class="modal-dialog">
                      <div class="modal-content">

                        <edit-category @saveProp="setParentFilters($event, index)"
                          :listProp="category.filters"></edit-category>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <button type="button" class="btn btn-primary pr-2" @click="savecategory(category)">Save</button>
                  <button type="button" class="btn btn-danger me-2" data-bs-toggle="modal"
                    :data-bs-target="('#modalDeletecategory' + index)">Delete</button>
                  <div class="modal fade" :id="('modalDeletecategory' + index)">
                    <div class="modal-dialog modal-sm">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Xác nhận xóa danh mục </h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                          <table style="border:none">
                            <tr>
                              <td><b>ID</b></td>
                              <td>: {{ category.id }}</td>
                            </tr>
                            <tr>
                              <td><b>Tên</b></td>
                              <td>: {{ category.name }}</td>
                            </tr>
                            <tr>
                              <td><b>Thuôc tính</b></td>
                              <td>
                                <p>
                                  <span v-for="(filter, findex) in category.filters" :key="findex">
                                    {{ filter.name }} : {{ filter.values }} <br>
                                  </span>
                                </p>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-bs-dismiss="modal">Hủy</button>
                          <button type="button" data-bs-dismiss="modal" class="btn btn-primary"
                            @click="event => deletecategory(category.id)">Xác
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
  <div class="toasts-container">
    <div class="toast fade hide mb-3" data-autohide="false" id="toast-update-success">
      <div class="toast-header">
        <i class="far fa-bell text-muted me-2"></i>
        <strong class="me-auto">Thông báo</strong>
        <small>Vừa xong</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        Cập nhật category thành công
      </div>
    </div>
    <div class="toast fade hide mb-3" data-autohide="false" id="toast-update-error">
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
  <div class="toast fade hide mb-3" data-autohide="false" id="toast-delete-error" style="z-index: 9999">
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




  '


</template>
<script>
import { CategoryService } from '../services/category.service';
import EditCategory from './EditCategory.vue';
import { Toast } from 'bootstrap';
import { delayTime } from '../mixin/mixin';

export default {
  mixins: [{
    methods: {
      delayTime,
    }
  }],
  components: {
    EditCategory
  },
  data() {
    return {
      listCategory: [],
      listEditted: [],
      error_message: "",
    };
  },
  async mounted() {
    this.listCategory = await CategoryService().getAll()
    this.listEditted = Array(this.listCategory.length).fill(false)
  },
  methods: {
    async savecategory(category) {
      try {
        await CategoryService().updateOne(category);
        const toast = new Toast(document.getElementById('toast-update-success'));
        toast.show();
      } catch (e) {
        this.error_message = e;
        const toast = new Toast(document.getElementById('toast-update-error'));
        toast.show();
      }
    },
    async deletecategory(categoryId) {
      try {
        await CategoryService().deleteOne(categoryId);
        const toast = new Toast(document.getElementById('toast-delete-error'));

      } catch (e) {

      }
    },
    checkRowEdit(index) {
      this.listEditted[index] = true
    },
    getClassEditted(index) {
      return this.listEditted[index] ? ['row-editted'] : [];
    },
    setParentFilters(event, index) {
      this.listCategory[index].filters = event
    },
  }
}
</script>
<style>
#default_category {
  max-width: 30px;
}

input {
  border: none;
}

.table-hover>tbody>tr.row-editted>* {
  background: #bcd3ff !important;
}

.table-hover>tbody>tr.row-editted input {
  background: #bcd3ff !important;
}

.table-hover>tbody>tr:hover input {
  background: rgba(218, 224, 236, 0.85) !important;
}
</style>