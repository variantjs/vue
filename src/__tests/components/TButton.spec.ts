/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { shallowMount } from '@vue/test-utils';
import TButton from '@/components/TButton.vue';
import { TButtonConfig } from '@variantjs/core';

describe('TButton.vue', () => {
  it('renders the button', () => {
    const wrapper = shallowMount(TButton);
    expect(wrapper.get('button')).toBeTruthy();
  });

  it('renders the button with a default set of classes', () => {
    const wrapper = shallowMount(TButton);

    expect(wrapper.html()).toBe(`<button class="${TButtonConfig.classes}"></button>`);
  });

  it('renders the button without attributes if no default theme', () => {
    const wrapper = shallowMount(TButton, {
      global: {
        provide: {
          configuration: {
            TButton: {
              classes: undefined,
            },
          },
        },
      },
    });

    expect(wrapper.html()).toBe('<button></button>');
  });

  it('renders the button with the text in the slot', () => {
    const wrapper = shallowMount(TButton, {
      props: {
        classes: undefined,
      },
      slots: {
        default: 'Press me!',
      },
    });

    expect(wrapper.html()).toBe('<button>Press me!</button>');
  });

  it('set the props.value as the button value', () => {
    const value = 'button value';
    const wrapper = shallowMount(TButton, {
      props: { value },
    });

    expect(wrapper.vm.$el.value).toBe(value);
  });

  it('doesnt add the tagName as attribute', () => {
    const wrapper = shallowMount(TButton, {
      props: { tagName: 'a' },
    });

    expect(wrapper.vm.$el.attributes.tagName).toBeUndefined();
  });

  it('disables the button', async () => {
    const wrapper = shallowMount(TButton, {
      props: { disabled: false },
    });
    expect(wrapper.vm.$el.disabled).toBe(false);

    await wrapper.setProps({ disabled: true });

    expect(wrapper.vm.$el.disabled).toBe(true);
  });

  it('adds the configuration attribute', async () => {
    const wrapper = shallowMount(TButton, {
      global: {
        provide: {
          configuration: {
            TButton: {
              type: 'button',
              'data-id': 'something',
            },
          },
        },
      },
    });

    const button = wrapper.vm.$el as HTMLButtonElement;
    expect(button.type).toBe('button');
    expect(button.dataset.id).toBe('something');
  });

  it('prioritizes the attribute over the configuratiion', async () => {
    const wrapper = shallowMount(TButton, {
      global: {
        provide: {
          configuration: {
            TButton: {
              type: 'button',
            },
          },
        },
      },
      attrs: {
        type: 'submit',
      },
    });

    const button = wrapper.vm.$el;
    expect(button.type).toBe('submit');
  });

  it('accepts misc button attributes', async () => {
    const wrapper = shallowMount(TButton);

    const values = {
      id: {
        default: '',
        new: 'new-id',
      },
      autofocus: {
        default: false,
        new: true,
      },
      disabled: {
        default: false,
        new: true,
      },
      name: {
        default: '',
        new: 'new-name',
      },
      title: {
        default: '',
        new: 'new-title',
      },
      type: {
        default: 'submit',
        new: 'button',
      },
    };

    const newProps: any = {};
    // Check for the default values
    Object.keys(values).forEach((key) => {
      const elementValue = (values as any)[key];
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.default);

      newProps[key as any] = elementValue.new;
    });

    await wrapper.setProps(newProps);

    // Check for the new values
    Object.keys(values).forEach((key) => {
      const elementValue = (values as any)[key];
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.new);
    });
  });

  it('emits native button events', () => {
    const onClick = jest.fn();
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onKeyup = jest.fn();

    const wrapper = shallowMount(TButton, {
      attrs: {
        onClick,
        onBlur,
        onFocus,
        onKeyup,
      },
    });

    const button = wrapper.vm.$el;

    button.dispatchEvent(new MouseEvent('click'));
    expect(onClick).toHaveBeenCalled();

    button.dispatchEvent(new FocusEvent('focus'));
    expect(onFocus).toHaveBeenCalled();

    button.dispatchEvent(new FocusEvent('blur'));
    expect(onBlur).toHaveBeenCalled();

    button.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    expect(onKeyup).toHaveBeenCalled();
  });

  it('has native button methods', () => {
    const wrapper = shallowMount(TButton);

    const button = wrapper.vm.$el;

    expect(typeof button.click).toBe('function');
    expect(typeof button.focus).toBe('function');
    expect(typeof button.blur).toBe('function');
  });

  it('triggers custom events', async () => {
    const onCustom = jest.fn();

    const wrapper = shallowMount(TButton, {
      attrs: {
        onCustom,
      },
    });
    const button = wrapper.vm.$el as HTMLButtonElement;

    const evt = new CustomEvent('custom', { detail: 'my-custom-event' });
    button.dispatchEvent(evt);

    expect(onCustom).toHaveBeenCalled();
  });

  it('default to button tag', () => {
    const wrapper = shallowMount(TButton);

    expect(wrapper.vm.$el.tagName).toBe('BUTTON');
  });

  it('accepts anchor tag', () => {
    const wrapper = shallowMount(TButton, {
      props: { tagName: 'a' },
    });

    expect(wrapper.vm.$el.tagName).toBe('A');
  });

  it('uses anchor tag when has href attribute', () => {
    const wrapper = shallowMount(TButton, {
      props: { href: 'https://www.vexilo.com/' },
    });

    expect(wrapper.vm.$el.tagName).toBe('A');
    expect(wrapper.vm.$el.href).toBe('https://www.vexilo.com/');
  });

  describe('Router Link', () => {
    it('has router link related props', () => {
      const props = {
        to: '/something',
        replace: true,
        activeClass: 'activeClass',
        exactActiveClass: 'exactActiveClass',
        custom: true,
        ariaCurrentValue: 'location',
      };

      type RouterProps = typeof props;

      const wrapper = shallowMount(TButton, {
        props,
      });

      Object.keys(props).forEach((key) => {
        expect(wrapper.vm[key]).toBe(props[key as keyof RouterProps]);
      });
    });

    it('doesnt have a router link component by default', () => {
      const wrapper = shallowMount(TButton);
      expect(wrapper.vm.routerLinkComponentAvailable).toBe(false);
    });

    it('can determine when a router link component is available', () => {
      const RouterLink = {
        name: 'RouterLink',
        template: '',
      };

      const wrapper = shallowMount(TButton, {
        global: {
          components: {
            RouterLink,
          },
        },
      });

      expect(wrapper.vm.routerLinkComponentAvailable).toBe(true);
    });

    it('determine that a router link component is available if has a NuxtLink', () => {
      const NuxtLink = {
        name: 'NuxtLink',
        template: '',
      };

      const wrapper = shallowMount(TButton, {
        global: {
          components: {
            NuxtLink,
          },
        },
      });

      wrapper.vm.$options.components.NuxtLink = {};
      expect(wrapper.vm.routerLinkComponentAvailable).toBe(true);
    });

    it('uses a router-link when `to` prop is defined and the route link component is available', () => {
      const RouterLink = {
        name: 'RouterLink',
        template: '',
      };

      const wrapper = shallowMount(TButton, {
        global: {
          components: {
            RouterLink,
          },
        },
        props: {
          to: '/some-place',
          classes: undefined,
        },
      });

      expect(wrapper.vm.useRouterLink).toBe(true);
      expect(wrapper.getComponent(RouterLink)).toBeTruthy();
    });

    it('doesnt use a router-link when `to` prop is not defined even if route link component is available', () => {
      const RouterLink = {
        name: 'RouterLink',
        template: '',
      };

      const wrapper = shallowMount(TButton, {
        global: {
          components: {
            RouterLink,
          },
        },
      });

      expect(wrapper.vm.useRouterLink).toBe(false);
    });

    it('uses a nuxt-link when `to` prop is defined and the nuxt-link component is available', () => {
      const NuxtLink = {
        name: 'NuxtLink',
        template: '',
      };

      const wrapper = shallowMount(TButton, {
        global: {
          components: {
            NuxtLink,
          },
        },
        props: {
          to: '/some-place',
          classes: undefined,
        },
      });

      expect(wrapper.vm.useRouterLink).toBe(true);
      expect(wrapper.getComponent(NuxtLink)).toBeTruthy();
    });

    it('adds the routerLink related prop', () => {
      const props = {
        to: '/something',
        replace: true,
        activeClass: 'activeClass',
        exactActiveClass: 'exactActiveClass',
        custom: true,
        ariaCurrentValue: 'location',
      };

      const RouterLink = {
        name: 'RouterLink',
        template: '',
        props: Object.keys(props),
      };

      const wrapper = shallowMount(TButton, {
        global: {
          components: {
            RouterLink,
          },
        },
        props: {
          ...props,
          href: '/something',
        },
      });

      const component = wrapper.getComponent(RouterLink);
      expect(component.props()).toEqual(props);
    });
  });

  // it('uses native button for inertia when tag name is not `a`', () => {
  //   const wrapper = shallowMount(TButton, {
  //     props: { tagName: 'button', href: '/test' },
  //     computed: {
  //       isInertiaLinkComponentAvailable() {
  //         return true;
  //       },
  //     },
  //   });

  //   expect(Object.keys(wrapper.vm.getAttributes())).toEqual(['id', 'value', 'autofocus', 'disabled', 'name', 'href', 'type']);
  // });

  // it('uses native button when native is set', () => {
  //   const wrapper = shallowMount(TButton, {
  //     props: { to: '/some-place', native: true },
  //     computed: {
  //       isRouterLinkComponentAvailable() {
  //         return true;
  //       },
  //     },
  //   });

  //   expect(Obje
});
