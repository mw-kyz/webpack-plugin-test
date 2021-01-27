class FileListPlugin {
  constructor (options) {
    this.options = options || {}
    this.filename = this.options.filename || 'fileList.md'
  }
  // 使用tapPromise
  apply (compiler) {
    // 生成资源到output目录之前执行
    compiler.hooks.emit.tapPromise('FileListPlugin', async (compilation) => { // 此处可以把async去掉，把await换成return，就是平常的写法
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      }).then(() => {
        const fileListName = this.filename // 保存最后输出的文件名称
        const len = Object.keys(compilation.assets).length // 获取资源对象的长度
        let content = `# 一共有 ${ len } 个文件\n\n` // 文件内容（字符串形式）

        for (let filename in compilation.assets) {
          content += `- ${filename}\n`
        }  

        compilation.assets[fileListName] = { // 往资源对象添加生成的文件，这是标准形式，这里是添加文件，以后修改了文件，也需要这么写
          source: () => content,
          size: () => content.length
        }
      })
    })
  }

  // 使用tapAsync
  // apply(compiler) {
  //   // 生成资源到output目录之前执行
  //   compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
  //     const fileListName = this.filename // 保存最后输出的文件名称
  //     const len = Object.keys(compilation.assets).length // 获取资源对象的长度
  //     let content = `# 一共有 ${ len } 个文件\n\n` // 文件内容（字符串形式）

  //     for (let filename in compilation.assets) {
  //       content += `- ${filename}\n`
  //     }  

  //     compilation.assets[fileListName] = { // 往资源对象添加生成的文件，这是标准形式，这里是添加文件，以后修改了文件，也需要这么写
  //       source: () => content,
  //       size: () => content.length
  //     }

  //     callback()
  //   })
  // }
}

module.exports = FileListPlugin