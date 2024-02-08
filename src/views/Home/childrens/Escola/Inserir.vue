<template>
  <main
    class="
      grid grid-cols-1
      xl:grid-cols-1
      gap-10
      container
      mx-auto
      py-5
      px-2
      h-full
    "
  >
    <section class="flex flex-col bg-white rounded-xl p-5">
      <div class=" flex flex-row gap-x-5">
        <div class="mb-4 mt-6 w-full">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="nome-escola"
          >
            Nome da escola
          </label>
          <input
            type="text"
            name="nome-escola"
            v-model="escola.nome_escola"
            id="nome-escola"
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

      <div class="flex flex-row">
        <div class="mb-4 mt-6">
          <div class="flex flex-row gap-x-5">
            <button
              @click="clearForm"
              class="bg-gray-500 p-2 rounded text-white font-medium"
            >
              Cancelar
            </button>
            <button
              class="bg-sky-600 p-2 rounded text-white font-medium"
              @click="onAddEscola"
            >
              Inserir escola
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
      escola: {
        nome_escola: "",
      },
    };
  },
  methods: {
    clearForm() {
      this.escola.nome_escola = "";
    },
    onAddEscola() {
      axios
        .post("/escolas/inserirEscola", this.escola)
        .then((response) => {
          const { data } = response;
          this.$modal.alert(data.mensagem);
          this.clearForm();
        })
        .catch((error) => {
          if (error.response) {
            const { message } = error.response.data;
            this.$modal.error(message);
          }
        });
    },
  },
};
</script>
