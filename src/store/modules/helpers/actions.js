import axios from "../../../http/axios";

export default {
  obter_escolas({ commit, dispatch }) {
    axios
      .get("/escolas/obterEscola")
      .then(({ data }) => {
        commit("SET_ESCOLAS", data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  obter_etapas({ commit }) {
    axios
      .get("/admin/obterEtapa")
      .then(({ data }) => {
        commit("SET_ETAPAS", data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  obter_semanas({ commit }) {
    axios
      .get("/admin/obterSemanas")
      .then(({ data }) => {
        commit("SET_SEMANAS", data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  obter_dias({ commit }) {
    axios
      .get("/admin/obterDias")
      .then(({ data }) => {
        commit("SET_DIAS", data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  obter_grupos_usuarios({ commit }) {
    axios
      .get("/grupos/obterGrupos", { params: { CRC: 9 } })
      .then(({ data }) => {
        commit("SET_GRP_USUARIOS", data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
