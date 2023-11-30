const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

const directoryPath = 'tmp'; // 要监控的目录路径
const fileExpireTime = 1000 * 60 * 10; // 临时文件都缓存10分钟

// 指定要保留的文件列表
const filesToKeep = ['sending_file_will_downloaded_here'];

// 在启动时清空目录
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("无法读取文件夹: ", err);
    return;
  }

  files.forEach(file => {
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

// 文件信息映射
const fileMap = new Map();

watcher.on('add', filePath => {
    console.log(`File ${filePath} has been added.`);
    fileMap.set(filePath, Date.now());
});

// 定期检查过期文件并删除
setInterval(() => {
    const currentTime = Date.now();
    fileMap.forEach((addedTime, filePath) => {
        if (currentTime - addedTime > fileExpireTime) {
            fs.unlink(filePath, err => {
                if (err) {
                    console.error(`Error deleting file ${filePath}:`, err);
                } else {
                    console.log(`File ${filePath} deleted.`);
                    fileMap.delete(filePath);
                }
            });
        }
    });
}, 10 * 1000); // 每10秒检查一次
