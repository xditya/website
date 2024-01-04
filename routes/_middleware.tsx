import { FreshContext } from "$fresh/server.ts";
import versions from "../versions.ts";

const region = Deno.env.get("DENO_REGION");
const from = region !== undefined ? ` from ${region}` : "";
export async function handler(req: Request, ctx: FreshContext) {
  const { pathname } = new URL(req.url);

  if (
    pathname.startsWith("/types/") || pathname.startsWith("/methods/") ||
    pathname.startsWith("/tl/")
  ) {
    const url = new URL(req.url);
    return Response.redirect(
      new URL(`/${versions[0]}${url.pathname}`, req.url),
    );
  }

  try {
    const then = Date.now();
    const res = await ctx.next();
    const diff = Date.now() - then;
    if (
      res.body != null &&
      res.status == 200 &&
      res.headers.get("content-type")?.includes("text/html")
    ) {
      const reader = res.body.getReader();
      const rs = new ReadableStream({
        async pull(controller) {
          const result = await reader.read();
          if (result?.done) {
            controller.enqueue(
              new TextEncoder().encode(
                `\n\n<!--- generated in ${diff}ms${from} --->`,
              ),
            );
            controller.close();
          } else if (result?.value) {
            controller.enqueue(result.value);
          } else if (!result) {
            controller.error();
          }
        },
        async cancel(reason) {
          try {
            await res.body?.cancel(reason);
          } catch {
            //
          }
        },
      });
      return new Response(rs, { headers: res.headers, status: res.status });
    } else {
      return res;
    }
  } catch (err) {
    console.trace(err);
  }
  return Response.redirect(new URL("/", req.url));
}
