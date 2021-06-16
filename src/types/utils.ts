import { PropType } from 'vue';

type GetPropType<TObj, TProp extends keyof TObj> = PropType<TObj[TProp]>;

export { GetPropType };
