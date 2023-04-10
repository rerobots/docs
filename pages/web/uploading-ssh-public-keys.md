---
title: Uploading SSH Public Keys
---

# Uploading SSH Public Keys

Remote log-in to hosts of a workspace instance is achieved through `ssh`. If you
save public keys to your user account, then they can easily be selected when you
create a new instance. The process of doing so is described here. For this
exercise, suppose that your key pair is the files demokey and demokey.pub. For
example, these can be generated from the terminal:

```bash
ssh-keygen -f demokey
```

The public key is demokey.pub. It is the key that should be given to others who
need to reliably authenticate you. The other file, demokey, is secret and must
be kept in a safe place, such as in the directory ".ssh" in your home directory
on your personal computer.

Now go to [the SSH keys page](https://rerobots.net/sshkeys), which should appear
similar to the following screenshot:

![screenshot of the SSH keys page](figures/empty_sshkeys_page.png)

Copy-and-paste the contents of demokey.pub into the "key text" field of the
"upload new public key" form. Then, give a name to this key pair that you can
use later to refer to it on the rerobots website. Continuing our example, the
completed form might look like:

![screenshot of example filled upload key form](figures/filled_new_sshkey_upload.png)

Finally, press the submit button. The newly uploaded public key should now
appear in the table. For example,

![screenshot of user's table of uploaded SSH keys, showing the new one](figures/new_sshkeys_table_item.png)
