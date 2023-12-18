import { marked } from "../marked.ts";

export function Code({ children }: { children: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: marked.parse(children) as string,
      }}
    />
  );
}
