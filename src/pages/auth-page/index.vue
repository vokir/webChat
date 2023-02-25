<template>
  <empty-layout>
    <div class="header-auth">
      <router-link to="/">
        <v-icon
          name="back-arrow"
          width="24"
          height="24"
        />
      </router-link>
      <v-button small-btn>SETTINGS</v-button>
    </div>
    <form class="form" @submit.prevent>
      <keep-alive>
        <auth-phone
          v-if="isPhoneStep"
          @onPhoneCorrect="isPhoneStep = false"
        />
        <auth-code v-else/>
      </keep-alive>
    </form>
  </empty-layout>
</template>

<script>
import { ref } from "vue";
import AuthCode from "../../components/auth/auth-code/auth-code";
import AuthPhone from "../../components/auth/auth-phone/auth-phone";
import VButton from "../../components/ui/v-button/v-button";
import VIcon from "../../components/ui/v-icon/v-icon";
import EmptyLayout from "../../layouts/empty-layout/empty-layout";

export default {
  name: "auth",
  components: { VButton, AuthCode, AuthPhone, VIcon, EmptyLayout },
  setup() {
    const isPhoneStep = ref(true)

    return {
      isPhoneStep
    }
  }
};
</script>

<style lang="scss" src="./auth-page.scss" scoped/>
