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

// глобальная обработка ошибок
Vue.config.errorHandler = err => {
  Vue.prototype.$toaster.error(`Внимание: Необработанная ошибка Vue! \nПричина: ${err}`);
};

window.onunhandledrejection = event => {
  Vue.prototype.$toaster.error(
    `Внимание: Необработанная ошибка Promise! \nПричина: ${event.reason}`
  );
};

window.onerror = msg => {
  Vue.prototype.$toaster.error(`Внимание: Необработанная ошибка! \nПричина: ${msg}`);
};
