import {
  defineComponent, createApp, h,
} from 'vue';
import variantJsPlugin, { VariantJSConfiguration } from '../..';

type InstanceType<V> = V extends { new (...arg: any[]): infer X } ? X : never;
type VM<V> = InstanceType<V> & { unmount(): void };

export function mount<V>(Comp: V, configuration?: VariantJSConfiguration): VM<V> {
  const el = document.createElement('div');
  const app = createApp(Comp);

  app.use(variantJsPlugin, configuration);

  const unmount = () => app.unmount();
  const comp = app.mount(el) as any as VM<V>;
  comp.unmount = unmount;
  return comp;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useSetup<V>(setup: () => V, configuration?: VariantJSConfiguration, componentName: keyof VariantJSConfiguration = 'TInput') {
  const Comp = defineComponent({
    name: componentName,
    setup,
    render() {
      return h('div', []);
    },
  });

  return mount(Comp, configuration);
}
