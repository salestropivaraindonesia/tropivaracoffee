<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use CDN asset pointers for imported brand imagery and real stock photography; keep attribution alongside the assets so their origin remains auditable.
- The shared site Logo uses CDN pointers for the supplied artwork with transparent background and trimmed empty margins; retain its geometry and derive the local favicon from the same artwork so branding remains consistent.
- The global stylesheet justifies `p` and `dd` text, which overrides alignment inherited from a parent; when a paragraph or definition value must be centered or right-aligned, put the alignment utility on that `p`/`dd` element itself.
- Shared decorative coffee engravings use non-interactive CSS masks in section padding through SiteLayout hooks; keep ornaments outside content and use semantic theme tokens so all routes remain consistent.
- The portable-assets plugin reads the versioned release ZIP as an offline photo mirror, serves pointer paths during development and emits public-path assets during builds; never resolve these URLs against import.meta.url because hosted SSR has no usable module URL.
