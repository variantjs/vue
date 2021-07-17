<template>
  <div>
    <rich-select-trigger ref="trigger" />

    <div
      ref="dropdown"
    />
  </div>
</template>

<script lang="ts">
import {
  InputOptions, TRichSelectConfig, TRichSelectClassesKeys, TRichSelectClassesValidKeys,
} from '@variantjs/core';
import {
  computed, defineComponent, PropType, provide,
} from 'vue';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { useAttributes, useConfigurationWithClassesList } from '../use';
import { TRichSelectOptions, TSelectValue } from '../types';
import RichSelectTrigger from './TRichSelect/RichSelectTrigger.vue';
// @vue/component
export default defineComponent({
  name: 'TRichSelect',
  components: {
    RichSelectTrigger,
  },
  props: {
    ...getVariantPropsWithClassesList<TRichSelectOptions, TRichSelectClassesValidKeys>(),
    modelValue: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<TSelectValue>,
      default: undefined,
    },
    options: {
      type: [Array, Object] as PropType<InputOptions>,
      default: undefined,
    },
    multiple: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      type: String,
      default: undefined,
    },

    // modelValue?: TSelectValue,
    // options?: InputOptions,
    // multiple?: boolean,
    // valueAttribute?: boolean,
    // textAttribute?: boolean,
    // delay?: number,
    // fetchOptions?: (query: string, nextPage?: number) => AjaxResults,
    // minimumInputLength?: number,
    // minimumInputLengthText?: ((minimumInputLength: number, query?: string) => string) | string,
    // minimumResultsForSearch?: number,
    // hideSearchBox?: boolean,
    // openOnFocus?: boolean,
    // closeOnSelect?: boolean,
    // selectOnClose?: boolean,
    // clearable?: boolean,
    // placeholder?: string,
    // searchBoxPlaceholder?: string,
    // noResultsText?: string,
    // searchingText?: string,
    // loadingMoreResultsText?: string,
    // maxHeight?: number,
  },
  setup() {
    const configuration = useConfigurationWithClassesList<TRichSelectOptions>(TRichSelectConfig, TRichSelectClassesKeys);
    const attributes = useAttributes<TRichSelectOptions>(configuration);

    provide('placeholder', computed(() => configuration.value.placeholder));

    provide('classesList', computed(() => configuration.value.classesList));

    return { configuration, attributes };
  },
});

</script>
