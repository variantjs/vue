import { shallowMount } from '@vue/test-utils';
import TCard from '@/components/TCard.vue';
import { TCardTheme } from '@variantjs/core';

describe('TCard.vue', () => {
  it('renders the component without errors', () => {
    const wrapper = shallowMount(TCard);
    expect(wrapper.vm.$el.tagName).toBe('DIV');
  });

  it('accepts a different tag for the wrapper', () => {
    const wrapper = shallowMount(TCard, {
      props: {
        tagName: 'table',
      },
    });
    expect(wrapper.vm.$el.tagName).toBe('TABLE');
  });

  it('renders the default slot content', () => {
    const wrapper = shallowMount(TCard, {
      slots: {
        default: 'Im a card!',
      },
    });

    expect(wrapper.vm.$el.querySelector('div').innerHTML).toBe('Im a card!');
  });

  it('doesnt have title or footer by default', () => {
    const wrapper = shallowMount(TCard, {
      slots: {
        default: 'Im a card!',
      },
    });

    expect(wrapper.vm.$el.querySelectorAll('div').length).toBe(1);
  });

  it('adds the header slot', () => {
    const wrapper = shallowMount(TCard, {
      slots: {
        header: 'Im a header!',
        default: 'Im a card!',
      },
    });

    expect(wrapper.vm.$el.querySelectorAll('div').length).toBe(2);
    expect(wrapper.vm.$el.querySelectorAll('div')[0].innerHTML).toBe('Im a header!');
  });

  it('adds the footer slot', () => {
    const wrapper = shallowMount(TCard, {
      slots: {
        default: 'Im a card!',
        footer: 'Im a footer!',
      },
    });

    expect(wrapper.vm.$el.querySelectorAll('div').length).toBe(2);
    expect(wrapper.vm.$el.querySelectorAll('div')[1].innerHTML).toBe('Im a footer!');
  });

  it('adds the header prop', () => {
    const wrapper = shallowMount(TCard, {
      props: {
        header: 'Im a header!',
      },
      slots: {
        default: 'Im a card!',
      },
    });

    expect(wrapper.vm.$el.querySelectorAll('div').length).toBe(2);
    expect(wrapper.vm.$el.querySelectorAll('div')[0].innerHTML).toBe('Im a header!');
  });

  it('adds the footer prop', () => {
    const wrapper = shallowMount(TCard, {
      props: {
        footer: 'Im a footer!',
      },
      slots: {
        default: 'Im a card!',
      },

    });

    expect(wrapper.vm.$el.querySelectorAll('div').length).toBe(2);
    expect(wrapper.vm.$el.querySelectorAll('div')[1].innerHTML).toBe('Im a footer!');
  });

  it('adds the body prop', () => {
    const wrapper = shallowMount(TCard, {
      props: {
        body: 'Im a card!',
      },
    });

    expect(wrapper.vm.$el.querySelectorAll('div').length).toBe(1);
    expect(wrapper.vm.$el.querySelector('div').innerHTML).toBe('Im a card!');
  });

  it('prioritizes props over slots', () => {
    const wrapper = shallowMount(TCard, {
      props: {
        header: 'Im a header!',
        body: 'Im a card!',
        footer: 'Im a footer!',
      },
      slots: {
        default: 'default slot',
        header: 'hader slot',
        footer: 'footer slot',
      },
    });

    const els = wrapper.vm.$el.querySelectorAll('div');
    expect(els.length).toBe(3);
    expect(els[0].innerHTML).toBe('Im a header!');
    expect(els[1].innerHTML).toBe('Im a card!');
    expect(els[2].innerHTML).toBe('Im a footer!');
  });

  it('has a default theme', () => {
    const wrapper = shallowMount(TCard, {
      slots: {
        default: 'default slot',
        header: 'header slot',
        footer: 'footer slot',
      },
    });

    const wrap = wrapper.vm.$el as HTMLDivElement;
    const els = wrapper.vm.$el.querySelectorAll('div');
    const header = els[0];
    const body = els[1];
    const footer = els[2];

    expect(wrap.className).toBe(TCardTheme.classes.wrapper);
    expect(header.className).toBe(TCardTheme.classes.header);
    expect(body.className).toBe(TCardTheme.classes.body);
    expect(footer.className).toBe(TCardTheme.classes.footer);
  });

  it('adds html attributes', () => {
    const wrapper = shallowMount(TCard, {
      attrs: {
        id: 'my-id',
      },
    });

    const wrap = wrapper.vm.$el as HTMLDivElement;

    expect(wrap.getAttribute('id')).toBe('my-id');
  });

  it('adds attributes from global configuration', () => {
    const wrapper = shallowMount(TCard, {
      global: {
        provide: {
          configuration: {
            TCard: {
              id: 'my-id',
            },
          },
        },
      },
    });

    const wrap = wrapper.vm.$el as HTMLDivElement;

    expect(wrap.getAttribute('id')).toBe('my-id');
  });

  it('used the props from global configuration', () => {
    const wrapper = shallowMount(TCard, {
      global: {
        provide: {
          configuration: {
            TCard: {
              tagName: 'table',
              footer: 'Copyright @alfonsobires',
            },
          },
        },
      },
    });

    expect(wrapper.vm.$el.tagName).toBe('TABLE');
    expect(wrapper.vm.$el.querySelector('div').innerHTML).toBe('Copyright @alfonsobires');
  });
});
