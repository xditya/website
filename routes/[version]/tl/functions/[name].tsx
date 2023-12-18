import { PageProps } from "$fresh/server.ts";
import { NotFound } from "../../../../components/NotFound.tsx";
import { Description } from "../../../../components/Description.tsx";
import { MutedText } from "../../../../components/MutedText.tsx";
import { Properties } from "../../../../components/Properties.tsx";
import { TsType } from "../../../../components/TsType.tsx";
import { getDocs } from "../../../../docs.ts";
import { fixName, mapName } from "../../../../misc.ts";

export default async function Function(
  _request: Request,
  { params: { version, name } }: PageProps,
) {
  const { tlFunctions, getTlLink } = await getDocs(version);
  name = mapName(name);
  const func = tlFunctions.find((v) => v.name == name);
  name = fixName(name);

  if (func === undefined) {
    return <NotFound />;
  }

  const ret = func.classDef.superTypeParams[0];

  return (
    <div class="flex flex-col gap-3">
      <div>
        <div class="h1">{name}</div>
        <div class="mb-1">
          {func.jsDoc?.doc ? <Description>{func.jsDoc.doc}</Description> : null}
        </div>
      </div>
      {func.classDef.properties.length > 0 && (
        <div>
          <MutedText small>PARAMETERS</MutedText>
          <Properties getLink={getTlLink}>
            {func.classDef.properties.filter((v) => v.name != "__F")}
          </Properties>
        </div>
      )}
      <div>
        <MutedText small>RESULT</MutedText>
        <div class="font-mono">
          {ret ? <TsType getLink={getTlLink}>{ret}</TsType> : "void"}
        </div>
      </div>
    </div>
  );
}
