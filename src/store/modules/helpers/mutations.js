export default {

    SET_ESCOLAS(state, payload) {
        state.arrEscolas = payload;
    },

    SET_ETAPAS(state, payload) {
        state.arrEtapas = payload;
    },

    SET_SEMANAS(state, payload) {
        state.arrSemanas = payload;
    },
    
    SET_DIAS(state, payload) {
        state.arrDias = payload;
    },

    SET_GRP_USUARIOS(state, payload) {
        state.arrGrpUsusarios = payload;
    }
}