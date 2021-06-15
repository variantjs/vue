import {
  defineComponent, createApp, h,
} from 'vue';

type InstanceType<V> = V extends { new (...arg: any[]): infer X } ? X : never;
type VM<V> = InstanceType<V> & { unmount(): void };

export function mount<V>(Comp: V): VM<V> {
  const el = document.createElement('div');
  const app = createApp(Comp);

  const unmount = () => app.unmount();
  const comp = app.mount(el) as any as VM<V>;
  comp.unmount = unmount;
  return comp;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useSetup<V>(setup: () => V) {
  const Comp = defineComponent({
    setup,
    render() {
      return h('div', []);
    },
  });

  return mount(Comp);
}
