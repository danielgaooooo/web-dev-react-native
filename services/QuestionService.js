let _singleton = Symbol();

const localhostUrl = "http://localhost:8080";
const herokuUrl = "https://cs4550-hw1.herokuapp.com/";

class QuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new QuestionService(_singleton);
        return this[_singleton]
    }


    createEssayQuestion(essay, examId) {
        let url = herokuUrl + "/api/exam/" + examId + "/essay";

        return fetch(url, {
            body: JSON.stringify(essay),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
    }

    deleteEssayQuestion(essayId) {
        let url = herokuUrl + "/api/essay/" + essayId;
        return fetch(url, {
            method: 'delete'
        });
    }

    updateEssayQuestion(essay, essayId) {
        let url = herokuUrl + "/api/essay/" + essayId;
        return fetch(url, {
            body: JSON.stringify(essay),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
    }

    createMultipleChoiceQuestion(multi, examId) {
        let url = herokuUrl + "/api/exam/" + examId + "/multi";

        return fetch(url, {
            body: JSON.stringify(multi),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
    }

    updateMultipleChoiceQuestion(multi, multiId) {
        let url = herokuUrl + "/api/multi/" + multiId;
        return fetch(url, {
            body: JSON.stringify(multi),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
    }

    deleteMultipleChoiceQuestion(multiId) {
        let url = herokuUrl + "/api/multi/" + multiId;
        return fetch(url, {
            method: 'delete'
        });
    }

    createTrueFalseQuestion(truefalse, examId) {
        let url = herokuUrl + "/api/exam/" + examId + "/truefalse";

        return fetch(url, {
            body: JSON.stringify(truefalse),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
    }

    updateTrueFalseQuestion(truefalse, truefalseId) {
        let url = herokuUrl + "/api/truefalse/" + truefalseId;
        return fetch(url, {
            body: JSON.stringify(truefalse),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
    }

    deleteTrueFalseQuestion(truefalseId) {
        let url = herokuUrl + "/api/truefalse/" + truefalseId;
        return fetch(url, {
            method: 'delete'
        });
    }

    createFillInTheBlankQuestion(fillBlankId, examId) {
        let url = herokuUrl + "/api/exam/" + examId + "/fillblank";

        return fetch(url, {
            body: JSON.stringify(fillBlankId),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
    }

    updateFillInTheBlankQuestion(fillBlank, fillBlankId) {
        let url = herokuUrl + "/api/fillblank/" + fillBlankId;
        return fetch(url, {
            body: JSON.stringify(fillBlank),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
    }

    deleteFillInTheBlankQuestion(fillBlankId) {
        let url = herokuUrl + "/api/fillblank/" + fillBlankId;
        return fetch(url, {
            method: 'delete'
        });
    }
}

export default QuestionService;