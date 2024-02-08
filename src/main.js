import modal from "@/components/plugin";
import FloatingVue from "floating-vue";
import phosphoricons from "phosphor-vue";
import VCalendar from "v-calendar";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "floating-vue/dist/style.css";
import "./styles/tailwind.css";

Vue.use(phosphoricons)
  .use(modal)
  .use(FloatingVue)
  .use(VCalendar);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
