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
        const div = document.createElement("div");
        div.classList.add("strokes-container");
        div.innerHTML = strokes[char];
        elem.append(div);
      }

    });
  });
}