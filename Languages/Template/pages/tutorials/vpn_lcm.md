# VPN-based instance with LCM

## Summary

In this tutorial, you are shown how to instantiate a workspace that is accessed
over VPN and for which [LCM](https://lcm-proj.github.io/) provides messaging.

If you think that something is missing, or if you find errors, please [contact
us](https://rerobots.net/contact) or [open a
ticket](https://github.com/rerobots/docs/issues).

## Prerequisites

The instantiation process for this tutorial is entirely similar to that of the
tutorial [VPN-based instance with ROS and Brunel
Hand](/tutorials/vpn_brunelhand) through the end of the subsection [Your
first log-in](/tutorials/vpn_brunelhand#your-first-log-in) in that tutorial.
Note that the instructions here for passing LCM messages to and from your
instance can be applied to any workspace type.

## Building and installing LCM

This subsection provides instructions to install LCM in your fresh workspace
instance. To get the latest [official
release](https://github.com/lcm-proj/lcm/releases), in the terminal that has an
active SSH session, enter

```bash
curl -L -O https://github.com/lcm-proj/lcm/archive/v1.3.1.tar.gz
shasum -a 256 v1.3.1.tar.gz
```

The last line of output should be

```bash
d9765731127e5138017938c2f990eda6d8a8df260c98fe3053189db7954b9a41  v1.3.1.tar.gz
```

Checking the SHA-256 hash of the downloaded file provides confidence that the
file has not been maliciously modified.

Assuming the base image used in [the tutorial with ROS and Brunel
Hand](/tutorials/vpn_brunelhand), two more packages must be installed:

```bash
apt-get -y install autoconf libglib2.0-dev
```

Now, build LCM from the source release as follows

```bash
tar -xzf v1.3.1.tar.gz
cd lcm-1.3.1/
./configure && make && make install
```

As a superficial check of the installation, try

```bash
lcm-gen --version
```

which should print its version number.
Now, finish configuring the instance host:

```bash
export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH
export LCM_DEFAULT_URL=udpm://239.255.76.67:7667?ttl=1
sudo route add -net 224.0.0.0 netmask 240.0.0.0 dev tap0
```

The last two lines are critical because they

1. configure LCM to use `TTL=1`, which causes multicast messages to be sent from the host into the network (up to one hop); and
2. add a route that sends LCM multicast messages to the `tap0` device, which corresponds to the VPN of the instance.

## Example: listener and sender

For the example Python LCM listener,

```bash
cd /root/lcm-1.3.1/examples/python
./gen-types.sh
```

which will generate the message types that are used in this example. Now

```bash
python listener.py
```

Open a new terminal on your computer, i.e., the computer from which you are
following this tutorial, not the one in the instance.
Build LCM locally if you do not have it already.
Then, configure routing for the LCM multicast subnet:

```bash
sudo route add -net 224.0.0.0 netmask 240.0.0.0 dev tap0
```

Finally, start to send LCM messages

```bash
export LCM_DEFAULT_URL=udpm://239.255.76.67:7667?ttl=1
python send-message.py
```

and a message should be printed from the listener.py program that is running
within the instance.
