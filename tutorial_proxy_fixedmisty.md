# Try the Misty API Explorer with a proxy

## Summary

In this tutorial, you are shown how to instantiate a [`fixed_misty1devel`](
/workspaces/fixed_misty1devel.html) workspace and control the robot through the
[Misty API Explorer](http://api-explorer.mistyrobotics.com/). (Note that the Misty API Explorer is a product of [Misty Robotics](https://www.mistyrobotics.com/), Inc., and NOT A PART OF rerobots.)

If you think that something is missing, or if you find errors, please [contact
us](https://rerobots.net/contact) or [open a ticket](
https://github.com/rerobots/doc-help/issues).

## Searching

To begin, sign-in to <https://rerobots.net>, and go to to [the search
page](https://rerobots.net/search). It should look like the following:

![screenshot of the search page](/fig/tutorial_proxy_fixedmisty_search.png)

For this tutorial, we want to use a workspace deployment that has the type
[`fixed_misty1devel`](/workspaces/fixed_misty1devel.html). If one is not
already listed, enter "misty" into the search field, or try the following URL:
<https://rerobots.net/search?q=fixed_misty1devel>

Click on the photo or the "deployment id" of one of the items in the search
results. You will get a brief description of the workspace, which should look
like the following:

![screenshot of the workspace deployment summary](/fig/tutorial_proxy_fixedmisty_wddetails.png)

## Requesting an instance

To request to use the workspace deployment that you are viewing, click the
"request instance" button. The next page provides some choices about the
instance that you will create. It should look like:

![screenshot of the page to create a new instance](/fig/tutorial_proxy_fixedmisty_newinstance.png)

If you encounter difficulty here, please [contact us](
https://rerobots.net/contact).

If your request is accepted, then you will be redirected to a page that shows
all of your active instances. Notice that there is a message at the top of the page:

> Your new workspace instance is initializing! Because you did not use an SSH key
> that is already associated with your user account, a new key pair was generated
> for this instance. The following link can be used to download the private key
> precisely once.

When you are ready, select the link "Download private key.", which will download
a file named `key.pem`. Be careful to only click the link when you are ready for
the download. If you are not ready yet, then ignore the message. The same URL is
listed later in the "alerts" panel.

## Starting the Misty proxy

[Go to your rerobots instances list.](https://rerobots.net/instances) There
should be a `fixed_misty1devel` instance that you just created. After several
minutes of initializing, during which the robot and other parts of the workspace
are prepared, the instance status will be `READY`. Select it from the list to
get instance details, resulting in a page like the following:

![screenshot of the instance details page](/fig/tutorial_proxy_fixedmisty_instancedetails.png)

In the panel titled "Misty robot proxy", select the link "start proxy". This
will start a proxy server through which you can remotely make API calls on the
Misty robot.

![screenshot of the Misty proxy panel](/fig/tutorial_proxy_fixedmisty_proxypanel.png)

In this example, you would copy-and-paste
`proxy.rerobots.net:32777/6e44d1530bd35cbe5089521d375aa8ca08b4a5eaa2f5e6328af255abe242ee6e`
into the "Robot IP Address" box at <http://api-explorer.mistyrobotics.com/>.

To view the robot, select the link "start camera stream" in the panel titled
"camera streams". This will start the camera stream and generate a URL for
viewing it.

Find the link with text "open camera stream". Open this link in a new browser
window. Try arranging the camera stream window on one side of your desktop and
the Misty API Explorer window on the other side, as shown in this screenshot:
![screenshot of the camera stream and Misty API Explorer
side-by-side](/fig/tutorial_proxy_fixedmisty_finalarrange.png)


## Conclusion

When you are done, return to <https://rerobots.net/instances>, find the instance
that you created in the table, and push the `terminate` button.


## References

The basic idea of Misty API proxy URLs is first presented in the article [URL injection for fun and profit](https://community.mistyrobotics.com/t/url-injection-for-fun-and-profit/1110).
