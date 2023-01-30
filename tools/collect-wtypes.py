#!/usr/bin/env python
"""Collect workspace type data and changelogs

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
from pathlib import Path


def dump_header(header):
    body = '\n'.join([f'{k}: {v}' for (k, v) in header.items()])
    return '---\n' + body + '\n---\n'

def parse_header(header_raw):
    header = dict()
    for line in header_raw.strip().split('\n'):
        divider = line.find(':')
        header[line[:divider]] = line[(divider+1):].strip()
    return header

def extract_header(x):
    if x[:4] != '---\n':
        return None, x
    header_closing = x.find('---\n', 3)
    if header_closing < 0:
        return None, x
    return parse_header(x[4:header_closing]), x[(header_closing+4):]

def get_image_paths(x):
    image_paths = []
    for match in re.findall(r'!\[[^\[\]]+\]\([^\[\]]+\)', x):
        image_paths.append(match[(match[:-1].rfind('(') + 1):-1])
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


wtypes_path = os.path.join('workspaces', 'types')
md_output_path = os.path.join('pages', 'workspaces')
public_output_path = os.path.join('public', 'workspaces')
img_output_path = os.path.join(public_output_path, 'figures')
accepted_image_file_suffixes = ['.jpg', '.png']

if not os.path.exists(md_output_path):
    os.mkdir(md_output_path)
else:
    for p in Path(md_output_path).glob('**/*'):
        assert p.name.endswith('.md'), f'unexpected file: {str(p)}'
        p.unlink()

if not os.path.exists(img_output_path):
    if not os.path.exists(public_output_path):
        os.mkdir(public_output_path)
    os.mkdir(img_output_path)
else:
    for p in Path(img_output_path).glob('**/*'):
        assert p.suffix in accepted_image_file_suffixes, f'unexpected file: {str(p)}'
        p.unlink()

wtypes = []
for p in Path(wtypes_path).iterdir():
    if p.is_file() and str(p).endswith('.md'):
        wtypes.append(os.path.basename(str(p)[:-3]))

wtypes.sort()

list_wtypes = ''
for wtype in wtypes:
    list_wtypes += f'* [{wtype}](workspaces/{wtype})\n'
    source_path = os.path.join(wtypes_path, wtype + '.md')
    with open(source_path, 'rt') as fpmd:
        typedef_header, typedef = extract_header(fpmd.read())
    with open(os.path.join(wtypes_path, 'changelogs', wtype + '.changelog.md'), 'rt') as fpcl:
        typedef_changelog = fpcl.read()
    image_paths = get_image_paths(typedef)
    for image_path in image_paths:
        basename = os.path.basename(image_path)
        dirname = os.path.dirname(image_path)
        filenames = [basename]
        if basename.startswith('480px-') and basename != '480px-basic_ur5_no_tool.jpg':
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
                with open(os.path.join(public_output_path, rebuilt_path), 'wb') as out_img:
                    out_img.write(in_img.read())
    typedef_changelog = strip_emailaddr(typedef_changelog)
    typedef_changelog = rm_version_prefix(typedef_changelog)
    typedef_header['srcUrl'] = f'https://github.com/rerobots/workspaces/blob/main/types/{wtype}.md'
    typedef += '''

## Changelog

{}
'''.format(typedef_changelog)
    with open(os.path.join(md_output_path, wtype + '.md'), 'wt') as fp:
        fp.write(dump_header(typedef_header) + typedef)

index = '''
# Index of Workspace Types

(generated from [https://github.com/rerobots/workspaces](https://github.com/rerobots/workspaces))

''' + list_wtypes

with open(os.path.join(md_output_path, 'index.md'), 'wt') as fp:
    fp.write(index)
