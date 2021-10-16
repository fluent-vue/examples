import Vue from 'vue'
import { createFluentVue } from 'fluent-vue'
import { FluentBundle } from '@fluent/bundle'

export const enBundle = new FluentBundle('en')
export const ukBundle = new FluentBundle('uk')

const fluent = createFluentVue({
  bundles: [enBundle]
})

Vue.use(fluent)

export default ({ app }) => {
  app.fluent = fluent
  app.fluentBundles = {
    'en': enBundle,
    'uk': ukBundle
  }
}
