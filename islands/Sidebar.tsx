import { useState } from "preact/hooks";
import { MutedText } from "../components/MutedText.tsx";

const links = [
  [
    "Walkthrough",
    [
      ["Introduction", "/"],
      ["Getting Started", "/getting-started"],
      ["Starting the Client", "/starting-the-client"],
      ["Calling Methods", "/calling-methods"],
      ["Handling Updates", "/handling-updates"],
    ],
  ],
  [
    "Guides",
    [
      ["TCP Transport", "/tcp-transport"],
      ["Migrating from grammY", "/migrating-from-grammy"],
    ],
  ],
  [
    "Reference",
    [
      ["Methods", "/methods"],
      ["Types", "/types"],
      ["Updates", "/updates"],
      ["Errors", "/errors"],
    ],
  ],
  [
    "Unclassified",
    [
      ["Acknowledgements", "/acknowledgements"],
    ],
  ],
  [
    "TL",
    [
      ["Functions", "/tl/functions"],
      ["Enums", "/tl/enums"],
      ["Types", "/tl/types"],
    ],
  ],
  [
    "Resources",
    [
      ["Chat", "https://mtkrutochat.t.me"],
      ["GitHub", "https://github.com/MTKruto"],
    ],
  ],
] as const;

export function Sidebar({ pathname }: { pathname: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <header class="px-5 sticky top-0 lg:hidden w-full bg-bg backdrop-blur-lg border-b border-db z-[200]">
        <div class="max-w-screen-md mx-auto w-full flex items-center justify-between">
          <div></div>
          <button
            class="flex flex-col gap-1.5 py-4 px-0.5 group"
            onClick={() => setVisible(!visible)}
          >
            <div
              class={`border-b-[1.7px] h-px border-fg w-4 ${
                visible ? "rotate-[45deg] translate-y-[3.8px]" : ""
              }`}
              style={{ boxSizing: "content-box" }}
            >
            </div>
            <div
              class={`border-t-[1.7px] h-px border-fg w-4 ${
                visible ? "rotate-[-45deg] translate-y-[-3.8px]" : ""
              }`}
            >
            </div>
          </button>
        </div>
      </header>
      <div
        class={`bg-bg z-[100] px-5 pt-8 lg:hidden w-full fixed origin-top overflow-hidden ${
          visible ? "h-screen" : "h-0"
        }`}
      >
        <div class="w-full mx-auto max-w-screen-md py-4 flex flex-col gap-3">
          {links.map(([k, v]) => (
            <div>
              <MutedText uppercase small>{k}</MutedText>
              <div class="flex flex-col">
                {v.map(([k, v]) => (
                  <a
                    class={`hover:text-tg w-full ${
                      v == pathname ? "text-tg" : ""
                    }`}
                    rel={v.startsWith("/") ? "noopener noreferrer" : undefined}
                    target={v.startsWith("/") ? undefined : "blank"}
                    href={v}
                  >
                    {k}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div class="hidden lg:flex justify-end relative border-r border-db bg-clip-padding">
        <div class="w-[230px] max-w-[230px]">
          <div class="fixed h-screen px-5 py-3 overflow-y-auto flex flex-col break-all w-[230px] gap-3">
            {links.map(([k, v]) => (
              <div>
                <MutedText uppercase small>{k}</MutedText>
                <div class="flex flex-col">
                  {v.map(([k, v]) => (
                    <a
                      class={`hover:text-tg w-full ${
                        v == pathname ? "text-tg" : ""
                      }`}
                      rel={v.startsWith("/")
                        ? "noopener noreferrer"
                        : undefined}
                      target={v.startsWith("/") ? undefined : "blank"}
                      href={v}
                    >
                      {k}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
