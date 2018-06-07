import React from "react";
import {View, ScrollView, TextInput} from 'react-native'
import {FormInput, FormLabel, Button, ListItem, Text, CheckBox} from 'react-native-elements'
import QuestionService from "../../services/QuestionService";

export default class MultipleChoiceQuestionEditor extends React.Component {

    static navigationOptions = {title: 'Editing Multiple Choice'};

    constructor(props) {
        super(props);
        this.state = {
            title: 'Default title',
            description: 'Default description',
            points: 0,
            options: [],
            correctOption: {id: -1, value: ''},
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
        const multiId = navigation.getParam("multiId");
        const title = navigation.getParam("title");
        const description = navigation.getParam("description");
        const points = navigation.getParam("points");
        const correctOption = navigation.getParam("correctOption");
        const options = navigation.getParam("options");

        let optionArray = options.split('\n');
        let optionArrayFinal = optionArray.map((option, index) => (
            {
                id: index,
                value: option
            }
        ));

        let correctOptionFinal = {
            id: 0,
            value: ''
        };


        optionArrayFinal.filter(option => {
            if (option.id === correctOption) {
                correctOptionFinal.id = correctOption;
                correctOptionFinal.value = option.value;
            }
        });


        this.setState({
            displayId: displayId,
            multiId: multiId,
            title: title,
            description: description,
            points: points,
            correctOption: correctOptionFinal,
            options: optionArrayFinal
        })
    }

    markAsCorrect(value, id) {
        this.setState({
            correctOption: {
                id: id,
                value: value
            }
        })
    }

    addOption() {
        let options = [
            ...this.state.options,
            {
                id: this.state.options.length,
                value: ''
            }
        ];
        this.setState({options: options});
    }

    updateOption(text, index) {
        let options = this.state.options.filter(option => {
            if (option.id === index) {
                option.value = text
            }
            return true;
        });
        this.setState({options: options});
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
        let options = this.state.options.map(option => (option.value));
        let stringOptions = options.join("\n");
        let multi = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            options: stringOptions,
            correctOption: this.state.correctOption.id,
            type: 'MultipleChoice'
        };

        this.questionService.updateMultipleChoiceQuestion(multi, this.state.multiId.toString())
            .then(() => this.cancel());
    }

    cancel() {
        let displayId = this.state.displayId;
        this.props.navigation.navigate('ExamEditor', {displayId: displayId + 1});
    }

    delete() {
        this.questionService.deleteMultipleChoiceQuestion(this.state.multiId.toString())
            .then(() => this.cancel());
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
                               value={this.state.title}/>

                    <FormLabel>Description</FormLabel>
                    <View style={{padding: 20}}>
                        <TextInput onChangeText={
                            text => this.updateForm({description: text})
                        }
                                   multiline={true}
                                   style={{padding: 20}}
                                   placeholder={this.state.description}
                                   value={this.state.description}
                                   backgroundColor="white"/>
                    </View>

                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({points: text})
                    }
                               placeholder={this.state.points.toString()}
                               value={this.state.points.toString()}/>

                    <FormLabel>Choices</FormLabel>
                    <View style={{padding: 20}}>
                        {this.state.options.map((option, index) => (
                            <View key={index + 5}>
                                {this.state.correctOption.id !== index &&
                                <FormInput value={option.value}
                                           style={{}}
                                           key={index}
                                           onChangeText={text =>
                                               this.updateOption(text, index)
                                           }/>}
                                {this.state.correctOption.id === index &&
                                <FormInput value={option.value}
                                           key={index + 6}
                                           containerStyle={{
                                               backgroundColor: 'lightgreen'
                                           }}
                                           onChangeText={text =>
                                               this.updateOption(text, index)
                                           }/>}
                                <CheckBox onPress={() => this.markAsCorrect(option.value, index)}
                                          key={index + 7}
                                          checked={index === this.state.correctOption.id}
                                          title='Mark as correct option'/>
                            </View>
                        ))}
                        <Button title="Add new option"
                                style={{paddingTop: 20}}
                                backgroundColor="blue"
                                onPress={() => this.addOption()}/>
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
                        {this.state.options.map((item, index) => (
                            <ListItem title={item.value}
                                      key={index}/>
                        ))}
                    </View>
                    <Button title="Back to editing"
                            style={{paddingTop: 20}}
                            backgroundColor="grey"
                            onPress={() => this.previewOff()}/>
                </View>
                }

                <Button backgroundColor="red"
                        onPress={() => this.delete()}
                        color="white"
                        title="Delete"/>
                <Button backgroundColor="green"
                        onPress={() => this.save()}
                        style={{paddingTop: 20}}
                        color="white"
                        title="Update"/>
            </ScrollView>
        )
    }

}