# Guide to the Web UI

## Summary

This section describes how to use the Web interface of rerobots. You can learn
how to perform basic tasks like adding SSH keys to your account.

If you think that something is missing, or if you find errors, please [contact
us](https://rerobots.net/contact) or [open a
ticket](https://github.com/rerobots/doc-help/issues).

## Table of Contents

* [Uploading SSH Public Keys](#uploading-ssh-public-keys)
* [Making and Revoking API Tokens](#making-and-revoking-api-tokens)

## Uploading SSH Public Keys

Remote log-in to hosts of a workspace instance is achieved through `ssh`. If you
save public keys to your user account, then they can easily be selected when you
create a new instance. The process of doing so is described here. For this
exercise, suppose that your key pair is the files demokey and demokey.pub. For
example, these can be generated from the terminal:

    ssh-keygen -f demokey

The public key is demokey.pub. It is the key that should be given to others who
need to reliably authenticate you. The other file, demokey, is secret and must
be kept in a safe place, such as in the directory ".ssh" in your home directory
on your personal computer.

Now go to [the SSH keys page](https://rerobots.net/sshkeys), which should appear
similar to the following screenshot:

![screenshot of the SSH keys page](/fig/webguide_empty_sshkeys_page.png)

Copy-and-paste the contents of demokey.pub into the "key text" field of the
"upload new public key" form. Then, give a name to this key pair that you can
use later to refer to it on the rerobots website. Continuing our example, the
completed form might look like:

![screenshot of example filled upload key form](/fig/webguide_filled_new_sshkey_upload.png)

Finally, press the submit button. The newly uploaded public key should now
appear in the table. For example,

![screenshot of user's table of uploaded SSH keys, showing the new one](fig/webguide_new_sshkeys_table_item.png)

## Making and Revoking API Tokens

As introduced in the [Preliminaries](prelim.html) section, API tokens are
required to use the rerobots API directly, instead of through [the Web
console](https://rerobots.net/). API tokens are mainly of interest to
application developers, and they are required to perform nontrivial actions from
client libraries like the [rerobots Python package](
https://pypi.org/project/rerobots/).

To get and manage your API tokens, go to the [API tokens page in the Web
console](https://rerobots.net/tokens). When there are no active tokens, the main
section will appear similar to the following screenshot:

![screenshot of the main section of the API tokens page](/fig/webguide_api_tokens_page_empty.png)

To create a new API token, use the control panel near the bottom of the page.
Select the duration of validity of the API token. The default is 24 hours, i.e.,
the token cannot be used 24 hours or more after its creation. Click the button
labeled `make API token`. The table should now have at least one row that
appears like

![screenshot of a single item in the API tokens table](/fig/webguide_api_tokens_table_item.png)

Selecting one of the rows in the table will cause the corresponding API token to
be displayed in a new panel titled "token" that appears similar to

![screenshot of the detailed token view panel](/fig/webguide_api_token_detail.png)

In this panel, the token text is displayed and can be copy-and-pasted where you
need it. To download the text as a file named jwt.txt, press the `download`
button.

For security, the best practice is to revoke API tokens that are no longer
required but have not yet expired. (Expired tokens cannot be used, and thus do
not need to be manually revoked.) To do so, periodically go to your [API tokens
page in the Web console](https://rerobots.net/tokens) and review the table of
active tokens. To revoke one, simply use its `revoke` button in the right
column. To prevent mistakes, there is a confirmation dialog for the revoke
action.
