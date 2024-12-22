---
title: Introduction
---

# Introduction

## Summary

This page introduces the main concepts and parts of rerobots.

## Workspaces

A **workspace** is a collection of methods and materials for
experiments with hardware. Note that "experiments" is not only for basic or applied
research, but it is also for routine engineering activities like
{% abbr title="continuous integration" %}CI{% /abbr %} testing.

Conceptually, there are three levels of refinement. A **workspace type** is the
workspace in terms of essential features, such as the models of hardware and the
number of robots. This term is sometimes abbreviated as *type*.

A **workspace deployment** is a physical realization of a workspace type, where
parameters from the type take particular values like IP address or brand of a
range finder. This term is sometimes abbreviated as *deployment*.

An **instance** of a workspace corresponds to usage of a deployment by a
user. Ideally, each instance of a deployment is identical except for changes of
user-defined parameters where available. Practically, there may be small
differences.

## Instances

The time during which a user has exclusive access to a workspace deployment is
known as an [instance](/intro).  The process of
requesting, getting credentials, and terminating an instance is similar to how
you might get a "compute node" from a "cloud computing" company:

1. Someone requests access using the unique ID of the workspace deployment.
2. The remote user is connected to a container that is local to the robot.
3. Their input/output can be constrained according to filter rules. For example,
   the "reboot" command is dropped, while getting sensor data is permitted.
4. The instance is terminated when the remote user is done.

The instance lifecycle is shown in the following diagram:

{% image src="figures/instance-lifecycle.svg" alt="diagram of instance lifecycle" maxWidth="400px" /%}

Instantiating always begins at `INIT`. It is rare but possible that an error
will occur during `INIT` that causes the instance to be marked as `INIT_FAIL`.
If initialization succeeds, the instance becomes `READY` and usage time
measurement begins for purposes such as billing. When the user is done, she can
terminate the instance, that is, permanently stop it. Terminating can also be
triggered by the owner of the device, expiration of timers, or other events.

In the case of `INIT_FAIL`, you can [contact a rerobots
employee](https://rerobots.net/contact) for assistance, or you can try to
start a new instance again. Internal rerobots logging will
automatically save this event for further investigation later.

## Kinds of Connection

To connect to an instance, there are several options available now, and more are
under development. The best choice depends on a variety of factors, including
some that rerobots cannot control; e.g., your geographic location relative to
workspace deployments, whether you will operate the robots interactively
(in real-time) or upload tests and run them in batch, the kind of communications
middleware you use on the robots.

Available kinds of connection:

1. `sshtun`: ssh to a public IP address and port number.
2. `openvpn`: create [OpenVPN](https://community.openvpn.net/) server and install client certificates on instance hosts.
3. `proxy`: TCP packets are filtered and forwarded directly to devices in the instance. Details of the proxy depend on the target deployment.

Keys can be generated as needed per instance, or [you can upload keys for
reuse](/web/uploading-ssh-public-keys).

## API Tokens

Besides the dashboard at [rerobots.net](https://rerobots.net/), rerobots has an
{% abbr title="application programming interface" %}[API](/api-summary){% /abbr %}.
An **API token** is a string that provides
authentication and authorization for API requests.
Users manage their API tokens at [rerobots.net/tokens](https://rerobots.net/tokens).
Learn more by reading the [guides](/guides) about API tokens,
such as [how to make and revoke API tokens](/web/making-and-revoking-api-tokens).

## hardshare

The part of rerobots that facilitates users sharing their own hardware with
others is named **hardshare**. These workspaces are available through the same
interfaces as devices that are maintained by rerobots the company.

However, properties like uptime and calibration depend on the owners.
The owner decides who is permitted to access their hardware, and they decide how
add-on features like VNC should work in their specific case.
In practice, this is not a problem because the users and owners of devices
through hardshare are typically trusted.
Devices shared through hardshare are initially given the workspace type
[user_provided](/workspaces/user_provided). After being reviewed, the
deployment can have its type changed to something more precise, e.g.,
[fixed_misty2](/workspaces/fixed_misty2).

If you are interested in sharing your hardware,
please read the [Introduction of the hardshare manual](/hardshare/intro).
The source code of the hardshare client is at <https://github.com/rerobots/hardshare>.
