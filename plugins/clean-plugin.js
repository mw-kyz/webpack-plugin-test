const recursiveReadSync = require("recursive-readdir-sync");
const minimatch = require("minimatch");
const path = require("path");
const fs = require("fs");
const union = require("lodash.union");

class CleanPlugin {
  constructor (options) {
    this.options = options || {}
  }

  apply (compiler) {
    const outputPath = compiler.options.output.path;
    //在 compilation 完成时执行
    compiler.hooks.done.tap('CleanPlugin', stats => {
      if (compiler.outputFileSystem.constructor.name !== "NodeOutputFileSystem") {
        return;
      }
      const assets = stats.toJson().assets.map(asset => asset.name);
      // 多数组合并并且去重
      const newAssets = union(this.options.exclude, assets);
      // 获取未匹配文件
      const unmatchFiles = this.getUnmatchFiles(outputPath, newAssets);
      // 删除未匹配文件
      unmatchFiles.forEach(fs.unlinkSync);
    })

  }

  /**
   * 获取需要被清除的文件列表数组
   * @param {String} fromPath dist文件夹的绝对路径
   * @param {Array} exclude 忽略列表，里面是用户自定义的忽略文件，被忽略的文件将不会被清除
   */
  getUnmatchFiles(fromPath, exclude = []) {

    // recursiveReadSync同步获取fromPath路径里面的文件列表
    const unmatchFiles = recursiveReadSync(fromPath).filter(file =>
      // 判断file是否与exclude中的每个文件都不相同，true则代表这是需要被清除的文件，被filter收集进新数组
      exclude.every(
        excluded => {
          // minimatch判断两个路径是否相等，这里需要取反
          return !minimatch(path.relative(fromPath, file), path.join(excluded), {
            dot: true
          })
        }
      )
    );
    return unmatchFiles;
}
}

module.exports = CleanPlugin
