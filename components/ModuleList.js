import React from 'react'
import {View} from 'react-native'
import {ListItem} from 'react-native-elements'
import CourseModuleLessonWidgetService from '../services/CourseModuleLessonWidgetService';


class ModuleList extends React.Component {
    static navigationOptions = {title: 'Modules'};

    constructor(props) {
        super(props);
        this.service = CourseModuleLessonWidgetService.instance;
        this.state = {
            modules: [],
            courseId: 1
        }
    }

    componentDidMount() {
        const courseId = this.props.navigation.getParam("courseId", 1);
        this.setState({
            courseId: courseId
        });
        this.service.findAllModules(courseId)
            .then(modules => this.setState({modules: modules}))
    }

    render() {
        return (
            <View style={{padding: 15}}>
                {this.state.modules.map((module, index) => (
                    <ListItem
                        onPress={() => this.props.navigation
                            .navigate("LessonList", {
                                courseId:
                                this.state.courseId, moduleId: module.id
                            })}
                        key={index + 1}
                        title={module.title}/>
                ))}
            </View>
        )
    }
}

export default ModuleList;