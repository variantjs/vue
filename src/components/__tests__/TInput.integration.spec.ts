/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, fireEvent } from '@testing-library/vue';
import TInput from '@/components/TInput.vue';

describe('TInput.vue', () => {
  it('handles the v-model', async () => {
    const { container, getByDisplayValue } = render(TInput);

    const input = container.querySelector('input')!;

    await fireEvent.update(input!, 'Alfonso');

    getByDisplayValue('Alfonso');
  });

  it('contains the class + classes + fixedClasses', async () => {
    const { container } = render(TInput, {
      props: {
        fixedClasses: 'text-red-500',
        classes: 'border-red-500',
        class: 'font-semibold',
      },
    });

    const input = container.querySelector('.text-red-500.border-red-500.font-semibold');
    expect(input).not.toBeNull();
  });

  it('adds the html attributes', async () => {
    const { getByPlaceholderText, getByRole, getByTitle } = render(TInput, {
      props: {
        placeholder: 'Write something',
        role: 'text-field',
        title: 'my title',
      },
    });

    getByPlaceholderText('Write something');

    getByRole('text-field');

    getByTitle('my title');
  });

  it('adds the classes on the variant', async () => {
    const { container } = render(TInput, {
      props: {
        variants: {
          error: {
            classes: 'text-red-500',
          },
        },
        variant: 'error',
        classes: 'text-blue-500',
      },
    });

    let input = container.querySelector('.text-red-500');
    expect(input).not.toBeNull();

    input = container.querySelector('.text-blue-500');
    expect(input).toBeNull();
  });

  it('keeps the fixedClasses when using a variant', async () => {
    const { container } = render(TInput, {
      props: {
        variants: {
          error: {
            classes: 'text-red-500',
          },
        },
        variant: 'error',
        fixedClasses: 'text-blue-500',
      },
    });

    let input = container.querySelector('.text-red-500');
    expect(input).not.toBeNull();

    input = container.querySelector('.text-blue-500');
    expect(input).not.toBeNull();
  });

  it('overrides the fixedClasses when using a variant', async () => {
    const { container } = render(TInput, {
      props: {
        variants: {
          error: {
            fixedClasses: 'text-red-500',
          },
        },
        variant: 'error',
        fixedClasses: 'text-blue-500',
      },
    });

    let input = container.querySelector('.text-red-500');
    expect(input).not.toBeNull();

    input = container.querySelector('.text-blue-500');
    expect(input).toBeNull();
  });
});
