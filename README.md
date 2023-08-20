# Anki Jisho Strokes Order

[Anki](https://apps.ankiweb.net/) addon to add Kanji's strokes order on screen when hovering *Japanese* characters in [Jisho.org](https://jisho.org/)'s visual style (which I find particularly good).
The addon is available [there](https://ankiweb.net/shared/info/1619328930) and easily installed using Anki's addon system.

## Create addon bundle

*You don't need to create your own bundle, just download the addon from Anki*
To bundle the project as an Anki addon, you need to follow the following steps :
- Run `pnpm install` to install dependencies
- Extract [KanjiVG](https://kanjivg.tagaini.net/)'s releases' SVG files into `kanji_svg/raw/`
- Run `pnpm generate` to process KanjiVG's raw SVG files into Jisho.org's style
- Run `pnpm bundle` to create a zip file valid as an Anki addon

## Copyright notes

This project uses a modified version of the [Snap.svg](http://snapsvg.io/) library to a fix memory leak issue that takes place when processing the raw svg files. The latter being in great amount, it is likely to cause a crash of Node due to memory's excessive usage. I do not own Snap.svg's source code.