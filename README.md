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

Both `npm run dev` and `npm run build` read the original photo bytes from the versioned `releases/tropivara-cpanel-upload.zip`. Keep that file when cloning the repository. No Lovable photo connection or download is needed: development serves the imported pointer paths locally, and builds bundle the photos using public paths that also work with server-rendered pages. If a photo is missing from the archive, the command reports the missing filename instead of silently substituting HTML.

After pulling these changes, run `npm install` and restart `npm run dev`. For deployment, upload the complete generated output, including its image assets. The main repository remains the Lovable TanStack application; use the separate export below for standard static hosting.

For the standalone React + Vite version, extract `releases/tropivara-react-vite-source.zip` and select the extracted folder as the Vercel project root (build: `npm run build`, output: `dist`). That edition already includes its images in `public/media`. For cPanel, upload all contents of `releases/tropivara-cpanel-upload.zip`, including `media`, `assets`, and `.htaccess`.
