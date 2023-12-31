import { TypeAliasDef } from "deno_doc/types.d.ts";
import { TsType } from "./TsType.tsx";
import { LinkGetter } from "./TsType.tsx";

export function TypeAlias(
  { getLink, children: typeAlias }: {
    getLink: LinkGetter;
    children: TypeAliasDef;
  },
) {
  return (
    <div class="font-mono whitespace-pre">
      {typeAlias.tsType.kind == "union"
        ? (
          <>
            <span class="opacity-50">{"| "}</span>
            {typeAlias.tsType.union.map((v) => (
              <TsType getLink={getLink}>{v}</TsType>
            )).reduce((a, b) => (
              <>{a}{<span class="opacity-50">{"\n| "}</span>}{b}</>
            ))}
          </>
        )
        : <TsType getLink={getLink}>{typeAlias.tsType}</TsType>}
    </div>
  );
}
