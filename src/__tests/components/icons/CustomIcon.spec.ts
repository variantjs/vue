import { mount } from '@vue/test-utils';
import CustomIcon from '@/icons/CustomIcon.vue';
import CloseIcon from '@/icons/CloseIcon.vue';

describe('CustomIcon.vue', () => {
  it('accepts a SVG string as a closeIcon', async () => {
    const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M12.707" clip-rule="evenodd"></path>
  </svg>`;
    const wrapper = mount(CustomIcon, {
      props: {
        icon,
      },
    });

    expect(wrapper.vm.$el.innerHTML).toContain('<path fill-rule="evenodd" d="M12.707" clip-rule="evenodd"');
  });

  it('strips malicious attributes', async () => {
    const icon = `<svg onload="alert(document.cookie)"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M12.707" clip-rule="evenodd"></path>
  </svg>`;
    const wrapper = mount(CustomIcon, {
      props: {
        icon,
      },
    });

    expect(wrapper.vm.$el.innerHTML).not.toContain('document.cookie');
  });

  it('accepts another vue component as a custom icon', async () => {
    // Supress Vue received a Component which was made a reactive object.This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref
    // @TODO consider an alternative to this
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    const wrapper = mount(CustomIcon, {
      props: {
        icon: CloseIcon,
      },
    });

    expect(wrapper.vm.$el.innerHTML).toContain('M6 18L18 6M6 6l12 12');
  });
});
