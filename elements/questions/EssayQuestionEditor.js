import React from 'react';
import {View, ScrollView, TextInput} from 'react-native';
import {Button, FormInput, FormLabel, Text} from 'react-native-elements'

export default class EssayQuestionEditor extends React.Component {
    static navigationOptions = {title: 'Editing Essay Question'};

    constructor(props) {
        super(props);
        this.state = {
            examId: 1,
            title: 'Default title',
            description: 'Default description',
            points: 0,
            preview: false,
            displayId: 0
        };
        this.preview = this.preview.bind(this);
        this.previewOff = this.previewOff.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
    }

    delete() {
        let url = "http://localhost:8080/api/essay/" + this.state.essayId.toString();
        return fetch(url, {
            method: 'delete'
        }).then(() => this.cancel());
    }


    cancel() {
        let displayId = this.state.displayId;
        this.props.navigation.navigate('ExamEditor', {displayId: displayId + 1});
    }

    confirm() {
        let essay = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            type: 'Essay'
        };

        let url = "http://localhost:8080/api/essay/" + this.state.essayId.toString();

        fetch(url, {
            body: JSON.stringify(essay),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        }).then(() => this.cancel());
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const displayId = navigation.getParam("displayId");
        const title = navigation.getParam("title");
        const description = navigation.getParam("description");
        const points = navigation.getParam("points");
        const essayId = navigation.getParam("essayId");


        this.setState({
            examId: examId,
            displayId: displayId,
            title: title,
            description: description,
            points: points,
            essayId: essayId
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
                        text => this.updateForm({title: text})}
                               placeholder="Your title goes here"
                               value={
                                   (this.state.title === 'Default title') ? '' : this.state.title
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
                    <FormLabel>Points</FormLabel>
                    <FormInput onChangeText={
                        text => this.updateForm({points: text})
                    }
                               value={this.state.points.toString()}/>

                    <Button title="Preview"
                            style={{paddingTop: 20}}
                            backgroundColor="grey"
                            onPress={() => this.preview()}/>
                </View>}
                {this.state.preview && <View>
                    <Text style={{backgroundColor: 'grey', padding: 20}} h2>
                        {this.state.title}
                    </Text>
                    <View style={{padding: 20}}>
                        <Text h3>Points: {this.state.points}</Text>
                        <Text style={{paddingTop: 20, paddingBottom: 20}}>
                            {this.state.description}
                        </Text>
                        <Text h3>Essay Answer</Text>
                    </View>
                    <View style={{padding: 20}}>
                        <TextInput multiline={true}
                                   style={{padding: 10,
                                       height: 100,
                                       backgroundColor: 'white'}}/>
                    </View>
                    <Button onPress={() => this.previewOff()}
                            style={{paddingTop: 20}}
                            backgroundColor="grey"
                            title="Back to editing"/>
                </View>}
                <Button onPress={() => this.delete()}
                        backgroundColor="red"
                        title="Delete question"/>
                <Button onPress={() => this.confirm()}
                        backgroundColor="blue"
                        title="Update question"/>
            </ScrollView>
        )
    }
}