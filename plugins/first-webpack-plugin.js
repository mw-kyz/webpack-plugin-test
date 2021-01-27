class FirstWebpackPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    // 在 compilation 完成时执行
    compiler.hooks.done.tapAsync('FirstWebpackPlugin', (stats, callback) => { // 将会在 compilation 完成时执行
      console.log(this.options.msg)
      callback()
    })
  }
}

module.exports = FirstWebpackPlugin