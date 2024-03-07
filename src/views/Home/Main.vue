<template>
  <section class="home flex-1 flex flex-row bg-gray-100 overflow-scroll">
    <navbar>
      <navbar-item to="dashboard" label="Relatorios">
        <ph-chart-pie-slice size="32" weight="duotone" />
        <template v-slot:tooltip> Relatórios </template>
      </navbar-item>
      <navbar-item to="escola#pesquisa" label="Escolas">
        <ph-house-line :size="32" weight="duotone" />
        <template v-slot:tooltip> Escolas </template>
      </navbar-item>

      <navbar-item to="etapa#pesquisa" label="Etapas">
        <ph-books :size="32" weight="duotone" />
        <template v-slot:tooltip> Etapas </template>
      </navbar-item>

      <navbar-item to="semana#pesquisa" label="Semanas">
        <ph-gear :size="32" weight="duotone" />
        <template v-slot:tooltip> Semanas </template>
      </navbar-item>

      <navbar-item to="professor#pesquisa" label="Professores">
        <ph-chalkboard-teacher :size="32" weight="duotone" />
        <template v-slot:tooltip> Professores </template>
      </navbar-item>

      <navbar-item to="aluno#pesquisa" label="Alunos">
        <ph-student :size="32" weight="duotone" />
        <template v-slot:tooltip> Alunos </template>
      </navbar-item>

      <navbar-item to="video#pesquisa" label="Videos">
        <ph-video-camera :size="32" weight="duotone" />
        <template v-slot:tooltip> Videos </template>
      </navbar-item>

      <navbar-item to="usuarios#pesquisa" v-if="check_apps" label="Usuários">
        <ph-user :size="32" weight="duotone" />
        <template v-slot:tooltip> Usuários </template>
      </navbar-item>
    </navbar>

    <div class="bg-gray-50 flex-1 flex overflow-hidden">
      <transition
        enter-active-class="transition-all transform ease-out duration-300"
        enter-class="opacity-0 scale-95 translate-y-4"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all transform ease-in duration-200"
        leave-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4"
        mode="out-in"
      >
        <router-view />
      </transition>
    </div>
  </section>
</template>

<script>
import Navbar from "./components/Navbar/Navbar.vue";
import NavbarItem from "./components/Navbar/NavbarItem.vue";
import { check_apps } from "@/permissoes";
export default {
  name: "Home",
  components: { Navbar, NavbarItem },
  computed: {
    check_apps,
  },
};
</script>
