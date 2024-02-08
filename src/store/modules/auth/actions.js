import axios from "@/http/axios";
import router from "../../../router/index";
import storage from "./storage";

export default {
  async login({ dispatch }, payload) {
    return await axios
      .get("/autenticacao/loginAdmin", {
        headers: {
          ...payload,
        },
      })
      .then(({ data }) => {
        const { token, ...user } = data;

        dispatch("set_user", user), dispatch("set_token", token);
      });
  },

  logout({ dispatch }) {
    dispatch("set_user", null);
    dispatch("set_token", null);
    storage.clear("token");
    router.push({ name: "login" });
  },

  async load_session({ dispatch }) {
    return await axios
      .get("/autenticacao/obterSessao")
      .then(({ data }) => {
        const { token, ...user } = data;
        dispatch("set_user", user);
      })
      .catch(() => {
        dispatch("logout");
      });
  },

  async check_token({ dispatch }) {
    const token = storage.get("token");

    if (!token) {
      return Promise.reject(new Error("Nenhum token local encontrado"));
    }

    dispatch("set_token", token);

    return dispatch("load_session");
  },

  set_user({ commit }, user) {
    commit("SET_USER", user);
  },

  set_token({ commit }, token) {
    commit("SET_TOKEN", token);
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    storage.set("token", token);
  },
};
