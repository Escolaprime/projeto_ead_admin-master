<template>
  <div
    class="
      flex-1
      bg-blue-100
      flex
      items-center
      p-5
      lg:p-20
      overflow-hidden
      relative
    "
  >
    <div
      class="
        flex-1
        min-h-full min-w-full
        rounded-3xl
        bg-white
        shadow-xl
        p-10
        lg:p-20
        text-gray-800
        relative
        md:flex
        items-center
        text-center
        md:text-left
      "
    >
      <div class="w-full md:w-1/2 mx-auto">
        <div class="mb-10 md:mb-20 text-gray-600">
          <h1
            class="
              font-black
              uppercase
              text-3xl
              lg:text-5xl
              text-lightBlue-500
              mb-10
            "
          >
            Você parece estar perdido!
          </h1>
          <p class="text-lg">
            A página que você está procurando <span class="font-medium">não está disponível ou não existe</span>.
          </p>
          <p class="text-lg">
            Tente pesquisar novamente ou use o botão Voltar abaixo.
          </p>
        </div>
        <div class="mb-20 md:mb-0">
          <router-link
            to="/"
            class="
              text-lg
              font-light
              outline-none
              focus:outline-none
              transition-all
              duration-300
              ease-out
              bg-sky-500 p-5 rounded px-7 text-white
            "
          >
            Voltar
          </router-link>
        </div>
      </div>
    </div>
    <div
      class="
        w-64
        md:w-96
        h-96
        md:h-full
        bg-amber-200 bg-opacity-30
        absolute
        -top-64
        md:-top-96
        right-20
        md:right-32
        rounded-full
        pointer-events-none
        -rotate-45
        transform
      "
    ></div>
    <div
      class="
        w-96
        h-full
        bg-lightBlue-200 bg-opacity-20
        absolute
        -bottom-96
        right-64
        rounded-full
        pointer-events-none
        -rotate-45
        transform
      "
    ></div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>