<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Trang</a></li>
        <li class="breadcrumb-item active">Log</li>
      </ul>
      <h1 class="page-header mb-0">Log</h1>
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
            <span class="d-none d-md-inline">Tìm kiếm</span>
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
                <th class="border-top-0 pt-0 pb-2">ID</th>
                <th class="border-top-0 pt-0 pb-2">Người thực hiện</th>
                <th class="border-top-0 pt-0 pb-2">Loại</th>
                <th class="border-top-0 pt-0 pb-2">Bảng</th>
                <th class="border-top-0 pt-0 pb-2">Nội dung</th>
                <th class="border-top-0 pt-0 pb-2">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in listLog" :key="log.id">
                <td class="w-10px align-middle">
                  {{ log.id }}
                </td>

                <td class="w-10px align-left">
                  {{ log.actor.username }}
                </td>

                <td class="w-10px align-left">
                  {{ log.type }}
                </td>

                <td class="w-10px align-left">
                  {{ log.table }}
                </td>

                <td class="w-10px align-left">
                  {{ log.content }}
                </td>

                <td class="w-10px align-left">
                  {{ formatFullDatetime(log.created_at) }}
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
import { LogService } from "../services/log.service";
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
      listLog: [],
    };
  },
  async mounted() {
    this.listLog = await LogService().getAll();
  },
  methods: {},
};
</script>
<style>
#default_discount {
  max-width: 30px;
}

input {
  border: none;
}

.table-hover > tbody > tr.row-editted > * {
  background: #bcd3ff !important;
}

.table-hover > tbody > tr.row-editted input {
  background: #bcd3ff !important;
}

.table-hover > tbody > tr:hover input {
  background: rgba(218, 224, 236, 0.85) !important;
}
</style>