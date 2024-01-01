# Handling Updates

You can handle updates by assigning update handlers to the client.
A handler is a function that takes two arguments: `ctx` and `next`.

`ctx` is the received update with context-aware methods and shortcuts.
See all types of updates [here](/types/Update).

`next` is a function that passes the update to the next handlers.

Once an update reaches a handler, it _won't_ reach others unless it calls `next`.
When `next` is called, the same thing goes on again: the update won't reach the next handler until `next` is called, and so on.

There are four methods responsible for assigning handlers: `use`, `branch`, `filter`, and `on`.

## use

This is the main method to assign a handler, and all others depend on it.
It assigns an unconditional&nbsp;handler, meaning that it will always get called unless it is blocked by a handler preceding it.

```asciiart
|
use———————handler
           |
           |
           |
         next
          /
         /
        /
       /
      /
     /
    /
   /
  /
 /
|
```

The following are some usage examples.

```ts
/** Logging */
client.use(async (ctx, next) => {
  console.log("I always get logged before an update is handled.");
  console.log("Update", ctx.toJSON(), "received at", Date.now());
  await next(); // move to the next handlers
});

/** Error handling */
client.use(async (_ctx, next) => {
  try {
    await next(); // call the next handlers
  } catch (err) {
    console.error("Failed to handle an update:");
    console.trace(err);
  }
});

/** Ignoring updates */
client.use(async (ctx, next) => {
  const message = ctx.effectiveMessage;
  const date = message?.date;
  const isTooOld = date !== undefined && Date.now() - date.getTime() > 5 * 60 * 1_000;
  if (message !== undefined && isTooOld) {
    // message is older than 5 minutes, not interesting
    console.log(
      "Ignoring messsage", message.id,
      "in", message.chat.id,
      "because it is too old.",
    );
  } else {
    await next(); // handle it if newer than 5 minutes
  }
});

/** Performance monitoring */
client.use(async (_ctx, next) => {
  const then = performance.now();
  await next(); // call the next handlers
  const elapsed = performance.now() - then;
  console.log("Update handled in", ${Math.floor(elapsed)}ms`);
});
```

## branch

`branch` takes 3 functions:

1. One that checks for a specific condition.
2. A handler function that gets called when the specific condition is met, the true handler.
3. Another one that gets called when it is not met, the false handler.

```asciiart
|
branch————————
              |
          condition
              |
         ————————————
        |            |
      true         false
        |            |
     handler      handler
        |            |
      next         next
       /            /
      /            /
     /            /
    /            /
   /            /
  /            /
 /            /
|            /
|           /
|          /
|         /
|        /
|       /
|      /
|     /
|    /
|   /
|  /
| /
|/
|
```

Here's an example.

```ts
client.branch(
  /** condition: update is from a special user */
  (ctx) => ctx.effectiveUser?.username?.toLowerCase() == "onetimeusername",
  /** true handler */
  () => {
    console.log("Using more compute power: Update from someone special.");
  },
  /** false handler */
  () => {
    console.log("Handling postponed: Update from regular user.");
  }
);
```

## filter

`filter` is almost the same as `branch` except that it does not have a false handler.
It automatically moves to the next handlers if the condition is not met.

```asciiart
|
filter————————
              |
          condition
              |
         ————————————
        |            |
      true         false
        |           /
     handler       /
        |         /
      next       /
       /        /
      /        /
     /        /
    /        /
   /        /
  /        /
 /        /
|        /
|       /
|      /
|     /
|    /
|   /
|  /
| /
|/
|
```

Here's an example.

```ts
client.filter(
  /** condition: update is from a forum chat */
  (ctx) => {
    return ctx.effectiveChat?.type == "supergroup" && ctx.effectiveChat.isForum;
  },
  (ctx) => {
    console.log("Received an update from a forum.");
  }
);
```

## on

`on` works like `filter` but instead of providing a function that checks for a condition, you provide it a filter query.
If the update matched the provided filter, the handler gets called.

```asciiart
|
on————————————
              |
            check
              |
         ————————————
        |            |
     passes      does not
        |           /
     handler       /
        |         /
      next       /
       /        /
      /        /
     /        /
    /        /
   /        /
  /        /
 /        /
|        /
|       /
|      /
|     /
|    /
|   /
|  /
| /
|/
|
```

Here are some examples.

```ts
/** When the client's connection state changes */
client.on("connectionState", ({ connectionState }) => {
  console.log("New connection state:", connectionState);
});

/** Handles text messages */
client.on("message:text", ({ message }) => {
  // do something with message.text
});

/** Handles callback queries */
client.on("callbackQuery", ({ callbackQuery }) => {
  // do something with callbackQuery
});
```

<%=

it.nav("/calling-methods")

%>
