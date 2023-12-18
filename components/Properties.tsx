import {
  ClassPropertyDef,
  InterfacePropertyDef,
  LiteralPropertyDef,
} from "deno_doc/types.d.ts";
import { PropertyName } from "./PropertyName.tsx";
import { TsType } from "./TsType.tsx";
import { LinkGetter } from "./TsType.tsx";
import { Description } from "./Description.tsx";

export function Properties(
  { getLink, children: i }: {
    getLink: LinkGetter;
    children:
      | InterfacePropertyDef[]
      | LiteralPropertyDef[]
      | ClassPropertyDef[];
  },
) {
  return (
    <div class="flex flex-col gap-3">
      {i.map((v) => (
        <div>
          <div class="font-mono">
            <PropertyName hasType={true}>{v}</PropertyName>{" "}
            {v.tsType ? <TsType getLink={getLink}>{v.tsType}</TsType> : "any"}
          </div>
          {"jsDoc" in v && v.jsDoc?.doc && (
            <div class="pl-3">
              <Description>{v.jsDoc.doc}</Description>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
