import React from 'react';
import {Text, View, StatusBar, ScrollView} from 'react-native';
import FixedHeader from './elements/FixedHeader'

import {createStackNavigator} from 'react-navigation'
import {Button} from 'react-native-elements'

import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import AssignmentWidget from './components/AssignmentWidget';
import AssignmentEditor from './elements/AssignmentEditor';
import ExamEditor from './elements/ExamEditor';
import ExamWidget from './components/ExamWidget';

import TrueFalseQuestionWidget from './elements/questions/TrueFalseQuestionWidget';
import FillInTheBlankQuestionWidget from './elements/questions/FillInTheBlanketQuestionWidget';
import EssayQuestionWidget from './elements/questions/EssayQuestionWidget';
import MultipleChoiceQuestionWidget from './elements/questions/MultipleChoiceQuestionWidget';

import TrueFalseQuestionEditor from './elements/questions/TrueFalseQuestionEditor';
import FillInTheBlankQuestionEditor from './elements/questions/FillInTheBlankQuestionEditor';
import EssayQuestionEditor from './elements/questions/EssayQuestionEditor';
import MultipleChoiceQuestionEditor from './elements/questions/MultipleChoiceQuestionEditor';

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView>
                <StatusBar barStyle="light-content"/>
                <FixedHeader/>
                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList')}/>
            </ScrollView>
        )
    }
}


const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    WidgetList,
    QuestionList,
    AssignmentWidget,
    AssignmentEditor,
    ExamWidget,
    ExamEditor,
    MultipleChoiceQuestionWidget,
    TrueFalseQuestionWidget,
    EssayQuestionWidget,
    FillInTheBlankQuestionWidget,
    MultipleChoiceQuestionEditor,
    TrueFalseQuestionEditor,
    EssayQuestionEditor,
    FillInTheBlankQuestionEditor
});

export default App;
