import { describe, expect, it, vi } from "vitest";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { unzipSync } from "fflate";
import { portableAssets } from "../../scripts/portable-assets";

const hook = <T,>(value: T | { handler: T }) => typeof value === "object" && value !== null && "handler" in value ? value.handler : value;

describe("Portable photos", () => {
  it("bundles all 22 original photos without fetching Lovable", async () => {
    const plugin = portableAssets();
    const transform = hook(plugin.transform);
    if (typeof transform !== "function") throw new Error("Missing transform");
    const archive = unzipSync(await readFile("releases/tropivara-cpanel-upload.zip"));
    const filenames = Object.keys(archive).filter((name) => name.startsWith("media/") && archive[name].length > 0);
    expect(filenames).toHaveLength(22);
    const fetcher = vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Offline"));
    try {
      for (const filename of filenames) {
        const path = resolve("src/assets", `${filename.slice(6)}.asset.json`);
        const pointer = await readFile(path, "utf8");
        const emitFile = vi.fn().mockReturnValue("photo1");
        const result = await transform.call({ environment: { config: { command: "build" } }, emitFile } as never, pointer, path);
        expect(emitFile).toHaveBeenCalledWith({ type: "asset", name: filename.slice(6), source: archive[filename] });
        expect(result).toMatchObject({ code: expect.stringContaining("url: import.meta.ROLLUP_FILE_URL_photo1") });
      }
      expect(fetcher).not.toHaveBeenCalled();
    } finally {
      fetcher.mockRestore();
    }
  });

  it("emits a public URL safe for hosted SSR without import.meta.url", async () => {
    const plugin = portableAssets();
    const transform = hook(plugin.transform);
    const resolver = hook(plugin.resolveFileUrl);
    if (typeof transform !== "function" || typeof resolver !== "function") throw new Error("Missing hooks");
    const path = resolve("src/assets/tropivara-logo-clean.png.asset.json");
    await transform.call({ environment: { config: { command: "build" } }, emitFile: () => "logo1" } as never, "", path);
    const expression = resolver.call({} as never, { referenceId: "logo1", fileName: "assets/logo-123.png" } as never);
    expect(expression).toBe('"/assets/logo-123.png"');
    expect(new Function(`return ${expression}`)()).toBe("/assets/logo-123.png");
  });

  it("serves a real local image at the existing pointer path during npm run dev", async () => {
    const plugin = portableAssets();
    const configure = hook(plugin.configureServer);
    if (typeof configure !== "function") throw new Error("Missing dev middleware");
    const use = vi.fn();
    configure.call({} as never, { middlewares: { use } } as never);
    const middleware = use.mock.calls[0]?.[0];
    const asset = JSON.parse(await readFile("src/assets/tv-01.jpg.asset.json", "utf8"));
    const response = { statusCode: 0, setHeader: vi.fn(), end: vi.fn() };
    const next = vi.fn();
    await middleware({ url: asset.url }, response, next);
    expect(next).not.toHaveBeenCalled();
    expect(response.statusCode).toBe(200);
    expect(response.setHeader).toHaveBeenCalledWith("Content-Type", "image/jpeg");
    const bytes = response.end.mock.calls[0]?.[0] as Uint8Array;
    expect([...bytes.slice(0, 3)]).toEqual([255, 216, 255]);
    expect(bytes.length).toBe(142887);
  });
});