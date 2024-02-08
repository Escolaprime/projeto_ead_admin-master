<template>
  <aside class="w-32 flex flex-col gap-5 items-center bg-white border-r p-4">
    <div class="">
      <img src="@/assets/icon.png" class="rounded w-20 h-auto" />
    </div>

    <navbar-list>
      <slot />
    </navbar-list>

    <div class="mt-auto">
      <button
        class="p-2 rounded bg-rose-600 text-sm font-medium text-white flex items-center gap-x-2"
        @click="logout"
      >
        <ph-sign-out :size="24" />
        Sair
      </button>
    </div>
  </aside>
</template>

<script>
import NavbarList from "./NavbarList.vue";
import { mapActions } from "vuex";

export default {
  name: "Navbar",
  components: { NavbarList },
  methods: {
    ...mapActions("auth", ["logout"]),
  },
};
</script>

<style></style>
