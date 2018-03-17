#!/usr/bin/env python
"""Static site generation for help.rerobots.net


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
            image_paths = get_image_paths(typedef)
            for image_path in image_paths:
                origpath = os.path.join(os.path.abspath(os.path.join(wtypes_path, '..')), image_path)
                assert os.path.exists(origpath)
                with open(origpath, 'rb') as in_img:
                    with open(os.path.join(sys.argv[1], image_path), 'wb') as out_img:
                        out_img.write(in_img.read())
            fp.write(gen.from_template(typedef))

list_wtypes += '</ul>'

with open(os.path.join(sys.argv[1], 'index.html'), 'wt') as fp:
    fp.write(gen.from_template('''
# Index of workspace types

''' + list_wtypes))
