---
title: Introduction
---

# Introduction

This page introduces concepts and technical aspects of **hardshare**. If you
just want to get started, skip to the [Quickstart](/hardshare/quickstart).


## Overview

![overview](/figures/hardshare-overview.svg)

As illustrated above, the main parts are:

1. your robot (also referred to as "device" or "devices"),
2. host computer on which a hardshare client runs,
3. rerobots infrastructure,
4. remote users.

The robot and the surrounding environment are together known as a [workspace
deployment](/intro) (or simply, *deployment*). Robots that are owned and managed
by the company rerobots are always presented as deployments with
unique IDs.  To share your robot via hardshare, it also must be assigned a
unique ID.

In hardshare, the terms *robot* and *device* are interchangeable. Minimally, it
is some hardware with output or input. A workspace can have multiple devices (or
multiple robots).

The "rerobots infrastructure" is stuff that handles client requests, provides
queues and reservations, sends alerts, etc. It includes facilities like
[a Python client library](https://pypi.org/project/rerobots) and
[sandboxes](https://rerobots.net/sandbox).
For details, read the [rerobots introduction](/intro).

The hardshare client is the part that manages the lifecycle of remote access,
including advertising that the robot is available, creating SSH tunnels to a
local container, and enforcing constraints like input filters.

When you create a deployment, you become the owner and can make
administrative decisions.

Remote users do not necessarily have rerobots accounts. The kinds of access that
are possible depend on the permissions assigned by the owner.


## Interfaces Around Instances

{% image src="/figures/layers-illustration.svg" alt="layers" maxWidth="400px" /%}

The rerobots/hardshare architecture provides for specifying how hardware appears
to an instance. If carefully configured, any device can be shared through
instances safely and securely. The precise meanings of *safe* and *secure*
depend on the hardware in the deployment, but the basic organization
is the same: associate actions with lifecycle events (e.g., initialization), and
filter input and output streams.

The default configuration of a new hardshare client installation does not
enforce any contracts. Instances in this case have unfiltered access to
hardware. This can be a good first choice in trusted settings, such as a team
working closely together at the same company.
