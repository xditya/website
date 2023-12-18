import {
  ClassMethodDef,
  DocNodeInterface,
  JsDocTagParam,
  ParamIdentifierDef,
} from "deno_doc/types.d.ts";
import { PropertyName } from "./PropertyName.tsx";
import { TsType } from "./TsType.tsx";
import { LinkGetter } from "./TsType.tsx";
import { Properties } from "./Properties.tsx";
import { Description } from "./Description.tsx";

export function Method(
  { getLink, methodTypes, children: method }: {
    getLink: LinkGetter;
    methodTypes: DocNodeInterface[];
    children: ClassMethodDef;
  },
) {
  const op = method.functionDef.params
    .find((v): v is ParamIdentifierDef =>
      v.kind == "identifier" && v.optional && v.name == "params"
    );
  const p = op === undefined
    ? null
    : methodTypes.find((v) =>
      op.tsType?.kind == "typeRef" && v.name == op.tsType.typeRef.typeName
    );
  const t = op?.tsType?.kind == "typeLiteral" ? op.tsType : undefined;
  return (
    <div class="flex flex-col gap-3">
      {method.functionDef.params.filter((v): v is ParamIdentifierDef =>
        v.kind == "identifier" && !v.optional
      )
        .map((v) => (
          <div>
            <div class="font-mono">
              <PropertyName hasType={!!v.tsType}>{v}</PropertyName>{" "}
              {v.tsType ? <TsType getLink={getLink}>{v.tsType}</TsType> : "any"}
            </div>
            {method.jsDoc?.tags && (() => {
              const a = method.jsDoc!.tags!
                .find((v_) =>
                  v_.kind == "param" && v_.name == v.name
                ) as JsDocTagParam;
              return (
                <>
                  {a?.doc && (
                    <div class="pl-3">
                      <Description>{a.doc}</Description>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        ))}
      {p && (
        <Properties getLink={getLink}>
          {p.interfaceDef.properties}
        </Properties>
      )}
      {t && (
        <Properties getLink={getLink}>{t.typeLiteral.properties}</Properties>
      )}
    </div>
  );
}
