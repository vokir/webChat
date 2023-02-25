<template>
  <svg
    class="icon"
    aria-hidden="true"
    :width="width"
    :height="height"
  >
    <use
      :xlink:href="`#${name}`"
    />
  </svg>
</template>

<script>
export default {
  name: "v-icon",
  props: {
    width: {
      type: String,
      default: '24'
    },
    height: {
      type: String,
      default: '24'
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./v-icon.scss" scoped/>
