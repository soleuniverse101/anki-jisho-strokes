from os import path
from typing import Any

import aqt.clayout
import aqt.reviewer
import aqt.browser.previewer
from aqt import gui_hooks, mw
from aqt.webview import WebContent, AnkiWebView

CURRENT_DIR = path.dirname(__file__)
SVG_DIR = path.join(CURRENT_DIR, "kanji_svg")

with open(path.join(CURRENT_DIR, "kanji_list.txt"), "r") as file:
    KANJI_LIST = file.read()

mw.addonManager.setWebExports(__name__, r"resources/web/.*(css|js)")
addon_package = mw.addonManager.addonFromModule(__name__)
DIAGRAM_STYLE_PATH = f"/_addons/{addon_package}/resources/web/diagram.css"


def is_kanji(c: str) -> bool:
    return c in KANJI_LIST


def get_strokes(text):
    strokes = {}
    for c in text:
        if (c in strokes) or (not is_kanji(c)):
            continue
        filename = format(ord(c), "x").zfill(5) + ".svg"
        with open(path.join(SVG_DIR, filename)) as f:
            strokes[c] = f.read()
    return strokes


PREFIX = "strokes:"
START_INDEX = len(PREFIX)


def on_message(handled: tuple[bool, Any], message: str, context: Any) -> tuple[bool, Any]:
    if message.startswith(PREFIX):
        return True, get_strokes(message[START_INDEX:])
    return handled


def on_webview_render(web_content: WebContent, context: AnkiWebView) -> None:
    if not isinstance(context, aqt.clayout.CardLayout) and \
            not isinstance(context, aqt.browser.previewer.BrowserPreviewer) and \
            not isinstance(context, aqt.reviewer.Reviewer):
        return
    web_content.css.append(DIAGRAM_STYLE_PATH)


gui_hooks.webview_will_set_content.append(on_webview_render)
gui_hooks.webview_did_receive_js_message.append(on_message)
