import {
  ClassMethodDef,
  DocNodeInterface,
  JsDocTagParam,
  ParamIdentifierDef,
  TsTypeDefLiteral,
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
  for (const tsType of p?.interfaceDef.extends ?? []) {
    if (tsType.kind == "typeRef" && tsType.repr != "Omit") {
      const type = methodTypes.find((v) => v.name == tsType.repr);
      for (const property of type?.interfaceDef.properties ?? []) {
        p?.interfaceDef.properties.push(property);
      }
    } else if (tsType.kind == "typeRef") {
      const [ref, excluded_] = tsType.typeRef.typeParams ?? [];
      const excluded = excluded_.kind == "union"
        ? excluded_.union.filter((v): v is TsTypeDefLiteral =>
          v.kind == "literal"
        ).map((v) => v.literal.kind == "string" ? v.literal.string : "")
        : [];
      if (ref.kind == "typeRef") {
        const type = methodTypes.find((v) => v.name == ref.repr);
        for (const property of type?.interfaceDef.properties ?? []) {
          if (excluded.includes(property.name)) {
            continue;
          }
          p?.interfaceDef.properties.push(property);
        }
      }
    }
  }
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
