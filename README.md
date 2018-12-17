Documentation for users
=======================

The current release of this documentation is available at
https://help.rerobots.net


Building
--------

A [Git LFS](https://git-lfs.github.com/) client is required to clone this
repository. Note that `git clone` will succeed without `git lfs` available, but
some large files will not be fetched.

Provided the dependencies (next section), you can get a local view of this
website via

    make && ./local-staging.sh

where the first command populates a build/ directory and the latter uses
[http.server in the Python 3 standard library](
https://docs.python.org/3.5/library/http.server.html)
to serve requests. (Python versions < 3 are not supported.)

Now, direct your Web browser at http://127.0.0.1:8001/


Dependencies
------------

This site depends on [Bootstrap](https://getbootstrap.com/) and
[jQuery](http://jquery.com/). The expected layout for `make` to work is:

* extern/css/bootstrap.min.css
* extern/css/sticky-footer.css
* extern/js/bootstrap.min.js
* extern/js/jquery.min.js

Building requires the Python package [Markdown](
https://pypi.org/project/Markdown/).


Licenses
--------

All source code is provided as free software, released under the Apache License,
Version 2.0.  You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

All other content is released under the Creative Commons Attribution 4.0
International License. To get a copy of this license, visit
<https://creativecommons.org/licenses/by/4.0/> or send a letter to
Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.

If you think that there is ambiguity about which license applies to a specific
part of this repository, then feel free to ask someone at rerobots, Inc.,
q@rerobots.net
