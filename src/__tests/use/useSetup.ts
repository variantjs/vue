/* eslint-disable vue/one-component-per-file */
import {
  defineComponent, createApp, h, ComponentPropsOptions,
} from 'vue';
import variantJsPlugin from '../..';
import { VariantJSConfiguration } from '../../types';

type InstanceType<V> = V extends { new (...arg: any[]): infer X } ? X : never;

type VM<V> = InstanceType<V> & { unmount(): void };

export function mount<V>(Comp: V, attributes?: Record<string, unknown>, configuration?: VariantJSConfiguration): VM<V> {
  const el = document.createElement('div');
  const app = createApp(Comp, attributes);

  app.use(variantJsPlugin, configuration);

  return app.mount(el) as any as VM<V>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useSetup<V>(
  setup: () => V,
  configuration?: VariantJSConfiguration,
  attributes?: Record<string, unknown>,
  props: ComponentPropsOptions = {},
  componentName: keyof VariantJSConfiguration = 'TInput',
) {
  const componentOptions = {
    name: componentName,
    props,
    setup,
    render() {
      return h('div', []);
    },
  };

  const Comp = defineComponent(componentOptions);

  return mount(Comp, attributes, configuration);
}
