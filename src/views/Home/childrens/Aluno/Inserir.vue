<template>
  <main class="
      grid grid-cols-1
      xl:grid-cols-1
      gap-10
      container
      mx-auto
      py-5
      px-2
      h-full
    ">
    <section class="flex flex-col bg-white rounded-xl p-5">
      <div class=" flex flex-row gap-x-5">
        <div class="mb-4 mt-6 w-full">
          <label class="block text-gray-700 text-sm font-semibold mb-2" for="primeiro_nome">
            Primeiro nome
          </label>
          <input type="text" name="primeiro_nome" v-model="aluno.primeiro_nome" id="primeiro_nome" class="
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
          <label class="block text-gray-700 text-sm font-semibold mb-2" for="segundo_nome">
            Segundo nome
          </label>
          <input type="text" name="segundo_nome" v-model="aluno.segundo_nome" id="segundo_nome" class="
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
      </div>
      <div class="flex flex-row gap-x-5">
        <div class="mb-4 mt-6 w-full">
          <label class="block text-gray-700 text-sm font-semibold mb-2" for="escola">
            Escola
          </label>
          <select name="etapa" id="etapa" v-model="aluno.escola_id" class="
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
            <option v-for="{ id, nome_escola } in get_escolas" :key="id" :value="id">
              {{ nome_escola }}
            </option>
          </select>
        </div>
        <div class="mb-4 mt-6 w-full">
          <label class="block text-gray-700 text-sm font-semibold mb-2" for="etapa">
            Etapa
          </label>
          <select name="etapa" id="etapa" v-model="aluno.etapa_id" class="
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
            <option v-for="etapa in get_etapas" :key="etapa.id" :value="etapa.id">
              {{ etapa.titulo }}
            </option>
          </select>
        </div>
        <div class="mb-4 mt-6 w-full">
          <label class="block text-gray-700 text-sm font-semibold mb-2" for="matricula">
            Matricula
          </label>
          <input type="text" name="matricula" id="matricula" v-model="aluno.numero_matricula" class="
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
      </div>
      <div class="flex flex-row">
        <div class="mb-4 mt-6">
          <div class="flex flex-row gap-x-5">
            <button @click="limpar_form" class="bg-gray-500 p-2 rounded text-white font-medium">
              Cancelar
            </button>
            <button class="bg-sky-600 p-2 rounded text-white font-medium" @click="inserir_aluno">
              Inserir aluno
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
      aluno: {
        primeiro_nome: null,
        segundo_nome: null,
        email: null,
        senha: null,
        escola_id: 1,
      },
    };
  },
  computed: {
    ...mapGetters("helpers", ["get_etapas", "get_escola_id", "get_escolas"]),
  },
  methods: {
    inserir_aluno() {
      axios
        .post("/alunos/inserirAluno", {
          ...this.aluno,
        })
        .then(({ data }) => {
          const { mensagem } = data;
          this.$modal.alert(mensagem);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    limpar_form() {
      this.aluno = {
        primeiro_nome: null,
        segundo_nome: null,
        idade: null,
        escola_id: this.get_escola_id,
        etapa_id: null,
        numero_matricula: null,
      };
    },
  },
};
</script>