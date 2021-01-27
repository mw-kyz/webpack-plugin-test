class WatchPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    // 监听模式下，一个新的编译(compilation)触发之后，执行一个插件，但是是在实际编译开始之前
    compiler.hooks.watchRun.tapAsync('WatchPlugin', (compiler, callback) => {
      console.log('监听ing。。。。。。。')
      const mtimes = compiler.watchFileSystem.watcher.mtimes; // 这是一个对象,其中每个键是已更改的文件的绝对路径,值是更改后的时间戳
      const fileWatchers = compiler.watchFileSystem.watcher.fileWatchers  // 这里面的内容更详细，但是会包括node_modules里面的文件，所以需要过滤
      const newFileWatchers = fileWatchers.filter(watcher => !/(node_modules)/.test(watcher.path)) // 过滤node_modules中的文件
      console.log(newFileWatchers)
      const mtimesKeys = Object.keys(mtimes)
      if (mtimesKeys.length > 0) {
        console.log(`本次一共改动了${ mtimesKeys.length }个文件,目录为:`)
        console.log(mtimesKeys)
        console.log('------------分割线-------------')
      }
    
      callback()
    })
    // 监听模式停止时执行
    compiler.hooks.watchClose.tap('WatchPlugin', () => {
      console.log('监听结束')
    })
  }
}

module.exports = WatchPlugin