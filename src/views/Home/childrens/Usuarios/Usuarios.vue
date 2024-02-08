<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <header class="p-5 border-b">
      <span class="text-4xl font-bold">Usuários</span>
    </header>

    <main class="flex-1 flex gap-2 overflow-hidden">
      <section class="w-16 bg-gray-100 flex flex-col gap-5 py-5">
        <router-link to="#pesquisa" v-slot="{ isActive, navigate }" custom>
          <span
            @click="navigate"
            class="
              w-10
              h-10
              flex
              items-center
              justify-center
              bg-gray-50
              shadow
              rounded
              mx-auto
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              :class="{
                'text-amber-400': isActive,
                'text-gray-400': !isActive,
              }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </router-link>

        <router-link v-if="check.escrever" to="#inserir" v-slot="{ isActive, navigate }" custom>
          <span
            @click="navigate"
            class="
              w-10
              h-10
              flex
              items-center
              justify-center
              bg-gray-50
              shadow
              rounded
              mx-auto
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              :class="{
                'text-amber-400': isActive,
                'text-gray-400': !isActive,
              }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </span>
        </router-link>
      </section>

      <section class="flex-1 flex bg-gray-100 overflow-hidden">
        <transition
          enter-active-class="transition-all ease-out duration-100"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-all ease-out duration-75"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <component :is="changeCmp" />
        </transition>
      </section>
    </main>
  </div>
</template>

<script>
import Inserir from "./Inserir.vue";
import Pesquisa from "./Pesquisa.vue";
import { check_permission } from "@/permissoes";
export default {
  name: "Escola",

  components: {
    Inserir,
    Pesquisa,
  },

  data() {
    return {
      view: "Inserir",
    };
  },

  computed: {
    changeCmp() {
      if(this.check.escrever) {
        return this.$route.hash.replace("#", "")
      };
      
      return "pesquisa"
    },
    check() {
      return check_permission("usuarios");
    },
  },
};
</script>