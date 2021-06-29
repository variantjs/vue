import { shallowMount } from '@vue/test-utils';
import TTag from '@/components/TTag.vue';

describe('TTag.vue', () => {
  it('renders the component without errors', () => {
    const wrapper = shallowMount(TTag);
    expect(wrapper.vm.$el.tagName).toBe('DIV');
  });

  it('accepts a different tag for the wrapper', () => {
    const wrapper = shallowMount(TTag, {
      props: {
        tagName: 'table',
      },
    });
    expect(wrapper.vm.$el.tagName).toBe('TABLE');
  });

  it('renders the default slot content', () => {
    const wrapper = shallowMount(TTag, {
      slots: {
        default: 'Im a tag!',
      },
    });

    expect(wrapper.vm.$el.innerHTML).toBe('Im a tag!');
  });

  it('prioritizes slot over test prop', () => {
    const wrapper = shallowMount(TTag, {
      props: {
        text: 'Im a tag!',
      },
      slots: {
        default: 'default slot',
      },
    });

    expect(wrapper.vm.$el.innerHTML).toBe('default slot');
  });

  it('adds the attributes', () => {
    const wrapper = shallowMount(TTag, {
      slots: {
        default: 'default slot',
      },
      attrs: {
        id: 'my-id',
      },
    });

    expect(wrapper.html()).toBe('<div id="my-id">default slot</div>');
  });

  it('adds the attributes from the configuration', () => {
    const wrapper = shallowMount(TTag, {
      global: {
        provide: {
          configuration: {
            TTag: {
              'custom-attribute': 'Hello World!',
            },
          },
        },
      },
    });

    expect(wrapper.html()).toBe('<div custom-attribute="Hello World!"></div>');
  });

  it('used the props from global configuration', () => {
    const wrapper = shallowMount(TTag, {
      global: {
        provide: {
          configuration: {
            TTag: {
              tagName: 'table',
              text: 'Copyright @alfonsobires',
            },
          },
        },
      },
    });

    expect(wrapper.vm.$el.tagName).toBe('TABLE');
    expect(wrapper.vm.$el.innerHTML).toBe('Copyright @alfonsobires');
  });
});
