import { RenderContext } from "$fresh/server.ts";
import { getDocs } from "../../../docs.ts";
import { commonPrefixes } from "../../../misc.ts";
import versions from "../../../versions.ts";

export default async function Enums(_req: Request, ctx: RenderContext) {
  const preview = ctx.url.search.includes("?preview");
  const { tlEnums } = await getDocs(preview ? "gh" : versions[0]);

  return (
    <>
      <h1 id="methods" class="pb-3 mt-2.5 mb-1 font-bold text-4xl">
        TL Enums
      </h1>
      <div class="flex flex-col">
        {tlEnums
          .filter((v) => commonPrefixes.every((v_) => !v.name.startsWith(v_)))
          .map((v) => (
            <a
              href={`/${preview ? "gh/" : ""}tl/enums/${v.name}`}
              class="link break-all"
            >
              {v.name}
            </a>
          ))}
        {commonPrefixes.map((v) =>
          (() => {
            const enums = tlEnums.filter((v_) => v_.name.startsWith(v));
            if (enums.length < 1) {
              return null;
            }
            return (
              <>
                <h2
                  class="mt-2.5 mb-4 mt-14 font-bold text-2xl"
                  id={v[0] +
                    v.slice(1).replaceAll(".", "")}
                >
                  {v[0].toUpperCase() + v.slice(1).replaceAll(".", "")}
                </h2>
                {enums.map((v) => (
                  <a
                    href={`/${preview ? "gh/" : ""}tl/enums/${v.name}`}
                    class="link break-all"
                  >
                    {v.name}
                  </a>
                ))}
              </>
            );
          })()
        )}
      </div>
    </>
  );
}
