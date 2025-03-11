#! /usr/bin/env python3

"""
フッターのコピーライト表示を更新します.

"""

import os, glob, re
from tqdm import tqdm



# htmlファイルを取得
files = glob.glob('**/*.html', recursive=True)

for i in tqdm(range(len(files))):
    file_name = files[i]

    with open(file_name, 'r') as f:
        content = f.read()
        # テキスト置換
        content = re.sub(
            '<small class="footer-copy">Copyright © 2024 A-Winds all rights reserved.</small>',
            '<small class="footer-copy">Copyright © 2024-2025 A-Winds all rights reserved.</small>',
            content
        )
    
    with open(file_name, 'w') as f:
        f.write(content)
