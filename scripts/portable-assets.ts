import type { Plugin } from "vite";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { unzipSync } from "fflate";

type PhotoPointer = { url: string; original_filename: string; content_type: string };

// Keep the audited CDN pointers; use the already-versioned release as an offline mirror.
export function portableAssets(): Plugin {
  let root = process.cwd();
  let base = "/";
  let photosPromise: Promise<Record<string, Uint8Array>> | undefined;
  const references = new Set<string>();
  const photos = () => {
    photosPromise ??= readFile(resolve(root, "releases/tropivara-cpanel-upload.zip")).then((bytes) =>
      unzipSync(bytes, { filter: (entry) => entry.name.startsWith("media/") && entry.originalSize > 0 }),
    );
    return photosPromise;
  };
  const photoBytes = async (asset: PhotoPointer) => {
    const bytes = (await photos())[`media/${asset.original_filename}`];
    if (!bytes?.length) throw new Error(`Missing offline photo ${asset.original_filename} in releases/tropivara-cpanel-upload.zip.`);
    return bytes;
  };
  return {
    name: "tropivara-portable-assets",
    enforce: "post",
    configResolved(config) {
      root = config.root;
      base = config.base === "./" || config.base === "" ? "/" : config.base;
    },
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const path = (request.url ?? "").split("?")[0];
        if (!path.startsWith("/__l5e/assets-v1/")) return next();
        try {
          const filename = decodeURIComponent(path.split("/").at(-1) ?? "");
          if (filename.includes("/") || filename.includes("\\")) return next();
          const asset = JSON.parse(await readFile(resolve(root, "src/assets", `${filename}.asset.json`), "utf8")) as PhotoPointer;
          if (asset.url !== path) return next();
          const bytes = await photoBytes(asset);
          response.statusCode = 200;
          response.setHeader("Content-Type", asset.content_type);
          response.setHeader("Content-Length", bytes.length);
          response.end(bytes);
        } catch (error) {
          next(error instanceof Error ? error : new Error(String(error)));
        }
      });
    },
    async transform(source, id) {
      if (this.environment.config.command !== "build") return;
      if (!id.endsWith(".asset.json")) return;
      const asset = JSON.parse(await readFile(id, "utf8")) as PhotoPointer;
      if (!asset.url.startsWith("/__l5e/assets-v1/")) return;
      const reference = this.emitFile({
        type: "asset",
        name: asset.original_filename,
        source: await photoBytes(asset),
      });
      references.add(reference);
      return {
        code: `export default { ...${JSON.stringify(asset)}, url: import.meta.ROLLUP_FILE_URL_${reference} };`,
        map: null,
      };
    },
    // Rollup's default uses new URL(..., import.meta.url), which crashes in the hosted SSR runtime.
    // A public path is the same in HTML rendered on the server and in the browser.
    resolveFileUrl({ referenceId, fileName }) {
      if (references.has(referenceId)) return JSON.stringify(`${base}${fileName}`);
    },
  };
}