# TypeScript 类型定义

本目录包含SillyTavern和Tavern Helper的TypeScript类型定义文件，用于开发时的类型检查和智能提示。

## 目录结构

### function/
SillyTavern脚本函数的类型定义，包括：
- `audio.d.ts` - 音频相关API
- `builtin.d.ts` - 内置函数
- `character.d.ts` - 角色相关API
- `chat_message.d.ts` - 聊天消息API
- `generate.d.ts` - 生成相关API
- `lorebook.d.ts` - 世界书API
- `preset.d.ts` - 预设配置
- `slash.d.ts` - 斜杠命令
- `variables.d.ts` - 变量系统
- `worldbook.d.ts` - 世界书详细定义
- 等等...

### iframe/
前端界面（iframe）相关的类型定义：
- `event.d.ts` - 事件系统
- `exported.sillytavern.d.ts` - SillyTavern导出的API
- `exported.tavernhelper.d.ts` - Tavern Helper导出的API
- `exported.mvu.d.ts` - MVU架构相关
- `script.d.ts` - 脚本相关
- `util.d.ts` - 工具函数
- `variables.d.ts` - 变量系统

## 使用方法

这些类型定义文件会被TypeScript编译器自动识别，为你的代码提供：

1. **智能提示** - 在VSCode等编辑器中获得API的自动补全
2. **类型检查** - 编译时发现类型错误
3. **文档参考** - 查看API的参数和返回值说明

## 注意事项

- 这些文件是静态的类型定义，不会被编译到最终的HTML文件中
- 仅用于开发时的类型检查和智能提示
- 来自SillyTavern和Tavern Helper模板项目
- 不需要修改这些文件，除非SillyTavern的API发生变化

## 更新

如果SillyTavern或Tavern Helper的API更新，可以从模板仓库同步最新的类型定义：

```bash
cp -r tavern_helper_template/@types .
```

## 参考

- [SillyTavern](https://github.com/SillyTavern/SillyTavern)
- [Tavern Helper Template](https://github.com/StageDog/tavern_helper_template)
