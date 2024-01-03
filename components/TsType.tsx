import {
  LiteralDef,
  ObjectPatPropAssignDef,
  ObjectPatPropDef,
  ObjectPatPropKeyValueDef,
  ObjectPatPropRestDef,
  ParamArrayDef,
  ParamAssignDef,
  ParamDef,
  ParamIdentifierDef,
  ParamObjectDef,
  ParamRestDef,
  TsConditionalDef,
  TsFnOrConstructorDef,
  TsTypeDef,
  TsTypeLiteralDef,
  TsTypeOperatorDef,
  TsTypeParamDef,
  TsTypePredicateDef,
  TsTypeRefDef,
} from "deno_doc/types.d.ts";
import { JSX } from "preact/jsx-runtime";
import { PropertyName } from "./PropertyName.tsx";

export interface LinkGetter {
  (typeRef: string): string | null;
}

export function TsType(
  { getLink, children: tt }: { getLink: LinkGetter; children: TsTypeDef },
) {
  switch (tt.kind) {
    case "keyword":
      return <Keyword>{tt.keyword}</Keyword>;
    case "literal":
      return <Literal>{tt.literal}</Literal>;
    case "typeRef":
      return <TypeRef getLink={getLink}>{tt.typeRef}</TypeRef>;
    case "union":
      return <Union getLink={getLink}>{tt.union}</Union>;
    case "intersection":
      return <Intersection getLink={getLink}>{tt.intersection}</Intersection>;
    case "array":
      return <Array getLink={getLink}>{tt.array}</Array>;
    case "tuple":
      return <Tuple getLink={getLink}>{tt.tuple}</Tuple>;
    case "typeOperator":
      return <TypeOperator getLink={getLink}>{tt.typeOperator}</TypeOperator>;
    case "parenthesized":
      return <Parenthesized getLink={getLink}>{tt.parenthesized}
      </Parenthesized>;
    case "rest":
      return <Rest getLink={getLink}>{tt.rest}</Rest>;
    case "optional":
      return <Optional getLink={getLink}>{tt.optional}</Optional>;
    case "typeQuery":
      return <TypeQuery getLink={getLink}>{tt.typeQuery}</TypeQuery>;
    case "this":
      return <This />;
    case "fnOrConstructor":
      return (
        <FnOrConstructor getLink={getLink}>
          {tt.fnOrConstructor}
        </FnOrConstructor>
      );
    case "conditional":
      return <Conditional getLink={getLink}>{tt.conditionalType}</Conditional>;
    case "importType":
      break;
    case "infer":
      break;
    case "indexedAccess":
      break;
    case "mapped":
      break;
    case "typeLiteral":
      return <TypeLiteral getLink={getLink}>{tt.typeLiteral}</TypeLiteral>;
    case "typePredicate":
      return <TypePredicate getLink={getLink}>{tt.typePredicate}
      </TypePredicate>;
  }
  return <span class="text-red-500">{tt.kind}</span>;
}

function Keyword({ children: keyword }: { children: string }) {
  return <span>{keyword}</span>;
}

function Literal({ children: literal }: { children: LiteralDef }) {
  switch (literal.kind) {
    case "string":
      return <span>"{literal.string}"</span>;
    case "bigInt":
      return <>{literal.string}n</>;
    case "number":
      return <>{literal.number}</>;
    case "boolean":
      return <>{String(literal.boolean)}</>;
    case "template":
      break;
  }
  return <span class="text-red-500">{literal.kind}</span>;
}

function TypeParams(
  { getLink, children: params }: {
    getLink: LinkGetter;
    children: TsTypeDef[];
  },
) {
  return (
    <>
      <span class="opacity-50">&lt;</span>
      {params
        .map((v) => <TsType getLink={getLink}>{v}</TsType>)
        .reduce((a, b) => (
          <>
            {a}
            <span class="opacity-50">,</span> {b}
          </>
        ))}
      <span class="opacity-50">&gt;</span>
    </>
  );
}

function TypeRef(
  { getLink, children: typeRef }: {
    getLink: LinkGetter;
    children: TsTypeRefDef;
  },
) {
  const link = getLink(typeRef.typeName);
  let name: JSX.Element;
  if (link != null) {
    name = <a href={link} class="link">{typeRef.typeName}</a>;
  } else {
    name = <span href="/">{typeRef.typeName}</span>;
  }
  return (
    <>
      {name}
      {typeRef.typeParams
        ? <TypeParams getLink={getLink}>{typeRef.typeParams}</TypeParams>
        : ""}
    </>
  );
}

function Union(
  { getLink, children: union }: { getLink: LinkGetter; children: TsTypeDef[] },
) {
  return union
    .map((v) => <TsType getLink={getLink}>{v}</TsType>)
    .reduce((a, b) => (
      <>
        {a} <span class="opacity-50">|</span> {b}
      </>
    ));
}

function Intersection(
  { getLink, children: intersection }: {
    getLink: LinkGetter;
    children: TsTypeDef[];
  },
) {
  return intersection
    .map((v) => <TsType getLink={getLink}>{v}</TsType>)
    .reduce((a, b) => (
      <>
        {a} <span class="opacity-50">&</span> {b}
      </>
    ));
}

function Array(
  { getLink, children: array }: { getLink: LinkGetter; children: TsTypeDef },
) {
  return (
    <>
      <TsType getLink={getLink}>{array}</TsType>
      <span class="opacity-50">[]</span>
    </>
  );
}

function Tuple(
  { getLink, children: tuple }: { getLink: LinkGetter; children: TsTypeDef[] },
) {
  return (
    <>
      <span class="opacity-50">[</span>
      {tuple.map((v) => <TsType getLink={getLink}>{v}</TsType>).reduce((
        a,
        b,
      ) => (
        <>
          {a}
          <span class="opacity-50">,</span> {b}
        </>
      ))}
      <span class="opacity-50">]</span>
    </>
  );
}

function TypeOperator(
  { getLink, children: typeOperator }: {
    getLink: LinkGetter;
    children: TsTypeOperatorDef;
  },
) {
  return (
    <>
      {typeOperator.operator}{" "}
      <TsType getLink={getLink}>{typeOperator.tsType}</TsType>
    </>
  );
}

function Parenthesized(
  { getLink, children: parenthesized }: {
    getLink: LinkGetter;
    children: TsTypeDef;
  },
) {
  return (
    <>
      (<TsType getLink={getLink}>{parenthesized}</TsType>)
    </>
  );
}

function Rest(
  { getLink, children: rest }: { getLink: LinkGetter; children: TsTypeDef },
) {
  return (
    <>
      <span class="opacity-50">...</span>
      <TsType getLink={getLink}>{rest}</TsType>
    </>
  );
}

function Optional(
  { getLink, children: optional }: { getLink: LinkGetter; children: TsTypeDef },
) {
  return (
    <>
      <TsType getLink={getLink}>{optional}</TsType>
    </>
  );
}

function TypeQuery(
  { children: typeQuery }: { getLink: LinkGetter; children: string },
) {
  return <>{typeQuery}</>;
}

function This() {
  return <>this</>;
}

export function TypeParam_({
  children: param,
  constraint = "extends",
  getLink,
}: {
  children: TsTypeParamDef;
  constraint?: string;
  getLink: LinkGetter;
}) {
  return (
    <>
      <>{param.name}</>
      {param.constraint && (
        <>
          {` ${constraint} `}
          <TsType getLink={getLink}>{param.constraint}</TsType>
        </>
      )}
      {param.default && (
        <>
          <span class="opacity-50">{" = "}</span>
          <TsType getLink={getLink}>{param.default}</TsType>
        </>
      )}
    </>
  );
}

export function TypeParams_({
  children: params,
  getLink,
}: {
  children: TsTypeParamDef[];
  getLink: LinkGetter;
}) {
  if (!params.length) {
    return null;
  }
  const items = [];
  for (let i = 0; i < params.length; i++) {
    items.push(<TypeParam_ getLink={getLink}>{params[i]}</TypeParam_>);
    if (i < params.length - 1) {
      items.push(<>{", "}</>);
    }
  }
  return (
    <>
      <span class="opacity-50">&lt;</span>
      {items}
      <span class="opacity-50">&gt;</span>
    </>
  );
}

function FnOrConstructor({
  children,
  getLink,
}: {
  children: TsFnOrConstructorDef;
  getLink: LinkGetter;
}) {
  const { constructor, typeParams, params, tsType } = children;
  return (
    <>
      {constructor ? "new " : ""}
      <TypeParams_ getLink={getLink}>{typeParams}</TypeParams_>(
      <Params getLink={getLink}>{params}</Params>){" "}
      <span class="opacity-50">=&gt;</span>{" "}
      <TsType getLink={getLink}>{tsType}</TsType>
    </>
  );
}

function Conditional(
  { getLink, children: conditional }: {
    getLink: LinkGetter;
    children: TsConditionalDef;
  },
) {
  return (
    <>
      <TsType getLink={getLink}>{conditional.checkType}</TsType> extends{" "}
      <TsType getLink={getLink}>{conditional.extendsType}</TsType>{" "}
      <span class="opacity-50">?</span>{" "}
      <TsType getLink={getLink}>{conditional.trueType}</TsType>{" "}
      <span class="opacity-50">:</span>{" "}
      <TsType getLink={getLink}>{conditional.falseType}</TsType>
    </>
  );
}

function TypeLiteral(
  { getLink, children: typeLiteral }: {
    getLink: LinkGetter;
    children: TsTypeLiteralDef;
  },
) {
  const a = typeLiteral.properties
    .map((v) => (
      <>
        <PropertyName hasType={!!v.tsType}>{v}</PropertyName>{" "}
        {v.tsType ? <TsType getLink={getLink}>{v.tsType}</TsType> : "any"}
      </>
    ))
    .reduce((a, b) => (
      <>
        {a}
        <span class="opacity-50">;</span> {b}
      </>
    ));
  return typeLiteral.properties.length == 0
    ? <>{"{}"}</>
    : <span class="font-mono">{"{ "}{a}{" }"}</span>;
}

function TypePredicate(
  { children: { asserts, param, type }, getLink }: {
    children: TsTypePredicateDef;
    getLink: LinkGetter;
  },
) {
  return (
    <>
      {asserts ? "asserts " : undefined}
      {param.type === "this" ? "this" : param.name}
      {type && (
        <>
          {" is "}
          <TsType getLink={getLink}>{type}</TsType>
        </>
      )}
    </>
  );
}

//#region params

function ParamArray({
  children: param,
  optional,
  getLink,
}: {
  children: ParamArrayDef;
  optional: boolean;
  getLink: LinkGetter;
}) {
  return (
    <>
      [{param.elements.map((e) => e && <Param getLink={getLink}>{e}</Param>)}]
      {param.optional || optional ? "?" : ""}
      {param.tsType && (
        <>
          <span style="opacity-50">{": "}</span>
          <TsType getLink={getLink}>{param.tsType}</TsType>
        </>
      )}
    </>
  );
}

function ParamAssign({
  children: param,
  getLink,
}: {
  children: ParamAssignDef;
  getLink: LinkGetter;
}) {
  return (
    <>
      <Param optional getLink={getLink}>
        {param.left}
      </Param>
      {param.tsType && <TsType getLink={getLink}>{param.tsType}</TsType>}
    </>
  );
}

function ParamIdentifier({
  children: param,
  optional,
  getLink,
}: {
  children: ParamIdentifierDef;
  optional: boolean;
  getLink: LinkGetter;
}) {
  return (
    <>
      <PropertyName hasType={!!param.tsType}>{param}</PropertyName>
      {param.tsType && (
        <>
          {" "}
          <TsType getLink={getLink}>{param.tsType}</TsType>
        </>
      )}
    </>
  );
}

function ObjectAssignPat({
  children: pattern,
}: {
  children: ObjectPatPropAssignDef;
  getLink: LinkGetter;
}) {
  return (
    <>
      {pattern.key}
      {pattern.value && pattern.value !== "[UNSUPPORTED]"
        ? `= ${pattern.value}`
        : undefined}
    </>
  );
}

function ObjectKeyValuePat({
  children,
  getLink,
}: {
  children: ObjectPatPropKeyValueDef;
  getLink: LinkGetter;
}) {
  return (
    <>
      {children.key}: <Param getLink={getLink}>{children.value}</Param>
    </>
  );
}

function ObjectRestPat({
  children,
  getLink,
}: {
  children: ObjectPatPropRestDef;
  getLink: LinkGetter;
}) {
  return (
    <>
      <span style="opacity-50">...</span>
      <Param getLink={getLink}>{children.arg}</Param>
    </>
  );
}

function ObjectPat({
  children: pattern,
  getLink,
}: {
  children: ObjectPatPropDef;
  getLink: LinkGetter;
}) {
  switch (pattern.kind) {
    case "assign":
      return <ObjectAssignPat getLink={getLink}>{pattern}</ObjectAssignPat>;
    case "keyValue":
      return <ObjectKeyValuePat getLink={getLink}>{pattern}</ObjectKeyValuePat>;
    case "rest":
      return <ObjectRestPat getLink={getLink}>{pattern}</ObjectRestPat>;
  }
}

function ParamObject({
  children: param,
  optional,
  getLink,
}: {
  children: ParamObjectDef;
  optional: boolean;
  getLink: LinkGetter;
}) {
  const props = [];
  for (let i = 0; i < param.props.length; i++) {
    props.push(<ObjectPat getLink={getLink}>{param.props[i]}</ObjectPat>);
    if (i < param.props.length - 1) {
      props.push(<>{", "}</>);
    }
  }
  return (
    <>
      &#123; {props} &#125;{param.optional || optional ? "?" : ""}
      {param.tsType && (
        <>
          <span style="opacity-50">{": "}</span>
          <TsType getLink={getLink}>{param.tsType}</TsType>
        </>
      )}
    </>
  );
}

function ParamRest({
  children: param,
  getLink,
}: {
  children: ParamRestDef;
  getLink: LinkGetter;
}) {
  return (
    <>
      <span style="opacity-50">...</span>
      <Param getLink={getLink}>{param.arg}</Param>
      {param.tsType && (
        <>
          <span style="opacity-50">{": "}</span>
          <TsType getLink={getLink}>{param.tsType}</TsType>
        </>
      )}
    </>
  );
}

export function Param({
  children: param,
  optional = false,
  getLink,
}: {
  children: ParamDef;
  optional?: boolean;
  getLink: LinkGetter;
}) {
  switch (param.kind) {
    case "array":
      return (
        <ParamArray getLink={getLink} optional={optional}>
          {param}
        </ParamArray>
      );
    case "assign":
      return <ParamAssign getLink={getLink}>{param}</ParamAssign>;
    case "identifier":
      return (
        <>
          <ParamIdentifier getLink={getLink} optional={optional}>
            {param}
          </ParamIdentifier>
        </>
      );
    case "object":
      return (
        <ParamObject getLink={getLink} optional={optional}>
          {param}
        </ParamObject>
      );
    case "rest":
      return <ParamRest getLink={getLink}>{param}</ParamRest>;
  }
}

export function Params({
  children: params,
  getLink,
  indent = "",
}: {
  children: ParamDef[];
  getLink: LinkGetter;
  indent?: string;
}) {
  if (!params.length) {
    return null;
  }

  if (params.length < 3) {
    const items = [];
    for (let i = 0; i < params.length; i++) {
      items.push(
        <>
          <Param getLink={getLink}>{params[i]}</Param>
        </>,
      );
      if (i < params.length - 1) {
        items.push(<>{", "}</>);
      }
    }
    return <>{items}</>;
  }
  return (
    <>
      {"\n  " + indent}
      {params
        .map((param) => <Param getLink={getLink}>{param}</Param>)
        .reduce((a, b) => (
          <>
            {a}
            {",\n  " + indent}
            {b}
          </>
        ))}
      {",\n"}
    </>
  );
}

//#endregion
