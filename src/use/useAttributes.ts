import {
  computed, getCurrentInstance, ComputedRef, camelize,
} from 'vue';
import useConfiguration, { extractDefinedProps } from './useConfiguration';

export default function useAttributes<ComponentOptions extends Record<string, unknown>>(defaultConfiguration: ComponentOptions): ComputedRef<Record<string, unknown>> {
  const vm = getCurrentInstance();

  const configuration = useConfiguration<ComponentOptions>(defaultConfiguration);

  const result = computed(() => {
    const attributes: Record<string, unknown> = { ...configuration.value };

    extractDefinedProps(vm).forEach((attributeName) => {
      const normalizedAttribute = camelize(attributeName);
      delete attributes[normalizedAttribute];
    });

    return attributes;
  });

  return result;
}
