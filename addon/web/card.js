const originalShowAnswer = _showAnswer;

_showAnswer = (a, bodyclass) => {
    _queueAction(() => addStrokes(a, (result) => originalShowAnswer(result, bodyclass)))
};
