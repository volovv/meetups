import AppToast from "./AppToast";

export default {
  install(Vue, options = {}) {
    let { container } = options;
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
    }

    const toaster = new Vue(AppToast).$mount(container);
    Vue.prototype.$toaster = toaster;
    Vue.component("app-toast", AppToast);
  }
};
