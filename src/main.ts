import { WithVariantProps } from '@variantjs/core'
import { createApp } from 'vue'

import App from './App.vue'
import { TInputProps } from './components/TInput.vue'

const app = createApp(App)

export type VariantJSConfiguration = {
  TInput?: WithVariantProps<TInputProps>
}

app.use({
  install: (app) => {
    app.provide('theme', {
      TInput: {
        classes: 'gdsgds',
      }
    })
  }
})

app.mount('#app')
