<template>
  <transition
    name="fade"
    :appear="appear"
    :mode="mode"
  >
    <slot/>
  </transition>
</template>

<script>
export default {
  name: "animation-fade",
  props: {
    mode: {
      type: String,
      default: 'out-in'
    },
    appear: {
      type: Boolean,
      default: true
    }
  },
};
</script>

<style lang="scss" src="./animation-fade.scss" scoped/>
