# 角色查看器 Character Viewer

这是一个角色查看器项目，包含两个独立的查看器：
- 小初的角色查看器
- 貂貂的角色查看器

## 项目结构

```
Character-Viewer/
├── src/
│   ├── xiaochui-viewer/     # 小初的角色查看器
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   └── diaodiao-viewer/     # 貂貂的角色查看器
│       ├── index.html
│       ├── style.css
│       └── script.js
├── dist/                    # 构建输出目录
├── package.json
├── webpack.config.js
└── README.md
```

## 安装依赖

```bash
npm install
```

## 开发模式

启动开发服务器（默认为小初的查看器）：

```bash
npm run dev
```

## 构建

构建所有查看器：

```bash
npm run build
```

构建特定查看器：

```bash
# 构建小初的查看器
npm run build:xiaochui

# 构建貂貂的查看器
npm run build:diaodiao
```

## 本地预览

构建完成后，可以使用以下命令启动本地服务器预览：

```bash
npm run serve
```

然后访问：
- 小初的查看器: http://localhost:8080/xiaochui/
- 貂貂的查看器: http://localhost:8080/diaodiao/

## 原始文件

原始的HTML文件保存在项目根目录：
- `小初的角色查看器.html`
- `貂貂的角色查看器.html`

## 技术栈

- Webpack 5
- HTML/CSS/JavaScript
- js-yaml (用于YAML数据解析)

## 许可证

MIT
