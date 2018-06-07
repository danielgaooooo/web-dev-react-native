let _singleton = Symbol();

class ExamService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }

    deleteExam(examId) {
        let url = "http://localhost:8080/api/exam/" + examId;
        return fetch(url, {
            method: 'delete'
        })
    }

    createExam(exam, lessonId) {
        let url = "http://localhost:8080/api/lesson/" + lessonId + "/exam";

        return fetch(url, {
            body: JSON.stringify(exam),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        }).then(response => (
            response.json()
        ))
    }

    updateExam(exam, examId) {
        let url = "http://localhost:8080/api/exam/" + examId;
        return fetch(url, {
            body: JSON.stringify(exam),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        }).then(response => (response.json()));
    }

    findAllQuestionsForExam(examId) {
        return fetch('http://localhost:8080/api/exam/' + examId + '/question')
            .then(response => (response.json()))
    }
}

export default ExamService;