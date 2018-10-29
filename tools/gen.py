#!/usr/bin/env python
"""Static site generation for help.rerobots.net


SCL <scott@rerobots.net>
Copyright (C) 2018 rerobots, Inc.
"""
from datetime import datetime
import sys

from markdown.extensions.toc import TocExtension
from markdown import markdown


PREFIX="""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-111751205-3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-111751205-3');
</script>

<title>documentation - rerobots</title>

<link href="/extern/css/bootstrap.min.css" rel="stylesheet">
<link href="/extern/css/sticky-footer.css" rel="stylesheet">

<script src="/extern/js/jquery.min.js"></script>
<script src="/extern/js/bootstrap.min.js"></script>

<link rel="stylesheet" href="/css/main.css">
</head>
<body>
<a class="sr-only sr-only-focusable" href="#main-content">Skip to main content</a>

<nav class="navbar navbar-default navbar-static-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="https://rerobots.net/">
        <span class="prefix-re">re</span>robots
      </a>
    </div>
    <div class="collapse navbar-collapse" id="navbar-collapse-1">
      <ul class="nav navbar-nav navbar-right">
      <li><a href="/index.html">introduction</a></li>
      <li><a href="/prelim.html">preliminaries</a></li>
      <li><a href="/guides.html">guides</a></li>
      <li><a href="/workspaces/">workspaces</a></li>
      <li><a href="/api.html">API</a></li>
      <li><a href="/references.html">references</a></li>
      </ul>
    </div>
  </div>
</nav>

<div class="container" id="main-content">"""

SUFFIX="""</div>

<footer class="footer">
  <div class="container"><div class="row">
    <div class="col-md-6 col-sm-6 text-muted">
      Copyright &copy; 2018 rerobots, Inc.<br />
      This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/" id="commons-license">Creative Commons Attribution 4.0 International License</a>.
    </div>
    <div class="col-md-6 col-sm-6 text-muted">
      <span id="update-date">updated {DATESTAMP}</span>
      <a href="https://rerobots.net/site/terms-of-service">terms of service</a>
    </div>
  </div></div>
</footer>

{ENDBLOCK}
</body>
</html>
"""


def from_template(body):
    tstamp = datetime.utcnow().strftime('%Y-%m-%d')
    out = PREFIX
    out += markdown(body, output_format='html5', extensions=[TocExtension(), 'markdown.extensions.tables'])
    if '$$' in body:
        endblock = '<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML"></script>'
    else:
        endblock = ''
    out += SUFFIX.format(DATESTAMP=tstamp, ENDBLOCK=endblock)
    return out


def main(path):
    with open(path) as fp:
        return from_template(fp.read())


if __name__ == '__main__':
    print(main(sys.argv[1]))
