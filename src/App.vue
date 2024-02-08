<template>
  <main id="app" class="h-screen flex overflow-hidden">
    <transition
      enter-active-class="transition-all transform ease-out duration-300"
      enter-class="opacity-0 translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all transform ease-in duration-200"
      leave-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-full"
      mode="out-in"
    >
      <router-view />
    </transition>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "App",
  created() {
    this.obter_escolas();
    this.obter_etapas();
  },
  methods: {
    ...mapActions("helpers", ["obter_escolas", "obter_etapas"])
  }
};
</script>