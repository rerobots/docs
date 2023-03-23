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
number of robots.

A **workspace deployment** is a physical realization of a workspace type, where
parameters from the type take particular values like IP address or brand of a
range finder.  This term is sometimes abbreviated as *wdeployment*.

An **instance** of a workspace corresponds to usage of a deployment by a
user. Ideally, each instance of a deployment is identical except for changes of
user-defined parameters where available. Practically, there may be small
differences.

## Instances

The instance lifecycle is shown in the following diagram:

![diagram of instance lifecycle](figures/instance-lifecycle.svg)

Instantiating always begins at `INIT`. It is rare but possible that an error
will occur during `INIT` that causes the instance to be marked as `INIT_FAIL`.
If initialization succeeds, the instance becomes `READY` and usage time
measurement begins for purposes such as billing. When the user is done, she can
terminate the instance.

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
2. `openvpn`: create OpenVPN server and install client certificates on instance hosts.

Keys can be generated as needed per instance, or [you can upload keys for
reuse](/webui/uploading-ssh-public-keys).

## API Tokens

Besides the dashboard at <https://rerobots.net>, rerobots has an
{% abbr title="application programming interface" %}[API](/api-summary){% /abbr %}.
An **API token** is a string that provides
authentication and authorization for API requests.
Users manage their API tokens at <https://rerobots.net/tokens>.
Learn more by reading the [guides](/guides) about API tokens,
such as [how to make and revoke API tokens](/webui/making-and-revoking-api-tokens).

## hardshare

The part of rerobots that facilitates users sharing their own hardware with
others is named **hardshare**. These workspaces are available through the same
interfaces as devices that are maintained by rerobots the company.

However, properties like uptime and calibration depend on the owners.
The owner decides who is permitted to access their hardware, and they decide how
add-on features like VNC should work in their specific case.
In practice, this is not a problem because the users and owners of devices
through hardshare are typically trusted.

In rerobots, devices shared through hardshare are always given the workspace
type [user_provided](/workspaces/user_provided). Every workspace with type other
than `user_provided` is maintained professionally by rerobots, e.g.,
[fixed_misty2](/workspaces/fixed_misty2).

If you are interested in sharing your hardware,
please read the [Introduction of the hardshare manual](https://docs.hardshare.dev/intro).
The source code of the hardshare client is at <https://github.com/rerobots/hardshare>.
