<template>
  <div class="recaptcha-container"/>
</template>

<script>
import { RecaptchaVerifier } from "firebase/auth";
import { onMounted } from "vue";
import { auth } from "../../model";

export default {
  name: "recaptcha",
  emits: ['onCallback', 'onExpired'],
  setup(_, { emit }) {
    onMounted(() => {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          emit('onCallback', response)
        },
        'expired-callback': () => {
          emit('onExpired')
        }
      }, auth);
    })
  }
};
</script>
