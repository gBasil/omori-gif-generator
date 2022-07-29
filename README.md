# Omori Gif Generator

A simple way to generate [OMORI](https://www.omori-game.com) gifs, like those you see on [Tenor](https://tenor.com). This is a [Next.js](https://nextjs.org) project that uses the [Geist](https://geist-ui.dev) design system.

## Getting Started

Run the development server:

```bash
yarn dev
```

## Contributing

Commits use the [Gitmoji](https://gitmoji.dev) style. Code formatting is done via Prettier, which should automagically use the configuration in this repository.

If in the future new sprites are added to OMORI and you want to add them, make sure the generation scripts (`backgrounds.js` for the background images and `crop.js` for the expression thumbnails) generate valid data from the spritesheets.
