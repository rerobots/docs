image: smaller-logo.png
---

# Preliminary Concepts

## Summary

This page presents terms and concepts about rerobots infrastructure.
To get an executive summary instead, go back to [the introduction](index.html).

If you think that something is missing, or if you find errors, please [contact
us](https://rerobots.net/contact) or [open a
ticket](https://github.com/rerobots/doc-help/issues).

## Workspaces

A **workspace** is an abstraction of a collection of methods and materials for
robotics experiments. Note that "experiments" is not only for basic or applied
research, but it is also for routine engineering activities like
<abbr title="continuous integration">CI</abbr> testing.

Conceptually, there are three levels of refinement. A **workspace type** is the
workspace in terms of essential features, such as the models of hardware and the
number of robots. A **deployment** of a workspace type is a physical
realization. When there are potentially significant details about a deployment
that are specified as part of the workspace type, then they are available as
supplemental notes.

An **instance** of a workspace corresponds to usage of a deployment by a
user. Ideally, each instance of a deployment is identical modulo changes of
user-defined parameters where available, but practically there may be some
differences, which motivates introducing a new term.

## Instances

The instance lifecycle is shown in the following diagram:

![diagram of instance lifecycle](/fig/instance-lifecycle.svg)

Instantiating always begins at `INIT`. It is rare but possible that an error
will occur during `INIT` that causes the instance to be marked as `INIT_FAIL`.
If initialization succeeds, the instance becomes `READY` and usage time
measurement begins for purposes such as billing. When the user is done, she can
terminate the instance.

## Kinds of Connection

To connect to an instance, there are several options available now, and more are
under development. The best choice depends on a variety of factors, including
some that rerobots cannot control; e.g., your geographic location relative to
workspace deployments, which whether you will operate the robots interactively
(in real-time) or upload tests and run them in batch, the kind of communications
middleware you use on the robots.

Available kinds of connection:

1. `sshtun`: ssh to a public IP address and port number.
2. `openvpn`: create OpenVPN server and install client certificates on instance hosts.

## API Tokens

The core interface of rerobots is its <abbr title="application programming
interface">[API](/api.html)</abbr>. An **API token** is a string that provides
authentication and authorization for API requests. rerobots API tokens follow
the JSON Web Token standard, [RFC 7519](https://tools.ietf.org/html/rfc7519),
which is introduced at <https://jwt.io/>.

## Hardshare

Please read the [Introduction of the hardshare manual](https://hardshare.readthedocs.io/en/latest/intro.html).
The source files for it are available [in the repository of the hardshare client](https://github.com/rerobots/hardshare/tree/master/doc).
