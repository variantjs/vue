import useConfiguration from '../../use/useConfiguration';
import { useSetup } from './useSetup';

describe('useConfiguration', () => {
  it('should keep the default configuration', () => {
    useSetup(() => {
      const data = useConfiguration({
        attrib: 'value',
        width: '10px',
      });
      expect(data.value).toEqual({
        attrib: 'value',
        width: '10px',
      });
    });
  });

  it('should merge the classes from the configuration', () => {
    useSetup(() => {
      const data = useConfiguration({
        classes: 'text-red-500',
        fixedClasses: 'border-2',
      });
      expect(data.value).toEqual({
        class: 'text-red-500 border-2',
      });
    });
  });

  it('should merge the classes from the configuration variant', () => {
    useSetup(() => {
      const data = useConfiguration({
        classes: 'text-blue-500',
        fixedClasses: 'border',
        variants: {
          error: {
            classes: 'text-red-500',
            fixedClasses: 'border-2',
          },
        },
        variant: 'error',
      });
      expect(data.value).toEqual({
        class: 'text-red-500 border-2',
      });
    });
  });

  it('should merge the global configuration', () => {
    const configuration = {
      TInput: {
        placeholder: 'Hello world',
      },
    };
    useSetup(() => {
      const data = useConfiguration({
        maxlength: '2',
      });

      expect(data.value).toEqual({
        maxlength: '2',
        placeholder: 'Hello world',
      });
    }, configuration);
  });

  it('merges the class that is used as attribute', () => {
    useSetup(() => {
      const data = useConfiguration({});
      expect(data.value).toEqual({
        class: 'font-semibold border-red-500 text-red-500',
      });
    }, {}, {
      fixedClasses: 'text-red-500',
      classes: 'border-red-500',
      class: 'font-semibold',
    }, ['fixedClasses', 'classes']);
  });
});
