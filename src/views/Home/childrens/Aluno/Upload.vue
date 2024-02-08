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
      <div class="flex">
        <div class="mb-4 mt-6">
          <div>
            <label for="upload-csv" class="block text-gray-700 text-sm font-semibold mb-2">Selecione o arquivo</label>
            <div class="flex items-center gap-x-2.5 mb-4">
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none form-input"
                id="upload-csv" ref="upload-csv" type="file" accept=".csv" @change="onChange" />
              <button class="p-1.5 bg-gray-100 rounded-md text-gray-400 hover:text-gray-600" v-if="file" @click="onClear">
                <ph-x />
              </button>
            </div>
            <button v-if="file" @click="onUpload" :disabled="loading"
              class="inline-flex items-center gap-x-2.5 bg-sky-600 hover:bg-sky-700 hover:text-sky-100 rounded-md p-2.5 text-sky-50">
              <ph-spinner class="animate-spin" size="28" v-if="loading" />
              <ph-upload size="24" v-else />
              {{ loading ? 'Enviando arquivo...' : 'Upload' }}
            </button>
          </div>
        </div>
      </div>
      <div v-if="erros.length">
        <div class="bg-rose-50 p-5 rounded-md container max-w-2xl">
          <button @click="erros = []" class="bg-rose-100 hover:bg-rose-200 text-rose-500 p-1.5 rounded-md">
            <ph-trash />
          </button>
          <ul class="pt-6 space-y-4 divid overflow-y-scroll max-h-96">
            <li class="flex items-start gap-x-4 hover:bg-rose-100 p-2 rounded" v-for="(error, index) in erros"
              :key="`aluno-error-${index}`">
              <ph-warning size="24" class="text-rose-500" />
              <div class="">
                <p class=" text-rose-700">
                  {{ error.aluno.primeiro_nome }}
                  <span class="text-sm text-rose-600">Mat. {{ error.aluno.numero_matricula }}</span>
                </p>
                <span class="text-xs font-medium text-rose-500">{{ error.error }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from '@/http/axios'

export default {
  data() {
    return {
      file: null,
      erros: [],
      loading: false
    }
  },
  methods: {
    onUpload() {
      const form = new FormData()
      form.append('csv', this.file)
      this.loading = true
      axios.post('/alunos/csv/upload', form).then(({ data }) => {
        if (!data.erros.length) {
          return this.$modal.alert(data.mensagem)
        }
        this.erros = data.erros
        // this.onClear()
      }).catch((err) => {
        if (err.response) {
          const { message } = err.response.data
          this.$modal.error(message)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    onChange(ev) {
      const [file] = ev.target.files
      this.file = file
    },
    onClear() {
      this.file = null
      this.$refs['upload-csv'].value = null
      this.erros = []
    }
  }
}
</script>