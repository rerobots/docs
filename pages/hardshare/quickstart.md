---
title: Quickstart
---

# Quickstart

To get up and running with **hardshare**, try the instructions below.

For more details, including alternative configurations and special cases, read
[Installation Instructions](/hardshare/install). To learn basic concepts about **hardshare**, read the
[Introduction](/hardshare/intro).


## Preliminaries

Instructions below are known to work on modern GNU/Linux distributions, for
example [Ubuntu](https://ubuntu.com/download/desktop).

First, get the current release at <https://github.com/rerobots/hardshare/releases>
and follow the instructions for your host.
If your host type is not there, then please [contact us](https://rerobots.net/contact)
or [build the client from source code](/hardshare/develop).

If it succeeded, then you should be able to get the version from the
command-line interface (CLI)

```bash
hardshare version
```


## Create Local Configuration

Get an [API token](https://rerobots.net/tokens) to associate with your
hardshare client. (Learn how to do this [from the rerobots Web Guide](
/web/making-and-revoking-api-tokens).) Then,
initialize a new local configuration, and add the API token to it

```bash
hardshare init
hardshare config --add-token path/to/your/rerobots-apitoken.txt
```

Finally, create a new workspace deployment

```bash
hardshare register
```

This command can fail if your account cannot register more new devices. Please
[contact us](https://rerobots.net/contact) to raise the limit.

Confirm that the configuration and dependencies are all ready:

```bash
hardshare check
```

If an error is detected, the `check` command will print details and
suggest how to fix it. If the suggestion does not work for you, then
read the [Installation Instructions](/hardshare/install).


## Start Sharing!

Start advertising

```bash
hardshare ad
```

Open a new terminal, and check it

```bash
hardshare status
```

which should result in output that is similar to the following

```
advertised deployments:
	b47cd57c-833b-47c1-964d-79e5e6f00dba
```


## Request Instance

Now that the daemon is active, you can request an instance on your own device
through <https://rerobots.net/>. Go to the URL shown in

```bash
hardshare list
```

It will look like
`https://rerobots.net/workspace/b47cd57c-833b-47c1-964d-79e5e6f00dba` but with
a different ID. After requesting the instance, it should go from `INIT` to
`READY`. If something breaks, for example arriving at `INIT_FAIL` status,
then read
[Installation Instructions](/hardshare/install) or [Get Help](/hardshare/help). For example, the first `INIT` can appear slow
because a Docker image is downloaded, [as described elsewhere](/hardshare/install#prepare-a-cprovider).

If instance initialization is interrupted by a loss of connection or the client
crashing, then the instance will automatically be marked `INIT_FAIL`.
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

Otherwise, congratulations on successful instantiation from your own device!
Terminate the instance from <https://rerobots.net/instances> and, from the
command-line, stop the daemon

```bash
hardshare stop-ad
```


## Check Permissions

When a new device is registered, the default configuration permits only you
(i.e., your user account) to create instances. To get the list of access rules

```bash
hardshare rules -l
```

which should only have 1 item under `rules`: a capability `CAP_INSTANTIATE`
and your username. To allow other users

```bash
hardshare rules --permit-all
```


## What Next?

At this stage, you have a ready-to-use hardshare host. Next:

* [Attach External Camera](/hardshare/attach_camera) to provide video streams of your hardware.
* Go to [rerobots.net/hardshare](https://rerobots.net/hardshare) and create your first sandbox.
* If you have a PlatformIO-compatible board (for example, ESP32), do the [Tutorial: ESP32](/hardshare/tutorials/esp32).
* If you have a Misty robot, do the [Tutorial: Misty](/hardshare/tutorials/misty).
* [Tell us what you are building!](https://rerobots.net/contact)
