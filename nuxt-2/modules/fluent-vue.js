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
  })
}
