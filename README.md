# Tropivaraindocoffee

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://tropivaraindocoffee.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/72dbd0a7-4c13-48a1-bc1a-5cd7b4d08ec5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Photos on external hosting

`npm run build` downloads imported Lovable photo pointers and bundles them as local image files. Upload the complete generated output, not just its HTML or JavaScript. The build needs access to `https://tropivaracoffee.lovable.app`; if an original image is unavailable, the build stops instead of shipping broken photos.

For the standalone React + Vite version, extract `releases/tropivara-react-vite-source.zip` and select the extracted folder as the Vercel project root (build: `npm run build`, output: `dist`). That edition already includes its images in `public/media`. For cPanel, upload all contents of `releases/tropivara-cpanel-upload.zip`, including `media`, `assets`, and `.htaccess`.
