import { WithVariantProps } from '@variantjs/core';
import { Data } from '../../types';
import useAttributes from '../../use/useAttributes';
import { useSetup } from './useSetup';

describe('useAttributes', () => {
  it('contains the configuration the attributes', () => {
    useSetup(() => {
      const data = useAttributes<WithVariantProps<{
        placeholder: string
      }>>({
        placeholder: 'Hello World',
      });
      expect(data.value).toEqual({
        placeholder: 'Hello World',
      });
    }, {}, {});
  });

  it('contains the class + classes + fixedClasses', () => {
    useSetup(() => {
      const data = useAttributes<WithVariantProps<Data>>({
        fixedClasses: 'text-red-500',
        classes: 'border-red-500',
        class: 'font-semibold',
      });
      expect(data.value).toEqual({
        class: 'font-semibold border-red-500 text-red-500',
      });
    }, {}, {}, ['fixedClasses', 'classes']);
  });

  it('adds the configurations attributes', () => {
    useSetup(() => {
      const data = useAttributes<WithVariantProps<{
        type?: string
        'data-id'?: string,
      }>>({
        type: 'button',
        'data-id': 'something',
      });
      expect(data.value).toEqual({
        type: 'button',
        'data-id': 'something',
      });
    });
  });

  it('doesnt add the configurations attributes defined as a props', () => {
    useSetup(() => {
      const data = useAttributes<WithVariantProps<{
        type?: string
        'data-id'?: string,
      }>>({
        type: 'button',
        'data-id': 'something',
      });
      expect(data.value).toEqual({
        'data-id': 'something',
      });
    }, {}, {}, ['type']);
  });
});
