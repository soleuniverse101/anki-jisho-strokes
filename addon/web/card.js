const modifiedShowAnswer = _showAnswer;

_showAnswer = (a, bodyclass) => {
    modifiedShowAnswer(a, bodyclass);
    _queueAction(addStrokes)
};
