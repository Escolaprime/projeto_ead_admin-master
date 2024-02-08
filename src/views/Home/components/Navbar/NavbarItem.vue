<template>
  <router-link
    :to="to"
    active-class="border-gray-700"
    class="
      py-2 px-1.5
      flex flex-col
      justify-center
      items-center
      bg-primary
      text-secondary
      cursor-pointer
      rounded
      relative
      border border-transparent
      hover:border-gray-700
      group
    "
  >
    <slot />
    <span class="text-xs font-medium mt-1.5 inline-block">{{ label }}</span>
    <navbar-tooltip>
      <slot name="tooltip" />
    </navbar-tooltip>
  </router-link>
</template>

<script>
import NavbarTooltip from "./NavbarItemTooltip.vue";

export default {
  name: "NavbarItem",
  props: {
    to: {
      type: String | Object,
      default: () => "#",
    },
    label: {
      type: String,
    },
  },
  components: { NavbarTooltip },
};
</script>
