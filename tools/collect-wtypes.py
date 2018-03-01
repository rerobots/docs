#!/usr/bin/env python
"""Static site generation for help.rerobots.net


SCL <scott@rerobots.net>
Copyright (C) 2018 rerobots, Inc.
"""
import os.path
import sys
from pathlib import Path

import gen


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
            fp.write(gen.from_template(fpmd.read()))

list_wtypes += '</ul>'

with open(os.path.join(sys.argv[1], 'index.html'), 'wt') as fp:
    fp.write(gen.from_template('''
# Index of workspace types

''' + list_wtypes))
