import { AppProps } from "$fresh/server.ts";
import { Sidebar } from "../islands/Sidebar.tsx";

export default function App({ Component, url }: AppProps) {
  return (
    <html class="scroll-pt-12 lg:scroll-pt-2">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          MTKruto
          {url.pathname != "/" && " " + url.pathname.split("/").join(" / ")}
        </title>
        <link
          rel="stylesheet"
          href="/highlight/styles/github.min.css"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="stylesheet"
          href="/highlight/styles/github-dark.min.css"
          media="(prefers-color-scheme: dark)"
        />
        <script src="/highlight/highlight.min.js" />
        <link rel="stylesheet" href="/fonts.css" />
        <link rel="stylesheet" href="/main.css" />
        <script
          defer
          dangerouslySetInnerHTML={{ __html: "hljs.highlightAll();" }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: 'navigator.serviceWorker.register("/sw.js");',
          }}
        />
      </head>
      <body class="bg-bg text-fg flex flex-col lg:flex-row overflow-x-hidden lg:(mx-auto w-full max-w-screen-2xl)">
        <Sidebar pathname={url.pathname} />
        <main class="px-5 py-3 min-h-screen w-full">
          <div class="max-w-screen-md mx-auto w-full">
            <Component />
            <div
              class="w-full h-[50vh] uppercase text-xs opacity-10 flex items-center justify-center select-none"
              title="Space intentionally left blank."
            >
              {/* <div>Space intentionally left blank</div> */}
            </div>
          </div>
        </main>
      </body>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(95534912, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });`,
        }}
      />
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/95534912"
            style="position:absolute; left:-9999px;"
            alt=""
          />
        </div>
      </noscript>
    </html>
  );
}
