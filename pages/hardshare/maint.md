---
title: Maintenance
---

# Maintenance

This page describes troubleshooting and best practices for maintaining hardshare
configurations and shared devices.


## New instances will not launch, even though the deployment is being advertised. Why?

Unrecoverable errors during `INIT` or `TERMINATING` cause the deployment to be
locked.
This is shown as `lock-out: true` in the listing from `hardshare list`,
e.g.,

```
registration details for workspace deployments in local config:
7ec9c3d2-6a74-47d9-bf9f-b3ff41c26ec0
	created: 2021-02-26 01:29 UTC
	desc: CubeCell with OLED
	origin (address) of registration: (unknown)
	lock-out: true
```

When locked, new instance requests are rejected. To allow instances again,

```bash
hardshare unlock
```


## How to run the client without keeping a terminal open?

Run it with [GNU Screen](https://www.gnu.org/software/screen/) or
[tmux](https://github.com/tmux/tmux/wiki). For example,

```bash
tmux new-session hardshare ad \; detach
```

will start `ad`.
If there is no need to re-attach to the process, then a more simple solution
is [nohup](https://www.gnu.org/software/coreutils/manual/html_node/nohup-invocation.html)
(or [in the FreeBSD manual](https://man.freebsd.org/cgi/man.cgi?query=nohup)).

```bash
nohup hardshare ad &
```
Then, exit the shell normally.


## How to log client output to a file?

For example,

```bash
hardshare -v ad 2>&1 | tee -a hs.log
```

will run `ad` with verbose logging and pipe through
[tee](https://www.gnu.org/software/coreutils/manual/html_node/tee-invocation.html),
which print logs to the screen and appends to a file named hs.log.


## How to find all hardshare processes?

To find all relevant processes

```bash
ps -AHF | grep -i hardshare
```

Beware that this can return several processes that include "hardshare" in their
arguments but are not hardshare processes per se.  The left-most number in each
returned row is the PID. These processes can be killed via `kill` or
`kill -SIGINT`.
The flags to `ps` may be different on your host. On Mac, try
```bash
ps -ef | grep -i hardshare
```


## After first installation, instance status INIT_FAIL

There are many reasons why an instance can fail to initialize, depending on your
configuration. For a newly configured hardshare installation that uses Docker,
first check that the Docker image is compatible with your host architecture. To
do this, first

```bash
hardshare list
```

and find the Docker image line; for example,

```
cprovider: docker
cargs: []
img: rerobots/hs-generic
```

indicates the image `rerobots/hs-generic:latest` ("latest" is implied if not
present). Now, get your host architecture as known to Linux

```bash
# uname -m
x86_64
```

The output might be different, such as `armv7l` on some Raspyberry Pi
boards. Continuing the example above, we can pull the base generic Docker image
for x86_64 hosts

```bash
docker image pull rerobots/hs-generic:x86_64-latest
```

and update the hardshare configuration with the tag name

```bash
hardshare config --assign-image rerobots/hs-generic:x86_64-latest
```

Now unlock the deployment, and restart the hardshare daemon

```bash
hardshare stop-ad
hardshare unlock
hardshare ad
```

Finally, request an instance as usual.

Alternatively, build a new image on your host using files [under the directory devices/ of the sourcetree](https://github.com/rerobots/hardshare/tree/main/devices).


## Daemon fails to start or is not responsive


## List local configurations

```bash
hardshare --format=yaml list
```

```
local:
  err_api_tokens: {}
  api_tokens:
  - /home/scott/.rerobots/tokens/jwt.txt
  ssh_key: /home/scott/.ssh/unodist
  version: 0
  wdeployments:
  - cargs: []
    container_name: rrc
    cprovider: podman
    id: b47cd57c-833b-47c1-964d-79e5e6f00dba
    image: hs-generic
    init_inside: []
    owner: scott
    terminate: []
remote:
  deployments:
  - date_created: 2020-05-25 06:27 UTC
    id: b47cd57c-833b-47c1-964d-79e5e6f00dba
    origin: null
  owner: scott
```


## Start, check, and stop daemons

```bash
hardshare ad
hardshare status
hardshare stop-ad
```


## Update API tokens

Remove any expired API tokens

```bash
hardshare config -p
```

Then, [get a new API token](https://rerobots.net/tokens), and add it

```bash
hardshare config --add-token path/to/your/jwt.txt
```


## Manage deployment IDs

With the hardshare client, you can freely create and destroy workspace
deployments. This process corresponds to creating or destroying a unique ID.
Here, "destroying a unique ID" means that the corresponding workspace deployment
is marked as permanently unavailable.

When some part of robot or the surrounding environment changes significantly,
the unique ID should be changed.  What is "significant" or not depends on the
context. For example, removing a LiDAR sensor is likely significant, but small
changes to overhead lighting might not be.

Ensuring that unique IDs correspond to a known setting is a best practice
because it facilitates automation. For example, automated tests can assume that,
if the same ID is referenced, then the testing fixture with real hardware is the
same (up to some tolerance).
