---
title: CLI
---

# CLI

## Summary

The command-line interface (CLI) for rerobots is realized through a program that
allows you to search for devices, launch new instances, and perform other
rerobots actions from a text-based terminal.

The corresponding source code repository is hosted at <https://github.com/rerobots/cli>


## Installation

### Releases

Go to <https://github.com/rerobots/cli/releases> to find the most recent release
files built for popular targets like macOS or Linux on x86_64. If your preferred
host is not listed there, please [contact us](https://rerobots.net/contact).


### Building from Source Code

To build for own computer

```bash
cargo build --release --locked
```

Beware that the resulting program might be dynamically linked to libraries and,
therefore, not easily copied to a different host. For cross-compiling and
creating static programs (therefore avoiding linker dependencies at runtime),
releases are made with [cross](https://github.com/rust-embedded/cross).
For example, to build for Linux on Raspberry Pi,

```bash
cross build --target armv7-unknown-linux-musleabihf --release --locked
```


## Introduction

### Summary

The command-line interface (CLI) is self-documenting. To begin, try

```bash
rerobots help
```

which will result in a message similar to the following

```
USAGE:
    rerobots [FLAGS] [OPTIONS] [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -v, --verbose    Increases verboseness level of logs; ignored if RUST_LOG is
		     defined
    -V, --version    Prints version number and exits

OPTIONS:
    -t <FILE>                plaintext file containing API token; with this
			     flag, the REROBOTS_API_TOKEN environment variable
			     is ignored
	--format <FORMAT>    output formatting; options: YAML , JSON

SUBCOMMANDS:
    help         Prints this message or the help of the given subcommand(s)
    info         Print summary about instance
    isready      Indicate whether instance is ready with exit code
    launch       Launch instance from specified workspace deployment or type
    list         List all instances by this user
    search       Search for matching deployments. empty query implies show
		 all existing workspace deployments
    ssh          Connect to instance host via ssh
    terminate    Terminate instance
    version      Prints version number and exits
    wdinfo       Print summary about workspace deployment
```

Call `help` to learn more about commands, e.g., `rerobots help info` to
learn usage of `rerobots info`.

To use an [API token](https://rerobots.net/tokens), assign it to the
environment variable `REROBOTS_API_TOKEN`, or give it through a file named in
the command-line switch `-t`.


### Example

The following video demonstrates how to search for types of workspaces, request
an instance, and finally terminate it. The same example is also presented below
in text. (This video can also be watched at <https://asciinema.org/a/l0l2yh83JtAM8RjDiOHsk3Q9F>)

{% asciinema id="l0l2yh83JtAM8RjDiOHsk3Q9F" /%}

Before beginning, [get an API token](/web/making-and-revoking-api-tokens)
([from the dashboard](https://rerobots.net/tokens)). Now assign it to an
environment variable.  For example, if the API token is saved to a local file
named `tok`, then

```bash
export REROBOTS_API_TOKEN=$(cat tok)
```

Search for workspace deployments

```bash
# rerobots search misty
2c0873b5-1da1-46e6-9658-c40379774edf    fixed_misty2
```

Get more information about one of them

```bash
# rerobots wdinfo 2c0873b5-1da1-46e6-9658-c40379774edf
{
  "cap": {
    "rules": []
  },
  "id": "2c0873b5-1da1-46e6-9658-c40379774edf",
  "type": "fixed_misty2",
  "type_version": 1,
  "supported_addons": [
    "cam",
    "mistyproxy"
  ],
  "desc": "",
  "region": "us:cali",
  "icounter": 641,
  "created": "2019-11-18 22:23:57.433893",
  "queuelen": 0
}

Notice that `queuelen = 0`, i.e., this workspace deployment is available, and
requests to instantiate from it now are likely to succeed. To do so,

```bash
# rerobots launch 2c0873b5-1da1-46e6-9658-c40379774edf
f7856ad4-a9d7-43f5-8420-7073d10bceec
```

Get information about the new instance

```bash
# rerobots info f7856ad4-a9d7-43f5-8420-7073d10bceec
{
  "id": "f7856ad4-a9d7-43f5-8420-7073d10bceec",
  "deployment": "2c0873b5-1da1-46e6-9658-c40379774edf",
  "type": "fixed_misty2",
  "region": "us:cali",
  "starttime": "2020-05-23 02:05:20.311535",
  "rootuser": "scott",
  "fwd": {
    "ipv4": "147.75.70.51",
    "port": 2210
  },
  "hostkeys": [
    "ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBPd5tTJLAksiu3uTbGwkBKXFb00XyTPeef6tn/0AMFiRpomU5bArpJnT3SZKhN3kkdT3HvTQiN5/dexOCFWNGUE= root@newc59"
  ],
  "status": "READY"
}
```

When `READY`, get the SSH secret key created for the instance

```bash
rerobots get-ssh-key f7856ad4-a9d7-43f5-8420-7073d10bceec
```

The section `fwd` contains an IP address and port at which ssh connections can
be established to the instance host. The rerobots CLI provides a convenient
command to do this::

```bash
rerobots ssh f7856ad4-a9d7-43f5-8420-7073d10bceec
```

Finally, `exit` the ssh shell, and terminate the instance

```bash
rerobots terminate f7856ad4-a9d7-43f5-8420-7073d10bceec
```
