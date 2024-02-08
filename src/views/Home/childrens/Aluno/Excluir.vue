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
      <div class="flex flex-row gap-x-5">
        <div class="mb-4 mt-6">
          <label class="block text-gray-700 text-sm font-semibold mb-2" for="escola">
            Escola
          </label>
          <select name="etapa" id="etapa" v-model="escola_id" class="
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
      </div>
      <div class="flex flex-row">
        <div class="mb-4 mt-6">
          <div class="flex flex-row gap-x-5">
            <VDropdown>
              <button class="bg-rose-600 p-2 rounded text-white font-medium">
                Excluir todos os alunos
              </button>

              <template #popper>
                <div class="p-4">
                  <p class="text-sm font-semibold">Confirma esta ação ?</p>
                  <div class="flex justify-center items-center gap-x-4 mt-2">
                    <button class="bg-rose-100 text-rose-500 py-1.5 px-3 text-sm font-bold rounded" v-close-popper
                      @click="excluir_alunos">Sim</button>
                    <button class="hover:bg-gray-200 text-gray-600 py-1.5 px-3 text-sm rounded"
                      v-close-popper>Não</button>
                  </div>
                </div>

              </template>
            </VDropdown>
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
      escola_id: 1
    }
  },
  computed: {
    ...mapGetters("helpers", ["get_etapas", "get_escola_id", "get_escolas"]),
  },
  methods: {
    excluir_alunos() {
      const escola = this.get_escolas.find(escola => escola.id === this.escola_id)
      axios
        .delete(`/admin/excluirAlunos/${this.escola_id}/${escola.nome_escola}`)
        .then(({ data }) => {
          const { mensagem } = data;
          this.$modal.alert(mensagem);
        })
        .catch((err) => {
          if (err.response) {
            const { data } = err.response
            this.$modal.error(data.mensagem ?? data.message)
            return
          }
          this.$modal.error('Error ao deletar alunos')
          console.log(err);
        });
    },
  },
};
</script>