
export default {

    get_escolas({ arrEscolas }) {
        return arrEscolas
    },
    get_escola_id({ arrEscolas }) {
        return arrEscolas[0].id || null;
    },
    get_etapas({ arrEtapas }) {
        return arrEtapas;
    },

    get_semanas({ arrSemanas }) {
        return arrSemanas;
    },

    get_dias({ arrDias }) {
        return arrDias;
    },
    
    get_grp_usuarios({ arrGrpUsusarios }) {
        return arrGrpUsusarios;
    },


    get_baseURL({ baseURL }) {
        return baseURL
    }
}