<template>
  <multipane class="main-layout">
    <div class="main-layout__sidebar">
      sidebar
    </div>

    <multipane-resizer/>

    <div class="main-layout__content">
      <slot></slot>
    </div>

    <div class="main-layout__info">
      info
    </div>
  </multipane>
</template>

<script>
import Multipane from '../../components/ui/multipane/multipane';
import MultipaneResizer from '../../components/ui/multipane/multipane-resizer/multipane-resizer';

export default {
  name: "layout",
  components: {
    Multipane,
    MultipaneResizer,
  },
};
</script>

<style lang="scss" src="./main-layout.scss" scoped/>
