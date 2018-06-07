let _singleton = Symbol();

class AssignmentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }

    deleteAssignment(assignmentId) {
        let url = "http://localhost:8080/api/assignment/" + assignmentId;
        return fetch(url, {
            method: 'delete'
        })
    }

    createAssignment(assignment, lessonId) {
        let url = "http://localhost:8080/api/lesson/" + lessonId + "/assignment";

        fetch(url, {
            body: JSON.stringify(assignment),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        }).then(response => (
            response.json()
        ))
    }

    updateAssignment(assignment, assignmentId) {
        let url = "http://localhost:8080/api/assignment/" + assignmentId;
        return fetch(url, {
            body: JSON.stringify(assignment),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        }).then(response => (response.json()));
    }
}

export default AssignmentService;