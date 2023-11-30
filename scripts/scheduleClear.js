const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path')
const directoryPath = 'tmp'; // 要监控的目录路径
const fileExpireTime = 1000 * 60 * 10; // 临时文件都缓存10分钟

// 指定要保留的文件列表
const filesToKeep = ['sending_file_will_downloaded_here'];

// 重新启动时清空文件
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("无法读取文件夹: ", err);
    return;
  }

  // 遍历文件夹中的每个文件
  files.forEach(file => {
    // 如果文件不在保留列表中，则删除
    if (!filesToKeep.includes(file)) {
      fs.unlink(path.join(directoryPath, file), err => {
        if (err) {
          console.error(`清空临时文件时出错: ${file}`, err);
        } else {
          console.log(`已清除临时文件: ${file}`);
        }
      });
    }
  });
});

// 使用chokidar监控文件夹
const watcher = chokidar.watch(directoryPath, {
    ignored: new RegExp(filesToKeep.join('|')), // 忽略文件
    persistent: true
});

// 当检测到新文件时
watcher.on('add', path => {
    console.log(`File ${path} has been added. It will be deleted after ${fileExpireTime / 1000} s.`);
    
    // 设置定时器来删除文件
    setTimeout(() => {
        fs.unlink(path, err => {
            if (err) {
                console.error(`Error deleting file ${path}:`, err);
            } else {
                console.log(`File ${path} deleted.`);
            }
        });
    }, fileExpireTime);
});
