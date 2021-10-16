import Vue from 'vue'
import { createFluentVue } from 'fluent-vue'
import { FluentBundle, FluentResource } from '@fluent/bundle'

import enMessages from '~/locales/en.ftl'
import ukMessages from '~/locales/uk.ftl'

const enBundle = new FluentBundle('en')
enBundle.addResource(new FluentResource(enMessages))
const ukBundle = new FluentBundle('uk')
ukBundle.addResource(new FluentResource(ukMessages))

const fluent = createFluentVue({
  bundles: [enBundle]
})

Vue.use(fluent)

const components = new Map()

Vue.mixin({
  created () {
    components.set(this, true)
  },
  destroyed () {
    components.delete(this)
  }
})

let currentLocale = 'en'
if (!Object.hasOwnProperty.call(Vue.prototype, 'currentLocale')) {
  Object.defineProperty(Vue.prototype, 'currentLocale', {
    get () {
      return currentLocale
    },

    set (locale) {
      if (locale === 'en') {
        currentLocale = locale
        fluent.bundles = [enBundle]
      }
      
      if (locale === 'uk') {
        currentLocale = locale
        fluent.bundles = [ukBundle]
      }
    
      // Not sure why this is needed with nuxt 2
      for (const component of components.keys()) {
        component.$forceUpdate()
      }
    }
  })
}

export const supportedLocales = [ 'en', 'uk' ]
