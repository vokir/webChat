<template>
  <div class="select-country">
    <v-input
      v-model="selected.name"
      readonly
      @click.prevent="toggle(true)"
    >
      <template #icon>
        <v-icon
          :class="[
            'icon',
            {'icon--rotate': isOpen }
          ]"
          height="12"
          name="down-arrow"
          width="12"
        />
      </template>
    </v-input>
    <animation-fade>
      <v-modal
        v-if="isOpen"
        title="Select Country"
        @onClose="toggle(false)"
      >
        <template #header>
          <v-input
            v-model="search"
            background
            classes="search"
            placeholder="Search"
          />
        </template>
        <template #content>
          <ul v-if="filteredList.length" class="country-list">
            <li
              v-for="option in filteredList"
              :class="['country-list__item', {
                'country-list__item--selected': option.iso === selected.iso
              }]"
              @click="select(option)"
            >
              <span class="country-list__item-name">
                {{ option.name }}
              </span>
              <span class="country-list__item-code">
                {{ option.code }}
               </span>
            </li>
          </ul>
          <div v-else class="not-found">
            No countries found
          </div>
        </template>
        <template #actions>
          <v-button small-btn @click="toggle(false)">
            Close
          </v-button>
        </template>
      </v-modal>
    </animation-fade>
  </div>
</template>

<script>
import { useToggle } from "@vueuse/core";
import { computed, onUpdated, ref } from "vue";
import countries from '../../../helpers/countries';
import AnimationFade from "../animation-fade/animation-fade";
import VButton from "../v-button/v-button";
import VIcon from "../v-icon/v-icon";
import VInput from "../v-input/v-input";
import VModal from "../v-modal/v-modal";

export default {
  name: "country-select",
  components: { VButton, VModal, AnimationFade, VIcon, VInput },
  emits: ['update:modelValue', 'onSelect'],
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props, { emit }) {
    const [isOpen, toggle] = useToggle(false);
    const selected = ref(Object.keys(props.modelValue).length ? props.modelValue : { name: 'Country Code' });
    const search = ref('');

    const filteredList = computed(() => {
      if (!search.value) return countries;
      const regEx = new RegExp(/^-?\d+$/);

      return countries.filter(country => {
        if (regEx.test(search.value)) {
          return country.code.includes(search.value);
        } else {
          return country.name.toLowerCase().includes(search.value.toLowerCase());
        }
      });
    });

    const select = (item) => {
      emit('update:modelValue', item);
      emit('onSelect', item);
      selected.value = item;
      toggle(false);
    };

    onUpdated(() => {
      selected.value = props.modelValue
    })

    return {
      isOpen,
      toggle,
      selected,
      search,
      filteredList,
      select,
    };
  }
};
</script>

<style lang="scss" scoped src="./country-select.scss"/>
