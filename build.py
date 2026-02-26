#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
构建脚本：将src目录中的组件合并为完整的HTML文件
"""
import os
import re

def build_html(src_dir, output_file, title):
    """从src目录构建完整的HTML文件"""
    
    # 读取各个组件
    style_path = os.path.join(src_dir, 'style.css')
    template_path = os.path.join(src_dir, 'template.html')
    script_path = os.path.join(src_dir, 'script.js')
    deps_path = os.path.join(src_dir, 'dependencies.txt')
    
    with open(style_path, 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    with open(template_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    with open(script_path, 'r', encoding='utf-8') as f:
        js_content = f.read()
    
    # 读取外部依赖
    links = []
    scripts = []
    with open(deps_path, 'r', encoding='utf-8') as f:
        section = None
        for line in f:
            line = line.strip()
            if line.startswith('# External Links'):
                section = 'links'
            elif line.startswith('# External Scripts'):
                section = 'scripts'
            elif line and not line.startswith('#'):
                if section == 'links':
                    links.append(line)
                elif section == 'scripts':
                    scripts.append(line)
    
    # 构建完整的HTML
    html_output = f'''<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
'''
    
    # 添加外部链接
    for link in links:
        html_output += f'    {link}\n'
    
    # 添加样式
    html_output += f'''    <style>
{css_content}
    </style>
  </head>
  <body>
{html_content}

    <script id="data-source" type="text/yaml">
      $1
    </script>
'''
    
    # 添加外部脚本
    for script in scripts:
        html_output += f'    {script}\n'
    
    # 添加主脚本
    html_output += f'''
    <script>
{js_content}
    </script>
  </body>
</html>'''
    
    # 写入输出文件
    os.makedirs(os.path.dirname(output_file) if os.path.dirname(output_file) else '.', exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_output)
    
    print(f'✓ 已构建 {output_file}')
    print(f'  文件大小: {len(html_output)} 字符')

if __name__ == '__main__':
    # 创建dist目录
    os.makedirs('dist', exist_ok=True)
    
    # 构建小初的角色查看器
    build_html('src/xiaochui', 'dist/小初的角色查看器.html', '角色查看器v2.6')
    
    # 构建貂貂的角色查看器
    build_html('src/diaodiao', 'dist/貂貂的角色查看器.html', '角色查看器')
    
    print('\n✓ 所有文件构建完成！')
    print('输出目录: dist/')
