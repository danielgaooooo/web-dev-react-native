import React from 'react'
import {View, TextInput, Alert} from 'react-native'
import {Text, Button, ListItem, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput} from 'react-native-elements'

class MultipleChoiceQuestionWidget extends React.Component {

    static navigationOptions = {title: "Multiple Choice"};

    constructor(props) {
        super(props);
        this.state = {
            title: 'Default title',
            description: 'Default description.',
            points: 0,
            options: [],
            preview: false,
            displayId: 0
        };
        this.updateForm = this.updateForm.bind(this);
        this.preview = this.preview.bind(this);
        this.previewOff = this.previewOff.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillReceiveProps(newProps) {
        Alert.alert("Hello??")
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

    }

    cancel() {
        let displayId = this.state.displayId;
        this.props.navigation.navigate('ExamEditor', {displayId: displayId + 1});
    }

    render() {
        return (
            <View>
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

                    <FormLabel>Choices (separate each by new line)</FormLabel>
                    <View style={{padding: 20}}>
                        {this.state.options.map((option, index) => (
                            <View>
                                <FormInput value={option.value}
                                           onChangeText={text =>
                                               this.updateOption(text, index)
                                           }/>
                                <CheckBox onPress={() => (Alert.alert('checkmate'))}
                                          checked={false} title='The answer is true'/>
                            </View>
                        ))}
                        <Button title="Add new option"
                                style={{paddingTop: 20}}
                                backgroundColor="blue"
                                onPress={() => this.addOption()}/>
                    </View>

                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({points: text})
                    }
                               placeholder={this.state.points.toString()}
                               value={this.state.points.toString()}/>
                    <Button title="Preview"
                            style={{paddingTop: 20}}
                            backgroundColor="grey"
                            onPress={() => this.preview()}/>
                </View>
                }


                {this.state.preview &&
                <View style={{padding: 20}}>
                    <Text h2>{this.state.title}</Text>
                    <Text>{this.state.description}</Text>
                    <Text h3>Points: {this.state.points.toString()}</Text>
                    {this.state.options.map(item => (
                        <ListItem title={item.value}/>
                    ))}
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
            </View>
        )
    }

}

export default MultipleChoiceQuestionWidget;