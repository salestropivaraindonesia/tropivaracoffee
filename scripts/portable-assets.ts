import type { Plugin } from "vite";
import { readFile } from "node:fs/promises";

// Build-time only: published pages must not depend on Lovable's asset proxy.
export function portableAssets(): Plugin {
  return {
    name: "tropivara-portable-assets",
    apply: "build",
    enforce: "post",
    async transform(source, id) {
      if (!id.endsWith(".asset.json")) return;
      // Vite has already transformed JSON into JavaScript at this stage.
      const asset = JSON.parse(await readFile(id, "utf8")) as { url: string; original_filename: string; content_type: string };
      if (!asset.url.startsWith("/__l5e/assets-v1/")) return;
      const response = await fetch(new URL(asset.url, "https://tropivaracoffee.lovable.app"));
      if (!response.ok || !response.headers.get("content-type")?.startsWith(asset.content_type)) {
        this.error(`Could not bundle photo ${asset.original_filename}: HTTP ${response.status}.`);
      }
      const reference = this.emitFile({
        type: "asset",
        name: asset.original_filename,
        source: new Uint8Array(await response.arrayBuffer()),
      });
      return {
        code: `export default { ...${JSON.stringify(asset)}, url: import.meta.ROLLUP_FILE_URL_${reference} };`,
        map: null,
      };
    },
  };
}