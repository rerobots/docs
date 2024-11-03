---
title: Filters
---

# Filters

## Summary

A *filter* is a program that decides whether input to an instance can reach the hardware.

## rrhttp

The `default` behavior choice is for requests that do not match a rule,
where we say a rule and request *match* when the verb and request-URI match those
of the rule. Any such request is allowed if it satisfies the rule it matches;
else, it is blocked (independently of the `default` behavior).
