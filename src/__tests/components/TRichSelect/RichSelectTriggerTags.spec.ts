import { NormalizedOption } from '@variantjs/core';
import { shallowMount } from '@vue/test-utils';
import { computed } from 'vue';
import RichSelectTriggerTags from '../../../components/TRichSelect/RichSelectTriggerTags.vue';

describe('RichSelectTriggerTags', () => {
  it('it renders every option', () => {
    const selectedOptions = computed<NormalizedOption[]>(() => [
      { value: 'a', text: 'Value A' },
      { value: 'b', text: 'Value B' },
      { value: 'c', text: 'Value C' },
    ]);

    const wrapper = shallowMount(RichSelectTriggerTags, {
      global: {
        provide: {
          selectedOption: selectedOptions,
        },
      },
    });

    expect(wrapper.findAll('rich-select-trigger-tags-tag-stub')).toHaveLength(3);
    expect(Object.keys(wrapper.find('rich-select-trigger-tags-tag-stub').attributes())).toEqual(['option']);
  });
});
