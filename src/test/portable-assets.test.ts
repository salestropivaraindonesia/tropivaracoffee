import { afterEach, describe, expect, it, vi } from "vitest";
import { portableAssets } from "../../scripts/portable-assets";
vi.mock("node:fs/promises", () => ({ readFile: vi.fn().mockResolvedValue(JSON.stringify({ url: "/__l5e/assets-v1/example/tv-01.jpg", original_filename: "tv-01.jpg", content_type: "image/jpeg" })) }));

afterEach(() => vi.unstubAllGlobals());

describe("Portable photo builds", () => {
  const asset = { url: "/__l5e/assets-v1/example/tv-01.jpg", original_filename: "tv-01.jpg", content_type: "image/jpeg" };
  const transform = portableAssets().transform;
  const handler = typeof transform === "function" ? transform : transform?.handler;

  it("emits actual photo bytes and replaces the origin-only URL with a bundled reference", async () => {
    const bytes = new Uint8Array([255, 216, 255]);
    const fetcher = vi.fn().mockResolvedValue(new Response(bytes, { headers: { "content-type": "image/jpeg" } }));
    vi.stubGlobal("fetch", fetcher);
    const emitFile = vi.fn().mockReturnValue("photo1");
    const result = await handler?.call({ emitFile, error: (message: string) => { throw new Error(message); } } as never, JSON.stringify(asset), "/src/assets/tv-01.jpg.asset.json");
    expect(fetcher.mock.calls[0]?.[0].href).toBe("https://tropivaracoffee.lovable.app/__l5e/assets-v1/example/tv-01.jpg");
    expect(emitFile).toHaveBeenCalledWith({ type: "asset", name: "tv-01.jpg", source: bytes });
    expect(result).toMatchObject({ code: expect.stringContaining("url: import.meta.ROLLUP_FILE_URL_photo1") });
  });

  it("refuses an HTML fallback instead of bundling a broken image", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("<html/>", { headers: { "content-type": "text/html" } })));
    const emitFile = vi.fn();
    await expect(handler?.call({ emitFile, error: (message: string) => { throw new Error(message); } } as never, JSON.stringify(asset), "/src/assets/tv-01.jpg.asset.json")).rejects.toThrow("Could not bundle photo tv-01.jpg");
    expect(emitFile).not.toHaveBeenCalled();
  });
});