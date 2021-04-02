#!/usr/bin/env python
"""Static site generation for help.rerobots.net

Images are collected according to two rules:

1. the file is named in Markdown visual image syntax (of the form ![...](...)),

2. for any file selected via rule 1, if its name begins with a width
   prefix (e.g., `480px-`), then the prefix is removed to obtain a new
   selected file name.


SCL <scott@rerobots.net>
Copyright (C) 2018 rerobots, Inc.
"""
import os.path
import re
import sys
from pathlib import Path

import gen


def get_image_paths(x):
    image_paths = []
    for match in re.findall('!\[.*\]\(.*\)', x):
        start_index = match.find('(') + 1
        image_paths.append(match[start_index:-1])
    return image_paths

def strip_emailaddr(x):
    for match in re.findall('<.*@.*>', x):
        x = x.replace(match, '<(hidden)>')
    return x

def rm_version_prefix(x):
    y = ''
    for line in x.split('\n'):
        if line.startswith('###'):
            ind = line.find('version')
            if ind < 0:
                y += line + '\n'
            else:
                y += '### ' + line[ind:] + '\n'
        else:
            y += line + '\n'
    return y


wtypes_path = 'workspaces/types/'

wtypes = []
for p in Path(wtypes_path).iterdir():
    if p.is_file() and str(p).endswith('.md'):
        wtypes.append(os.path.basename(str(p)[:-3]))

wtypes.sort()

list_wtypes = '<ul class="list-group list-wtypes">\n'
for wtype in wtypes:
    list_wtypes += '<li class="list-group-item"><a href="{WTYPE}.html">{WTYPE}</a></li>\n'.format(WTYPE=wtype)
    with open(os.path.join(sys.argv[1], wtype + '.html'), 'wt') as fp:
        with open(os.path.join(wtypes_path, wtype + '.md'), 'rt') as fpmd:
            typedef = fpmd.read()
        with open(os.path.join(wtypes_path, 'changelogs', wtype + '.changelog.md'), 'rt') as fpcl:
            typedef_changelog = fpcl.read()
        image_paths = get_image_paths(typedef)
        for image_path in image_paths:
            basename = os.path.basename(image_path)
            dirname = os.path.dirname(image_path)
            filenames = [basename]
            if basename.startswith('480px-'):
                filename_fullsize = basename[6:]
                rebuilt_path = os.path.join(dirname, filename_fullsize)
                origpath = os.path.join(os.path.abspath(os.path.join(wtypes_path, '..')),
                                        rebuilt_path)
                if not os.path.exists(origpath):
                    # Attempt to switch file format,
                    # but do not check exists() again here
                    if filename_fullsize.endswith('.jpg'):
                        filename_fullsize = filename_fullsize[:-4] + '.png'
                    elif filename_fullsize.endswith('.png'):
                        filename_fullsize = filename_fullsize[:-4] + '.jpg'
                filenames.append(filename_fullsize)
            for filename in filenames:
                rebuilt_path = os.path.join(dirname, filename)
                origpath = os.path.join(os.path.abspath(os.path.join(wtypes_path, '..')),
                                        rebuilt_path)
                assert os.path.exists(origpath), 'file not found: {}'.format(origpath)
                with open(origpath, 'rb') as in_img:
                    with open(os.path.join(sys.argv[1], rebuilt_path), 'wb') as out_img:
                        out_img.write(in_img.read())
        typedef_changelog = strip_emailaddr(typedef_changelog)
        typedef_changelog = rm_version_prefix(typedef_changelog)
        repo_url = 'https://github.com/rerobots/workspaces/blob/master/types/{}.md'.format(wtype)
        typedef += '''
Changelog
---------
([latest source file]({}))

{}
'''.format(repo_url, typedef_changelog)
        fp.write(gen.from_template(typedef, os.path.join(sys.argv[1], wtype + '.html')))

list_wtypes += '</ul>'

with open(os.path.join(sys.argv[1], 'index.html'), 'wt') as fp:
    fp.write(gen.from_template('''
# Index of Workspace Types

(generated from [https://github.com/rerobots/workspaces](https://github.com/rerobots/workspaces))

''' + list_wtypes, os.path.join(sys.argv[1], 'index.html')))
