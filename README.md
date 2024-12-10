# ox-policy-settings-updater

Enable bulk updating across all policies of all new &amp; old issues settings
for a given Application Id.

## Prerequisites

[Deno installed](https://docs.deno.com/runtime/getting_started/installation/)

## Usage

Get your [OX Token](#getting-your-ox-token) and
[Application Id](#getting-the-application-id) ready and run:

`deno run -A ox-policy-settings-updater.ts`

The script will prompt for either:

1. customizing new and old policy settings to be applied and then set the same
   status for _all_ such policies, for the given application.
2. resetting the policies to their original default values.

## Additional materials

The JSON files are included as a convenience to understand the bare APIs being
used. Load the query and variables into your chosen GraphQL capable client,
along with an authorization token and appId, and submit them to the
`https://api.cloud.ox.security/api/policy-service` endpoint.

##### Getting your OX Token

Login to the [OX Dashboard](https://app.ox.security) and bring up your browser's
Developer Tools (`ctrl-shift-I` or `cmd-opt-I` depending on your platform).

From there, go to the "Network" tab and filter the traffic for
`api.cloud.ox.security` (refresh the page if necessary) and from the Request
Headers, pull the Authorization Bearer Token (it'll start with "ey", base64
encoding for "{" which all JWTs start with).

##### Getting the Application Id

While there is an API way, for simplicity, try this browser-based method.
Navigate to the application, select it, and in your browser's location bar, note
the query parameter `appId` . For instance,
`https://app.ox.security/applications?appId=353737035`. Selecting a different
row will update which application is highlighted and therefore which appId is
referenced in the URL's query parameter.
