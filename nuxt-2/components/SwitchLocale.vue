<template>
  <div>
    <select :value="currentLocale" @input="switchLocale($event.target.value)">
      <option v-for="locale in supportedLocales" :value="locale">{{ locale }}</option>
    </select>

    {{ $t('test') }}
  </div>
</template>

<script>
import { enBundle, ukBundle } from '~/plugins/fluent-vue'

export default {
  data () {
    return {
      currentLocale: 'en'
    }
  },
  computed: {
    supportedLocales () {
      return [ 'en', 'uk' ]
    }
  },
  methods: {
    switchLocale (locale) {
      const fluent = this.$nuxt.context.app.fluent
  
      if (locale === 'en') {
        this.currentLocale = locale
        fluent.bundles = [enBundle]
      }

      if (locale === 'uk') {
        this.currentLocale = locale
        fluent.bundles = [ukBundle]
      }

      this.$nuxt.$forceUpdate()

      setTimeout(() => {
        this.$nuxt.$forceUpdate()
      }, 100)


    }
  }
}
</script>

<fluent locale='en'>
test = a
</fluent>

<fluent locale='uk'>
test = b
</fluent>