import Vue from "vue";
import App from "./App.vue";
import "@/assets/styles/app.css";
import { router } from "@/router";
import TopProgressBarPlugin from "./plugins/TopProgressBar/plugin";
import Toaster from "./plugins/Toaster/plugin";

Vue.use(TopProgressBarPlugin, { router });
Vue.use(Toaster, { router });

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
