<template>
  <div class="toasts-container">
    <div class="toast fade hide mb-3" data-autohide="false" id="toast-success">
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
        {{ success_message }}
      </div>
    </div>
    <div class="toast fade hide mb-3" data-autohide="false" id="toast-error">
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
export default {
  props: {
    success_message: "",
    error_message: "",
  },
};
</script>