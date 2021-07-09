import { DefineComponent } from 'vue';
import { Data } from './types';

declare module '*.vue' {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<Data, Data, any>;
  export default component;
}
