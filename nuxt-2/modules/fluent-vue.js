export default function FluentVueModule () {
  this.extendBuild(config => {
    // Allow importing ftl files as strings
    config.module.rules.push({
      test: /\.ftl$/,
      loader: require.resolve('raw-loader')
    })

    // Add support for SFC custom blocks
    config.module.rules.push({
      resourceQuery: /blockType=fluent/,
      type: 'javascript/auto',
      loader: require.resolve('fluent-vue-loader')
    })

    const vueRule = config.module.rules.find(rule => rule.loader.includes('vue-loader'))

    if (!vueRule) {
      console.error('Could not find vue-loader rule in webpack config')
    }

    vueRule.options.compilerOptions = vueRule.options.compilerOptions || {}
    vueRule.options.compilerOptions.directives = vueRule.options.directives || {}
    vueRule.options.compilerOptions.directives.t = function (el, dir) {
      function rangeSetItem (
        item,
        range
      ) {
        if (range) {
          if (range.start != null) {
            item.start = range.start
          }
          if (range.end != null) {
            item.end = range.end
          }
        }
        return item
      }

      function addProp (el, name, value, range, dynamic) {
        (el.props || (el.props = [])).push(rangeSetItem({ name, value, dynamic }, range))
        el.plain = false
      }

      const previousWrapData = el.wrapData
      el.wrapData = (code) => {
        if (previousWrapData) 
          code = previousWrapData(code)

        return `_b(${code},'${el.tag}',$ta('${dir.arg}'),false)`
      }

      addProp(el, 'textContent', `_s($t('${dir.arg}'))`, dir)
    }
  })
}
