<template>
  <main class="
      flex-1 flex justify-between gap-3 overflow-hidden
      container
      mx-auto
      py-5
      px-2
    ">
    <section class="w-2/5 flex flex-col">
      <div class="
          bg-white
          rounded
          flex
          items-center
          w-full
          p-3
          shadow-sm
          border border-gray-200
        ">
        <button class="outline-none focus:outline-none">
          <svg class="w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
        <input type="text" placeholder="Digite o nome do usuario(a)" v-model="search" @keyup.enter="pesquisar_usuarios"
          class="
            w-full
            pl-4
            text-sm
            outline-none
            focus:outline-none
            bg-transparent
          " />
      </div>

      <div class="mt-10 overflow-y-auto" style="max-height: 660px">
        <div class="p-2" v-for="(usuario, index) in usuarios" :key="usuario.id + Math.random()"
          @click="selecionar_usuario(usuario, index)">
          <div class="rounded-xl bg-white p-5 space-y-4" :class="{ 'bg-sky-600 text-white': index === index_item }">
            <div class="flex flex-row space-y-1 justify-between">
              <div>
                <h2 class="text-base font-semibold uppercase">
                  {{ `${usuario.nome}` }}
                </h2>
                <p class="text-sm font-medium text-gray-400">Nome do usuario</p>
              </div>
              <div>
                <h2 class="text-base font-semibold uppercase">
                  {{ usuario.id }}
                </h2>
                <p class="text-sm font-medium text-gray-400">ID</p>
              </div>
            </div>
            <div>
              <div>
                <h2 class="text-base font-semibold uppercase">
                  {{ usuario.email }}
                </h2>
                <p class="text-sm font-medium text-gray-400">Email</p>
              </div>
            </div>
            <div class="flex flex-row justify-between">
              <div>
                <h2 class="text-base font-semibold uppercase">
                  {{ usuario.nome_grupo }}
                </h2>
                <p class="text-sm font-medium text-gray-400">Grupo</p>
              </div>
              <div>
                <h2 class="text-base font-semibold uppercase">
                  {{ usuario.criado_em | formatar_data }}
                </h2>
                <p class="text-sm font-medium text-gray-400">Data criação</p>
              </div>
              <div>
                <h2 class="text-base font-semibold uppercase">
                  {{ usuario.ativo | VF }}
                </h2>
                <p class="text-sm font-medium text-gray-400">Ativo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <transition enter-active-class="trasition-all transform duration-300 ease-out" enter-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="trasition-all transform duration-200 ease-in"
      leave-class="translate-y-0 opacity-100" leave-to-class="translate-y-4 opacity-0">

      <!-- EDICAO DE USUARIO -->
      <section class="bg-white p-5 rounded-xl flex-1" v-if="usuario_selecionado">
        <h3 class="text-3xl">Edição</h3>
        <div class="mt-10">
          <div class="flex flex-col">
            <div class="flex flex-row gap-x-5">
              <div class="mb-4 mt-6 w-full">
                <label class="block text-gray-700 text-sm font-semibold mb-2" for="primeiro_nome">
                  Nome do Usuário
                </label>
                <input type="text" name="primeiro_nome" id="primeiro_nome" v-model="usuario_selecionado.nome" class="
                    form-input
                    focus:ring-lightBlue-400
                    focus:border-lightBlue-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  " />
              </div>
              <div class="mb-4 mt-6 w-full">
                <label class="block text-gray-700 text-sm font-semibold mb-2" for="etapa">
                  Grupo
                </label>
                <select name="etapa" id="etapa" v-model="usuario_selecionado.grupo_id" class="
                    form-select
                    focus:ring-lightBlue-400
                    focus:border-lightBlue-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  ">
                  <option disabled selected value="0">Selecione</option>
                  <option v-for="grp_usuarios in get_grp_usuarios" :key="grp_usuarios.id" :value="grp_usuarios.id">
                    {{ grp_usuarios.nome_grupo }}
                  </option>
                </select>
              </div>


            </div>
            <div class="mb-4 mt-2 w-28">
              <label class="block text-gray-700 text-sm font-semibold mb-2" for="etapa">
                Ativo
              </label>
              <select name="etapa" id="etapa" v-model="usuario_selecionado.ativo" class="
                  form-select
                  focus:ring-lightBlue-400
                  focus:border-lightBlue-500
                  block
                  w-full
                  shadow-sm
                  sm:text-sm
                  border-gray-300
                  rounded-md
                ">
                <option v-for="sn in SN_options" :key="sn.id" :value="sn.id">
                  {{ sn.text }}
                </option>
              </select>
            </div>
            <div class="mb-4 mt-6">
              <div class="flex flex-row gap-x-5">
                <button class="bg-sky-600 p-2 rounded text-white font-medium w-52" @click="editar_usuario">
                  Salvar Edição
                </button>
                <VDropdown>
                  <button class="bg-rose-600 p-2 rounded text-white font-medium">
                    Deletar
                  </button>
                  <template #popper>
                    <div class="p-4">
                      <p class="text-sm font-semibold">Confirma esta ação ?</p>
                      <div class="flex justify-center items-center gap-x-4 mt-2">
                        <button class="bg-rose-100 text-rose-500 py-1.5 px-3 text-sm font-bold rounded" v-close-popper
                          @click="deletarUsuario">Sim</button>
                        <button class="hover:bg-gray-200 text-gray-600 py-1.5 px-3 text-sm rounded"
                          v-close-popper>Não</button>
                      </div>
                    </div>

                  </template>
                </VDropdown>
                <button class="bg-gray-500 p-2 rounded text-white font-medium" @click="limpar_edicao">
                  Cancelar
                </button>
              </div>
            </div>


            <!-- senha e email -->
            <div class="flex flex-col gap-x-5 mt-5 border-t-4 pt-4">

              <div class="flex flex-row items-center gap-x-2">
                <div class="mb-4 mt-6 w-2/5 " v-bind:class="[!EDITAR_SENHA ? 'pointer-events-none opacity-25' : '']">
                  <label class="block text-gray-700 text-sm font-semibold mb-2" for="primeiro_nome">
                    Senha do Usuário
                  </label>
                  <input type="text" name="primeiro_nome" id="snh" v-model="usuario_selecionado.senha" class="
                      form-input
                      focus:ring-lightBlue-400
                      focus:border-lightBlue-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    " />
                </div>
                <div class="pt-8">
                  <button v-if="!EDITAR_SENHA" class="bg-gray-500 p-2 rounded text-white font-medium w-52"
                    @click="EDITAR_SENHA = !EDITAR_SENHA">
                    HABILITA EDIÇÃO
                  </button>
                  <button v-else class="bg-green-500 p-2 rounded text-white font-medium w-52" @click="editar_senha()">
                    SALVAR EDIÇÃO
                  </button>
                </div>
                <div class="pt-8">
                  <button class="bg-gray-500 p-2 rounded text-white font-medium"
                    @click="EDITAR_SENHA = false, usuario_selecionado = null, index_item = -1">
                    Cancelar
                  </button>
                </div>
              </div>
              <div class=" flex flex-row items-center gap-x-2">
                <div class="mb-4 mt-6 w-2/5" v-bind:class="[!EDITAR_EMAIL ? 'pointer-events-none opacity-25' : '']">
                  <label class="block text-gray-700 text-sm font-semibold mb-2" for="matricula">
                    Email
                  </label>
                  <input type="text" name="matricula" id="matricula" v-model="usuario_selecionado.email" class="
                      form-input
                      focus:ring-lightBlue-400
                      focus:border-lightBlue-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    " />
                </div>
                <div class="pt-8">
                  <button v-if="!EDITAR_EMAIL" class="bg-gray-500 p-2 rounded text-white font-medium w-52"
                    @click="EDITAR_EMAIL = !EDITAR_EMAIL, EDITAR_EMAIL_ORIGINAL = usuario_selecionado.email">
                    HABILITA EDIÇÃO
                  </button>
                  <button v-else class="bg-green-500 p-2 rounded text-white font-medium w-52" @click="editar_email()">
                    SALVA EDIÇÃO
                  </button>
                </div>
                <div class="pt-8">
                  <button class="bg-gray-500 p-2 rounded text-white font-medium"
                    @click="EDITAR_EMAIL = false, usuario_selecionado = null, index_item = -1">
                    Cancelar
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>
    </transition>
  </main>
</template>

<script>
import axios from "@/http/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Pesquisa",
  data() {
    return {
      SN_options: [{ id: true, text: 'SIM' }, { id: false, text: 'NÃO' }],
      usuarios: [],
      usuario_selecionado: null,
      index_item: -1,
      search: null,
      etapas: [],
      EDITAR_SENHA: false,
      EDITAR_EMAIL: false,
      EDITAR_EMAIL_ORIGINAL: '',
    };
  },

  filters: {
    formatar_data(data) {
      return new Date(data).toLocaleDateString();
    },
    VF(data) {
      if (data === true) return "SIM"
      else return "NÃO"
    },
  },

  created() {
    this.obter_etapas();
    this.obter_escolas();
    this.obter_grupos_usuarios();
  },
  computed: {
    ...mapGetters("helpers", ["get_etapas", "get_escola_id", "get_grp_usuarios"]),
  },
  watch: {
    search(v) {
      if (!v.length) {
        this.alunos = [];
        this.limpar_edicao();
      }
    },
  },
  methods: {
    ...mapActions("helpers", ["obter_etapas", "obter_escolas", "obter_grupos_usuarios"]),


    pesquisar_usuarios() {
      if (!this.search || this.search.length < 3) return this.$modal.alert("Digite mais de 3 caracteres.");

      // limpa dados usuario selecionado
      this.usuario_selecionado = null;

      axios
        .post("/usuarios/listarUsuarios", {
          params: {
            CRC: 9,
            c: this.search,
          },
        })

        .then(({ data }) => {
          if (data.codigo === 0) {
            this.usuarios = data.dados;
            this.EDITAR_EMAIL = false;
            this.EDITAR_EMAIL_ORIGINAL = '';
          }
          if (data.codigo === 1) {
            this.usuarios = [];
            this.$modal.alert(data.mensagem)
          }
          if (data.codigo === -1) {
            this.usuarios = [];
            this.$modal.alert(data.mensagem);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selecionar_usuario(item, index) {
      if (!this.$parent.check.editar) return;
      this.usuario_selecionado = Object.assign({}, item);
      console.log(this.usuario_selecionado);
      this.index_item = index;
    },

    deletarUsuario() {
      axios.delete(`/usuarios/deletarUsuario/${this.usuario_selecionado.id}/${this.usuario_selecionado.nome}`)
        .then(({ data }) => {
          this.$modal.alert(data.mensagem)
        }).catch(err => {
          if (err.response) {
            const { data } = err.response
            this.$modal.error(data.message)
          }
        })
    },

    editar_usuario() {
      axios
        .put("/usuarios/atualizarUsuario", {
          params: {
            CRC: 9,
            dados: this.usuario_selecionado,
          },

        })
        .then(({ data }) => {
          if (data.codigo === 0) {
            this.$modal.alert(data.mensagem);
            this.index_item = -1;
            this.search = this.usuario_selecionado.email;
            this.pesquisar_usuarios();
          }
          if (data.codigo === 1) {
            this.$modal.alert(data.mensagem);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    editar_senha() {

      if (this.vSenhaUsuario(this.usuario_selecionado.senha) == false) {
        this.$modal.alert(`INFORME:
        pelo menos 8 caracteres
        pelo menos 1 caractere numérico
        pelo menos 1 letra minúscula
        pelo menos 1 letra maiúscula
        pelo menos 1 caractere especial
        `);
        return;
      }

      axios
        .post("/usuarios/atualizaSenhaUsr", {
          params: {
            CRC: 9,
            dados: { senha: this.usuario_selecionado.senha, id: this.usuario_selecionado.id }
          },

        })
        .then(({ data }) => {
          if (data.codigo === 0) {
            this.EDITAR_SENHA = false;
            this.usuario_selecionado.senha = null;
            this.$modal.alert(data.mensagem);
          }
          if (data.codigo === 1) {
            this.$modal.alert(data.mensagem);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    editar_email(email) {

      if (this.vEmailUsuario(this.usuario_selecionado.email) == false) {
        this.$modal.alert("Email inválido");
        return;
      }

      axios
        .post("/usuarios/atualizaEmailUsr", {
          params: {
            CRC: 9,
            dados: { email: this.usuario_selecionado.email, id: this.usuario_selecionado.id }
          },

        })
        .then(({ data }) => {
          if (data.codigo === 0) {
            this.EDITAR_EMAIL = false;
            this.EDITAR_EMAIL_ORIGINAL = '';
            console.log(this.EDITAR_EMAIL);
            this.index_item = -1;
            this.$modal.alert(data.mensagem);
            this.search = this.usuario_selecionado.email;
            this.pesquisar_usuarios();
          }
          if (data.codigo === 1) {
            this.$modal.alert(data.mensagem);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },


    limpar_edicao() {
      this.usuario_selecionado = null;
      this.index_item = -1;
    },


    // UTILITÁRIOS

    /**
    pelo menos 8 caracteres
    pelo menos 1 caractere numérico
    pelo menos 1 letra minúscula 
    pelo menos 1 letra maiúscula 
    pelo menos 1 caractere especial
    */
    // VALIDA SE SENHA PREENCHE OS REQUISITOS
    vSenhaUsuario(snh) {
      const regEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
      return regEx.test(snh);
    },

    // VALIDA EMAIL
    vEmailUsuario(email) {
      const regEx = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      return regEx.test(email);
    },

  },
};
</script>