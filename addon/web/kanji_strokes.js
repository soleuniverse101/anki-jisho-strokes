function addStrokes() {
  // Test if we should generate strokes order, so we don't send the whole HTML for nothing
  pycmd("strokes_test", kanji_card => {
    if (!kanji_card) {
      return;
    }
    pycmd("strokes_query:" + document.body.innerText, strokes => {
      const characters = Object.keys(strokes);
      if (characters.length === 0) return;

      const regex = new RegExp(`(${characters.join("|")})`, "g");
      document.body.innerHTML = document.body.innerHTML.replace(
        regex,
        `<span class="strokes-character">$1</span>`
      );

      for (const elem of document.getElementsByClassName("strokes-character")) {
        const char = elem.innerHTML;

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        elem.append(svg);
        svg.outerHTML = strokes[char];
        svg = elem.children[0];

        svg.classList.add("strokes-order");
        svg.style.height = null;
      }
    });
  });
}