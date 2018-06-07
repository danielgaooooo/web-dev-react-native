import React from 'react';
import {View, TextInput, ScrollView, Picker, Alert} from 'react-native';
import {FormInput, FormLabel, Button, Text} from 'react-native-elements';
import ExamService from '../services/ExamService';

export default class ExamWidget extends React.Component {

    static navigationOptions = {title: 'Create an exam'};


    constructor(props) {
        super(props);
        this.state = {
            lessonId: 1,
            name: 'Default title',
            description: 'Default description',
            preview: false,
            displayId: 0,
            questionType: 'MC'
        };
        this.examService = ExamService.instance;
        this.preview = this.preview.bind(this);
        this.previewOff = this.previewOff.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    cancel() {
        let displayId = this.state.displayId;
        this.props.navigation.navigate('WidgetList', {displayId: displayId + 1});
    }

    confirm() {
        let exam = {
            name: this.state.name,
            description: this.state.description,
            widgetType: 'Exam'
        };
        this.examService.createExam(exam, this.state.lessonId.toString())
            .then(() => this.cancel());
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        const displayId = navigation.getParam("displayId");

        this.setState({
            lessonId: lessonId,
            displayId: displayId
        })
    }

    preview() {
        this.setState({preview: true});
    }

    previewOff() {
        this.setState({preview: false});
    }

    updateForm(newState) {
        this.setState(newState);
    }

    render() {
        return (
            <ScrollView>
                {!this.state.preview && <View>
                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({name: text})}
                               placeholder="Your title goes here"
                               value={
                                   (this.state.name === 'Default title') ? '' : this.state.name
                               }
                    />

                    <FormLabel>Description</FormLabel>
                    <View style={{padding: 20}}>
                        <TextInput onChangeText={
                            text => this.updateForm({description: text})
                        }
                                   placeholder="Your description goes here"
                                   value={
                                       (this.state.description === 'Default description') ? '' : this.state.description
                                   }
                                   style={{backgroundColor: "white", padding: 10}}/>
                    </View>

                    <Button title="Preview"
                            style={{paddingTop: 20}}
                            backgroundColor="grey"
                            onPress={() => this.preview()}/>
                </View>}
                {this.state.preview && <View>
                    <Text style={{backgroundColor: 'grey', padding: 20}} h2>
                        {this.state.name}
                    </Text>

                    <Button onPress={() => this.previewOff()}
                            style={{paddingTop: 20}}
                            backgroundColor="grey"
                            title="Back to editing"/>
                </View>}
                <View style={{padding: 20}}>
                    <Text h6>
                        To add questions, create this exam and tap on it in the widget list.
                    </Text>
                </View>
                <Button onPress={() => this.cancel()}
                        backgroundColor="red"
                        title="Cancel"/>
                <Button onPress={() => this.confirm()}
                        backgroundColor="blue"
                        title="Confirm"/>
            </ScrollView>
        )
    }
}