import React from "react";
import {View, ScrollView, TextInput} from 'react-native'
import {FormLabel, FormInput, Button, CheckBox, Text} from 'react-native-elements'
import QuestionService from "../../services/QuestionService";

export default class TrueFalseQuestionEditor extends React.Component {

    static navigationOptions = {title: 'Editing True or False Question'};

    constructor(props) {
        super(props);
        this.state = {
            title: 'Default title',
            description: 'Type your question here',
            points: 0,
            isTrue: true,
            preview: false,
            displayId: 0
        };
        this.questionService = QuestionService.instance;
        this.updateForm = this.updateForm.bind(this);
        this.preview = this.preview.bind(this);
        this.previewOff = this.previewOff.bind(this);
        this.update = this.update.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const displayId = navigation.getParam("displayId");
        const examId = navigation.getParam("examId");
        const trueId = navigation.getParam("trueId");
        const title = navigation.getParam("title");
        const description = navigation.getParam("description");
        const points = navigation.getParam("points");
        const isTrue = navigation.getParam("isTrue");

        this.setState({
            displayId: displayId,
            examId: examId,
            trueId: trueId,
            title: title,
            description: description,
            points: points,
            isTrue: isTrue
        })
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

    update() {
        let truefalse = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            isTrue: this.state.isTrue,
            type: 'TrueFalse'
        };

        this.questionService.updateTrueFalseQuestion(truefalse, this.state.trueId.toString())
            .then(() => this.cancel());
    }

    delete() {
        this.questionService.deleteTrueFalseQuestion(this.state.trueId.toString())
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
                                       (this.state.description === 'Type your question here') ? '' : this.state.description
                                   }
                                   backgroundColor="white"/>
                    </View>

                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({points: text})
                    }
                               placeholder={this.state.points.toString()}
                               value={this.state.points.toString()}/>

                    <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                              checked={this.state.isTrue} title='Select to mark answer as true'/>

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
                        <Text h4>Points: {this.state.points.toString()}</Text>
                        <Text>{this.state.description}</Text>
                    </View>
                    <View style={{padding: 5, flex: 1, flexDirection: 'row'}}>
                        <CheckBox title='True'/>
                        <CheckBox title='False'/>
                    </View>
                    <Button title="Back to editing"
                            style={{paddingTop: 20}}
                            backgroundColor="grey"
                            onPress={() => this.previewOff()}/>
                </View>
                }

                <Button backgroundColor="green"
                        onPress={() => this.update()}
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