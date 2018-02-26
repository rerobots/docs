# SSH-tunnel-based instance with fixed Crazyflie

## Summary

In this tutorial, you are shown how to instantiate a workspace that is accessed
through an SSH tunnel. As an example, the workspace type demonstrated here is
`fixed_crazyflie`, but the basic steps can be applied to any type for which SSH
tunneling is an option.

If you think that something is missing, or if you find errors, please [contact
us](https://rerobots.net/contact) or [open a
ticket](https://github.com/rerobots/doc-help/issues).

## Searching

To begin, sign-in to <https://rerobots.net>, and go to to [the search
page](https://rerobots.net/search).  As an example in this tutorial, we will use
a workspace deployment that has the type `fixed_crazyflie`. Note, however, the
basic steps can be applied anywhere that an SSH-tunnel-based connection is
desired. If one is not already listed, enter "fixed_crazyflie" into the search
field, or try the following URL:
<https://rerobots.net/search?q=fixed_crazyflie&maxl=u>
There should be at least one match, as in the following screenshot:

![screenshot of the search page](/fig/tutorial_sshtunnel_fixedcrazyflie_search.png)

Click on the photo or the "deployment id" of one of the items in the search
results. You will get a brief description of the workspace.

## Requesting an instance

To request to use the workspace deployment that you are viewing, click the
"request instance" button. The next page provides some choices about the
instance that you will create. It should look like:

![screenshot of the page to create a new instance](/fig/tutorial_sshtunnel_fixedcrazyflie_new_instance_dialog.png)

Under "kind of connection", select "SSH tunnel". For the SSH public key that
provides authorization for remote log-in to the instance, you can select one
that you [previously uploaded](web_guide.html#uploading-ssh-public-keys), or you
can have a new key pair generated for you as part of instantiation. When you are
ready, request the instance.  A reservation system is under development, so your
request might be denied if someone else started to use the same workspace. If
you encounter difficulty here, please [contact
us](https://rerobots.net/contact).

If your request is accepted, then you will be redirected to a [page that shows
all of your active instances](https://rerobots.net/instances). If you selected
to generate a new SSH key pair, then notice that there is now a message at the
top of the page:

> Your new workspace instance is initializing! Because you did not use an SSH key
> that is already associated with your user account, a new key pair was generated
> for this instance. The following link can be used to download the private key
> precisely once.

In this case, when you are ready, select the link "Download private key." to
download a file named `key.pem`. Be careful to only click the link when you are
ready for the download.If you selected to use one of [the SSH keys already
associated with your account](https://rerobots.net/sshkeys), then there is no
link to "download private key" because it is assumed that you already have the
corresponding private key.

In the table of your instances, you will find the one that you just created. Its
status should be `INIT`, which indicates that it is initializing.

## Your first log-in

After several seconds or minutes, the instance will be READY as in the following
example screenshot:

![status text of ready instance](/fig/tutorial_sshtunnel_fixedcrazyflie_instancedetails.png)

In the details panel, an IP address and port number are listed. On this address
and port there is an SSH server listening for incoming connections to the main
host of your instance.  Also, notice the subsection titled "firewall rules". It
contains a table of rules that determine which hosts can send packets to the
port on which an SSH server is listening for your instance. To be clear, even if
packets are allowed to reach the SSH server, it is necessary to have the correct
private key to log-in, independently of the firewall rules.

The default behavior is to drop all incoming packets, so it is at least
necessary to add one rule to allow you to log-in. There are several methods to
determine the externally visible address from which you are accessing the
Internet. For example, at the terminal, try

    curl https://ipinfo.io/

New rules can be added in the panel titled "modify firewall rules", as shown in the screenshot:

![screenshot of the form for modifying firewall rules](/fig/tutorial_sshtunnel_fixedcrazyflie_modifyfirewall.png)

Addresses are specified in CIDR notation ([RFC
4632](https://tools.ietf.org/html/rfc4632)). The default (if no netmask is
declared) is `/32`, that is, only from the given address. While for a long-lived
instance accepting traffic from anywhere is usually not desirable, you can use
`0.0.0.0/0` to do so.
There should now be a row in the table of firewall rules: `0.0.0.0/0 ACCEPT`.

To log-in, open a terminal, and suppose that your private key is in the local
directory in the file key.pem. Then,

    ssh -i key.pem -p 2211 root@147.75.69.207

The hostkey presented by the SSH server can be compared with the one listed in
the details panel (example is shown in screenshot earlier in this tutorial).
