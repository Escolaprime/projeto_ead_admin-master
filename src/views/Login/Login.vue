<template>
  <div class=" flex-1 flex flex-col justify-center items-center bg-gray-100">
    <div
      class="
        container
        max-w-md
        mx-auto
        xl:max-w-3xl
        flex
        bg-white
        rounded-lg
        shadow
        overflow-hidden
      "
    >
      <div class="relative hidden xl:block xl:w-1/2 h-full">
        <img
          class="absolute h-full w-full object-cover"
          src="@/assets/icon.png"
          alt="Logo Projeto"
        />
      </div>
      <div class="w-full xl:w-1/2 p-8">
        <div>
          <h1 class="text-2xl font-bold">Entre com sua conta</h1>
          <div class="mb-4 mt-6">
            <label
              class="block text-gray-700 text-sm font-semibold mb-2"
              for="email"
            >
              E-mail
            </label>
            <input
              type="text"
              name="email"
              id="email"
              v-model="user.email"
              class="
                form-input
                focus:ring-lightBlue-400
                focus:border-lightBlue-400
                block
                w-full
                shadow-sm
                sm:text-sm
                border-gray-300
                rounded-md
              "
            />
          </div>
          <div class="mb-6 mt-6">
            <label
              class="block text-gray-700 text-sm font-semibold mb-2"
              for="password"
            >
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              v-model="user.password"
              @keyup.enter="autenticacao"
              class="
                form-input
                focus:ring-lightBlue-400
                focus:border-lightBlue-400
                block
                w-full
                shadow-sm
                sm:text-sm
                border-gray-300
                rounded-md
              "
            />
          </div>
          <div class="flex w-full mt-8">
            <button
              @click="autenticacao"
              class="
                inline-flex
                w-full
                justify-center
                py-2
                px-4
                border border-transparent
                shadow-sm
                text-sm
                font-medium
                rounded-md
                text-white
                bg-lightBlue-600
                hover:bg-lightBlue-700
                focus:ring-2 focus:ring-offset-2 focus:ring-lightBlue-500
              "
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    ...mapActions("auth", ["login"]),

    async autenticacao(ev) {
      //ev.target.blur();
      try {
        await this.login(this.user);
        this.$router.push({ path: "/Home/escola" });
      } catch (error) {
        if (error.response) {
          //const { mensagem } = error.response.data;
          this.$modal.alert("ERRO:: Erro na Autenticação");
        } else {
          this.$modal.alert(error);
        }
      }
    },
  },
};
</script>
