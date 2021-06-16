/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, fireEvent } from '@testing-library/vue';
import TSelect from '@/components/TSelect.vue';

describe('TSelect.vue', () => {
  it('handles the v-model', async () => {
    const { container, getByDisplayValue } = render(TSelect, {
      props: {
        options: ['A', 'B'],
      },
    });

    const select = container.querySelector('select')!;

    await fireEvent.update(select!, 'B');

    getByDisplayValue('B');
  });

  it('selects the option', async () => {
    const { container } = render(TSelect, {
      props: {
        options: ['A', 'B'],
      },
    });

    const select = container.querySelector('select')!;

    expect(select.querySelectorAll('option')).toHaveLength(2);
  });

  it('contains the class + classes + fixedClasses', async () => {
    const { container } = render(TSelect, {
      props: {
        fixedClasses: 'text-red-500',
        classes: 'border-red-500',
        class: 'font-semibold',
      },
    });

    const select = container.querySelector('.text-red-500.border-red-500.font-semibold');
    expect(select).not.toBeNull();
  });

  it('adds the html attributes', async () => {
    const { getByRole, getByTitle } = render(TSelect, {
      props: {
        role: 'text-field',
        title: 'my title',
      },
    });

    getByRole('text-field');

    getByTitle('my title');
  });

  it('adds the classes on the variant', async () => {
    const { container } = render(TSelect, {
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

    let select = container.querySelector('.text-red-500');
    expect(select).not.toBeNull();

    select = container.querySelector('.text-blue-500');
    expect(select).toBeNull();
  });
});
