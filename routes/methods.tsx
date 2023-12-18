import { RenderContext } from "$fresh/server.ts";
import { MutedText } from "../components/MutedText.tsx";
import { Description } from "../components/Description.tsx";
import { getDocs } from "../docs.ts";
import versions from "../versions.ts";

export default async function Methods(_req: Request, ctx: RenderContext) {
  const preview = ctx.url.search.includes("?preview");
  const { methods } = await getDocs(preview ? "gh" : versions[0]);

  return (
    <>
      <h1 id="methods" class="pb-3 mt-2.5 mb-1 font-bold text-4xl">
        Methods
      </h1>
      <div class="grid grid-cols-[min-content_1fr] gap-x-3 gap-y-2 pb-6">
        {methods.map((v) => (
          <>
            <a href={`/${preview ? "gh/" : ""}methods/${v.name}`} class="link">
              {v.name}
            </a>
            <div>
              {v.jsDoc?.doc
                ? <Description>{v.jsDoc.doc}</Description>
                : <MutedText italic>No Description</MutedText>}
            </div>
            <div class="w-full border-b border-db col-span-2">
            </div>
          </>
        ))}
      </div>
    </>
  );
}
