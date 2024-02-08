<template>
  <main class="
      grid grid-cols-1
      xl:grid-cols-1
      gap-10
      container
      mx-auto
      px-2
      py-5
      h-full
    ">
    <section class="flex flex-col bg-white rounded-xl">
      <div class="p-5 flex flex-row gap-x-5">
        <div class="mb-4 mt-6 w-full">
          <label class="block text-gray-700 text-sm font-semibold mb-2" for="nome_semana">
            Titulo da semana
          </label>
          <input type="text" name="nome_semana" v-model="semana.titulo" id="nome_semana" class="
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
      <div class="p-5 flex flex-row">
        <div class="mb-4 mt-6">
          <div class="flex flex-row gap-x-5">
            <button @click="limpar_form" class="bg-gray-500 p-2 rounded text-white font-medium">
              Cancelar
            </button>
            <button class="bg-sky-600 p-2 rounded text-white font-medium" @click="inserir_semana">
              Inserir semana
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from '@/http/axios'
export default {
  name: "Inserir",
  data() {
    return {
      semana: {
        titulo: null,
      },
    };
  },
  methods: {

    inserir_semana() {
      axios
        .post("/admin/criarSemana", this.semana)
        .then(({ data }) => {
          const { mensagem } = data;
          this.$modal.alert(mensagem);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    limpar_form() {
      this.semana = {
        titulo: null,
      }
    }
  },
};
</script>