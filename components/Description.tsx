import { marked } from "../marked.ts";

const c = [
  "[&_pre]:(px-3 py-2 bg-db rounded-md overflow-x-auto text-base)",
  "[&_:not(pre)_>_code]:(inline-block rounded-md text-sm px-2 py-0.5 bg-db)",
  "[&_ul]:pl-10",
  "[&_ol]:pl-10",
  "[&_ul]:list-disc",
  "[&_ol]:list-decimal",
  "[&_p:not(:first-child):not(:last-child)]:my-4 [&_p:first-child:not(:last-child)]:mb-4 [&_p:last-child:not(:first-child)]:mt-4",
  "[&_ul:not(:first-child):not(:last-child)]:my-4 [&_ul:first-child:not(:last-child)]:mb-4 [&_ul:last-child:not(:first-child)]:mt-4",
  "[&_ol:not(:first-child):not(:last-child)]:my-4 [&_ol:first-child:not(:last-child)]:mb-4 [&_ol:last-child:not(:first-child)]:mt-4",
];

export function Description({ children }: { children: string }) {
  return (
    <div
      class={c.join(" ")}
      dangerouslySetInnerHTML={{
        __html: marked.parse(children) as string,
      }}
    />
  );
}
