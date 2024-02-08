import Modal from "./Modal.vue";
import ModalError from "./ModalError.vue";
export default {
  install(Vue, options) {
    Vue.component("da-modal", Modal);

    Vue.prototype.$modal = {
      alert(mensagem) {
        const extended = Vue.extend(Modal);
        let node = document.createElement("div");
        document.querySelector("#app").appendChild(node);

        const modal = new extended();
        modal.$mount(node);

        return modal.showModal(mensagem);
      },

      error(mensagem) {
        const extended = Vue.extend(ModalError);
        let node = document.createElement("div");
        document.querySelector("#app").appendChild(node);

        const modal = new extended();
        modal.$mount(node);

        return modal.showModal(mensagem);
      },
    };
  },
};
