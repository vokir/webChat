<template>
  <empty-layout>
    <div class="start-header">
      <v-icon
        height="48"
        name="logo"
        width="48"
      />
    </div>
    <div class="start-block">
      <v-title
        title="Web Chat"
        desc="Welcome to the Web Chat app.<br/>it's simple and fast."
        align="center"
      />
      <v-button to="/auth">Start Messaging</v-button>
    </div>
  </empty-layout>
</template>

<script>
import VButton from "../../components/ui/v-button/v-button";
import VIcon from "../../components/ui/v-icon/v-icon";
import VTitle from "../../components/ui/v-title/v-title";
import EmptyLayout from "../../layouts/empty-layout/empty-layout";

export default {
  name: "start-page",
  components: { VButton, VTitle, VIcon, EmptyLayout }
};
</script>

<style lang="scss" scoped src="./start-page.scss"/>
