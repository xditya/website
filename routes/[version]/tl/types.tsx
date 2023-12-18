import { RenderContext } from "$fresh/server.ts";
import { getDocs } from "../../../docs.ts";
import { commonPrefixes, fixName } from "../../../misc.ts";
import versions from "../../../versions.ts";

export default async function Types(_req: Request, ctx: RenderContext) {
  const preview = ctx.url.search.includes("?preview");
  const { tlTypes } = await getDocs(preview ? "gh" : versions[0]);

  return (
    <>
      <h1 id="methods" class="pb-3 mt-2.5 mb-1 font-bold text-4xl">
        TL Types
      </h1>
      <div class="flex flex-col">
        {tlTypes
          .filter((v) =>
            commonPrefixes.every((v_) => !fixName(v.name).startsWith(v_))
          )
          .map((v) => (
            <a
              href={`/${preview ? "gh/" : ""}tl/types/${fixName(v.name)}`}
              class="link break-all"
            >
              {fixName(v.name)}
            </a>
          ))}
        {commonPrefixes.map((v) =>
          (() => {
            const types = tlTypes.filter((v_) =>
              fixName(v_.name).startsWith(v)
            );
            if (types.length < 1) {
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
                {types.map((v) => (
                  <a
                    href={`/${preview ? "gh/" : ""}tl/types/${fixName(v.name)}`}
                    class="link break-all"
                  >
                    {fixName(v.name)}
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
