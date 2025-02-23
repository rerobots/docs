---
title: Filters
---

# Filters

## Summary

A *filter* is a program that decides whether input to an instance can reach the hardware.


## rrhttp

`rrhttp` filters HTTP requests and WebSockets.

Example configurations are in the directory [examples/rrhttp/](https://github.com/rerobots/hardshare/tree/main/examples/rrhttp).

The `default` behavior choice is for requests that do not match a rule,
where we say a rule and request *match* when the verb and request-URI match those
of the rule. Any such request is allowed if it satisfies the rule it matches;
else, it is blocked (independently of the `default` behavior).

For example, to use the default filter rules (i.e., allow all) for the target
host at address 192.168.1.134, port 80,

```bash
hardshare config --assign-proxy-command 'rrhttp 192.168.1.134:80'
```
