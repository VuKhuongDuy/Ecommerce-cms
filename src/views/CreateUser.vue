<template>
  <div class="row form-create">
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="username">Username</label>
        <input v-model="createUser.username" type="text" class="form-control" id="username" placeholder="Your username">
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="role">Chức vụ</label>
        <select v-model="createUser.role" class="form-control">
          <option :value="RoleUser.ADMIN">{{ RoleUserString.ADMIN }}</option>
          <option :value="RoleUser.NORMAL">{{ RoleUserString.NORMAL }}</option>
        </select>
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="phone">SĐT</label>
        <input v-model="createUser.phone" type="text" class="form-control" id="phone" placeholder="0123456789">
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="password">Mật khẩu</label>
        <input v-model="createUser.password" type="text" class="form-control" id="password" placeholder="password">
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="birthday">Ngày sinh</label>
        <datepicker id="birthday" v-model="createUser.birthday" :format="getBirthdayFormat" class="dateSelect"
          :clearable="false" hideInputIcon />
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="address">Địa chỉ</label>
        <input v-model="createUser.address" type="text" class="form-control" id="address" placeholder="your location">
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="gender">Giới tính</label>
        <select v-model="createUser.sex" class="form-control">
          <option :value="GenderUser.MALE">{{ GenderUserString.MALE }}</option>
          <option :value="GenderUser.FEMALE">{{ GenderUserString.FEMALE }}</option>
          <option :value="GenderUser.OTHER">{{ GenderUserString.OTHER }}</option>
        </select>
      </div>
    </div>
    <div class="col-xl-6">
      <div class="form-group mb-3">
        <label class="form-label" for="email">Email</label>
        <input v-model="createUser.email" type="text" class="form-control" id="email"
          placeholder="your_email@example.com">
      </div>
    </div>
  </div>

  <div class="toasts-container">
    <div class="toast fade hide mb-3" data-autohide="false" id="toast-create-success">
      <div class="toast-header">
        <i class="far fa-bell text-muted me-2"></i>
        <strong class="me-auto">Thông báo</strong>
        <small>Vừa xong</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        Tạo user thành công
      </div>
    </div>
    <div class="toast fade hide mb-3" data-autohide="false" id="toast-create-error">
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

  <button type="button" class="btn btn-primary pr-2" @click="(event) => saveUser(event, createUser)">Save</button>
  <!-- toasts-container -->
</template>
<script>
import {
  getRoleString,
  getGenderString,
  getBirthdayFormat,
  delayTime
} from '../mixin/mixin'
import { RoleUserString, RoleUser, GenderUser, GenderUserString } from "../enums/user.enum";

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { UserService } from "../services/user.service";
import { Toast } from 'bootstrap';

export default {
  components: {
    Datepicker
  },
  mixins: [{
    methods: {
      getRoleString,
      getGenderString,
      getBirthdayFormat,
      delayTime,
    }
  }],
  data() {
    return {
      RoleUser: RoleUser,
      RoleUserString: RoleUserString,
      GenderUser: GenderUser,
      GenderUserString: GenderUserString,
      createUser: {},
      error_message: ""
    }
  },
  methods: {
    async saveUser(event, user) {
      event.preventDefault();
      const userService = UserService()
      try {
        userService.createOne(user);
        const toast = new Toast(document.getElementById('toast-create-success'));
        toast.show();
        await this.delayTime();
        this.$router.push("/user");
      } catch (e) {
        this.error_message = e;
        const toast = new Toast(document.getElementById('toast-create-error'));
        toast.show();
      }
    }
  }
}
</script>
<style scoped>
.form-create {
  max-width: 50%;
}
</style>