let _singleton = Symbol();

const localhostUrl = "http://localhost:8080";
const herokuUrl = "https://cs4550-hw1.herokuapp.com/";
const phoneUrl = 'http://76.119.15.113';


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
        let url = herokuUrl + "/api/exam/" + examId;
        return fetch(url, {
            method: 'delete'
        })
    }

    createExam(exam, lessonId) {
        let url = herokuUrl + "/api/lesson/" + lessonId + "/exam";

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
        let url = herokuUrl + "/api/exam/" + examId;
        return fetch(url, {
            body: JSON.stringify(exam),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        }).then(response => (response.json()));
    }

    findAllQuestionsForExam(examId) {
        return fetch(herokuUrl + '/api/exam/' + examId + '/question')
            .then(response => (response.json()))
    }
}

export default ExamService;