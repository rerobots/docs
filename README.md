Documentation for users
=======================

The current release of this documentation is available at
https://docs.rerobots.net


Building and local development
------------------------------

The repository uses submodules, so when you first clone it, try

    git clone --recurse https://github.com/rerobots/docs.git

or if you already cloned it, then do `git submodule update --init --recursive`.

A [Git LFS](https://git-lfs.github.com/) client is required to clone this
repository. Note that `git clone` will succeed without `git lfs` available, but
some large files will not be fetched.

Provided the dependencies (next section), you can get a local view of this
website via

    yarn dev

Now, direct your Web browser at http://127.0.0.1:3000/


Dependencies
------------

Dependency management is only tested with [Yarn](https://yarnpkg.com/). To
install what you need,

    yarn install

The most prominent dependencies to consider when you begin studying the source
code of this documentation are

* Markdoc, https://markdoc.dev/
* Next.js, https://nextjs.org/

The following fonts are included in the build and available from upstream under
the Open Font License:

* Orbitron, https://fonts.google.com/specimen/Orbitron/about


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
