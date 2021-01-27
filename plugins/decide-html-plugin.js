class DecideHtmlPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    // 在初始化内部插件集合完成设置之后调用。
    compiler.hooks.afterPlugins.tap('DecideHtmlPlugin', compiler => { // 将会在 compilation 完成时执行
      const plugins = compiler.options.plugins;
      console.log(plugins)
      const hasHtmlPlugin = plugins.some(plugin => { // 判断是否使用了HtmlWebpackPlugin插件
        return plugin.__proto__.constructor.name === 'HtmlWebpackPlugin' 
      })
      if (hasHtmlPlugin) {
        console.log('使用了html-webpack-plugin')
      }
    })
  }
}

module.exports = DecideHtmlPlugin