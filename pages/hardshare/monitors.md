---
title: Monitors
---

# Monitors

## Summary

A *monitor* is a program that detects faults in workspace deployments.
The program should perform checks as quickly as possible and return with a
value that indicates pass (0) or fail (nonzero).


## Examples

Hardshare includes several monitors in the directory
[monitors/](https://github.com/rerobots/hardshare/tree/main/monitors).
Any monitor program (included or custom) can be added to a deployment by
calling `config --monitor-prog`; e.g.,

```
hardshare config --monitor-prog 'python3 /usr/local/bin/misty-battery.py 192.168.1.132'
```

where the misty-battery.py monitor is assumed to be installed in /user/local/bin
and the target robot has IP address 192.168.1.132. Notice both `'` markers.
Then, to run the monitor every 30 seconds,

```
hardshare monitor --loop 30
```
