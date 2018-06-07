import React from 'react'
import {View, Button} from 'react-native'
import {ListItem} from 'react-native-elements'

class LessonList extends React.Component {
    static navigationOptions = {title: 'Lessons'};

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            courseId: 1,
            moduleId: 1
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId");
        const moduleId = navigation.getParam("moduleId");
        fetch("http://localhost:8080/api/course/" + courseId + "/module/" + moduleId + "/lesson")
            .then(response => (response.json()))
            .then(lessons => this.setState({lessons}))
    }

    render() {
        return (
            <View style={{padding: 15}}>

                {this.state.lessons.map(
                    (lesson, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("WidgetList", {lessonId: lesson.id})}
                            key={index + 1}
                            title={lesson.title}/>))}
            </View>
        )
    }
}

export default LessonList;