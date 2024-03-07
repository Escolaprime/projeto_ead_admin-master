<template>
  <main class="
      flex-1 flex justify-between overflow-hidden 
      container mx-auto 
      gap-3 px-2 py-5
    ">
    <section class="flex flex-col w-1/2">
      <!-- COL 1 -->
      <div class=" flex flex-row  justify-between bg-gray-200 pb-3">
        <div class="w-full p-2">
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
            <input type="text" placeholder="Digite para obter videos" v-model="psq_videos.txt_pesquisa"
              @keyup.enter="obter_videos" @focus="PSQ_VIDEO_ATIVO = true" class="
                w-full
                pl-4
                text-sm
                outline-none
                focus:outline-none
                bg-transparent
              " />
          </div>

          <div v-if="PSQ_VIDEO_ATIVO">
            <div class="flex flex-row justify-between gap-x-3 p-3 mt-5 border border-gray-300">
              <div class="mb-2 mt-2 w-48">
                <label class="block text-gray-700 text-sm font-semibold mb-2" for="etapa">
                  SEMANA
                </label>
                <select name="etapa" id="etapa" v-model="psq_videos.semana_id" class="
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
                  <option value="99">TODAS</option>
                  <option v-for="semana in get_semanas" :key="semana.id" :value="semana.id">
                    {{ semana.titulo }}
                  </option>
                </select>
              </div>

              <div class="m2-4 mt-2 w-48"
                v-bind:class="[psq_videos.semana_id == 0 ? 'pointer-events-none opacity-25' : '']">
                <label class="block text-gray-700 text-sm font-semibold mb-2" for="etapa">
                  DIA
                </label>
                <select name="etapa" id="etapa" v-model="psq_videos.dia_id" class="
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
                  <option value="99">TODOS</option>
                  <option v-for="dia in get_dias" :key="dia.id" :value="dia.id">
                    {{ dia.titulo }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex flex-row justify-between gap-x-3 p-3 mt-5 borde">
              <div>
                <div class="mb-2 mt-2 w-48">
                  <label class="block text-gray-700 text-sm font-semibold mb-2" for="etapa">
                    PROFESSOR(A)
                  </label>
                  <select name="etapa" id="etapa" v-model="psq_videos.professor_id" class="
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
                    <option v-for="professor in professores" :key="professor.professor_id"
                      :value="professor.professor_id">
                      {{ !professor.primeiro_nome ? professor.segundo_nome : professor.primeiro_nome }}
                    </option>
                  </select>
                </div>

                <div class="mb-2 mt-2 w-48">
                  <label class="block text-gray-700 text-sm font-semibold mb-2" for="etapa">
                    ETAPA
                  </label>
                  <select name="etapa" id="etapa" v-model="psq_videos.etapa_id" class="
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

              </div>
              <div>

                <div class="mb-2 mt-2 w-48">
                  <label class="block text-gray-700 text-sm font-semibold mb-2" for="etapa">
                    ATIVO
                  </label>
                  <select name="etapa" id="etapa" v-model="psq_videos.ativo" class="
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
                    <option v-for="sn in SN_options" :key="sn.id" :value="sn.id">
                      {{ sn.text }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="flex flex-row w-full pt-4">
              <div @click="obter_videos"
                class="flex items-center justify-center hover:bg-green-600 w-full h-11 bg-green-400 cursor-pointer">
                <div>PESQUISAR</div>
              </div>
              <div @click="limpar_obter_videos"
                class="flex items-center justify-center w-full h-11 hover:bg-red-600 bg-red-400 cursor-pointer">
                <div>LIMPAR</div>
              </div>
            </div>

          </div>



        </div>

      </div>


      <div class="mt-2 overflow-y-auto">
        <div class="p-2" v-for="(video, index) in videos" :key="video.id" @click="selecionar_video(video, index)">
          <div class="rounded-xl bg-white p-5 space-y-4" :class="{ 'bg-sky-600 text-white': index === index_item }">
            <div class="flex flex-row justify-between border-b-2 border-gray-200">
              <!-- <div>
                  <h2 class="text-xl font-semibold uppercase">
                    {{ video.nome_escola }}
                  </h2>
                  <p class="text-sm font-medium text-gray-900">Escola</p>
                </div> -->

              <div>
                <h2 class="text-sm font-semibold uppercase">
                  {{ video.etapa_titulo }} 
                </h2>
                <p class="text-sm font-medium text-gray-900">Etapa</p>
              </div>
              <div>
                <h2 class="text-sm font-semibold uppercase">
                  {{ video.video_id }}
                </h2>
                <p class="text-sm font-medium text-gray-900">ID</p>
              </div>
            </div>

            <div class="flex flex-row justify-between ">
              <div>
                <h2 class="text-sm font-semibold uppercase">
                  {{ video.titulo }}
                </h2>
                <p class="text-sm font-medium text-gray-900">Titulo</p>
              </div>
            </div>
            <div>
              <h2 class="text-sm font-semibold uppercase truncate">
                {{ video.descricao }}
              </h2>
              <p class="text-sm font-medium text-gray-900">Descricao</p>
            </div>

            <div class="flex flex-row justify-between  border-b-2 border-gray-200">
              <div>
                <h2 class="text-sm font-semibold uppercase">
                  {{ video.nome_professor }}
                </h2>
                <p class="text-sm font-medium text-gray-900">Professor</p>
              </div>
            </div>

            <div class="flex flex-row justify-between">
              <div>
                <h2 class="text-sm font-semibold uppercase">
                  {{ video.data_postagem | formatar_data }}
                </h2>
                <p class="text-sm font-medium text-gray-900">
                  Data de postagem
                </p>
              </div>
              <div>
                <h2 class="text-sm font-semibold uppercase">
                  {{ video.semana }}
                </h2>
                <p class="text-sm font-medium text-gray-900">Semana</p>
              </div>
              <div>
                <h2 class="text-sm font-semibold uppercase">
                  {{ video.dia }}
                </h2>
                <p class="text-sm font-medium text-gray-900">Dia</p>
              </div>
            </div>
            <div class="flex flex-row justify-between">
              <div>
                <h2 class="text-sm font-semibold uppercase">
                  {{ video.autorizado ? `Sim` : `Não` }}
                </h2>
                <p class="text-sm font-medium text-gray-900">Autorizado</p>
              </div>
              <div>
                <h2 class="text-sm font-semibold uppercase">
                  {{ video.ativo ? `Sim` : `Não` }}
                </h2>
                <p class="text-sm font-medium text-gray-900">Ativo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- COL 2 -->
    <transition enter-active-class="trasition-all transform duration-300 ease-out" enter-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="trasition-all transform duration-200 ease-in"
      leave-class="translate-y-0 opacity-100" leave-to-class="translate-y-4 opacity-0">
      <section class="bg-white p-5 rounded-xl flex-1 overflow-y-auto container mx-auto" v-if="video_selecionado">
        <h3 class="text-3xl font-semibold">
          Edição / Publicar
          <span class="font-medium text-sky-600">{{
            video_selecionado.titulo
          }}</span>
        </h3>
        <fieldset :disabled="check.editar && !check.escrever">
          <div class="flex flex-col justify-between gap-5 mt-5" ref="contentDiv">
            <video v-if="video_selecionado && !video_update" preload="none" ref="videoplayer" class="rounded-xl" :src="`${get_baseURL}/admin/streaming/${new Date().getTime()}?hash=${video_selecionado.hash_video_id
              }`" controls></video>
            <div class="w-full" v-if="!video_update">
              <input type="file" name="input_file" id="input_file" class="hidden" @change="substituir_video($event)" />
              <label for="input_file" class="bg-gray-900 p-2 rounded text-white font-medium">
                Substituir video
              </label>
            </div>
            <div class="w-full" v-else>
              <p class="font-medium text-lg">{{ video_update.name }}</p>
              <div class="flex flex-row items-center gap-1" v-if="video_update &&
                videos[index_item].hash_video_id ===
                video_selecionado.hash_video_id
                ">
                <div class="bg-gray-200 w-full rounded-full overflow-hidden">
                  <div class="bg-blue-500 0 w-0 h-1.5" :style="{ width: video_selecionado.progress + '%' }"
                    role="progressbar" aria-valuenow="1456" aria-valuemin="0" aria-valuemax="4550"></div>
                </div>
                <span class="font-medium text-xs">{{
                  `${video_selecionado.progress}%`
                }}</span>
              </div>
            </div>
          </div>
          <div class="">
            <div class="flex flex-col">
              <div class="flex flex-row gap-x-5">
                <div class="mb-4 mt-6 w-full">
                  <label class="block text-gray-700 text-sm font-semibold mb-2" for="titulo">
                    Titulo
                  </label>
                  <input type="text" name="titulo" id="titulo" v-model="video_selecionado.titulo" class="
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
                  <label class="block text-gray-700 text-sm font-semibold mb-2" for="descricao">
                    Descricao
                  </label>
                  <input type="text" name="descricao" id="descricao" v-model="video_selecionado.descricao" class="
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
                  <label class="block text-gray-700 text-sm font-semibold mb-2" for="etapa">
                    Etapa
                  </label>
                  <select name="etapa" id="etapa" v-model="video_selecionado.etapa_id" class="
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
                  <label class="block text-gray-700 text-sm font-semibold mb-2" for="semanas">
                    Semamas
                  </label>
                  <select name="semanas" id="semanas" v-model="video_selecionado.semana_id" class="
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
                    <option v-for="semana in get_semanas" :key="semana.id" :value="semana.id">
                      {{ semana.titulo }}
                    </option>
                  </select>
                </div>
                <div class="mb-4 mt-6 w-full">
                  <label class="block text-gray-700 text-sm font-semibold mb-2" for="dias">
                    Dias
                  </label>
                  <select name="dias" id="dias" v-model="video_selecionado.dia_id" class="
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
                    <option v-for="dia in get_dias" :key="dia.id" :value="dia.id">
                      {{ dia.titulo }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="flex flex-row gap-2">
              <div class="mb-4 mt-6 w-full">
                <label class="block text-gray-700 text-sm font-semibold mb-2" for="professor">
                  Professor
                </label>
                <select name="professor" id="professor" v-model="video_selecionado.professor_id" class="
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
                  <option v-for="professor in professores" :key="professor.professor_id" :value="professor.professor_id">
                    {{ `${professor.primeiro_nome} ${professor.segundo_nome}` }}
                  </option>
                </select>
              </div>
              <div class="mb-4 mt-6 w-full">
                <label class="block text-gray-700 text-sm font-semibold mb-2" for="form">
                  Formulário
                </label>
                <input type="text" name="form" id="form" v-model="video_selecionado.form" class="
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
          </div>
        </fieldset>
        <fieldset :disabled="!check.editar">
          <div class="mb-4 mt-6">
            <div class="flex flex-row gap-x-5">
              <div class="flex items-center gap-x-1">
                <input v-model="video_selecionado.ativo" type="checkbox" name="ativo" id="ativo"
                  class="form-checkbox rounded-full p-2" />
                <label for="ativo" class="font-medium select-none">Ativo</label>
              </div>
              <div class="flex items-center gap-x-1">
                <input v-model="video_selecionado.autorizado" type="checkbox" name="autorizado" id="autorizado"
                  class="form-checkbox rounded-full p-2" />
                <label for="autorizado" class="font-medium select-none">Autorizado</label>
              </div>
            </div>
          </div>

          <div class="mb-4 mt-6">
            <div class="flex flex-row gap-x-5">
              <button class="bg-gray-500 p-2 rounded text-white font-medium" @click="limpar_edicao">
                Cancelar
              </button>
              <button class="bg-sky-600 p-2 rounded text-white font-medium" @click="editar_video">
                Salvar Edição
              </button>
              <VDropdown>
                <button class="bg-rose-600 p-2 rounded text-white font-medium" :disabled="loading">
                  {{ !loading ? 'Deletar' : 'Deletando...' }}
                </button>
                <template #popper>
                  <div class="p-4">
                    <p class="text-sm font-semibold">Confirma esta ação ?</p>
                    <div class="flex justify-center items-center gap-x-4 mt-2">
                      <button class="bg-rose-100 text-rose-500 py-1.5 px-3 text-sm font-bold rounded" v-close-popper
                        @click="onDeleteVideo">Sim</button>
                      <button class="hover:bg-gray-200 text-gray-600 py-1.5 px-3 text-sm rounded"
                        v-close-popper>Não</button>
                    </div>
                  </div>

                </template>
              </VDropdown>
            </div>
          </div>
        </fieldset>
      </section>
    </transition>
  </main>
</template>

<script>
import axios from "@/http/axios";
import { check_permission } from "@/permissoes";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Pesquisa",
  data() {
    return {
      loading: false,
      SN_options: [{ id: true, text: 'SIM' }, { id: false, text: 'NÃO' }],
      videos: [],
      professores: [],
      video_selecionado: null,
      video_update: null,
      index_item: -1,
      psq_videos: { semana_id: 0, dia_id: 0, txt_pesquisa: '', professor_id: '', etapa_id: '', ativo: true },
      PSQ_VIDEO_ATIVO: false,
      link: ''
    };
  },
  created() {
    this.obter_etapas();
    this.obter_escolas();
    this.obter_professores();
    this.obter_semanas();
    this.obter_dias();
  },
  computed: {
    ...mapGetters("helpers", [
      "get_etapas",
      "get_escola_id",
      "get_baseURL",
      "get_semanas",
      "get_dias",
    ]),
    check() {
      return check_permission("videos");
    },
  },
  watch: {
    'psq_videos.txt_pesquisa'(v) {
      if (!v.length) {
        this.videos = [];
        this.limpar_edicao();
      }
    },
    index_item() {
      this.video_update = null;
    },
  },
  filters: {
    formatar_data(data) {
      return new Date(data).toLocaleDateString();
    },
  },
  methods: {
    ...mapActions("helpers", [
      "obter_etapas",
      "obter_escolas",
      "obter_semanas",
      "obter_dias",
    ]),
    onDeleteVideo() {
      this.loading = !this.loading
      axios.delete(`/videos/deletar-video/${this.video_selecionado.video_id}`).then(({ data }) => {
        this.$modal.alert(data.mensagem)
        this.index_item = -1
        this.video_selecionado = null
        this.obter_videos()
      }).catch(err => {
        if (err.response) {
          this.$modal.error(err.response.data.message)
        }
      }).finally(() => {
        this.loading = !this.loading
      })
    },
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
    obter_videos() {
      var vld = this.valida_psq_video();
      if (!vld)
        return this.$modal.alert("INFO:: Inserir mais de um critério de pesquisa")

      axios
        .post("/admin/obterVideos", {
          params: {
            CRC: 9,
            dados: this.psq_videos,
          },
        })
        .then(({ data }) => {
          console.log(data);
          if (data.codigo == 0) {
            this.videos = data.dados;
            this.PSQ_VIDEO_ATIVO = false;

          } else {
            this.$modal.alert(data.mensagem);
          }



        })
        .catch((err) => {
          console.log(err);
        });
    },




    valida_psq_video() {
      var contador = 0;

      var {
        semana_id,
        dia_id,
        txt_pesquisa,
        professor_id,
        etapa_id,
        ativo,
      } = this.psq_videos

      if (semana_id != 0)
        contador += 1;

      if (dia_id != 0)
        contador += 1;

      if (txt_pesquisa != '')
        contador += 1;

      if (professor_id != '')
        contador += 1;

      if (etapa_id != '')
        contador += 1;

      if (ativo || !ativo)
        contador += 1;

      if (contador > 1)
        return true;
      else
        return false;


    },


    limpar_obter_videos() {
      this.video_selecionado = null;
      this.videos = [];
      this.psq_videos = { semana_id: 0, dia_id: 0, txt_pesquisa: '', professor_id: '', etapa_id: '', ativo: true };
    },

    selecionar_video(item, index) {
      if (!this.$parent.check.editar) return ;
      this.video_selecionado = Object.assign({ progress: 0 }, item);
      this.index_item = index;
      this.PSQ_VIDEO_ATIVO = false;

      axios.get(`/admin/streaming/${new Date().getTime()}`, {
        params: {
          hash: item.hash_video_id
        },
        headers: { Range: "bytes=0-" },
      }).then((response) => {
        const { link} = response.data
        this.$refs.videoplayer.src = link  
      })
  
    },
    editar_video() {
      axios
        .put("/admin/editarInformacoesVideo", {
          ...this.video_selecionado,
        })
        .then(({ data }) => {
          const { mensagem } = data;
          const etapa = this.get_etapas.filter(
            (etapa) => etapa.id === this.video_selecionado.etapa_id
          )[0].titulo;
          const { primeiro_nome, segundo_nome } = this.professores.filter(
            (professor) =>
              professor.professor_id === this.video_selecionado.professor_id
          )[0];
          const dia = this.get_dias.filter(
            (dia) => dia.id === this.video_selecionado.dia_id
          )[0].titulo;

          this.video_selecionado.etapa_titulo = etapa;
          this.video_selecionado.nome_professor = `${primeiro_nome} ${segundo_nome}`;
          this.video_selecionado.dia = dia;
          const newItem = Object.assign({}, this.video_selecionado);
          console.log(newItem);
          this.$set(this.videos, this.index_item, newItem);
          this.$modal.alert(mensagem);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async substituir_video({ target }) {
      const res = confirm(
        "Esta ação irá substituir o video atual, deseja prosseguir ?"
      );

      if (res) {
        this.$refs.videoplayer.pause();
        this.$refs.videoplayer.src = "";
        this.$refs.videoplayer.load();
        console.log(this.$refs.videoplayer);
        this.video_update = target.files[0];
        let { hash_video_id } = this.video_selecionado;
        const formData = new FormData();

        formData.append("video", this.video_update);
        formData.append("TESTE", "TESTE");
        axios
          .post("/admin/editarVideo", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              hash_video_id,
            },
            onUploadProgress: (progressEvent) => {
              const totalLength = progressEvent.lengthComputable
                ? progressEvent.total
                : progressEvent.target.getResponseHeader("content-length") ||
                progressEvent.target.getResponseHeader(
                  "x-decompressed-content-length"
                );
              if (totalLength !== null) {
                this.video_selecionado.progress = Math.round(
                  (progressEvent.loaded * 100) / totalLength
                );
              }
            },
          })
          .then(({ data }) => {
            const { mensagem } = data;
            this.$nextTick(() => {
              this.video_update = null;
            });
            this.$modal.alert(mensagem);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.video_update = null;
      }
      target.value = null;
    },
    limpar_edicao() {
      this.video_selecionado = null;
      this.index_item = -1;
    },
  },
};
</script>