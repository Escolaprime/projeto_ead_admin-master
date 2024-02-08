<template>
  <div class="flex-1 flex flex-col h-full">
    <header class="p-5 border-b">
      <span class="text-4xl font-bold">Escola</span>
    </header>

    <main class="flex flex-row gap-2 overflow-y-auto  h-full bg-gray-100">
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
                'text-primary': isActive,
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

        <router-link to="#inserir" v-slot="{ isActive, navigate }" custom>
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
                'text-primary': isActive,
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

      <section class="flex-1 flex bg-gray-100 overflow-y-auto">
        <component :is="changeCmp" />
      </section>
    </main>
  </div>
</template>

<script>
import Pesquisa from "./Pesquisa.vue";
import Inserir from "./Inserir.vue";
export default {
  name: "Escola",
  components: { Pesquisa, Inserir },
  data() {
    return {
      view: "Pesquisa",
    };
  },

  computed: {
    changeCmp() {
      return this.$route.hash.replace("#", "");
    },
  },
};
</script>
