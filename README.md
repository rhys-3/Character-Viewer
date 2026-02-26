# Character Viewer 角色查看器

这是一个用于酒馆（SillyTavern）的角色查看器项目，包含两个版本：
- 小初的角色查看器
- 貂貂的角色查看器

## 项目结构

```
Character-Viewer/
├── src/                    # 源代码目录
│   ├── xiaochui/          # 小初的角色查看器源码
│   │   ├── style.css      # 样式文件
│   │   ├── template.html  # HTML模板
│   │   ├── script.js      # JavaScript逻辑
│   │   └── dependencies.txt # 外部依赖列表
│   └── diaodiao/          # 貂貂的角色查看器源码
│       ├── style.css
│       ├── template.html
│       ├── script.js
│       └── dependencies.txt
├── dist/                   # 构建输出目录
│   ├── 小初的角色查看器.html
│   └── 貂貂的角色查看器.html
├── build.py               # 构建脚本
├── split_html.py          # HTML拆分脚本
└── .github/workflows/     # GitHub Actions工作流
    └── build.yml          # 自动构建配置

```

## 使用方法

### 开发流程

1. **修改源代码**
   - 编辑 `src/xiaochui/` 或 `src/diaodiao/` 目录下的文件
   - `style.css` - 修改样式
   - `template.html` - 修改HTML结构
   - `script.js` - 修改JavaScript逻辑

2. **本地构建**
   ```bash
   # 构建HTML文件
   python3 build.py
   # 或使用npm脚本
   npm run build
   ```

3. **本地预览**
   ```bash
   # 启动本地服务器
   npm run serve
   # 然后在浏览器访问 http://localhost:8080
   ```

### 自动构建

当你推送代码到GitHub时，GitHub Actions会自动：
1. 运行构建脚本
2. 生成完整的HTML文件
3. 将构建结果提交回仓库的 `dist/` 目录

### 拆分现有HTML文件

如果你有完整的HTML文件需要拆分为src结构：

```bash
# 将HTML文件放在项目根目录
# 修改 split_html.py 中的文件路径
python3 split_html.py
```

## 脚本说明

### build.py
将 `src/` 目录中的组件合并为完整的HTML文件，输出到 `dist/` 目录。

### split_html.py
将完整的HTML文件拆分为CSS、HTML和JS组件，便于维护和版本控制。

## 配置文件

- `.editorconfig` - 编辑器配置
- `.prettierrc` - 代码格式化配置
- `.mcp.json` - MCP服务器配置
- `.gitignore` - Git忽略文件配置

## 导入到酒馆

1. 构建完成后，在 `dist/` 目录找到生成的HTML文件
2. 在SillyTavern中导入对应的HTML文件作为正则替换美化

## 开发建议

- 修改代码时只需编辑 `src/` 目录下的文件
- 提交代码前先本地构建测试
- 不要直接修改 `dist/` 目录下的文件（会被自动覆盖）
- 使用有意义的commit信息

## 许可证

MIT License
