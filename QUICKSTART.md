# 快速开始指南

## 1. 克隆项目

```bash
git clone <your-repo-url>
cd Character-Viewer
```

## 2. 修改源代码

编辑 `src/` 目录下的文件：

### 小初的角色查看器
- `src/xiaochui/style.css` - 样式
- `src/xiaochui/template.html` - HTML结构
- `src/xiaochui/script.js` - JavaScript逻辑

### 貂貂的角色查看器
- `src/diaodiao/style.css` - 样式
- `src/diaodiao/template.html` - HTML结构
- `src/diaodiao/script.js` - JavaScript逻辑

## 3. 构建HTML文件

```bash
# 使用Python脚本
python3 build.py

# 或使用npm命令
npm run build
```

构建后的文件在 `dist/` 目录：
- `dist/小初的角色查看器.html`
- `dist/貂貂的角色查看器.html`

## 4. 本地预览

```bash
npm run serve
```

然后在浏览器访问 http://localhost:8080

## 5. 提交到GitHub

```bash
git add .
git commit -m "更新角色查看器"
git push
```

GitHub Actions会自动构建并更新 `dist/` 目录。

## 常用命令

```bash
# 构建
npm run build

# 清理dist目录
npm run clean

# 拆分HTML文件（如果需要）
npm run split

# 本地预览
npm run serve
```

## 导入到酒馆

1. 打开 `dist/` 目录
2. 选择需要的HTML文件
3. 在SillyTavern中导入为正则替换美化

## 注意事项

- ✅ 只修改 `src/` 目录下的文件
- ✅ 提交前先本地构建测试
- ❌ 不要直接修改 `dist/` 目录的文件
- ❌ 不要提交 `tavern_helper_template/` 目录

## 目录说明

```
src/          # 源代码（你要修改的）
dist/         # 构建输出（自动生成）
示例/         # 参考示例
build.py      # 构建脚本
split_html.py # 拆分脚本
```

## 获取帮助

查看完整文档：[README.md](README.md)
