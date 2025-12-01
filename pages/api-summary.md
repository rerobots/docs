---
title: API Summary
---

# API Summary

{% alert %}
This API is unstable. If you are developing with it, please [contact us](https://rerobots.net/contact) first.
{% /alert %}

Most users will want to use one of the official client libraries instead of
working directly with the HTTP interface:

* JS - <https://www.npmjs.com/package/rerobots>
* Python - <https://pypi.org/project/rerobots/>
* Rust - <https://crates.io/crates/rerobots>

The current version is 1, so calls to api.rerobots.net that lack a version route
default to v1. To request this or any particular version, in requests include an
`Accept` header, e.g.,

```http
application/vnd.rerobots.v1+json
```

Response includes headers concerning rate limiting:

```http
X-RateLimit-Limit: N
X-RateLimit-Remaining: M
X-RateLimit-Reset: T
```

where T is seconds since The Epoch, and it is invariant that M < N. (It cannot
be that M = N because the response header is sent if and only if a request was
made.) In the future we may modify this to not count some requests against the
limit, e.g., if a redirect is required. Each subsequent request will cause
`X-RateLimit-Remaining` to be decremented until it reaches `0`, after which
no more requests will be accepted until the current time passes `T`.


## Authentication

{% alert %}
Authentication is not available yet through the HTTP API. Instead, [get API tokens from the dashboard](https://rerobots.net/tokens).
([Read instructions about how to do so.](/web/making-and-revoking-api-tokens))
{% /alert %}


## Commands

### GET /

list summary of commands available in this version of the HTTP API

### GET /workspaces

list known workspace types. Note that this list is independent of which
deployments currently exist or are available to use.


### POST /revoke/:SHA256-of-token

Revoke API token that belongs to user and has SHA256 hash equal to second part
of the route.

A valid API token can be used to revoke itself.


### POST /purge

Delete all authentication (API) tokens associated with the user. To do this, the
user and password pair or an existing token of sufficient capabilities must be
provided. If both are provided, then only the user and password pair is checked.


### GET /deployments{/workspace_type}

Get list of all deployments or deployments of a specific workspace type. Note
that currently available workspace types can be obtained using `GET /workspaces`.
This supports pagination that is entirely similar to that of `GET /instances`.

Optional query parameters are the following:

* `q`: search query

* `maxlen`: nonnegative integer such that use-queue size is at most `maxlen`, or (default) `"u"` to request unbounded, i.e., no constraint on length.

* `types`: list of desired workspace types, or (default) if empty or not given, then include all types. If the request contains a `types` list and also the target suffix `/workspace_type` (i.e., the request has the form `GET /deployments/workspace_type`), then only the `types` list is used.

* `sort_by`: one of
    - `inc_wtype`: (default) workspace type in alphabetical order
    - `dec_wtype`: reverse alphabetical order, "Z" before "A"
    - `inc_created`: increasing date of creation; oldest first
    - `dec_created`: decreasing date of creation; most recent first
    - `inc_count`: increasing total number of completed instantiations
    - `dec_count`: decreasing total number of completed instantiations


### GET /deployment/:deploymentID

Get information about workspace deployment. Response is a JSON object with some
or all of the following:

* `id`: globally unique identifier for the workspace deployment.
* `type`: workspace type.
* `region`: physical location of this deployment.
* `icounter`: total number of completed instantiations.
* `created`: date of creation; except where noted otherwise, the hardware in this workspace deployment is at least as old as this date but not much older than it.
* `queuelen`: length of the use-queue (same as from `GET /queuelen/:deploymentID`). This is an upper bound on the number of users that have priority to access this workspace deployment. It is an upper bound because reservations can be voluntarily cancelled and because `queuelen` counts reservations that are for the first available of a workspace type, which can eventually be satisfied by a different deployment.


### GET /queuelen/:deploymentID

Get length of the use-queue for a workspace deployment. The *length* is defined
as 0 if the deployment is not currently being used and if there is no
reservation that applies to it. Otherwise, 1+N, where N is the number of
reservations that apply to it. Because a reservation can apply to (and thus, be
satisfied by) more than one workspace deployment, N is an upper bound.

If the deployment ID is not recognized, then 404 (Not Found) status code is
returned.

Note that a subsequent request for an instance of this workspace deployment may
not succeed, despite receiving 0 length in the previous response. This is simply
a matter of race conditions with other potential users.


### GET /firewall/:instanceID

Get ordered list of firewall rules for workspace instance. Following the
convention of Linux iptables, the first rule that an incoming packet matches
decides outcome.

Response is in JSON. The main field is `rules`; it is a list of `(source,
action)` pairs, or if the corresponding chain is not created yet, `none`.


### DELETE /firewall/:instanceID

Clear all firewall rules for workspace instance. The default behavior is to drop
all incoming messages, which is thus the consequence of this command. Use
`POST /firewall/:instanceID` with an empty body (i.e., no JSON payload) to
allow incoming packets from the issuer of the `POST` request.


### POST /firewall/:instanceID

Append firewall rules to existing chain for workspace instance. The payload is a
JSON object with one or more of the following:

* src: source address using [CIDR notation](https://tools.ietf.org/html/rfc4632)
  for IPv4 addresses. Default (i.e., if this option is not declared) is `A/32`,
  where `A` is the address from which this request arrived.

* action: one of `"ACCEPT"`, `"DROP"`, `"REJECT"`. These have the usual
  interpretation, e.g., as in Linux [iptables](https://www.netfilter.org/).
  Default is `ACCEPT`.


### POST /new/{:workspace_type,:deploymentID}

Request new instance. Options are described below. Currently the only levels of
specificity are workspace type or deployment ID. If a workspace type is given,
then an appropriate deployment is selected depending on availability: if one is
immediately available, then it is used; otherwise one with minimal queue length
is selected. If a deployment ID is given, then that deployment is used.

Optional payload is JSON object with some or all of the following:

* `sshkey`: public key to use for instance access via SSH. The user account
  name on instances is `root`.

* `vpn`: (default `false`) provide access via VPN.

* `reserve`: if `false` (default), then do not create a reservation if an
  instance cannot be made yet.

* `eurl`: if a reservation is created, send POST request to this URL when
  reservation turns into instance or is ready to do so.

Response is a JSON object with some or all of the following:

* `success`: `true` if and only if new instance was successfully created.
  Otherwise, most other data described below will not be present in the response
  because they pertain to newly created instances. If `success: false` and a
  reservation was created, then the reservation identifier is in `id`. (It can
  also be obtained using `GET /reservations`.)

* `id`: globally unique identifier for the created instance or reservation.

* `sshkey`: private key to use for instance access via SSH. If the pubic key
  was given in the original request, then this item will not be in the response
  because the user is assumed to already have the private key corresponding to
  the public key that they provided.

Note that `success: true` in the response does not imply that the instance has
finished initialization. For example, creating a new VPN can require 30 or more
seconds, so new client credentials requests (`POST /vpn/:instanceID`) will not
yet succeed.

To get the current status of the instance, including whether it is ready to use,
check `GET /instance/:instanceID`.


### POST /terminate/:instanceID

Terminate (end) the running of an instance. The instance cannot be used again if
this command succeeds.


### GET /instances

Get list of all active instances that were created by the user. This command
requires authentication, and the `user` key of the JWT determines which
instances are shown.

Optional query keys are the following:

* `include_terminated`: if this key appears, then the response will include
  terminated instances that were originally created by the user. (Any value
  provided for the key will be ignored.)

* `sort_by`: one of
    - `dec_start_date`: (default) decreasing start date; most recent first
    - `inc_start_date`: increasing start date; oldest first

* `max_per_page`: if `0` (default), then place all items into single page, i.e., the entire list of items will appear in the same response. otherwise (if `max_per_page` > 0), then items are sorted according to `stort_by` and the list in the current response depends on the `page` option (default is `1`, i.e., first page).

* `page`: the page number to get. default is `1`. if the given value is greater than the total number of pages, it is equivalent to being the last page number.

Response contains:

* `workspace_instances`: list of instance identifiers.

* `page_count`: the total number of pages. the response includes all items if and only if `page_count == 1`.


### GET /instance/:instanceID

Get information about workspace instance to which the user has read-access.
Response is a JSON object with some or all of the following:

* `id`: globally unique identifier for the created instance.
* `deployment`: identifier for the corresponding workspace deployment.
* `type`: workspace type.
* `region`: physical location of this instance (same as deployment).
* `status`: The instance can be used only when status is `"READY"`.
* `vpn`: if there is a VPN associated with this instance, this has the same content as response from `GET /vpn/:instanceID`. Otherwise, this item is not included in the response.
* `fwd`: port forwarding via an SSH tunnel; connection details:

    * `ipv4`: external IPv4 address of this instance. Note that firewall rules associated with this instance (hence, this address) can be reviewed using `GET /firewall/:instanceID`.
    * `port`: external port of this instance.

* `hostkeys`: list of ssh host keys for all hosts to which user will have access as part of this instance.
* `starttime`: timestamp of when instance started.
* `endtime`: timestamp of when instance stopped, i.e., was terminated; this item is not given if there is no endtime yet, e.g., if status is `"ready"`.


### GET /vpn/:instanceID

Get details about the VPN associated with this instance, if there is
one. Response is a JSON object with some or all of the following:

* `clients`: list of identifiers of all current clients, including those in the workspace.
* `status`: one of the following {`"preparing"`, `"ready"`, `"nil"`}.

If there is no VPN for this instance (but the instance otherwise exists), then
the response is

```json
{"status": "nil"}
```

### POST /vpn/:instanceID

Get credentials for a new client to join the VPN associated with this
instance. The response has two parts:

* `client_id`: unique identifier to refer to these credentials in other requests.
* `ovpn`: contents of an OVPN file that can be used to connect via [OpenVPN](https://openvpn.net/).


### GET /reservations

Get list of active reservations associated with the user's account.

Response is a JSON object with:

* `reservations`: list of reservations.

Each item in the list `reservations` is a JSON object with:

* `id`: globally unique identifier for the reservation.
* `created`: date (time) at which reservation was created.
* `desc`: description of what is reserved: e.g., `type basic_kobuki` or
  `deployment 909cbe2d-eb85-4b8c-9a76-e7bffe880152`.


### DELETE /reservation/:reservationID

Delete a reservation. This process cannot be undone. In particular, any progress
toward using one of the matching workspace deployments will be lost.


### POST /ci/new

Start new CI build. Body data in the request should be JSON containing:

* `ns`: namespace, a.k.a. project to which this build belongs.
* `repo_type`: currently, must be `git`.
* one of `repo_branch`, `repo_commit`, which have analogous meaning as `TRAVIS_BRANCH` etc. as defined at https://docs.travis-ci.com/user/environment-variables#Default-Environment-Variables
* `repo_url`: URL from which to get repository
* `repo_branch`: branch of the repository to checkout
