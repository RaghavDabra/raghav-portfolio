# Raghav Portfolio

![React](https://img.shields.io/badge/React-18-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-4-646cff.svg)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000.svg)

A personal developer portfolio — an interactive, animated single-page site with a
WebGL/Three.js scene, GSAP motion, audio, and internationalisation.

## Tech stack

| Area | Technology |
|---|---|
| Framework | React 18, TypeScript, Vite |
| 3D / graphics | Three.js, `@masatomakino/threejs-interactive-object`, lil-gui |
| Animation | GSAP |
| State | Redux + Rematch |
| Routing | React Router 6 |
| i18n | i18next + react-i18next |
| Audio | Howler |
| Tooling | ESLint, Prettier, Stylelint, Commitizen, semantic-release |

## Getting started

This project uses **pnpm** (enforced via an `only-allow` preinstall hook).

```bash
# install dependencies
pnpm install

# start the dev server
pnpm dev

# build for production
pnpm build

# preview the production build
pnpm preview
```

## Credits

This portfolio is built on the open-source
[**folio-2022**](https://github.com/Giulico/folio-2022) template by
[Giulico](https://github.com/Giulico), adapted and personalised. Please refer to
the upstream repository for its original license and terms; this repository retains
that licensing for the template code it derives from.

## Author

Adapted by [Raghav Dabra](https://github.com/RaghavDabra).
