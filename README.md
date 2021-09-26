# VariantJS/Vue (PREVIEW)

- Consider that this is a preview all components are subject to change until I release the final version.
- If you find any error, typo or have comments feel free to create [an issue](https://github.com/variantjs/vue/issues) or open a PR.
- Also a friendly reminder to consider [sponsor this project](https://github.com/sponsors/alfonsobries) there is a lot of work behind, **a lot**.
- Demo: [https://variantjs.vercel.app/](https://variantjs.vercel.app/#/)

*Components that are ready to be tested*

- [x] TInput
- [x] TButton
- [x] TTextarea
- [x] TSelect
- [x] TCheckbox
- [x] TRadio
- [x] TAlert
- [x] TCard
- [x] TDropdown
- [x] TInputGroup
- [x] TRichSelect
- [x] TTag

*Next ones:*

- [ ] TRadioGroup
- [ ] TCheckboxGroup
- [ ] TModal
- [ ] TDialog
- [ ] TTable
- [ ] TPagination
- [ ] TToggle
- [ ] More to announce soon...


![CI](https://github.com/variantjs/vue/workflows/CI/badge.svg)

**VarianJS/Vue** is the next version of the [VueTailwind](https://github.com/alfonsobries/vue-tailwind) package built from scratch for Vue 3.

It includes a set of Vue components created to be customized to adapt to your application's unique design and some other useful function that will help you to make your own components.

### Another UI library?

Most component libraries come with:

- A predefined design that is not easy to adapt to your application (in the case it is possible)
- A big chunk of CSS files that may conflict with your project and increase the size of your build
- Some are used by hundreds (or even millions of projects) that end with the same design.

Those libraries are great and make our work easy, but hey, we made a beautiful custom design, right?
### So what are the alternatives?

We can create our own CSS framework or use something like [TailwindCSS](https://tailwindcss.com) to define our style. The problem?:
We need to repeat long CSS classes over and over
Some components like modals, date pickers, etc., are tricky.
We love to be productive.

### Best of both worlds

The **VariantJS** components are meant to be customized with custom CSS classes that you can define when you install the library.

Plus, most component settings are configurable, so using this library is like having your personal set of components for your particular needs.

All that means that with this library, you will be able to:

- Define your components look and feel by defining custom default CSS classes.
- Add unlimited variants for every specific use case.
- Override the default value of the props according to your needs.
- Create different versions of one component with different default settings.

## Installation

### 1. Install the dependencies 

```console
npm install @variantjs/vue@next @variantjs/vue@core --save
``` 

Or: 

```console
yarn add @variantjs/vue@next @variantjs/vue@core 
``` 

The Dropdown and the RichSelect component depends on [Popperjs](https://popper.js.org/) so you need to add that dependency also if you need those components.

```console
npm install @popperjs/core --save
``` 

Or: 

```console
yarn add @popperjs/core
``` 


## 2. Install TailwindCSS (Optional)

This library uses TailwindCSS classes by default. Still, it should work with any CSS framework since all the CSS classes are configurable.

To install TailwindCSS follow his official documentation: [https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation)

#### 2.1 Add the @tailwindcss/forms plugin

The default theme of this library depends on the `@tailwindcss/forms` plugin. To use it, follow the steps on the plugin source page.
[https://github.com/tailwindlabs/tailwindcss-forms](https://github.com/tailwindlabs/tailwindcss-forms)

#### 2.1 Add variants for disabled pseudo-class

Also needed for the default theme and strongly recommended since it adds the ability to use some classes like `disabled:opacity-50 disabled:cursor-not-allowed` to disabled inputs.

See [https://tailwindcss.com/docs/configuring-variants](https://tailwindcss.com/docs/configuring-variants) on the TailwindCSS docs for more info.

As a reference, your `tailwind.config.js` may look like this:

```js
module.exports = {
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
```

## 3. Configure Vue to use VariantJS

```js
import { createApp } from 'vue'
import App from './App.vue'
import { variantJS } from '@variantjs/vue'

const app = createApp(App)

const configuration = {
  //...
}

app.use(variantJS, configuration)

app.mount('#app')

```

You can also use `typescript` for type checking:

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { variantJS, VariantJSConfiguration } from '@variantjs/vue'

const app = createApp(App)

const configuration: VariantJSConfiguration = {
  //...
}

app.use(variantJS, configuration)

app.mount('#app')

```

### 4. Configure your components

Consider this:

1. You can override the default value of all the props or even add any custom attributes.
2. The format of the configuration is the following:
```js
// Inside the main file 

const configuration = {
  {ComponentName}: {
    {propsOrAttribute}: {newDefautlValue}
  },
  {ComponentName2}: {
    {propsOrAttribute}: {newDefautlValue}
  },
  // ...
}

app.use(variantJS, configuration)
// ...
```
3. The official documentation for this package is stil a WIP. You can use the the [VueTailwind Docs](https://www.vue-tailwind.com/) as reference but consider that some props were removed or updated, you can also see the source code of the components for more information.

### 5. Import the components you need

```vue
<template>
  <t-input v-model="val">
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TInput } from '@variantjs/vue'

export default defineComponent({
  components: {
    TInput,
  },
  data() {
    return {
      val: ''
    }
  }
});
</script>

```

## Theming

To apply a custom theme you should play with the `classes`, `fixedClasses`, and `variants` props.

The `classes` and `fixedClasses` props usually expects an `string` with a CSS class for single-tag components (inputs, button, etc.) and an `object` for more complex components (modals, datepicker, etc) (see component docs for details).

The `variants` props expects an object where every key represents the variant name and every value the classes that will be used when that variant is applied.

#### Example for a single-tag component: 

```js
const configuration = {
  TButton: {
    // The fixed classes will never change and will be merged with the `classes` value or the active variant
    fixedClasses: 'focus:outline-none focus:shadow-outline inline-flex items-center transition ease-in-out duration-150',
    // Classes used when any variant is active
    classes: 'text-white bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
    variants: {
      // A red variant of the button (applied when `<t-button variant="error" />`)
      error: 'text-white bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
      // A green variant of the button (applied when `<t-button variant="success" />`)
      success: 'text-white bg-green-600 hover:bg-green-500 focus:border-green-700 active:bg-green-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
      // ...unlimited variants
    }
    // ...More settings
  },
}
```

#### Example for a complex component: 

```js
const configuration = {
  TAlert: {
    // The fixed classes will never change and will be merged with the `classes` value or the active variant
    fixedClasses: {
      wrapper: 'rounded p-4 flex text-sm border-l-4',
      body: 'flex-grow',
      close: 'ml-4 rounded',
      closeIcon: 'h-5 w-5 fill-current'
    },
    classes: {
      wrapper: 'bg-blue-100 border-blue-500',
      body: 'text-blue-700',
      close: 'text-blue-700 hover:text-blue-500 hover:bg-blue-200',
      closeIcon: 'h-5 w-5 fill-current'
    },
    variants: {
      danger: {
        wrapper: 'bg-red-100 border-red-500',
        body: 'text-red-700',
        close: 'text-red-700 hover:text-red-500 hover:bg-red-200'
        // Notice that I am not defining the `closeIcon` class since we only
        // need to write the classes we want to override
      },
    }
  },
}
```

Will continue...
