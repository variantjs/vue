import { WithVariantPropsAndClassesList, Data } from '@variantjs/core';
import { HTMLAttributes } from 'vue';

// @TODO: add this to core library
type TModalClassesValidKeys = 'overlay' | 'wrapper' | 'modal' | 'body' | 'header' | 'footer' | 'close' | 'closeIcon';

// overlay: 'z-40 bg-black bg-opacity-50',
//   wrapper: 'z-50 max-w-lg px-3 py-12',
//   modal: 'bg-white shadow rounded',
//   body: 'p-3',
//   header: 'border-b border-gray-100 p-3 rounded-t',
//   footer: 'bg-gray-100 p-3 rounded-b',
//   close: 'bg-gray-100 text-gray-600 rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
//   closeIcon: 'fill-current h-4 w-4',
//   overlayEnterClass: 'opacity-0',
//   overlayEnterActiveClass: 'transition ease-out duration-100',
//   overlayEnterToClass: 'opacity-100',
//   overlayLeaveClass: 'opacity-100',
//   overlayLeaveActiveClass: 'transition ease-in duration-75',
//   overlayLeaveToClass: 'opacity-0',
//   enterClass: '',
//   enterActiveClass: '',
//   enterToClass: '',
//   leaveClass: '',
//   leaveActiveClass: '',
//   leaveToClass: '',

export type TModalOptions = WithVariantPropsAndClassesList<{
  modelValue?: boolean,
  tagName?: string
  body?: string
  header?: string
  footer?: string
  teleport?: boolean,
  teleportTo?: string | HTMLElement,
} & HTMLAttributes & Data, TModalClassesValidKeys>;
