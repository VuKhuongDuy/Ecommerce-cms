<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">PAGES</a></li>
        <li class="breadcrumb-item active">User</li>
      </ul>
      <h1 class="page-header mb-0">User</h1>
    </div>

    <div class="ms-auto">
      <a href="/user/create" class="btn btn-primary"
        ><i class="fa fa-plus-circle fa-fw me-1"></i> Create User</a
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
                placeholder="Filter users"
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
        </div>
        <!-- END input-group -->

        <!-- BEGIN table -->
        <div class="table-responsive">
          <table class="table table-hover text-nowrap">
            <thead>
              <tr>
                <th class="border-top-0 pt-0 pb-2"></th>
                <th class="border-top-0 pt-0 pb-2">ID</th>
                <th class="border-top-0 pt-0 pb-2">Username</th>
                <th class="border-top-0 pt-0 pb-2">Role</th>
                <th class="border-top-0 pt-0 pb-2">Address</th>
                <th class="border-top-0 pt-0 pb-2">Phone</th>
                <th class="border-top-0 pt-0 pb-2">Birthday</th>
                <th class="border-top-0 pt-0 pb-2">Email</th>
                <th class="border-top-0 pt-0 pb-2">Sex</th>
                <th class="border-top-0 pt-0 pb-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in users"
                :class="getClassEditted(index)"
              >
                <td class="w-10px align-middle">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="product1"
                    />
                    <label class="form-check-label" for="product1"></label>
                  </div>
                </td>
                <td class="align-middle">
                  <a href="#">{{ user.id }}</a>
                </td>
                <td class="align-middle">
                  <input
                    type="text"
                    v-model="user.username"
                    @input="checkRowEdit(index)"
                  />
                </td>
                <td class="align-middle">
                  <select v-model="user.role">
                    <option :value="RoleUser.ADMIN">
                      {{ RoleUserString.ADMIN }}
                    </option>
                    <option :value="RoleUser.NORMAL">
                      {{ RoleUserString.NORMAL }}
                    </option>
                  </select>
                </td>
                <td class="align-middle">
                  <input
                    type="text"
                    v-model="user.address"
                    @input="checkRowEdit(index)"
                  />
                </td>
                <td class="align-middle">
                  <input
                    type="text"
                    v-model="user.phone"
                    @input="checkRowEdit(index)"
                  />
                </td>
                <td class="align-middle">
                  <datepicker
                    v-model="user.birthday"
                    :format="getBirthdayFormat"
                    class="dateSelect"
                    :clearable="false"
                    hideInputIcon
                  />
                </td>
                <td class="align-middle">
                  <input
                    type="text"
                    v-model="user.email"
                    @input="checkRowEdit(index)"
                  />
                </td>
                <td class="align-middle">
                  <select v-model="user.sex">
                    <option :value="GenderUser.MALE">
                      {{ GenderUserString.MALE }}
                    </option>
                    <option :value="GenderUser.FEMALE">
                      {{ GenderUserString.FEMALE }}
                    </option>
                    <option :value="GenderUser.OTHER">
                      {{ GenderUserString.OTHER }}
                    </option>
                  </select>
                </td>
                <td class="align-middle action-user">
                  <button
                    type="button"
                    class="btn btn-primary mx-2"
                    @click="saveUser(user)"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger me-2"
                    data-bs-toggle="modal"
                    :data-bs-target="'#modalDeleteUser' + index"
                  >
                    Delete
                  </button>
                  <div class="modal fade" :id="'modalDeleteUser' + index">
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
                              <td>: {{ user.id }}</td>
                            </tr>
                            <tr>
                              <td><b>Chức vụ</b></td>
                              <td>: {{ getRoleString(user.role) }}</td>
                            </tr>
                            <tr>
                              <td><b>SĐT</b></td>
                              <td>: {{ user.phone }}</td>
                            </tr>
                            <tr>
                              <td><b>Ngày sinh</b></td>
                              <td>: {{ user.birthday }}</td>
                            </tr>
                            <tr>
                              <td><b>Địa chỉ</b></td>
                              <td>: {{ user.address }}</td>
                            </tr>
                            <tr>
                              <td><b>Giới tính</b></td>
                              <td>: {{ getGenderString(user.sex) }}</td>
                            </tr>
                            <tr>
                              <td><b>Email</b></td>
                              <td>: {{ user.email }}</td>
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
                            @click="(event) => deleteUser(event, user)"
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
  <div class="toasts-container">
    <div
      class="toast fade hide mb-3"
      data-autohide="false"
      id="toast-delete-error"
      style="z-index: 9999"
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
</template>
<script>
import { ListUser } from "@/enums/mockdata";
import {
  RoleUserString,
  RoleUser,
  GenderUser,
  GenderUserString,
} from "../enums/user.enum";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { UserService } from "../services/user.service";
import { Toast } from "bootstrap";

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      users: [],
      isShowDatetimePicker: false,
      RoleUser: RoleUser,
      RoleUserString: RoleUserString,
      GenderUser: GenderUser,
      GenderUserString: GenderUserString,
      listEditted: [],
      error_message: "",
    };
  },
  mounted() {
    this.users = ListUser;
    this.listEditted = Array(this.users.length).fill(false);
  },
  methods: {
    getRoleString(role) {
      switch (role) {
        case RoleUser.ADMIN:
          return RoleUserString.ADMIN;
        case RoleUser.NORMAL:
          return RoleUserString.NORMAL;
      }
    },
    getGenderString(gender) {
      switch (gender) {
        case GenderUser.MALE:
          return GenderUserString.MALE;
        case GenderUser.FEMALE:
          return GenderUserString.FEMALE;
        case GenderUser.OTHER:
          return GenderUserString.OTHER;
      }
    },
    showDatetimePicker() {
      this.isShowDatetimePicker = !this.isShowDatetimePicker;
    },
    getBirthdayFormat(date) {
      const rDate = new Date(date);
      const day = rDate.getDate();
      const month = rDate.getMonth() + 1;
      const year = rDate.getFullYear();

      return `${year}/${month}/${day}`;
    },
    checkRowEdit(index) {
      this.listEditted[index] = true;
    },
    getClassEditted(index) {
      return this.listEditted[index] ? ["row-editted"] : [];
    },
    async saveUser(user) {
      const userService = UserService();
      await userService.updateOne(user);
    },
    async deleteUser(event, user) {
      try {
        const deleteResponse = await UserService().deleteOne(user.id);
        throw new Error("test");
      } catch (e) {
        this.error_message = e;
        const toast = new Toast(document.getElementById("toast-delete-error"));
        toast.show();
      }
    },
  },
};
</script>

<style>
select {
  border: none;
  background: transparent;
}

.dateSelect {
  max-width: 105px;
}

/* style hover input editted */
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

.action-user button:not(:first-child) {
  margin-left: 3px;
}
</style>