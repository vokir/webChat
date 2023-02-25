<template>
  <div class="form-group">
    <v-title
      title="+7 912 312 3123"
      desc="A code was sent via SMS to your <br/>phone number."
    />
    <v-input placeholder="code" v-model="code"/>
    <v-button>Next</v-button>
  </div>
</template>

<script>
import { ref } from "vue";
import VButton from "../../ui/v-button/v-button";
import VInput from "../../ui/v-input/v-input";
import VTitle from "../../ui/v-title/v-title";
export default {
  name: "auth-code",
  components: { VButton, VTitle, VInput },
  setup() {
    const code = ref('')

    return {
      code
    }
  }
};
</script>

<style scoped>

</style>
