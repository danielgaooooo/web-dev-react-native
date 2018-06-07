import React from 'react'
import {View} from 'react-native'
import {ListItem} from 'react-native-elements'
import CourseModuleLessonWidgetService from '../services/CourseModuleLessonWidgetService';

class CourseList extends React.Component {
    static navigationOptions = {title: 'Courses'};

    constructor(props) {
        super(props);
        this.service = CourseModuleLessonWidgetService.instance;
        this.getCourses();
        this.state = {
            courses: []
        };
    }

    getCourses() {
        return this.service.findAllCourses()
            .then(courses => {
                this.setState({courses: courses})
            });
    }

    render() {
        return (
            <View style={{padding: 15}}>
                {this.state.courses.map((course, index) => (
                    <ListItem
                        onPress={() => this.props.navigation.navigate("ModuleList",
                            {courseId: course.id})}
                        title={course.title}
                        key={index + 1}/>
                ))}
            </View>
        )
    }
}

export default CourseList;