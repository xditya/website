import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "./twind.config.ts";

export default defineConfig({
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  plugins: [twindPlugin(twindConfig)],
});
