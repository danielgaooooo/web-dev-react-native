import React from "react";
import {View, TextInput, ScrollView} from 'react-native'
import {Text, Button, Divider, FormLabel, FormInput} from 'react-native-elements'
import QuestionService from "../../services/QuestionService";

export default class FillInTheBlankQuestionEditor extends React.Component {

    static navigationOptions = {title: 'Editing Fill in the Blank Question'};

    constructor(props) {
        super(props);
        this.state = {
            title: 'Default title',
            description: 'Default description',
            points: 0,
            variables: [],
            preview: false,
            displayId: 0
        };
        this.questionService = QuestionService.instance;
        this.updateForm = this.updateForm.bind(this);
        this.preview = this.preview.bind(this);
        this.previewOff = this.previewOff.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const displayId = navigation.getParam("displayId");
        const examId = navigation.getParam("examId");
        const points = navigation.getParam("points");

        const fillId = navigation.getParam("fillId");
        const title = navigation.getParam("title");
        const description = navigation.getParam("description");
        const variables = navigation.getParam("variables");

        let variableArray = variables.split('\n');
        let variableArrayFinal = variableArray.map((option, index) => (
            {
                id: index,
                value: option
            }
        ));

        this.setState({
            displayId: displayId,
            examId: examId,
            points: points,
            fillId: fillId,
            title: title,
            description: description,
            variables: variableArrayFinal
        })
    }

    addVariable() {
        let variables = [
            ...this.state.variables,
            {
                id: this.state.variables.length,
                value: ''
            }
        ];
        this.setState({variables: variables});
    }

    updateVariable(text, index) {
        let variables = this.state.variables.filter(variable => {
            if (variable.id === index) {
                variable.value = text
            }
            return true;
        });
        this.setState({variables: variables});
    }

    updateForm(newState) {
        this.setState(newState)
    }

    preview() {
        this.setState({preview: true})
    }

    previewOff() {
        this.setState({preview: false})
    }

    save() {
        let variables = this.state.variables.map(variable => (variable.value));
        let stringOptions = variables.join("\n");
        let fillBlanks = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            variables: stringOptions,
            type: 'FillInTheBlank'
        };

        this.questionService.updateFillInTheBlankQuestion(fillBlanks, this.state.fillId.toString())
            .then(() => this.cancel());
    }

    delete() {
        this.questionService.deleteFillInTheBlankQuestion(this.state.fillId)
            .then(() => this.cancel());
    }


    cancel() {
        let displayId = this.state.displayId;
        this.props.navigation.navigate('ExamEditor', {displayId: displayId + 1});
    }

    render() {
        return (
            <ScrollView>
                {!this.state.preview &&
                <View>
                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({title: text})
                    }
                               placeholder={this.state.title}
                               value={
                                   (this.state.title === 'Default title') ? '' : this.state.title
                               }/>

                    <FormLabel>Description</FormLabel>
                    <View style={{padding: 20}}>
                        <TextInput onChangeText={
                            text => this.updateForm({description: text})
                        }
                                   multiline={true}
                                   style={{padding: 20}}
                                   placeholder={this.state.description}
                                   value={
                                       (this.state.description === 'Default description') ? '' : this.state.description
                                   }
                                   backgroundColor="white"/>
                    </View>

                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({points: text})
                    }
                               placeholder={this.state.points.toString()}
                               value={this.state.points.toString()}/>

                    <FormLabel>Questions, with inputs formatted [variable=value]</FormLabel>
                    <View style={{padding: 20}}>
                        {this.state.variables.map((variable, index) => (
                            <View key={index + 5}>
                                <FormInput value={variable.value}
                                           style={{}}
                                           key={index}
                                           onChangeText={text =>
                                               this.updateVariable(text, index)
                                           }/>
                            </View>
                        ))}
                        <Button title="Add new input"
                                style={{paddingTop: 20}}
                                backgroundColor="blue"
                                onPress={() => this.addVariable()}/>
                    </View>
                    <Button title="Preview"
                            style={{paddingTop: 20}}
                            backgroundColor="grey"
                            onPress={() => this.preview()}/>
                </View>
                }


                {this.state.preview &&
                <View>
                    <View style={{padding: 20}}>
                        <Text h2>{this.state.title}</Text>
                        <Text>{this.state.description}</Text>
                        <Text h3>Points: {this.state.points.toString()}</Text>
                        <Divider style={{
                            backgroundColor:
                                'blue'
                        }}/>
                        {this.state.variables.map((item, index) => {
                            let temp = item.value.split('[').filter(item => (item.indexOf(']') < 0))[0];
                            let inputComesFirst = false;
                            let matches;
                            if (temp === '') {
                                matches = item.value.split(']')[1];
                                inputComesFirst = true;
                            } else {
                                matches = temp;
                            }
                            if (inputComesFirst) {
                                return (
                                    <View key={index} style={{paddingTop: 20, flex: 1, flexDirection: 'row'}}>
                                        <TextInput key={index} style={{backgroundColor: 'white', width: 100}}/>
                                        <Text key={index} h4>{matches}</Text>
                                    </View>
                                )
                            } else {
                                return (
                                    <View key={index} style={{paddingTop: 20, flex: 1, flexDirection: 'row'}}>
                                        <Text key={index} h4>{matches}</Text>
                                        <TextInput key={index} style={{backgroundColor: 'white', width: 100}}/>
                                    </View>
                                )
                            }
                        })}
                    </View>
                    <Button title="Back to editing"
                            style={{paddingTop: 20}}
                            backgroundColor="grey"
                            onPress={() => this.previewOff()}/>
                </View>
                }

                <Button backgroundColor="green"
                        onPress={() => this.save()}
                        style={{paddingTop: 20}}
                        color="white"
                        title="Update"/>
                <Button backgroundColor="red"
                        onPress={() => this.delete()}
                        color="white"
                        title="Delete"/>
            </ScrollView>
        )
    }
}