/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, fireEvent } from '@testing-library/vue';
import TCheckbox from '@/components/TCheckbox.vue';

describe('TCheckbox.vue', () => {
  it('handles the v-model', async () => {
    const modelValue = ['A'];
    const { container } = render(TCheckbox, {
      props: {
        modelValue,
      },
      attrs: {
        name: 'checkbox-input',
        value: 'A',
      },
    });
    const { container: container2 } = render(TCheckbox, {
      props: {
        modelValue,
      },
      attrs: {
        name: 'checkbox-input',
        value: 'B',
      },
    });

    const input = container.querySelector('input')!;
    const input2 = container2.querySelector('input')!;

    expect(input.checked).toBe(true);
    expect(input2.checked).toBe(false);

    await fireEvent.click(input2!);

    expect(input.checked).toBe(true);
    expect(input2.checked).toBe(true);

    await fireEvent.click(input!);

    expect(input.checked).toBe(false);
    expect(input2.checked).toBe(true);
  });

  it('handles the v-model with not regular value types', async () => {
    const modelValue = [[123, 'A']];
    const { container } = render(TCheckbox, {
      props: {
        modelValue,
      },
      attrs: {
        name: 'checkbox-input',
        value: [123, 'A'],
      },
    });
    const { container: container2 } = render(TCheckbox, {
      props: {
        modelValue,
      },
      attrs: {
        name: 'checkbox-input',
        value: () => {},
      },
    });
    const { container: container3 } = render(TCheckbox, {
      props: {
        modelValue,
      },
      attrs: {
        name: 'checkbox-input',
        value: { A: 'B' },
      },
    });

    const input = container.querySelector('input')!;
    const input2 = container2.querySelector('input')!;
    const input3 = container3.querySelector('input')!;

    expect(input.checked).toBe(true);
    expect(input2.checked).toBe(false);
    expect(input3.checked).toBe(false);

    await fireEvent.click(input2!);

    expect(input.checked).toBe(true);
    expect(input2.checked).toBe(true);
    expect(input3.checked).toBe(false);

    await fireEvent.click(input3!);

    expect(input.checked).toBe(true);
    expect(input2.checked).toBe(true);
    expect(input3.checked).toBe(true);
  });
});
