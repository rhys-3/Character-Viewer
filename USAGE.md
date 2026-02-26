# 使用说明

## 项目概述

本项目已将两个HTML角色查看器拆分为模块化的结构，便于维护和开发。

## 目录结构

```
Character-Viewer/
├── src/
│   ├── xiaochui-viewer/     # 小初的角色查看器
│   │   ├── index.html       # HTML模板
│   │   ├── style.css        # 样式文件
│   │   └── script.js        # JavaScript逻辑
│   └── diaodiao-viewer/     # 貂貂的角色查看器
│       ├── index.html
│       ├── style.css
│       └── script.js
├── dist/                    # 构建输出（自动生成）
├── 小初的角色查看器.html    # 原始文件（保留）
├── 貂貂的角色查看器.html    # 原始文件（保留）
└── split_html.py           # 拆分工具脚本
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式

启动开发服务器（默认小初的查看器）：

```bash
npm run dev
```

浏览器会自动打开 http://localhost:8080

### 3. 构建生产版本

构建所有查看器：

```bash
npm run build
```

构建特定查看器：

```bash
# 小初的查看器
npm run build:xiaochui

# 貂貂的查看器
npm run build:diaodiao
```

构建后的文件在 `dist/` 目录下。

### 4. 预览构建结果

```bash
npm run serve
```

然后访问：
- 小初: http://localhost:8080/xiaochui/
- 貂貂: http://localhost:8080/diaodiao/

## 修改和开发

### 修改样式

编辑对应的 `style.css` 文件：
- `src/xiaochui-viewer/style.css`
- `src/diaodiao-viewer/style.css`

### 修改功能

编辑对应的 `script.js` 文件：
- `src/xiaochui-viewer/script.js`
- `src/diaodiao-viewer/script.js`

### 修改HTML结构

编辑对应的 `index.html` 文件：
- `src/xiaochui-viewer/index.html`
- `src/diaodiao-viewer/index.html`

## Git 工作流

### 查看状态

```bash
git status
```

### 提交更改

```bash
git add .
git commit -m "描述你的更改"
```

### 查看历史

```bash
git log --oneline
```

### 创建分支

```bash
git checkout -b feature/新功能名称
```

## 重新拆分原始HTML

如果需要重新从原始HTML文件拆分：

```bash
python3 split_html.py
```

这会覆盖 `src/` 目录下的文件。

## 注意事项

1. 原始HTML文件（`小初的角色查看器.html` 和 `貂貂的角色查看器.html`）已保留作为备份
2. `dist/` 目录由构建工具自动生成，不要手动编辑
3. 修改代码后需要重新构建才能看到生产版本的变化
4. 开发模式支持热重载，修改后会自动刷新浏览器

## 故障排除

### 依赖安装失败

尝试清除缓存：

```bash
rm -rf node_modules package-lock.json
npm install
```

### 构建失败

检查是否有语法错误：

```bash
npm run build 2>&1 | less
```

### 端口被占用

修改 `webpack.config.js` 中的端口号，或者关闭占用8080端口的程序。

## 技术栈

- **构建工具**: Webpack 5
- **开发服务器**: webpack-dev-server
- **样式处理**: CSS Loader + Style Loader
- **HTML模板**: html-webpack-plugin
- **YAML解析**: js-yaml (CDN)

## 下一步

- 考虑添加 TypeScript 支持
- 添加代码格式化工具（Prettier）
- 添加代码检查工具（ESLint）
- 考虑使用 Vue/React 重构
- 添加单元测试
