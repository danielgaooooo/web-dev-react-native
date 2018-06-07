let _singleton = Symbol();

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
        let url = "http://localhost:8080/api/exam/" + examId + "/essay";

        return fetch(url, {
            body: JSON.stringify(essay),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
    }

    deleteEssayQuestion(essayId) {
        let url = "http://localhost:8080/api/essay/" + essayId;
        return fetch(url, {
            method: 'delete'
        });
    }

    updateEssayQuestion(essay, essayId) {
        let url = "http://localhost:8080/api/essay/" + essayId;
        return fetch(url, {
            body: JSON.stringify(essay),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
    }

    createMultipleChoiceQuestion(multi, examId) {
        let url = "http://localhost:8080/api/exam/" + examId + "/multi";

        return fetch(url, {
            body: JSON.stringify(multi),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
    }

    updateMultipleChoiceQuestion(multi, multiId) {
        let url = "http://localhost:8080/api/multi/" + multiId;
        return fetch(url, {
            body: JSON.stringify(multi),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
    }

    deleteMultipleChoiceQuestion(multiId) {
        let url = "http://localhost:8080/api/multi/" + multiId;
        return fetch(url, {
            method: 'delete'
        });
    }

    createTrueFalseQuestion(truefalse, examId) {
        let url = "http://localhost:8080/api/exam/" + examId + "/truefalse";

        return fetch(url, {
            body: JSON.stringify(truefalse),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
    }

    updateTrueFalseQuestion(truefalse, truefalseId) {
        let url = "http://localhost:8080/api/truefalse/" + truefalseId;
        return fetch(url, {
            body: JSON.stringify(truefalse),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
    }

    deleteTrueFalseQuestion(truefalseId) {
        let url = "http://localhost:8080/api/truefalse/" + truefalseId;
        return fetch(url, {
            method: 'delete'
        });
    }
}

export default QuestionService;