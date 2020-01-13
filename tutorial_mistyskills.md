# Develop skills for Misty robots

## Summary

In this tutorial, you are shown how to use rerobots as a platform for developing
[Misty robot skills](https://docs.mistyrobotics.com/).

If you think that something is missing, or if you find errors, please [contact
us](https://rerobots.net/contact) or [open a ticket](
https://github.com/rerobots/doc-help/issues).

## Prerequisites

This tutorial assumes that you already have some workspace instance with a Misty
robot. For instructions about how to do so, read: [Try the Misty API with a
proxy](tutorial_proxy_fixedmisty.html).

## Change LED color and tilt the head of the robot

Example images in this section are from a [`fixed_misty2fieldtrial`](
/workspaces/fixed_misty2fieldtrial.html) workspace, in particular the
[deployment
f06c8740](https://rerobots.net/workspace/f06c8740-02a0-48ec-bdde-69ff88b71afd).

Upon a new instantiation of a [`fixed_misty2fieldtrial`](
/workspaces/fixed_misty2fieldtrial.html) workspace, the offboard camera view
appears like

![view from before mistyrest.py](/fig/tutorial_mistyskills_beforeledtilt.jpg)

If you do not know how to open a camera view, read [another tutorial](
tutorial_proxy_fixedmisty.html).

Now, consider the example Python code [mistyrest.py](
https://github.com/rerobots/examples/blob/a25067f0b5b666dcb7cf9fd6fa6a4232c9e8fec9/mistyrest.py). Copy-and-paste
the HTTPS URL from the "Misty robot proxy" panel of your instance details page
into [line 24 of mistyrest.py](
https://github.com/rerobots/examples/blob/a25067f0b5b666dcb7cf9fd6fa6a4232c9e8fec9/mistyrest.py#L24). The
panel with the URL will appear similar to the following:

![screenshot of the Misty proxy panel](/fig/tutorial_proxy_fixedmisty_proxypanel.png)

This example demonstrates how to use the [Misty REST
API](https://docs.mistyrobotics.com/docs/reference/rest/) through the rerobots
proxy. If you had the robot on your local network, then `MPURL` can instead be
the IP address of the robot.

Now, with the proxy URL saved to `MPURL`, try to execute mistyrest.py on your
own computer. At some time during operation, the head should appear tilted as it
is in the following image:

![view from after mistyrest.py](/fig/tutorial_mistyskills_afterledtilt.jpg)

Each basic action of the example Python code is little more than HTTP GET or
POST. Consider the command to change the LED color ([lines 29 - 33](
https://github.com/rerobots/examples/blob/a25067f0b5b666dcb7cf9fd6fa6a4232c9e8fec9/mistyrest.py#L29-L33)):

    :::python
    # Change the color of the chest LED to green
    # https://docs.mistyrobotics.com/docs/reference/rest/#changeled
    res = requests.post(MPURL + '/api/led', json={
        'red': 0,
        'green': 255,
        'blue': 0,
    })

It follows the [official Misty reference documentation](
https://docs.mistyrobotics.com/docs/reference/rest/#changeled).
This call is followed by

    :::python
    assert res.ok, 'response from POST /api/led: {} {}'.format(res.status_code, res.reason)

to verify that the HTTP response indicates success. If it is not, then some
error message is printed.
