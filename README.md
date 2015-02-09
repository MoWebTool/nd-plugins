# nd-plugins

[![spm version](http://spmjs.io/badge/nd-plugins)](http://spmjs.io/package/nd-plugins)

> 使得组件支持插件模式

## 安装

```bash
$ spm install nd-plugins --save
```

## 使用

```js
var Plugins = require('nd-plugins');
// use Plugins
```
## 开发

### 本地 Web 服务

```bash
grunt
```

浏览器中访问 http://127.0.0.1:8851

### 生成/查看 API 文档

```bash
grunt doc
grunt
```

浏览器中访问 http://127.0.0.1:8851/doc

### 代码检查与单元测试

```bash
grunt test
```

### 发布组件到 SPM 源

```bash
grunt publish
```
