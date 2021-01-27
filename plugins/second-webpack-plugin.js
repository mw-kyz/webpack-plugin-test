class SecondWebpackPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    // 一个新的编译（compilation）创建之后，钩入（hook into）compiler，只会执行一次
    compiler.hooks.compiler.tap('SecondWebpackPlugin', (compilationParams) => { 
      console.log('compiler')
      console.log(compilationParams)
    })

    // 编译（compilation）创建之后，执行插件，生成多少个文件就执行多少次，此处会生成index.html和main.bundle.js两个文件，所以会执行两次
    compiler.hooks.compilation.tap('SecondWebpackPlugin', (compilation, compilationParams) => { // 可以多次执行
      console.log('compilation')
      // 一个 chunk 中的一个 asset 被添加到 compilation 时调用
      compilation.hooks.chunkAsset.tap('second', (chunk, filename) => {
        console.log(chunk)
        console.log(filename) // 第一次值为：__child-HtmlWebpackPlugin_0 第二次值为：main.bundle.js
      })
    })
  }
}

module.exports = SecondWebpackPlugin