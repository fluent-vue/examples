const { SFCFluentPlugin } = require('unplugin-fluent-vue/webpack')

module.exports = {
  configureWebpack: (config) => {
    config.plugins.push(SFCFluentPlugin())
  }
}
