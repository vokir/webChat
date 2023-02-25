<template>
  <div :class="[
    'container-title',
    {
      ['container-title--'+ align]: align
    }
  ]">
    <div class="title">
      {{ title }}
    </div>
    <div
      v-if="desc.length"
      class="description"
      v-html="desc"
    />
  </div>
</template>

<script>
export default {
  name: "v-title",
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: false
    },
    align: {
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'center', 'right'].includes(value);
      }
    }
  }
};
</script>

<style lang="scss" src="./v-title.scss" scoped/>
