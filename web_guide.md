# Web guide

## Summary

This section describes how to use the Web interface of rerobots. You can learn
how to perform basic tasks like adding SSH keys to your account.

If you think that something is missing, or if you find errors, please [contact
us](https://rerobots.net/contact) or [open a
ticket](https://github.com/rerobots/doc-help/issues).

## Table of contents

* [Uploading SSH public keys](#uploading-ssh-public-keys)

## Uploading SSH public keys

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
