const showAnswer = _showAnswer;

_showAnswer = (a, bodyclass) => {
    console.log({a, bodyclass});

    console.log(addStrokes);
    addStrokes();

    showAnswer(a, bodyclass);
};
