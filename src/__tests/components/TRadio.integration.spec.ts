/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, fireEvent } from '@testing-library/vue';
import TRadio from '@/components/TRadio.vue';

describe('TRadio.vue', () => {
  it('handles the v-model', async () => {
    const modelValue = 'A';
    const { container } = render(TRadio, {
      props: {
        modelValue,
      },
      attrs: {
        name: 'radio-input',
        value: 'A',
      },
    });
    const { container: container2 } = render(TRadio, {
      props: {
        modelValue,
      },
      attrs: {
        name: 'radio-input',
        value: 'B',
      },
    });

    const input = container.querySelector('input')!;
    const input2 = container2.querySelector('input')!;

    expect(input.checked).toBe(true);
    expect(input2.checked).toBe(false);

    await fireEvent.update(input2!, 'B');

    expect(input.checked).toBe(false);
    expect(input2.checked).toBe(true);
  });

  it('handles the v-model with not regular value types', async () => {
    const modelValue = [123, 'A'];
    const { container } = render(TRadio, {
      props: {
        modelValue,
      },
      attrs: {
        name: 'radio-input',
        value: modelValue,
      },
    });
    const { container: container2 } = render(TRadio, {
      props: {
        modelValue,
      },
      attrs: {
        name: 'radio-input',
        value: () => {},
      },
    });
    const { container: container3 } = render(TRadio, {
      props: {
        modelValue,
      },
      attrs: {
        name: 'radio-input',
        value: { A: 'B' },
      },
    });

    const input = container.querySelector('input')!;
    const input2 = container2.querySelector('input')!;
    const input3 = container3.querySelector('input')!;

    expect(input.checked).toBe(true);
    expect(input2.checked).toBe(false);
    expect(input3.checked).toBe(false);

    await fireEvent.update(input2!);

    expect(input.checked).toBe(false);
    expect(input2.checked).toBe(true);
    expect(input3.checked).toBe(false);

    await fireEvent.update(input3!);

    expect(input.checked).toBe(false);
    expect(input2.checked).toBe(false);
    expect(input3.checked).toBe(true);
  });

  it('handles the v-model independently if radio name is different', async () => {
    const modelValue = 'A';
    const { container } = render(TRadio, {
      props: {
        modelValue,
      },
      attrs: {
        name: 'radio-input',
        value: 'A',
      },
    });
    const { container: container2 } = render(TRadio, {
      props: {
        modelValue,
      },
      attrs: {
        name: 'radio-input-b',
        value: 'B',
      },
    });

    const input = container.querySelector('input')!;
    const input2 = container2.querySelector('input')!;

    expect(input.checked).toBe(true);
    expect(input2.checked).toBe(false);

    await fireEvent.update(input2!, 'B');

    expect(input.checked).toBe(true);
    expect(input2.checked).toBe(true);
  });
});
