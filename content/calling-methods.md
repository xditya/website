# Calling Methods

You can interact with Telegram by either using the high-level methods or calling Telegram API functions directly.

## High-level Methods

All high-level methods are available directly on MTKruto client instances.
You can see a list of all methods and links to their reference [here](/methods).

To call one, you need to access it from a client instance using its identifier, and call it providing the values of its required parameters in the correct order, and optionally, a subset of the optional parameters in an object as the last parameter.
Inside the reference of each method, optional parameters are marked with `?`.
Don't forget that all methods return a promise, so you have to await them.

```ts
await client.methodIdentifier(requiredParam1, requiredParam2);
await client.methodIdentifier(requiredParam1, requiredParam2, {
  optionalParam1Name: optionalParam1,
});
```

Here's an example on how you can call [`sendMessage`](/methods/sendMessage) which has two required parameters (`chatId` and `text`), and a number of optional parameters.

```ts
await client.sendMessage(36265675, "Hey you!", {
  disableNotification: true,
});
```

You can also omit the optional parameters completely.

```ts
await client.sendMessage(36265675, "Hey you!");
```

## Telegram API Functions

To call a Telegram API function directly, import the `functions` namespace, construct a function call, and pass it to the `invoke` method of the client.

<%=

it.codeGroup(

    [
        "Deno",
        "ts",
        `import { functions } from "${it.deno}";

await client.invoke(new functions.FunctionName(...));`
],

    [
        "Node.js",
        "ts",
        `

const { functions } = require("@mtkruto/node");

client.invoke(new functions.FunctionName(...)); // Promise

`.trim()
],

    [
        "Web (Node.js)",
        "ts",
        `import { functions } from "@mtkruto/browser";

await client.invoke(new functions.FunctionName(...));`
],

    [
        "Web (esm.sh)",
        "ts",
        `import { functions } from "${it.esm}";

await client.invoke(new functions.FunctionName(...));`
],

)

%>

Here's an example ping call.

```ts
await client.invoke(new functions.Ping({ pingId: 2132n });
```

If you need to provide Telegram API types as arguments, access them from the `types` namespace.

<%=

it.codeGroup(

    [
        "Deno",
        "ts",
        `import { types } from "${it.deno}";`

],

    [
        "Node.js",
        "ts",
        `const { types } = require("@mtkruto/node");`.trim()

],

    [
        "Web (Node.js)",
        "ts",
        `import { types } from "@mtkruto/browser";`

],

    [
        "Web (esm.sh)",
        "ts",
        `import { types } from "${it.esm}";`

],

)

%>

Note that identifiers differ from how they look in schemas.
The TL references can be useful to identify those differences: [Functions](/tl/functions), [Enums](/tl/enums), [Types](/tl/types).

<%=

it.nav("/starting-the-client", "/handling-updates")

%>
