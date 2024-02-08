<template>
  <main
    class="
      flex-1 flex justify-between gap-3 overflow-hidden
      container
      mx-auto
      px-2
      py-5
    "
  >
    <section class="w-1/2 flex flex-col">
      <div
        class="
          bg-white
          rounded
          flex
          items-center
          w-full
          p-3
          shadow-sm
          border border-gray-200
        "
      >
        <button class="outline-none focus:outline-none">
          <svg
            class="w-5 text-gray-600 h-5 cursor-pointer"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
        <input
          type="text"
          placeholder="Digite o nome do aluno(a)"
          v-model="search"
          @keyup.enter="obter_alunos"
          class="
            w-full
            pl-4
            text-sm
            outline-none
            focus:outline-none
            bg-transparent
          "
        />
      </div>

      <div class="mt-10 overflow-y-auto">
        <div
          class="p-2"
          v-for="(aluno, index) in alunos"
          :key="aluno.id"
          @click="selecionar_aluno(aluno, index)"
        >
          <div
            class="rounded-xl bg-white p-5 space-y-4"
            :class="{ 'bg-sky-600 text-white': index === index_item }"
          >
            <div class="flex flex-row justify-between">
              <div>
                <h2 class="text-xl font-semibold uppercase">
                  {{ `${aluno.primeiro_nome} ${aluno.segundo_nome}` }}
                </h2>
                <p class="text-sm font-medium text-gray-900">Nome do aluno</p>
              </div>
              <div>
                <h2 class="text-xl font-semibold uppercase">
                  {{ aluno.numero_matricula }}
                </h2>
                <p class="text-sm font-medium text-gray-900">Nº Matricula</p>
              </div>
            </div>
            <div class="flex flex-row justify-between">
              <div>
                <h2 class="text-xl font-semibold uppercase">
                  {{ aluno.nome_escola }}
                </h2>
                <p class="text-sm font-medium text-gray-900">Escola</p>
              </div>
              <div>
                <h2 class="text-xl font-semibold uppercase">
                  {{ aluno.etapa_titulo }}
                </h2>
                <p class="text-sm font-medium text-gray-900">Etapa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <transition
      enter-active-class="trasition-all transform duration-300 ease-out"
      enter-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="trasition-all transform duration-200 ease-in"
      leave-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-4 opacity-0"
    >
      <section
        class="bg-white p-5 rounded-xl flex-1 container mx-auto flex flex-col"
        v-if="aluno_selecionado"
      >
        <h3 class="text-3xl">Edição</h3>
        <div class="mt-10">
          <div class="flex flex-col">
            <div class="flex flex-row gap-x-5">
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
                  id="primeiro_nome"
                  v-model="aluno_selecionado.primeiro_nome"
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
                  id="segundo_nome"
                  v-model="aluno_selecionado.segundo_nome"
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
                  Etapa
                </label>
                <select
                  name="etapa"
                  id="etapa"
                  v-model="aluno_selecionado.etapa_id"
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
                    v-for="etapa in get_etapas"
                    :key="etapa.id"
                    :value="etapa.id"
                  >
                    {{ etapa.titulo }}
                  </option>
                </select>
              </div>
              <div class="mb-4 mt-6 w-full">
                <label
                  class="block text-gray-700 text-sm font-semibold mb-2"
                  for="matricula"
                >
                  Matricula
                </label>
                <input
                  type="text"
                  name="matricula"
                  id="matricula"
                  v-model="aluno_selecionado.numero_matricula"
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
          </div>
          <div class="mb-4 mt-6">
            <div class="flex flex-row gap-x-5">
              <button
                class="bg-gray-500 p-2 rounded text-white font-medium"
                @click="limpar_edicao"
              >
                Cancelar
              </button>
              <button
                class="bg-sky-600 p-2 rounded text-white font-medium"
                @click="editar_aluno"
              >
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Pesquisa",
  data() {
    return {
      alunos: [],
      aluno_selecionado: null,
      index_item: -1,
      search: null,
      etapas: [],
    };
  },
  created() {
    this.obter_etapas();
    this.obter_escolas();
  },
  computed: {
    ...mapGetters("helpers", ["get_etapas", "get_escola_id"]),
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
    ...mapActions("helpers", ["obter_etapas", "obter_escolas"]),
    obter_alunos() {
      if (!this.search) return this.$modal.alert("A busca está vazia ! Digite algo.");

      axios
        .get("/admin/obterAlunos", {
          params: {
            search: this.search,
          },
        })
        .then(({ data }) => {
          this.alunos = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selecionar_aluno(item, index) {
      if(!this.$parent.check.editar) return;
      this.aluno_selecionado = Object.assign({}, item);
      this.index_item = index;
    },
    editar_aluno() {
      axios
        .put("/admin/editarAluno", {
          ...this.aluno_selecionado,
        })
        .then(({ data }) => {
          const { mensagem } = data;
          const etapa = this.get_etapas.filter(etapa => etapa.id === this.aluno_selecionado.etapa_id)[0].titulo;
          this.aluno_selecionado.etapa_titulo = etapa;
          const newItem = Object.assign({}, this.aluno_selecionado);
          this.$set(this.alunos, this.index_item, newItem);
          this.$modal.alert(mensagem);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    limpar_edicao() {
      this.aluno_selecionado = null;
      this.index_item = -1;
    },
  },
};
</script>