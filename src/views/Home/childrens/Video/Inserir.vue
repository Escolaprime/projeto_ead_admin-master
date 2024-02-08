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
      <div class="flex flex-row gap-x-5">
        <div class="mb-4 mt-6 w-full">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="titulo"
          >
            Titulo
          </label>
          <input
            type="text"
            name="titulo"
            v-model="video.titulo"
            id="titulo"
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
            for="descricao"
          >
            Descricao
          </label>
          <input
            type="text"
            name="descricao"
            v-model="video.descricao"
            id="descricao"
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
            v-model="video.etapa_id"
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
            for="etapa"
          >
            Semana
          </label>
          <select
            name="etapa"
            id="etapa"
            v-model="video.semana_id"
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
              v-for="semana in get_semanas"
              :key="semana.id"
              :value="semana.id"
            >
              {{ semana.titulo }}
            </option>
          </select>
        </div>
        <div class="mb-4 mt-6 w-full">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="etapa"
          >
            Dia
          </label>
          <select
            name="etapa"
            id="etapa"
            v-model="video.dia_id"
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
              v-for="dia in get_dias"
              :key="dia.id"
              :value="dia.id"
            >
              {{ dia.titulo }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="flex flex-row gap-x-5">
        <div class="mb-4 mt-6 w-full">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="professor"
          >
            Professor
          </label>
          <select
            name="professor"
            id="professor"
            v-model="video.professor_id"
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
              v-for="professor in professores"
              :key="professor.professor_id"
              :value="professor.professor_id"
            >
              {{ `${professor.primeiro_nome} ${professor.segundo_nome}` }}
            </option>
          </select>
        </div>
        <div class="mb-4 mt-6 w-full">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="form"
          >
            Formulário
          </label>
          <input
            type="text"
            name="form"
            v-model="video.form"
            id="form"
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

      <div>
        <div class="col-span-full">
          <label class="block text-sm font-medium text-gray-700"> Video </label>
          <div
            class="
              mt-1
              flex
              justify-center
              px-6
              pt-5
              pb-6
              border border-gray-300 border-dashed
              rounded-md
            "
          >
            <div class="space-y-1 text-center" v-if="!video.file">
              <ph-cloud-arrow-up :size="48" class="mx-auto text-gray-400" />
              <div class="flex text-sm text-gray-600">
                <label
                  for="file-upload"
                  class="
                    relative
                    cursor-pointer
                    bg-white
                    rounded-md
                    font-medium
                    text-sky-600
                    hover:text-blue-500
                  "
                >
                  <span class="">Upload video</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    class="sr-only"
                    accept=".mp4"
                    @change="set_file"
                  />
                </label>
              </div>
              <p class="text-xs text-gray-500">*.MP4</p>
            </div>

            <div class="text-center" v-else>
              <div class="bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="bg-blue-500 0 w-0 h-1.5"
                  :style="{ width: progressBar + '%' }"
                  role="progressbar"
                  aria-valuenow="1456"
                  aria-valuemin="0"
                  aria-valuemax="4550"
                ></div>
              </div>
              <span class="font-medium text-xs">{{ `${progressBar}%` }}</span>
              <div class="flex flex-row items-center gap-3 text-sm">
                <ph-video-camera :size="24" weight="fill" />
                <span class="font-medium">{{ video.file[0].name }}</span>
                <button
                  @click="video.file = null"
                  class="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row">
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
              @click="upload_video"
            >
              Upload video
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "@/http/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Inserir",
  data() {
    return {
      video: {
        titulo: null,
        descricao: null,
        escola_id: 1,
        etapa_id: null,
        professor_id: null,
        file: null,
        form: null
      },
      progressBar: 0,
      professores: [],
    };
  },
  created() {
    this.obter_professores();
    this.obter_etapas();
    this.obter_escolas();
  },
  computed: {
    ...mapGetters("helpers", ["get_etapas", "get_escola_id", "get_semanas", "get_dias"]),
  },
  methods: {
    ...mapActions("helpers", ["obter_etapas","obter_escolas","obter_semanas","obter_dias"]),
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
    set_file({ target }) {
      this.video.file = target.files;
    },

    upload_video() {
      const {
        file: [file],
        ...detalhes
      } = this.video;

      const formData = new FormData();
      formData.append("video", file);
      formData.append("detalhes", JSON.stringify(detalhes));

      axios
        .post("/videos/uploadVideo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader("content-length") ||
                progressEvent.target.getResponseHeader(
                  "x-decompressed-content-length"
                );
            if (totalLength !== null) {
              this.progressBar = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
            }
          },
        })
        .then(({ data }) => {
          const { mensagem } = data;
          this.$modal.alert(mensagem);
          this.limpar_form();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    limpar_form() {
      this.video = {
        titulo: null,
        descricao: null,
        escola_id: this.get_escola_id,
        etapa_id: null,
        professor_id: null,
        file: null,
        form: null
      };
      this.progressBar = 0;
    },
  },
};
</script>