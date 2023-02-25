<template>
  <component
      :is="tag"
      :class="[
      'btn',
      { 'btn--loading': loading },
      { 'btn--disabled': disabled },
      { 'btn--small': smallBtn }
    ]"
      :disabled="disabled"
      :to="to"
  >
    <v-loader v-if="loading"/>
    <slot v-else/>
  </component>
</template>

<script>
import { computed } from "vue";
import VLoader from "../v-loader/v-loader";

export default {
  name: "v-button",
  components: { VLoader },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    smallBtn: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
    }
  },
  setup(props) {
    const tag = computed(() => {
      return props.to ? 'router-link' : 'button';
    });

    return {
      tag
    };
  }
};
</script>

<style lang="scss" src="./v-button.scss" scoped/>
