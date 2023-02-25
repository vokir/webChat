<template>
  <div class="phone">
    <v-title
      title="Your Phone Number"
      desc="Please confirm your counrty code<br/>and enter your phone number."
    />
    <div class="phone-group">
      <country-select
        v-model="country"
        @onSelect="selectCountry"
      />
      <div class="phone-group__inputs">
        <v-input
          type="tel"
          classes="input-code"
          v-model="code"
          v-mask="'+###'"
          @input="selectCountryByCode"
        />
        <v-input
          type="tel"
          classes="input-phone"
          v-model="phone"
          v-mask="phoneMask"
          :placeholder="phonePlaceholder"
        />
      </div>
    </div>
    <v-button type="button" @click="verify">Next</v-button>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { and, maxLength, minLength, required } from "@vuelidate/validators";
import { useDebounceFn } from "@vueuse/core";
import { computed, ref } from "vue";
import countries from "../../../helpers/countries";
import CountrySelect from "../../ui/country-select/country-select";
import VButton from "../../ui/v-button/v-button";
import VInput from "../../ui/v-input/v-input";
import VTitle from "../../ui/v-title/v-title";
import {mask} from 'vue-the-mask'

export default {
  name: "auth-phone",
  emits: ['onPhoneCorrect'],
  components: { VButton, VTitle, VInput, CountrySelect },
  directives: { mask },
  setup(_, {emit}) {
    const country = ref({
      "name": "Russian Federation",
      "code": "+7",
      "iso": "RU",
      "flag": "https://cdn.kcak11.com/CountryFlags/countries/ru.svg",
      "mask": "### ### ####"
    })
    const code = ref('+7')
    const phone = ref('')
    const phoneMask = ref('### ### ####')
    const phonePlaceholder = ref('--- --- ----')

    const rawComputedPhone = computed(() => {
      return `${code.value} ${phone.value}`
    })

    const rules = {
      phone: {
        required,
        shouldBeChecked: and(minLength(4), maxLength(phonePlaceholder.value.length + code.value.length))
      }
    }

    const v$ = useVuelidate(rules, { phone: rawComputedPhone })

    const verify = async () => {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) return

      emit('onPhoneCorrect', rawComputedPhone.value)
    }

    const selectCountry = (data, selectCountry = false) => {
      if (selectCountry) {
        country.value = data;
      }
      phone.value = ''
      code.value = data.code;
      phoneMask.value = data.mask;
      phonePlaceholder.value = Array.isArray(data.mask) ? data.mask[0].replaceAll('#', '-') : data.mask.replaceAll('#', '-')
    }

    const selectCountryByCode = useDebounceFn((val) => {
      const res = countries.filter(country => country.code === val.target.value)
      if (res.length) {
        selectCountry(res[0], true)
      }
    }, 500)


    return {
      country,
      code,
      phone,
      phoneMask,
      phonePlaceholder,
      selectCountryByCode,
      rawComputedPhone,
      v$,
      selectCountry,
      verify,
    }
  }
};
</script>

<style lang="scss" src="./auth-phone.scss" scoped/>
