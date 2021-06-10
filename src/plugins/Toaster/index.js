import Vue from "vue";

export default {
  success(message, toastId) {
    Vue.prototype.$toaster.success(message, toastId);
  },
  error(message, toastId) {
    Vue.prototype.$toaster.error(message, toastId);
  },
  removeToast(toastId) {
    Vue.prototype.$toaster.removeToast(toastId);
  }
};
