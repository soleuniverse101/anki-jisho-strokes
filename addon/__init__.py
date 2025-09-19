from os import path
from typing import Any, Union, cast
# from pprint import pprint
from fnmatch import fnmatch

import aqt.clayout
import aqt.reviewer
import aqt.browser.previewer
from aqt import gui_hooks, mw
from aqt.webview import WebContent, AnkiWebView, AnkiWebViewKind

from typing import Literal

CURRENT_DIR = path.dirname(__file__)
SVG_DIR = path.join(CURRENT_DIR, "processed_kanji")

with open(path.join(CURRENT_DIR, "kanji_list.txt"), "r", encoding="utf-8") as file:
    KANJI_LIST = file.read()

config = mw.addonManager.getConfig(__name__)
config_note_types = config["note_types"]

mw.addonManager.setWebExports(__name__, r"web/.*(css|js)")
addon_package = mw.addonManager.addonFromModule(__name__)
DIAGRAM_STYLE_PATH = f"/_addons/{addon_package}/web/diagram.css"
KANJI_STROKES_PATH = f"/_addons/{addon_package}/web/kanji_strokes.js"
CARD_SCRIPT_PATH = f"/_addons/{addon_package}/web/card.js"


def is_kanji(c: str) -> bool:
    return c in KANJI_LIST


def get_strokes(text: str):
    strokes = {}
    for c in text:
        if (c in strokes) or (not is_kanji(c)):
            continue
        filename = format(ord(c), "x").zfill(5) + ".svg"
        with open(path.join(SVG_DIR, filename)) as f:
            strokes[c] = f.read()
    return strokes


TEST_COMMAND = "strokes_test"
QUERY_PREFIX = "strokes_query:"
START_INDEX = len(QUERY_PREFIX)


def on_message(handled: tuple[bool, Any], message: str, context: Any) -> tuple[bool, Any]:
    if not is_kanji_display_context(context):
        return handled

    if message == TEST_COMMAND:
        return True, True
    elif message.startswith(QUERY_PREFIX):
        return True, get_strokes(message[START_INDEX:])

    return handled


def on_webview_render(web_content: WebContent, context: AnkiWebView) -> None:
    if not is_kanji_display_context(context):
        return
    web_content.css.append(DIAGRAM_STYLE_PATH)
    web_content.js.append(KANJI_STROKES_PATH)
    web_content.js.append(CARD_SCRIPT_PATH)


def is_kanji_display_context(context: Any) -> bool:
    if isinstance(context, aqt.clayout.CardLayout) and hasattr(context, "note"):
        note_type = context.note.note_type()
    elif isinstance(context, aqt.browser.previewer.BrowserPreviewer):
        note_type = context.card().note_type()
    elif isinstance(context, aqt.reviewer.Reviewer):
        note_type = context.card.note_type()
    else:
        return False

    return is_valid_notetype(note_type["name"])


def is_valid_notetype(notetype: str) -> bool:
    for n in config_note_types:
        if fnmatch(notetype, n):
            return True
    return False


gui_hooks.webview_will_set_content.append(on_webview_render)
gui_hooks.webview_did_receive_js_message.append(on_message)
