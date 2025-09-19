# Anki Jisho Strokes Order

[Anki](https://apps.ankiweb.net/) addon to add Kanji's strokes order on screen when hovering *Japanese* characters in [Jisho](https://jisho.org/)'s visual style (which I find particularly good).
The addon is available [there](https://ankiweb.net/shared/info/1619328930) and easily installed using Anki's addon system.

## Setting up the addon

### Configuration

**You need to edit the configuration file of the addon through Anki's addons panel.**

The **configuration file** follows the following schema :

```json
{
  "note_types": []
}
```

Where `note_types` is a list of names of note types whose cards will have their kanji's strokes order shown.

**Notes:**

- The names are **case-insensitive**, matched using the [fnmatch library](https://docs.python.org/3/library/fnmatch.html), read more about it to make (relatively) complex patterns.
- The characters `*`, `?`, `[` and `]` are special, so their use in notetypes schemas needs carefullness.

#### Configuration examples

```json
{
  "note_types": ["japanese anki deck"]
}
```

Will match the following note-types with **the exact name specified** : `japanese anki deck`, `Japanese Anki Deck`, `JAPANESE ANKI DECK`

```json
{
  "note_types": ["*japanese"]
}
```

Will match the following note-types **ending with the word "japanese"** : `Anki Japanese`, `Core 2k/6k JAPANESE`, ...

```json
{
  "note_types": ["*"]
}
```

Will match **all the note-types**.

```json
{
  "note_types": ["*jpn*", "*kanji*"]
}
```

Will match the following note-types **containing the words "jpn" or "kanji"**: `Kanji learning`, `Anime mining [jpn]`, ...

### Customization

If you want to style the strokes order window, you can do so by overriding the styling of the classes you'll find in the [addon's default CSS](https://github.com/soleuniverse101/anki-jisho-strokes/blob/main/addon/web/diagram.css).

## Support

If you need help configuring the addon, or if you have features suggestions or bug reports, you can contact me on the addon's [official support page](https://forums.ankiweb.net/t/jisho-kanji-stroke-order-official-support-thread/31676/3)

## Bundle addon

Note that you don't need to create your own bundle, you can just download the addon from Anki

To bundle the project as an Anki addon, you need to follow the following steps :

- Run `pnpm install` to install dependencies (with `pnpm` installed)
- Extract [KanjiVG](https://kanjivg.tagaini.net/)'s releases' SVG files into `resources/kanji`
- Run `pnpm process-svg` to process KanjiVG's raw SVG files into Jisho.org's style (*you also need to run this to develop the addon*)
- Run `pnpm bundle` to create a zip file valid as an Anki addon

## License & copyright notes

- The addon is licensed under the [Creative Commons Attibution-Share Alike 3.0](https://creativecommons.org/licenses/by-sa/3.0/) license to comply with the usage requirements of the KanjiVG database. Notably, the database's characters are modified to appear more aesthetic.
- Since this addon's purpose is to replicate the online Japanese dictionary [Jisho.org](https://jisho.org/), it is important to mention that the processing of the KanjiVG character into SVG files is mirrored to how Jisho processes the same characters. I essentially copied parts of the source code of Jisho.org, I do not own it and the only reason I recreated Jisho.org's style is to speed up the learning process in Anki.
- This project uses a modified version of the [Snap.svg](http://snapsvg.io/) library to fix a memory leak issue that occurs when processing the raw svg files. The latter being in great amount, it is likely to cause a crash of Node due to memory's excessive usage. I do not own Snap.svg's source code.

## Author's note

I made this addon because I often found myself going to jisho.org in order to practice my writing. The code wasn't very efficient but I then decided to make the addon cleaner since I found it very useful. Afterwards, I thought that it might be useful for other japanese learners so here I am publishing it. However it was not made to be used by anyone at first so keep in mind that it could not work exactly the way you want it to. For instance, it may not work for chinese characters. I am just sharing it for whomever could find it suitable for their learning journey. If you have features suggestions or bug reports, you can always contact me on the support page and I may be able address demands.
