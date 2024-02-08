<template>
  <main class="
      flex-1 flex justify-between gap-3 overflow-hidden
      container
      mx-auto
      py-5
      px-2
    ">
    <section class="w-1/2 flex flex-col">
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
        <input type="text" placeholder="Digite o nome do professor(a)" class="
            w-full
            pl-4
            text-sm
            outline-none
            focus:outline-none
            bg-transparent
          " />
      </div>

      <div class="mt-10 overflow-y-auto">
        <div class="p-2" v-for="(professor, index) in professores" :key="professor.id"
          @click="selecionar_professor(professor, index)">
          <div class="rounded-xl bg-white p-5 space-y-1" :class="{ 'bg-sky-600 text-white': index === index_item }">
            <h2 class="text-2xl font-semibold uppercase">
              {{ `${professor.primeiro_nome} ${professor.segundo_nome}` }}
            </h2>
            <p class="text-sm font-medium text-gray-900">Nome do professor</p>
          </div>
        </div>
      </div>
    </section>
    <transition enter-active-class="trasition-all transform duration-300 ease-out" enter-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="trasition-all transform duration-200 ease-in"
      leave-class="translate-y-0 opacity-100" leave-to-class="translate-y-4 opacity-0">
      <section class="bg-white p-5 rounded-xl flex-1" v-if="professor_selecionado">
        <h3 class="text-3xl">Edição</h3>
        <div class="mt-10">
          <div class="mb-4 mt-6">
            <label class="block text-gray-700 text-sm font-semibold mb-2" for="primeiro_nome">
              Primeiro nome
            </label>
            <input type="text" name="primeiro_nome" id="primeiro_nome" v-model="professor_selecionado.primeiro_nome"
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
              " />
          </div>
          <div class="mb-4 mt-6">
            <label class="block text-gray-700 text-sm font-semibold mb-2" for="segundo_nome">
              Segundo nome
            </label>
            <input type="text" name="segundo_nome" id="segundo_nome" v-model="professor_selecionado.segundo_nome" class="
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
          <div class="mb-4 mt-6">
            <div class="flex flex-row gap-x-5">
              <button class="bg-gray-500 p-2 rounded text-white font-medium" @click="limpar_edicao">
                Cancelar
              </button>
              <button class="bg-sky-600 p-2 rounded text-white font-medium" @click="editar_professor">
                Salvar Edição
              </button>
              <VDropdown>
                <button class="bg-rose-600 p-2 rounded text-white font-medium">
                  Excluir professor
                </button>

                <template #popper>
                  <div class="p-4">
                    <p class="text-sm font-semibold">Confirma esta ação ?</p>
                    <div class="flex justify-center items-center gap-x-4 mt-2">
                      <button class="bg-rose-100 text-rose-500 py-1.5 px-3 text-sm font-bold rounded" v-close-popper
                        @click="excluirProfessor">Sim</button>
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
    </transition>
  </main>
</template>

<script>
import axios from "@/http/axios";
export default {
  name: "Pesquisa",
  data() {
    return {
      professores: [],
      professor_selecionado: null,
      index_item: -1,
    };
  },
  created() {
    this.obter_professores();
  },
  methods: {
    obter_professores() {
      axios
        .get("/admin/obterProfessores", {
          params: {
            search: "",
          },
        })
        .then(({ data }) => {
          this.professores = data;
        })
        .catch(({ response }) => {
          if (response) {
            console.log(response);
          }
        });
    },
    selecionar_professor(item, index) {
      if (!this.$parent.check.editar) return;
      this.professor_selecionado = Object.assign({}, item);
      this.index_item = index;
    },
    editar_professor() {
      axios
        .put("/admin/editarProfessor", {
          ...this.professor_selecionado,
        })
        .then(({ data }) => {
          const { mensagem } = data;
          const newItem = Object.assign({}, this.professor_selecionado);
          this.$set(this.professores, this.index_item, newItem);
          this.$modal.alert(mensagem);
          this.limpar_edicao();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    excluirProfessor() {
      axios.delete(`/professores/${this.professor_selecionado.professor_id}`).then(({ data }) => {
        this.$modal.alert(data.mensagem)
        this.limpar_edicao()
        this.obter_professores()
      }).catch((error) => {
        if (error.response) {
          this.$modal.error(error.response.data.message)
        }
      })
    },
    limpar_edicao() {
      this.professor_selecionado = null;
      this.index_item = -1;
    },
  },
};
</script>