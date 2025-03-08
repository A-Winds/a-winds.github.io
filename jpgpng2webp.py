#! /usr/bin/env python3

"""
jpg, pngファイルをwebpファイルに変換するします.

使用上の注意
- 異なるディレクトリに同じファイル名の画像がある場合, 正常に動作しない可能性があります.
"""

import os, glob, re
from PIL import Image
from tqdm import tqdm

# 変換しないファイルのリスト
EXCLUDE_FILES = [
    'img/favicon/android-chrome-192x192.png',
    'img/favicon/android-chrome-512x512.png',
    'img/favicon/apple-touch-icon.png',
    'img/favicon/favicon-16x16.png',
    'img/favicon/favicon-32x32.png',
    'img/favicon/mstile-150x150.png',
    'img/ogimage.jpg',
]

# jpgとpngファイルを取得
files = glob.glob('**/*.jpg', recursive=True) + glob.glob('**/*.JPG', recursive=True) + glob.glob('**/*.png', recursive=True)
files_html_css = glob.glob('**/*.html', recursive=True) + glob.glob('**/*.css', recursive=True)

for i in tqdm(range(len(files))):
    f = files[i]

    if f in EXCLUDE_FILES:
        continue

    # webpファイルへ変換
    img = Image.open(f)
    img.save(f.replace('.jpg', '.webp').replace('.JPG', '.webp').replace('.png', '.webp'), 'WEBP')

    # jpg, pngファイルを削除
    os.remove(f)

    # ファイルパスからファイル名だけを取得(拡張子もなし)
    file_name = os.path.splitext(f)[0]

    # html, cssファイル内のファイルパスを変更
    for f_html_css in files_html_css:
        with open(f_html_css, 'r') as f:
            text = f.read()
            text = re.sub(f'{file_name}.jpg', f'{file_name}.webp', text)
            text = re.sub(f'{file_name}.JPG', f'{file_name}.webp', text)
            text = re.sub(f'{file_name}.png', f'{file_name}.webp', text)
        with open(f_html_css, 'w') as f:
            f.write(text)
