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
    <section class="flex flex-col bg-white rounded-xl">
      <div class="p-5 flex flex-row gap-x-5">
        <div class="mb-4 mt-6 w-full">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="primeiro_nome"
          >
            Primeiro nome
          </label>
          <input
            type="text"
            name="primeiro_nome"
            v-model="professor.primeiro_nome"
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
            for="segundo_nome"
          >
            Segundo nome
          </label>
          <input
            type="text"
            name="segundo_nome"
            v-model="professor.segundo_nome"
            id="segundo_nome"
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
      <div class="p-5 flex flex-row">
        <div class="mb-4 mt-6">
          <div class="flex flex-row gap-x-5">
            <button
              @click="limpar_form"
              class="bg-gray-500 p-2 rounded text-white font-medium"
            >
              Cancelar
            </button>
            <button
              class="bg-sky-600 p-2 rounded text-white font-medium"
              @click="inserir_professor"
            >
              Inserir Professor
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "@/http/axios";
export default {
  name: "Inserir",
  data() {
    return {
      professor: {
        primeiro_nome: null,
        segundo_nome: null,
        email: null,
        senha: null,
        escola_id: 1,
      },
    };
  },
  methods: {
    inserir_professor() {
      axios
        .post("/professores/inserirProfessor", {
          ...this.professor,
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
      this.professor = {
        primeiro_nome: null,
        segundo_nome: null,
        email: null,
        senha: null,
        escola_id: 1,
      };
    },
  },
};
</script>