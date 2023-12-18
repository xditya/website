# Getting Started

MTKruto is cross-runtime: it can run in different JavaScript environments and
leverages their unique features, respectively, without having its API changed.
Head to the section of your environment of choice to get started.

## Node.js

In server-side Node.js projects, the `@mtkruto/node` package can be used.

<%= it.installPackage("@mtkruto/node node-localstorage @mtkruto/storage-local-storage") %>

It supports both ECMAScript and CommonJS.

## Deno

MTKruto is available on [deno.land/x](https://deno.land/x/mtkruto).

No setup is required, but here’s an import map entry for it in case you use one.

```json
"mtkruto/": "<%= it.deno %>/",
```

## Web

1. If your project is developed using Node.js with a framework like (Next.js,
   SvelteKit, etc.) or a bundler (Parcel, Vite, etc.), use the
   `@mtkruto/browser` package.

<%= it.installPackage("@mtkruto/browser") %>

> Note that neither `node-localstorage` nor `@mtkruto/storage-local-storage` is
> required when using `@mtkruto/browser`.

2. If your project is developed using Deno with a framework like Fresh or Ultra, it is the same case as [above](#deno).

3. You can also import it directly from a CDN into your HTML file.

```html
<!DOCTYPE html>
<html>
  <body>
    <script type="module">
      import { ... } from "<%= it.esm %>";
    </script>
  </body>
</html>
```

<%= it.nav("/", "/starting-the-client") %>
