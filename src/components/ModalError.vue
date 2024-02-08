<template>
  <div tabindex="0" ref="da-modal" @keyup.esc="close" class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="show">
    <div class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block
        sm:p-0
      ">
      <transition-group enter-active-class="transition-opacity ease-out duration-200" enter-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity ease-in duration-300"
        leave-class="opacity-100" leave-to-class="opacity-0" appear>
        <div v-if="show" key="backdrop" @click.stop="close"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span key="backdrop-utils" class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true">&#8203;</span>
      </transition-group>

      <transition enter-active-class="transition-transform transform ease-out duration-300"
        enter-class="-translate-y-full" enter-to-class="translate-y-0"
        leave-active-class="transition-transform transform ease-in duration-200" leave-class="translate-y-10"
        leave-to-class="translate-y-0" appear appear-active-class="z-30">
        <div v-if="show" class="
              inline-block
              w-full
              bg-white
              rounded-lg
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              sm:my-8
              sm:align-top
              sm:max-w-lg
              sm:w-full
          ">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="
                  mx-auto
                  flex-shrink-0 flex
                  items-center
                  justify-center
                  h-12
                  w-12
                  rounded-full
                  text-rose-600
                  bg-rose-100
                  sm:mx-0
                  sm:h-10
                  sm:w-10
                  ">
                <ph-warning size="24" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Projeto Aprendizagem
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ mensagem }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" @click="close" ref="close-button" class="
                  w-full
                  justify-center
                  rounded-md
                  border border-transparent
                  shadow-sm
                  px-4
                  py-2
                  bg-gray-200
                  text-base
                  font-medium
                  text-gray-600
                  hover:bg-gray-300
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                  sm:ml-3
                  sm:w-auto
                  sm:text-sm
              ">
              Fechar
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "da-modal",
  data() {
    return {
      show: true,
      resolve: null,
      mensagem: null
    }
  },
  methods: {
    showModal(mensagem) {
      return new Promise((resolve, reject) => {
        this.mensagem = mensagem;
        this.resolve = resolve;
      })
    },
    close() {
      this.show = false;
      this.resolve && this.resolve();
      this.$destroy();
      this.$el.remove();
    }
  },
  mounted() {
    this.$refs['da-modal'].focus()
  }
};
</script>