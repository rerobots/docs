# Preliminary concepts

## Summary

rerobots uses several terms that might seem familiar but that are not currently
in common use. This section presents them. For a broader view about what is
rerobots, read [the introduction](index.html).

If you think that something is missing, or if you find errors, please [contact
us](https://rerobots.net/contact) or [open a
ticket](https://github.com/rerobots/doc-help/issues).

## Workspaces

A **workspace** is an abstraction of a collection of methods and materials for
robotics experiments. Note that "experiments" is not only for basic or applied
research, but it is also for routine engineering activities like continuous
integration testing.

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

## Kinds of connection

Remote access to instances is achieved through some combination of SSH keys and
VPN client credentials.

## API tokens

This section presents terms that are not required if you only use the Web UI.

The core interface of rerobots is its <abbr title="application programming
interface">[API](/api.html)</abbr>. An **API token** is a string provides
authentication and authorization for API requests. rerobots API tokens follow
the JSON Web Token standard, [RFC 7519](https://tools.ietf.org/html/rfc7519),
which is introduced at <https://jwt.io/>.
