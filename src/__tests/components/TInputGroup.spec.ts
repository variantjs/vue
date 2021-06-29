import { shallowMount } from '@vue/test-utils';
import TInputGroup from '@/components/TInputGroup.vue';
import { TInputGroupConfig } from '@variantjs/core';

describe('TInputGroup.vue', () => {
  it('renders the component without errors', () => {
    const wrapper = shallowMount(TInputGroup);
    expect(wrapper.vm.$el.tagName).toBe('DIV');
  });

  it('adds the elements in default order', () => {
    const wrapper = shallowMount(TInputGroup, {
      props: {
        label: 'the label',
        feedback: 'the feedback',
        description: 'the description',
      },
      slots: {
        default: 'the body',
      },
    });

    const els = wrapper.vm.$el.children;
    const label = els[0];
    const body = els[1];
    const feedback = els[2];
    const description = els[3];

    expect(els.length).toBe(4);
    expect(label.innerHTML).toBe('the label');
    expect(body.innerHTML).toBe('the body');
    expect(feedback.innerHTML).toBe('the feedback');
    expect(description.innerHTML).toBe('the description');
  });

  it('adds the elements from the slots', () => {
    const wrapper = shallowMount(TInputGroup, {
      slots: {
        default: 'the body',
        label: 'the label',
        feedback: 'the feedback',
        description: 'the description',
      },
    });

    const els = wrapper.vm.$el.children;
    const label = els[0];
    const body = els[1];
    const feedback = els[2];
    const description = els[3];

    expect(els.length).toBe(4);
    expect(label.innerHTML).toBe('the label');
    expect(body.innerHTML).toBe('the body');
    expect(feedback.innerHTML).toBe('the feedback');
    expect(description.innerHTML).toBe('the description');
  });

  it('doesnt add empty elements', () => {
    const wrapper = shallowMount(TInputGroup, {
      props: {
        label: 'the label',
      },
      slots: {
        default: 'the body',
      },
    });

    const els = wrapper.vm.$el.children;
    const label = els[0];
    const body = els[1];

    expect(els.length).toBe(2);
    expect(label.innerHTML).toBe('the label');
    expect(body.innerHTML).toBe('the body');
  });

  it('adds only the elements defined on the sortedElements prop', () => {
    const wrapper = shallowMount(TInputGroup, {
      props: {
        sortedElements: [
          'label', 'description',
        ],
        label: 'the label',
        feedback: 'the feedback',
        description: 'the description',
      },
      slots: {
        default: 'the body',
      },
    });

    const els = wrapper.vm.$el.children;
    const label = els[0];
    const description = els[1];

    expect(els.length).toBe(2);
    expect(label.innerHTML).toBe('the label');
    expect(description.innerHTML).toBe('the description');
  });

  it('adds the elements in different order', () => {
    const wrapper = shallowMount(TInputGroup, {
      props: {
        sortedElements: [
          'feedback', 'description', 'label', 'default',
        ],
        label: 'the label',
        feedback: 'the feedback',
        description: 'the description',
      },
      slots: {
        default: 'the body',
      },
    });

    const els = wrapper.vm.$el.children;
    const feedback = els[0];
    const description = els[1];
    const label = els[2];
    const body = els[3];

    expect(els.length).toBe(4);
    expect(label.innerHTML).toBe('the label');
    expect(body.innerHTML).toBe('the body');
    expect(feedback.innerHTML).toBe('the feedback');
    expect(description.innerHTML).toBe('the description');
  });

  it('prioritizes the slots over the props', () => {
    const wrapper = shallowMount(TInputGroup, {
      props: {
        body: 'not',
        label: 'not',
        feedback: 'not',
        description: 'not',
      },
      slots: {
        default: 'the body',
        label: 'the label',
        feedback: 'the feedback',
        description: 'the description',
      },
    });

    const els = wrapper.vm.$el.children;
    const label = els[0];
    const body = els[1];
    const feedback = els[2];
    const description = els[3];

    expect(els.length).toBe(4);
    expect(label.innerHTML).toBe('the label');
    expect(body.innerHTML).toBe('the body');
    expect(feedback.innerHTML).toBe('the feedback');
    expect(description.innerHTML).toBe('the description');
  });

  it('adds the text on the body props to the default slot', () => {
    const wrapper = shallowMount(TInputGroup, {
      props: {
        body: 'from the prop',
      },
    });

    const els = wrapper.vm.$el.children;
    const body = els[0];

    expect(els.length).toBe(1);
    expect(body.innerHTML).toBe('from the prop');
  });

  it('uses default tagNames for elements', () => {
    const wrapper = shallowMount(TInputGroup, {
      slots: {
        default: 'the body',
        label: 'the label',
        feedback: 'the feedback',
        description: 'the description',
      },
    });

    const els = wrapper.vm.$el.children;
    const label = els[0];
    const body = els[1];
    const feedback = els[2];
    const description = els[3];

    expect(label.tagName).toBe('LABEL');
    expect(body.tagName).toBe('DIV');
    expect(feedback.tagName).toBe('DIV');
    expect(description.tagName).toBe('DIV');
  });

  it('accepts different tagNames for elements', () => {
    const wrapper = shallowMount(TInputGroup, {
      props: {
        tagName: 'fieldset',
        bodyTagName: 'table',
        labelTagName: 'span',
        feedbackTagName: 'a',
        descriptionTagName: 'p',
      },
      slots: {
        default: 'the body',
        label: 'the label',
        feedback: 'the feedback',
        description: 'the description',
      },
    });

    const wrap = wrapper.vm.$el;
    const els = wrap.children;
    const label = els[0];
    const body = els[1];
    const feedback = els[2];
    const description = els[3];

    expect(wrap.tagName).toBe('FIELDSET');
    expect(label.tagName).toBe('SPAN');
    expect(body.tagName).toBe('TABLE');
    expect(feedback.tagName).toBe('A');
    expect(description.tagName).toBe('P');
  });

  it('uses a `div` for the element', () => {
    const wrapper = shallowMount(TInputGroup, {
      props: {
        label: 'im a label',
      },
    });

    expect(wrapper.vm.$el.children[0].tagName).toBe('LABEL');
  });

  it('has a default theme', () => {
    const wrapper = shallowMount(TInputGroup, {
      slots: {
        default: 'the body',
        label: 'the label',
        feedback: 'the feedback',
        description: 'the description',
      },
    });

    const wrap = wrapper.vm.$el;
    const els = wrapper.vm.$el.children;
    const label = els[0];
    const body = els[1];
    const feedback = els[2];
    const description = els[3];

    expect(wrap.className).toBe(TInputGroupConfig.classes.wrapper);
    expect(label.className).toBe(TInputGroupConfig.classes.label);
    expect(body.className).toBe(TInputGroupConfig.classes.body);
    expect(feedback.className).toBe(TInputGroupConfig.classes.feedback);
    expect(description.className).toBe(TInputGroupConfig.classes.description);
  });

  it('adds html attributes', () => {
    const wrapper = shallowMount(TInputGroup, {
      attrs: {
        id: 'my-id',
      },
    });

    const wrap = wrapper.vm.$el as HTMLDivElement;

    expect(wrap.getAttribute('id')).toBe('my-id');
  });

  it('adds attributes from global configuration', () => {
    const wrapper = shallowMount(TInputGroup, {
      global: {
        provide: {
          configuration: {
            TInputGroup: {
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
    const wrapper = shallowMount(TInputGroup, {
      global: {
        provide: {
          configuration: {
            TInputGroup: {
              description: 'hello hello',
            },
          },
        },
      },
    });

    expect(wrapper.vm.$el.querySelector('div').innerHTML).toBe('hello hello');
  });
});
