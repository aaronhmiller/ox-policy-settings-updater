# ox-policy-settings-updater

Enable bulk updating across all policies of all new &amp; old issues settings
for a given Application Id.

## Prerequisites

[Deno installed](https://docs.deno.com/runtime/getting_started/installation/)

## Usage

Have your [OX Token](#getting-your-ox-token) and
[Application Id](#getting-the-application-id) ready and run:

`deno run -A ox-policy-settings-updater.ts`

The script is preset to enable "monitor" status on _all_ policies, for both old
and new issues, for the given application.

##### Getting your OX Token

Login to the [OX Dashboard](https://app.ox.security) and bring up your browser's
Developer Tools (usually `ctrl-shift-I` or `cmd-opt-I` depending on your
platform).

From there, go to the "Network" tab and filter the traffic for
`api.cloud.ox.security` and from the Request Headers, pull the Authorization
Bearer Token (it'll start with "ey", base64 encoding for "{" which all JWTs
start with).

##### Getting the Application Id

Of course there's an API way, but for simplicity, try this browser-based method.
Navigate to the application, select it, and in your location bar, note the query
parameter `appId` . For instance,
`https://app.ox.security/applications?appId=353737035`. Selecting a different
row will update which application is highlighted and therefore which appId is
referenced in the URL's query parameter.
