let _singleton = Symbol();

const localhostUrl = "http://localhost:8080";
const herokuUrl = "https://cs4550-hw1.herokuapp.com/";
const phoneUrl = 'http://76.119.15.113';


class CourseModuleLessonWidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CourseModuleLessonWidgetService(_singleton);
        return this[_singleton]
    }

    findAllCourses() {
        return fetch(herokuUrl + '/api/course')
            .then(response => (response.json()));
    }

    findAllModules(courseId) {
        return fetch(herokuUrl + '/api/course/' + courseId + '/module')
            .then(response => (response.json()));
    }

    findAllLessons(courseId, moduleId) {
        return fetch(herokuUrl + "/api/course/" + courseId + "/module/" + moduleId + "/lesson")
            .then(response => (response.json()));
    }

    findAllWidgets(lessonId) {
        return fetch(herokuUrl + "/api/lesson/" + lessonId + "/widget")
            .then(response => (response.json()));
    }
}

export default CourseModuleLessonWidgetService;