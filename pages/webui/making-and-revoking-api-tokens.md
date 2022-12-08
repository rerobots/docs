# Making and Revoking API Tokens

As described in the [introduction](/intro), API tokens are
required to use the rerobots API directly, instead of through [the Web
dashboard](https://rerobots.net/). API tokens are mainly of interest to
application developers, and they are required to perform nontrivial actions from
client libraries like the [rerobots Python package](
https://pypi.org/project/rerobots/).

To get and manage your API tokens, go to the [API tokens page in the Web
dashboard](https://rerobots.net/tokens). When there are no active tokens, the main
section will appear similar to the following screenshot:

![screenshot of the main section of the API tokens page](figures/api_tokens_page_empty.png)

To create a new API token, use the control panel near the bottom of the page.
Select the duration of validity of the API token. The default is 24 hours, i.e.,
the token cannot be used 24 hours or more after its creation. Click the button
labeled `make API token`. The table should now have at least one row that
appears like

![screenshot of a single item in the API tokens table](figures/api_tokens_table_item.png)

Selecting one of the rows in the table will cause the corresponding API token to
be displayed in a new panel titled "token" that appears similar to

![screenshot of the detailed token view panel](figures/api_token_detail.png)

In this panel, the token text is displayed and can be copy-and-pasted where you
need it. To download the text as a file named jwt.txt, press the `download`
button.

For security, the best practice is to revoke API tokens that are no longer
required but have not yet expired. (Expired tokens cannot be used, and thus do
not need to be manually revoked.) To do so, periodically go to your [API tokens
page in the Web dashboard](https://rerobots.net/tokens) and review the table of
active tokens. To revoke one, simply use its `revoke` button in the right
column. To prevent mistakes, there is a confirmation dialog for the revoke
action.
