import { RenderContext } from "$fresh/server.ts";
import { MutedText } from "../components/MutedText.tsx";
import { getDocs } from "../docs.ts";
import { TsType } from "../components/TsType.tsx";
import { PropertyName } from "../components/PropertyName.tsx";
import versions from "../versions.ts";

export default async function Errors(_req: Request, ctx: RenderContext) {
  const preview = ctx.url.search.includes("?preview");
  const { errors, getLink } = await getDocs(preview ? "gh" : versions[0]);

  return (
    <>
      <h1 id="methods" class="pb-3 mt-2.5 mb-1 font-bold text-4xl">
        Errors
      </h1>
      <div class="grid grid-cols-[min-content_1fr] gap-x-3 gap-y-2 pb-6">
        {errors.map((v) => (
          <>
            <div>
              {v.name}
            </div>
            <div>
              {v.classDef.properties.length > 0
                ? v.classDef.properties.map((v) => (
                  <div>
                    <PropertyName>{v}</PropertyName>{" "}
                    {v.tsType && <TsType getLink={getLink}>{v.tsType}</TsType>}
                  </div>
                ))
                : <MutedText italic>No Properties</MutedText>}
            </div>
            <div class="w-full border-b border-db col-span-2">
            </div>
          </>
        ))}
      </div>
    </>
  );
}
