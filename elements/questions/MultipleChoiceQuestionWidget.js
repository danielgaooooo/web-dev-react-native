import React from 'react'
import {View, TextInput, Alert, ScrollView} from 'react-native'
import {Text, Button, ListItem, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput} from 'react-native-elements'
import QuestionService from '../../services/QuestionService';

class MultipleChoiceQuestionWidget extends React.Component {

    static navigationOptions = {title: "Multiple Choice"};

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
        const examId = navigation.getParam("examId");

        this.setState({
            displayId: displayId,
            examId: examId,
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
            correctOption: this.state.correctOption.value,
            type: 'MultipleChoice'
        };

        this.questionService.createMultipleChoiceQuestion(multi, this.state.examId.toString())
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

                <Button backgroundColor="green"
                        onPress={() => this.save()}
                        style={{paddingTop: 20}}
                        color="white"
                        title="Save"/>
                <Button backgroundColor="red"
                        onPress={() => this.cancel()}
                        color="white"
                        title="Cancel"/>
            </ScrollView>
        )
    }

}

export default MultipleChoiceQuestionWidget;