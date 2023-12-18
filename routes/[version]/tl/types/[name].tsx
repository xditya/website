import { PageProps } from "$fresh/server.ts";
import { NotFound } from "../../../../components/NotFound.tsx";
import { Description } from "../../../../components/Description.tsx";
import { MutedText } from "../../../../components/MutedText.tsx";
import { Properties } from "../../../../components/Properties.tsx";
import { getDocs } from "../../../../docs.ts";
import { fixName, mapName } from "../../../../misc.ts";

export default async function Type(
  _request: Request,
  { params: { version, name } }: PageProps,
) {
  const { tlTypes, getTlLink } = await getDocs(version);
  name = mapName(name);
  const type = tlTypes.find((v) => v.name == name);
  name = fixName(name);

  if (type === undefined) {
    return <NotFound />;
  }

  const union = type.classDef.extends?.startsWith("_")
    ? type.classDef.extends.slice(1)
    : undefined;

  return (
    <div class="flex flex-col gap-3">
      <div>
        <div class="h1">{name}</div>
        <div class="mb-1">
          {type.jsDoc?.doc ? <Description>{type.jsDoc.doc}</Description> : null}
        </div>
      </div>
      {union && (
        <div>
          <MutedText small>UNION</MutedText>
          <div class="font-mono">
            <a href={`/${version}/tl/enums/${union}`} class="link">
              {union}
            </a>
          </div>
        </div>
      )}
      {type.classDef.properties.length > 0 && (
        <div>
          <MutedText small>PROPERTIES</MutedText>
          <Properties getLink={getTlLink}>
            {type.classDef.properties}
          </Properties>
        </div>
      )}
    </div>
  );
}
