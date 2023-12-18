import { defineConfig, Preset } from "https://esm.sh/@twind/core@1.1.3";
import presetTailwind from "https://esm.sh/@twind/preset-tailwind@1.1.4";
import presetAutoprefix from "https://esm.sh/@twind/preset-autoprefix@1.0.7";

export default {
  ...defineConfig({
    hash: true,
    presets: [presetTailwind() as Preset, presetAutoprefix()],
    theme: {
      extend: {
        colors: {
          fg: "var(--fg)",
          bg: "var(--bg)",
          tg: "#229ED9",
          db: "var(--db)",
        },
      },
    },
    rules: [
      ["link", "text-tg hover:underline"],
      ["h1", "mt-2.5 mb-1 font-bold text-4xl"],
    ],
  }),
  selfURL: import.meta.url,
};
