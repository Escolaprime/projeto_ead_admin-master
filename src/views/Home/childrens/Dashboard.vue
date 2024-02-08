<template>
  <div class="flex-1 flex flex-col h-full overflow-y-auto">
    <header class="p-5 border-b">
      <span class="text-4xl font-medium">Relatórios</span>
    </header>
    <main class="p-5">
      <p class="">Escolha o intervalo de datas</p>
      <div class="mt-3">
        <v-date-picker name="start-date" is-range v-model="params.date" />
      </div>
      <div class="mt-4">
        <label for="">Escolha o tipo do relátorio</label>
        <div class="flex items-center my-4">
          <input id="login-mensal" v-model="params.report" type="radio" value="login" name="login-mensal"
            class="form-radio">
          <label for="login-mensal" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Relatório de
            logins mensais</label>
        </div>
        <div class="flex items-center">
          <input id="video-assistido" v-model="params.report" type="radio" value="video" name="video-assistido"
            class="form-radio">
          <label for="video-assistido" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Relatório de
            videos assistidos</label>
        </div>
        <div class="flex items-center mt-4">
          <input id="log" v-model="params.report" type="radio" value="log" name="log" class="form-radio">
          <label for="log" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Relatório de logs</label>
        </div>
        <div class="flex items-center mt-4">
          <input id="form" v-model="params.report" type="radio" value="form" name="form" class="form-radio">
          <label for="form" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Relatório de cliques no
            formulário</label>
        </div>
      </div>
      <div class="mt-4" v-if="params.report">
        <button @click="onDownloadReport" class="bg-sky-600 py-2 px-4 rounded text-white font-medium" :disabled="loading">
          {{ loading ? 'Baixando' : 'Download' }}
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "@/http/axios";
export default {
  name: "Dashboard",
  data() {
    const today = new Date()
    return {
      loading: false,
      params: {
        date: {
          start: today,
          end: today
        },
        report: null
      }
    }
  },
  methods: {
    async onDownloadReport() {
      this.loading = !this.loading
      try {
        const response = await axios.get('/relatorios/downloads', {
          params: this.params,
          responseType: 'blob'
        })
        const href = URL.createObjectURL(response.data)
        const link = document.createElement('a');
        const dates = this.params.date
        const label = `${dates.start.getDate()}-${dates.start.getMonth()}-${dates.start.getFullYear()}_${dates.end.getDate()}-${dates.end.getMonth()}-${dates.end.getFullYear()}`
        link.href = href;
        link.setAttribute('download', `relatorio-${this.params.report}-${label}.xlsx`);
        link.click();
      } catch (error) {
        console.log(error)
        this.$modal.error('Error ao baixar relatório')
      } finally {
        this.loading = !this.loading
      }
    },
  },
};
</script>