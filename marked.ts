// import { Marked } from "marked";
import { markedSmartypants } from "marked-smartypants";
import { Marked } from "https://esm.sh/marked@9.1.2";

export const marked = new Marked(markedSmartypants(), {
  renderer: {
    link(href: string, title: string | null | undefined, text: string) {
      return `<a${
        href.startsWith("http")
          ? ' rel="noreferrer noopener" target="_blank"'
          : ""
      } href="${href}" class="link"${
        title != null ? ` title="${title}"` : ""
      }>${text}</a>`;
    },
    heading(text, level) {
      const id = text
        .split("")
        .map((v) => /[A-Z]/i.test(v) ? v.toLowerCase() : "-")
        .join("");
      return `<h${level}${
        level != 1 ? ` id="${id}" onclick="location.href = '#${id}'"` : ""
      }>${text}</h${level}>`;
    },
  },
});
