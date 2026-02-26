#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HTML文件拆分工具
将单个HTML文件拆分为HTML模板、CSS和JavaScript文件
"""

import re
import os
import sys

def split_html_file(input_file, output_dir):
    """拆分HTML文件到指定目录"""
    
    # 读取HTML文件
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取style标签内容
    style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
    css_content = style_match.group(1).strip() if style_match else ''
    
    # 提取script标签内容（排除YAML数据和外部引用）
    script_pattern = r'<script(?![^>]*src=)[^>]*>(.*?)</script>'
    scripts = re.findall(script_pattern, content, re.DOTALL)
    
    # 分离YAML数据和JavaScript代码
    yaml_content = ''
    js_content = ''
    
    for script in scripts:
        if 'type="text/yaml"' in content[content.find(script)-100:content.find(script)]:
            yaml_content = script.strip()
        else:
            js_content += script.strip() + '\n\n'
    
    # 提取body内容（HTML结构）
    body_match = re.search(r'<body>(.*?)</body>', content, re.DOTALL)
    html_structure = body_match.group(1).strip() if body_match else ''
    
    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)
    
    # 写入CSS文件
    with open(os.path.join(output_dir, 'style.css'), 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    # 写入JavaScript文件
    with open(os.path.join(output_dir, 'script.js'), 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    # 写入HTML模板
    html_template = f'''<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>角色查看器</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
{html_structure}

    <script id="data-source" type="text/yaml">
      $1
    </script>
    <script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>
    <script src="script.js"></script>
  </body>
</html>
'''
    
    with open(os.path.join(output_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html_template)
    
    print(f"✓ 已拆分 {input_file} 到 {output_dir}/")
    print(f"  - index.html")
    print(f"  - style.css ({len(css_content)} 字符)")
    print(f"  - script.js ({len(js_content)} 字符)")

if __name__ == '__main__':
    # 拆分小初的角色查看器
    split_html_file('小初的角色查看器.html', 'src/xiaochui-viewer')
    
    # 拆分貂貂的角色查看器
    split_html_file('貂貂的角色查看器.html', 'src/diaodiao-viewer')
    
    print("\n✓ 所有文件拆分完成！")
