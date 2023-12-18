# TCP Transport

The default transport for all runtimes is WebSocket.
Although, you can make clients running in Node.js and Deno use raw TCP.

## Node.js

For Node.js, you first have to install `@mtkruto/transport-provider-tcp`.

<%= it.installPackage("@mtkruto/transport-provider-tcp") %>

After that, you can use `transportProviderTcp()`.

<%=

it.codeGroup(

    [
        "CommonJS",
        "ts",
        `

const { Client } = require("@mtkruto/node");
const { transportProviderTcp } = require("@mtkruto/transport-provider-tcp");

const client = new Client(storage, apiId, apiHash, {
\ \ transportProvider: transportProviderTcp(),
\ \ /\* other params \*\/
});
`.trim()
],

    [
        "ECMAScript",
        "ts",
        `

import { Client } from "@mtkruto/node";
import { transportProviderTcp } from "@mtkruto/transport-provider-tcp";

const client = new Client(storage, apiId, apiHash, {
\ \ transportProvider: transportProviderTcp(),
\ \ /\* other params \*\/
});
`.trim()
],

)

%>

## Deno

Projects using Deno can directly import `transportProviderTcp()` from [deno.land/x](https://deno.land/x/mtkruto).

```ts
import { Client } from "<%= it.deno %>/mod.ts";
import { transportProviderTcp } from "<%= it.deno %>/transport/3_transport_provider_tcp.ts";

const client = new Client(storage, apiId, apiHash, {
  transportProvider: transportProviderTcp(),
  /* other options */
});
```

## Parameters

### IPv6

To connect via IPv6, set `ipv6` to `true`.

```ts
transportProvider({
  ipv6: true,
  /* other params */
});
```

### Obfuscation

To enable transport obfuscation, set `obfuscated` to `true`.

```ts
transportProvider({
  obfuscated: true,
  /* other params */
});
```

> These parameters are available for both runtimes.
