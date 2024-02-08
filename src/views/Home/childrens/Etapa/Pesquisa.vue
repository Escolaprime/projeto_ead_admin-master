<template>
  <main class="
      flex-1 flex justify-between gap-3 overflow-hidden
      container
      mx-auto
      px-2
      py-5
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
        <input type="text" placeholder="Digite o nome da etapa" class="
            w-full
            pl-4
            text-sm
            outline-none
            focus:outline-none
            bg-transparent
          " />
      </div>

      <div class="mt-10 overflow-y-auto">
        <div class="p-2" v-for="(etapa, index) in etapas" :key="etapa.id" @click="selecionar_etapa(etapa, index)">
          <div class="rounded-xl bg-white p-5 space-y-1" :class="{ 'bg-sky-600 text-white': index === index_item }">
            <h2 class="text-2xl font-semibold uppercase flex items-center justify-between">
              {{ etapa.titulo }}
              <span class="text-base font-medium text-gray-500 normal-case">id: {{ etapa.id }}</span>
            </h2>
            <p class="text-sm font-medium text-gray-900">Nome da etapa</p>
          </div>
        </div>
      </div>
    </section>
    <transition enter-active-class="trasition-all transform duration-300 ease-out" enter-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="trasition-all transform duration-200 ease-in"
      leave-class="translate-y-0 opacity-100" leave-to-class="translate-y-4 opacity-0">
      <section class="bg-white p-5 rounded-xl flex-1" v-if="etapa_selecionada">
        <h3 class="text-3xl">Edição</h3>
        <div class="mt-10">
          <div class="mb-4 mt-6">
            <label class="block text-gray-700 text-sm font-semibold mb-2" for="nome_etapa">
              Nome da etapa
            </label>
            <input type="text" name="nome_etapa" id="nome_etapa" v-model="etapa_selecionada.titulo" class="
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
              <button class="bg-sky-600 p-2 rounded text-white font-medium" @click="editar_etapa">
                Salvar Edição
              </button>
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
      etapas: [],
      etapa_selecionada: null,
      index_item: -1,
    };
  },
  created() {
    this.obter_etapas();
  },
  computed: {},

  methods: {
    obter_etapas() {
      axios
        .get("/admin/obterEtapa", {
          params: {
            search: "",
          },
        })
        .then(({ data }) => {
          this.etapas = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    selecionar_etapa(item, index) {
      if (!this.$parent.check.editar) return;
      this.etapa_selecionada = Object.assign({}, item);
      this.index_item = index;
    },

    editar_etapa() {
      axios
        .put("/admin/editarEtapa", {
          ...this.etapa_selecionada,
        })
        .then(({ data }) => {
          const { mensagem } = data;
          const newItem = Object.assign({}, this.etapa_selecionada);
          this.$set(this.etapas, this.index_item, newItem);
          this.$modal.alert(mensagem);
          this.limpar_edicao();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    limpar_edicao() {
      this.index_item = -1;
      this.etapa_selecionada = null;
    },
  },
};
</script>