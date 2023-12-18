# Migrating from grammY

This page shows various [grammY](https://grammy.dev) bot snippets and their MTKruto equivalents.

## Script to Send Message

A process that sends a message to a specific chat and exits.

### grammY

<p></p>

<%=

it.codeGroup(

    [
        "Deno",
        "ts",
        `import { Bot } from "https://deno.land/x/grammy/mod.ts";

const botToken = Deno.env("BOT_TOKEN");
if (botToken === undefined) {
\ \ console.error("BOT_TOKEN not set.");
\ \ Deno.exit(1);
}

const bot = new Bot(botToken);

const chatId = -1001824132681;
const message = "Hello, world!";
await bot.sendMessage(chatId, message);
`
],

    [
        "Node.js",
        "ts",
        `

const { Bot } = require("grammy");

const botToken = Deno.env("BOT_TOKEN");
if (botToken === undefined) {
\ \ console.error("BOT_TOKEN not set.");
\ \ process.exit(1);
}

const bot = new Bot(botToken);

const chatId = -1001824132681;
const message = "Hello, world!";
bot.sendMessage(chatId, message);
`.trim()
],

)

%>

### MTKruto

<p></p>

<%=

it.codeGroup(

    [
        "Deno",
        "ts",
        `import { Client, StorageLocalStorage } from "${it.deno}/mod.ts";

const botToken = Deno.env("BOT_TOKEN");
if (botToken === undefined) {
\ \ console.error("BOT_TOKEN not set.");
\ \ Deno.exit(1);
}

// Replace these with your app's credentials.
const apiId = 123456;
const apiHash = "";

const client = new Client(new StorageLocalStorage("my_client"), apiId, apiHash);

await client.start(botToken);

const chatId = -1001824132681;
const message = "Hello, world!";
await client.sendMessage(chatId, message);

Deno.exit();
`
],

    [
        "Node.js",
        "ts",
        `

const { Client } = require("@mtkruto/node");
const { StorageLocalStorage } = require("@mtkruto/storage-local-storage");

const botToken = Deno.env("BOT_TOKEN");
if (botToken === undefined) {
\ \ console.error("BOT_TOKEN not set.");
\ \ process.exit(1);
}

// Replace these with your app's credentials.
const apiId = 123456;
const apiHash = "";

const client = new Client(new StorageLocalStorage("my_client"), apiId, apiHash);

async function main() {
\ \ await client.start(botToken);

\ \ const chatId = -1001824132681;
\ \ const message = "Hello, world!";
\ \ await client.sendMessage(chatId, message);

\ \ process.exit();
}

main();
`.trim()
],

)

%>

## Composer.on

### grammY

<p></p>

```ts
bot.on("message:text", (ctx) => {
  await ctx.reply("You sent a text message.");
});

bot.on("callback_query", async (ctx) => {
  await ctx.answerCallbackQuery({
    text: "Alert text goes here.",
    show_alert: true,
  });
});

bot.on("inlineQuery", async (ctx) => {
  await ctx.answerInlineQuery(
    [
      {
        id: crypto.randomUUID(),
        type: "photo",
        photo_url: "https://url/to/photo.jpg",
        thumbnail_url: "https://url/to/thumbnail.jpg",
        photo_width: 768,
        photo_height: 468,
      },
    ],
    { cache_time: 300, is_personal: true }
  );
});
```

### MTKruto

<p></p>

```ts
// Note: This handles channel posts, too.
client.on(["message", "text"], (ctx) => {
  await ctx.reply("You sent a text message.");
});

client.on("callbackQuery", async (ctx) => {
  await ctx.answerCallbackQuery({
    text: "Alert text goes here.",
    alert: true,
  });
});

client.on("inlineQuery", async (ctx) => {
  await ctx.answerInlineQuery(
    [
      {
        id: crypto.randomUUID(),
        type: "photo",
        photoUrl: "https://url/to/photo.jpg",
        thumbnailUrl: "https://url/to/thumbnail.jpg",
        photoWidth: 768,
        photoHeight: 468,
      },
    ],
    { cacheTime: 300, isPersonal: true }
  );
});
```

## Composer.command

### grammY

<p></p>

```ts
bot.command("start", (ctx) => {
  await ctx.reply("You just started me!");
});
```

### MTKruto

<p></p>

```ts
client.command("start", (ctx) => {
  await ctx.reply("You just started me!");
});
```
