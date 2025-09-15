const STROKES_PARSER = new DOMParser();

function addStrokes(html, callback) {
  // Test if we should generate strokes order, so we don't send the whole HTML for nothing
  pycmd("strokes_test", kanji_card => {
    if (!kanji_card) {
      callback(html)
      return;
    }

    const _document = STROKES_PARSER.parseFromString(html, "text/html");
    
    pycmd("strokes_query:" + _document.body.innerText, strokes => {
      const characters = Object.keys(strokes);
      if (characters.length === 0) {
        callback(html);
        return;
      }

      const regex = new RegExp(`(${characters.join("|")})`, "g");
      _document.body.innerHTML = _document.body.innerHTML.replace(
        regex,
        `<span class="strokes-character">$1</span>`
      );

      for (const elem of _document.getElementsByClassName("strokes-character")) {
        const char = elem.innerHTML;

        let svg = _document.createElementNS("http://www.w3.org/2000/svg", "svg");
        elem.append(svg);
        svg.outerHTML = strokes[char];
        svg = elem.children[0];

        svg.classList.add("strokes-order");
        svg.style.height = null;
      }

      callback(_document.getElementsByTagName("html").item(0).outerHTML)
    });
  });
}
