# Jisho Kanji Stroke Order

This addon allows to integrate kanji's strokes order in reviews through SVG images formatted and stylized the same way jisho.org does it.

## Configuration

**You need to edit the configuration file of the addon through Anki's addons panel.**

The **configuration file** follows the following schema :

```
{
  "note_types": []
}
```

Where `note_types` is a list of names of note types whose cards will get indicate the kanji's strokes order.

**Notes:**

- The names are **case-insensitive**, matched using the [fnmatch library](https://docs.python.org/3/library/fnmatch.html), read more about it to make (relatively) complex patterns.
- The characters `*`, `?`, `[` and `]` are special, so their use in notetypes schemas needs carefullness.

### Configuration examples

```
{
  "note_types": ["japanese anki deck"]
}
```

Will match the following note-types with **the exact name specified** : `japanese anki deck`, `Japanese Anki Deck`, `JAPANESE ANKI DECK`

```
{
  "note_types": ["*japanese"]
}
```

Will match the following note-types **ending with the word "japanese"** : `Anki Japanese`, `Core 2k/6k JAPANESE`, ...

```
{
  "note_types": ["*"]
}
```

Will match **all the note-types**.

```
{
  "note_types": ["*jpn*", "*kanji*"]
}
```

Will match the following note-types **containing the words "jpn" or "kanji"**: `Kanji learning`, `Anime mining [jpn]`, ...

### Support

If you need help configuring the addon, you can contact me on the addon's [official support page](https://forums.ankiweb.net/t/jisho-kanji-stroke-order-official-support-thread/31676/3)
