<template>
  <main
    class="
      grid grid-cols-1
      xl:grid-cols-1
      gap-10
      container
      mx-auto
      px-2
      py-5
      h-full
    "
  >
    <section class="flex flex-col bg-white rounded-xl p-5">
      <div class=" flex flex-row gap-x-5">
        <div class="mb-4 mt-6 w-full">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="primeiro_nome"
          >
            Nome do Usuário
          </label>
          <input
            type="text"
            name="primeiro_nome"
            v-model="usuario.nome"
            id="primeiro_nome"
            class="
              form-input
              focus:ring-lightBlue-400
              focus:border-lightBlue-500
              block
              w-full
              shadow-sm
              sm:text-sm
              border-gray-300
              rounded-md
            "
          />
        </div>
        <div class="mb-4 mt-6 w-full">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="primeiro_nome"
          >
            Senha do Usuário
          </label>
          <input
            type="text"
            name="primeiro_nome"
            v-model="usuario.senha"
            id="primeiro_nome"
            class="
              form-input
              focus:ring-lightBlue-400
              focus:border-lightBlue-500
              block
              w-full
              shadow-sm
              sm:text-sm
              border-gray-300
              rounded-md
            "
          />
        </div>
      </div>
      <div class="flex flex-row gap-x-5">
        <div class="mb-4 mt-6 w-full">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="etapa"
          >
            Grupo
          </label>
          <select
            name="etapa"
            id="etapa"
            v-model="usuario.grupo_id"
            class="
              form-select
              focus:ring-lightBlue-400
              focus:border-lightBlue-500
              block
              w-full
              shadow-sm
              sm:text-sm
              border-gray-300
              rounded-md
            "
          >
            <option disabled selected value="0">Selecione</option>
            <option
              v-for="grp_usuario in get_grp_usuarios"
              :key="grp_usuario.id"
              :value="grp_usuario.id"
            >
              {{ grp_usuario.nome_grupo }}
            </option>
          </select>
        </div>
        <div class="mb-4 mt-6 w-full">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="matricula"
          >
            Email de Login
          </label>
          <input
            type="text"
            name="matricula"
            id="matricula"
            v-model="usuario.email"
            class="
              form-input
              focus:ring-lightBlue-400
              focus:border-lightBlue-500
              block
              w-full
              shadow-sm
              sm:text-sm
              border-gray-300
              rounded-md
            "
          />
        </div>
      </div>

      <div class="mb-4 mt-3 w-28">
        <label
          class="block text-gray-700 text-sm font-semibold mb-2"
          for="etapa"
        >
          Ativo
        </label>
        <select
          name="etapa"
          id="etapa"
          v-model="usuario.ativo"
          class="
            form-select
            focus:ring-lightBlue-400
            focus:border-lightBlue-500
            block
            w-full
            shadow-sm
            sm:text-sm
            border-gray-300
            rounded-md
          "
        >
          <option
            v-for="sn in SN_options"
            :key="sn.id"
            :value="sn.id"
          >
            {{ sn.text }}
          </option>
        </select>
      </div>

      <div class="flex flex-row">
        <div class="mb-4 mt-6">
          <div class="flex flex-row gap-x-5">
            <button
              class="bg-sky-600 p-2 rounded text-white font-medium w-52"
              @click="inserir_aluno"
            >
              Inserir Usuário
            </button>
            <button
              @click="limpar_form"
              class="bg-gray-500 p-2 rounded text-white font-medium"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "@/http/axios";
import { mapGetters } from "vuex";
export default {
  name: "Inserir",
  data() {
    return {
      SN_options: [{id: true, text: 'SIM'},{id:false, text: 'NÃO'}],
      usuario: {
        nome: null,
        email: null,
        senha: null,
        grupo_id: null,
        ativo: false,
      },
      msg_senha: 'A SENHA DEVE CONTER : :\n\npelo menos 8 caracteres\npelo menos 1 caractere numérico\npelo menos 1 letra minúscula \npelo menos 1 letra maiúscula \npelo menos 1 caractere especial'
    };
  },

  computed: {
    ...mapGetters("helpers", ["get_grp_usuarios"]),
  },
  methods: {
    inserir_aluno() {
      let MSG = '';
      let vSenha = this.vSenhaUsuario(this.usuario.senha);
      let vEmail = this.vEmailUsuario(this.usuario.email);


      if(vSenha === false){
        MSG += this.msg_senha;
      }
      if(vEmail === false){
        MSG += "\n\n\n EMAIL INVALIDO";
      }

      if(vSenha === true && vEmail === true){

        axios
          .post("/usuarios/inserirUsuario", {
            params:{
              CRC: 9,
              dados: this.usuario,
            }
            ,
          })
          .then(({ data }) => {
              this.$modal.alert(data.mensagem);
            
          })
          .catch((err) => {
            console.log(err);
          });
      }else {
        this.$modal.alert(MSG);
        return;
      }

    },

    limpar_form(){
      this.usuario = {
        nome: null,
        email: null,
        senha: null,
        grupo_id: null,
      }
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