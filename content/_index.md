# Introduction

MTKruto is a library that lets you interact with the
[Telegram API](https://core.telegram.org/#telegram-api). It can be used from
JavaScript or TypeScript, and can run on Deno, browsers, and Node.js.

## The Telegram API vs. the Bot API

[Bot API](https://core.telegram.org/bots/api) is a high-level HTTP interface to
the Telegram API that makes it easy to develop bots and lets you focus on being
more productive. We highly recommend it if you’re planning to develop complex
bots.

On the other hand, the Telegram API is the main API for building Telegram
clients. It uses the [MTProto](https://core.telegram.org/mtproto) protocol which
makes it a little more difficult to consume without a library unlike the Bot API.
Telegram clients can be a GUI application on an end user’s device, or a process
running continuously in a server.

While the Bot API can only be used to work with bot accounts, the Telegram API
can be used to work with both bot and user accounts. As mentioned previously,
the Bot API is simply an interface to work with bot accounts using the Telegram
API.

## When to Use the Telegram API

- If you want to use bot capabilities that are currently not accessible from the
  Bot API (including, but not limited to, getting updates when messages are
  deleted).
- If you want to bypass the limits of the main instance of the Bot API without
  hosting your own instance (including, but not limited to, working with large
  files).
- If you want to develop your own Telegram app (e.g., alternative to
  [Telegram Web](https://web.telegram.org/a)).
- If you want to automate user accounts.
- If you have your own reasons.

## Things to Consider

- The Telegram API requires its clients to maintain a database even if it is
  used for a bot account, but the Bot API does not.
- You can’t interact with the Telegram API using webhooks. You have to maintain
  a connection with Telegram servers.
- You can’t use both the Bot API and the Telegram API at once for the same bot.

## MTKruto vs. TDLib

[TDLib](https://core.telegram.org/tdlib) is the official client library for the
Telegram API. It is ideal, cross-platform, and contains everything required to
build fully-featured Telegram clients, be it native graphical apps, web apps, or
bots. Inside JavaScript runtimes, TDLib can be used either as a Wasm module, or
imported as a dynamic library to use its FFI.

TDLib focuses on getting the most out of the platform it runs on, while MTKruto
focuses on getting the most out of the JavaScript runtime it runs on. MTKruto
tends to be less-weighted than TDLib and use the features of the JavaScript
runtime it runs on wherever possible, possibly making it more suitable for
JavaScript runtimes.

It’s also worth mentioning that TDLib **hasn’t been used** in any of Telegram’s
official web clients, and JavaScript client implementations were used instead.

<%=

it.nav(null, "/getting-started")

%>
