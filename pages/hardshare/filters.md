---
title: Filters
---

# Filters

## Summary

## rrhttp

The `default` behavior choice is for requests that do not match a rule,
where we say a rule and request *match* when the verb and request-URI match those
of the rule. Any such request is allowed if it satisfies the rule it matches;
else, it is blocked (independently of the `default` behavior).
