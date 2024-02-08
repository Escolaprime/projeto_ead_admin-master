import aplicativos from './aplicativos';
import grupos from './grupos';
import store from '@/store';

export const check_apps = () => {
    const { grupo_id } =  store.getters['auth/get_user'];
    return aplicativos.usuarios.includes(grupo_id);
}

export const check_permission = (modulo) => {
    const { permissao_id, grupo_id } =  store.getters['auth/get_user'];
    const { ler, escrever, editar, excluir } = grupos[modulo];
    return {
        ler: ler.permissoes.includes(permissao_id) && ler.grupos.includes(grupo_id),
        escrever: escrever.permissoes.includes(permissao_id) && escrever.grupos.includes(grupo_id),
        editar: editar.permissoes.includes(permissao_id) && editar.grupos.includes(grupo_id),
        excluir: excluir.permissoes.includes(permissao_id) && excluir.grupos.includes(grupo_id),
    }
}