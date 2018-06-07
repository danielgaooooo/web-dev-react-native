import React from 'react'
import {View, Picker, TextInput, ScrollView, Alert} from 'react-native'
import {ListItem, Text, Button, FormLabel, FormInput} from 'react-native-elements'
import ExamService from '../services/ExamService';


export default class ExamEditor extends React.Component {
    static navigationOptions = {title: 'Editing Exam'};

    constructor(props) {
        super(props);
        this.state = {
            examId: 1,
            name: 'Default title',
            description: 'Default description',
            preview: false,
            questions: [],
            displayId: 0,
            questionType: "MC"
        };
        this.examService = ExamService.instance;
        this.preview = this.preview.bind(this);
        this.previewOff = this.previewOff.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState(newProps, () => (
            this.examService.findAllQuestionsForExam(this.state.examId)
                .then(questions => this.setState({questions: questions}))
        ));
    }

    componentDidMount() {
        const examId = this.props.navigation.getParam("examId");
        const name = this.props.navigation.getParam("name");
        const description = this.props.navigation.getParam("description");
        const lessonId = this.props.navigation.getParam("lessonId");

        this.setState({
            examId: examId,
            name: name,
            description: description,
            lessonId: lessonId
        });
        this.examService.findAllQuestionsForExam(examId)
            .then(questions => this.setState({questions: questions}))
    }

    createQuestion() {
        let displayId = this.state.displayId;
        let examId = this.state.examId;
        switch (this.state.questionType) {
            case "MC":
                this.props.navigation.navigate('MultipleChoiceQuestionWidget',
                    {
                        displayId: displayId + 1,
                        examId: examId
                    });
                break;
            case "ES":
                this.props.navigation.navigate('EssayQuestionWidget',
                    {
                        displayId: displayId + 1,
                        examId: examId
                    });
                break;
            case "TF":
                this.props.navigation.navigate('TrueFalseQuestionWidget',
                    {
                        displayId: displayId + 1,
                        examId: examId
                    });
                break;
            case "FB":
                this.props.navigation.navigate('FillInTheBlankQuestionWidget',
                    {
                        displayId: displayId + 1,
                        examId: examId
                    });
                break;
        }
    }


    cancel() {
        let displayId = this.state.displayId;
        this.props.navigation.navigate('WidgetList', {displayId: displayId + 1});
    }

    delete() {
        this.examService.deleteExam(this.state.examId.toString())
            .then(() => this.cancel());
    }

    confirm() {
        let exam = {
            name: this.state.name,
            description: this.state.description,
            widgetType: "Exam"
        };
        this.examService.updateExam(exam, this.state.examId.toString())
            .then(() => this.cancel());
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
                               value={this.state.name}
                    />

                    <FormLabel>Description</FormLabel>
                    <View style={{padding: 20}}>
                        <TextInput onChangeText={
                            text => this.updateForm({description: text})
                        }
                                   placeholder="Your description goes here"
                                   value={this.state.description}
                                   style={{backgroundColor: "white", padding: 10}}/>
                    </View>

                    <View>
                        <Picker
                            onValueChange={(itemValue) =>
                                this.setState({questionType: itemValue})}
                            selectedValue={this.state.questionType}>
                            <Picker.Item value="MC" label="Multiple choice"/>
                            <Picker.Item value="ES" label="Essay"/>
                            <Picker.Item value="TF" label="True or false"/>
                            <Picker.Item value="FB" label="Fill in the blanks"/>
                        </Picker>
                        <Button title="Create selected question type"
                                backgroundColor="blue"
                                style={{paddingLeft: 20, paddingRight: 20}}
                                onPress={() => this.createQuestion()}/>
                    </View>

                    <Text style={{padding: 20}} h2>Exam Questions</Text>
                    {this.state.questions.map((question, index) => (
                        <ListItem
                            onPress={() => {
                                if (question.type === 'Essay') {
                                    this.props.navigation
                                        .navigate('EssayQuestionEditor',
                                            {
                                                examId: this.state.examId,
                                                essayId: question.id,
                                                displayId: this.state.displayId,
                                                title: question.title,
                                                description: question.description,
                                                points: question.points
                                            });
                                } else if (question.type === 'MultipleChoice') {
                                    this.props.navigation
                                        .navigate('MultipleChoiceQuestionEditor',
                                            {
                                                examId: this.state.examId,
                                                displayId: this.state.displayId,
                                                multiId: question.id,
                                                title: question.title,
                                                description: question.description,
                                                points: question.points,
                                                correctOption: question.correctOption,
                                                options: question.options
                                            });
                                } else if (question.type === 'FillInTheBlank') {
                                    this.props.navigation
                                        .navigate('FillInTheBlankQuestionEditor',
                                            {
                                                examId: this.state.examId,
                                                fillId: question.id,
                                                displayId: this.state.displayId,
                                                title: question.title,
                                                description: question.description,
                                                points: question.points
                                            });
                                } else if (question.type === 'TrueFalse') {
                                    this.props.navigation
                                        .navigate('TrueFalseQuestionEditor',
                                            {
                                                examId: this.state.examId,
                                                trueId: question.id,
                                                displayId: this.state.displayId,
                                                title: question.title,
                                                description: question.description,
                                                points: question.points
                                            });
                                }
                            }}
                            key={index + 1}
                            subtitle={question.type}
                            title={question.title}/>
                    ))}

                    <Button title="Preview"
                            style={{paddingTop: 20}}
                            backgroundColor="grey"
                            onPress={() => this.preview()}/>

                </View>}
                {this.state.preview && <View>
                    <Text style={{backgroundColor: 'grey', padding: 20}} h2>
                        {this.state.name}
                    </Text>
                    <View style={{padding: 20}}>
                        <Text style={{paddingTop: 20, paddingBottom: 20}}>
                            {this.state.description}
                        </Text>
                    </View>

                    <Text style={{padding: 20}} h2>Exam Questions</Text>
                    {this.state.questions.map(
                        (question, index) => (
                            <ListItem
                                onPress={() => {
                                    if (question.type === 'Essay') {
                                        this.props.navigation
                                            .navigate('EssayQuestionEditor',
                                                {
                                                    examId: this.state.examId,
                                                    essayId: question.id,
                                                    displayId: this.state.displayId,
                                                    title: question.title,
                                                    description: question.description,
                                                    points: question.points
                                                });
                                    } else if (question.type === 'MultipleChoice') {
                                        this.props.navigation
                                            .navigate('MultipleChoiceQuestionEditor',
                                                {
                                                    examId: this.state.examId,
                                                    displayId: this.state.displayId,
                                                    multiId: question.id,
                                                    title: question.title,
                                                    description: question.description,
                                                    points: question.points,
                                                    correctOption: question.correctOption,
                                                    options: question.options
                                                });
                                    } else if (question.type === 'FillInTheBlank') {
                                        this.props.navigation
                                            .navigate('FillInTheBlankQuestionEditor',
                                                {
                                                    examId: this.state.examId,
                                                    fillId: question.id,
                                                    displayId: this.state.displayId,
                                                    title: question.title,
                                                    description: question.description,
                                                    points: question.points
                                                });
                                    } else if (question.type === 'TrueFalse') {
                                        this.props.navigation
                                            .navigate('TrueFalseQuestionEditor',
                                                {
                                                    examId: this.state.examId,
                                                    trueId: question.id,
                                                    displayId: this.state.displayId,
                                                    title: question.title,
                                                    description: question.description,
                                                    points: question.points
                                                });
                                    }
                                }}
                                key={index + 1}
                                subtitle={question.type}
                                title={question.title}/>
                        ))}

                    <Button onPress={() => this.previewOff()}
                            style={{paddingTop: 20}}
                            backgroundColor="grey"
                            title="Back to editing"/>
                </View>}


                <Button onPress={() => this.delete()}
                        backgroundColor="red"
                        title="Delete"/>
                <Button onPress={() => this.confirm()}
                        backgroundColor="blue"
                        title="Update"/>
            </ScrollView>
        )
    }
}