<template>
  <div :class="['input-group', classes]">
    <input
      v-bind="$attrs"
      :class="[
        'input-group__input',
        { 'input-group__input--error': error },
        { 'input-group__input--background': background }
       ]"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span class="input-group__bar"/>
    <slot name="icon"/>
  </div>
</template>

<script>
export default {
  name: "v-input",
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: false,
      default: ''
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    },
    classes: {
      type: [String, [String]],
      required: false,
    },
    background: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped src="./v-input.scss"/>
