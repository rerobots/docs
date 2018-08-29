#!/bin/sh -e
#
# Script for staging website locally. It should suffice to run this
# and direct your Web browser to http://127.0.0.1:8001
#
#
# SCL <scott@rerobots.net>
# Copyright (C) 2018 rerobots, Inc.

cd build && python -m http.server -b 127.0.0.1 8001
