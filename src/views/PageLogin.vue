<script>
import { useAppOptionStore } from "@/stores/app-option";
import { useAppAuthStore } from "@/stores/app-auth";
import { useRouter, RouterLink } from "vue-router";
import { AuthService } from "../services/auth.service";
const appOption = useAppOptionStore();
const appAuth = useAppAuthStore();
const authService = AuthService();

export default {
  mounted() {
    appOption.appSidebarHide = true;
    appOption.appHeaderHide = true;
    appOption.appContentClass = "p-0";
  },
  beforeUnmount() {
    appOption.appSidebarHide = false;
    appOption.appHeaderHide = false;
    appOption.appContentClass = "";
  },
  methods: {
    submitForm: async function () {
      try {
        await authService.login(this.user);
        window.location.href="/"
      } catch (e) {
        alert("failed rooif ban oi");
      }
    },
  },
  data() {
    return {
      user: {}
    }
  }
};
</script>
<template>
  <!-- BEGIN login -->
  <div class="login">
    <!-- BEGIN login-content -->
    <div class="login-content">
      <form v-on:submit.prevent="submitForm()" method="POST" name="login_form">
        <h1 class="text-center">Sign In</h1>
        <div class="text-muted text-center mb-4">
          For your protection, please verify your identity.
        </div>
        <div class="mb-3">
          <label class="form-label">Email Address</label>
          <input type="email" id="username" class="form-control form-control-lg fs-15px"
            placeholder="username@address.com" v-model="user.email" />
        </div>
        <div class="mb-3">
          <div class="d-flex">
            <label class="form-label">Password</label>
            <a href="#" class="ms-auto text-muted">Forgot password?</a>
          </div>
          <input type="password" id="password" class="form-control form-control-lg fs-15px" v-model="user.password"
            placeholder="Enter your password" />
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="customCheck1" />
            <label class="form-check-label fw-500" for="customCheck1">Remember me</label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-lg d-block w-100 fw-500 mb-3">
          Sign In
        </button>
        <div class="text-center text-muted">
          Don't have an account yet?
          <a href="/page/register">Sign up</a>.
        </div>
      </form>
    </div>
    <!-- END login-content -->
  </div>
  <!-- END login -->
</template>
