<template>
  <div class="modal-wrapper">
    <div class="modal-background" @click="$emit('onClose')"></div>
    <div class="modal">
      <div class="modal__header">
        <div class="modal__header-title">
          {{ title }}
        </div>
        <slot name="header"/>
      </div>
      <div class="modal__content">
        <slot name="content"/>
      </div>
      <div class="modal__footer">
        <slot name="actions"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-modal",
  emits: ['onClose'],
  props: {
    title: {
      type: String,
      default: 'Modal'
    },
  },
};
</script>

<style lang="scss" src="./v-modal.scss" scoped/>
