<template>
  <router-view v-slot="{ Component }">
    <animation-fade>
      <component :is="Component"/>
    </animation-fade>
  </router-view>
</template>

<script>
import AnimationFade from "./components/ui/animation-fade/animation-fade";

export default {
  name: 'app',
  components: {
    AnimationFade,
  }
};
</script>

<style lang="scss" src="./assets/styles"/>
