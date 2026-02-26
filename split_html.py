#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
拆分HTML文件为CSS、HTML和JS组件
"""
import re
import os

def split_html_file(input_file, output_dir):
    """拆分HTML文件"""
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取CSS (从<style>到</style>)
    css_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
    css_content = css_match.group(1).strip() if css_match else ''
    
    # 提取HTML body部分 (从<body>到</body>，但不包括script标签)
    body_match = re.search(r'<body>(.*?)<script', content, re.DOTALL)
    html_content = body_match.group(1).strip() if body_match else ''
    
    # 提取JS (从最后一个<script>到</script>，排除yaml数据和外部引用)
    # 找到所有script标签
    script_pattern = r'<script(?:\s+[^>]*)?>(.*?)</script>'
    scripts = re.findall(script_pattern, content, re.DOTALL)
    
    # 过滤掉空的、type="text/yaml"的和src引用的script
    js_content = ''
    for script in scripts:
        script = script.strip()
        if script and not script.startswith('$1') and len(script) > 50:
            js_content = script
            break
    
    # 提取head中的外部资源链接
    head_match = re.search(r'<head>(.*?)</head>', content, re.DOTALL)
    head_content = head_match.group(1) if head_match else ''
    
    # 提取link标签
    links = re.findall(r'<link[^>]*>', head_content)
    
    # 提取外部script引用
    external_scripts = re.findall(r'<script[^>]*src=[^>]*></script>', content)
    
    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)
    
    # 写入CSS文件
    with open(os.path.join(output_dir, 'style.css'), 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    # 写入HTML模板文件
    with open(os.path.join(output_dir, 'template.html'), 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    # 写入JS文件
    with open(os.path.join(output_dir, 'script.js'), 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    # 写入外部依赖配置
    deps = {
        'links': links,
        'scripts': external_scripts
    }
    
    with open(os.path.join(output_dir, 'dependencies.txt'), 'w', encoding='utf-8') as f:
        f.write('# External Links\n')
        for link in links:
            f.write(link + '\n')
        f.write('\n# External Scripts\n')
        for script in external_scripts:
            f.write(script + '\n')
    
    print(f'✓ 已拆分 {input_file} 到 {output_dir}/')
    print(f'  - style.css ({len(css_content)} chars)')
    print(f'  - template.html ({len(html_content)} chars)')
    print(f'  - script.js ({len(js_content)} chars)')
    print(f'  - dependencies.txt')

if __name__ == '__main__':
    # 拆分小初的角色查看器
    split_html_file('小初的角色查看器.html', 'src/xiaochui')
    
    # 拆分貂貂的角色查看器
    split_html_file('貂貂的角色查看器.html', 'src/diaodiao')
    
    print('\n✓ 所有文件拆分完成！')
