import React from 'react'
import {View, TextInput, Alert, ScrollView} from 'react-native'
import {FormLabel, FormInput, Text, Button} from 'react-native-elements'
import AssignmentService from'../services/AssignmentService';

class AssignmentEditor extends React.Component {
    static navigationOptions = {title: 'Editing Assignment'};

    constructor(props) {
        super(props);
        this.state = {
            lessonId: 1,
            name: 'Default title',
            description: 'Default description',
            points: 0,
            preview: false,
            displayId: 0
        };

        this.assignmentService = AssignmentService.instance;
        this.preview = this.preview.bind(this);
        this.previewOff = this.previewOff.bind(this);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
    }

    cancel() {
        let displayId = this.state.displayId;
        this.props.navigation.navigate('WidgetList', {displayId: displayId + 1});
    }

    delete() {
        this.assignmentService.deleteAssignment(this.state.assignmentId.toString())
            .then(() => this.cancel());
    }

    confirm() {
        let assignment = {
            name: this.state.name,
            description: this.state.description,
            points: this.state.points,
            widgetType: "Assignment"
        };
        this.assignmentService.updateAssignment(assignment, this.state.assignmentId.toString())
            .then(() => this.cancel());
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        const displayId = navigation.getParam("displayId");
        const assignmentId = navigation.getParam("assignmentId");
        const name = navigation.getParam("name");
        const description = navigation.getParam("description");
        const points = navigation.getParam("points");


        this.setState({
            lessonId: lessonId,
            displayId: displayId,
            assignmentId: assignmentId,
            name: name,
            description: description,
            points: points
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
                        {this.state.name}
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
                                   style={{padding: 10, backgroundColor: 'white'}}/>
                    </View>

                    <View style={{padding: 5}}>
                        <Button title="Upload a file"
                                style={{width: 200}}
                                backgroundColor="blue"
                        />
                        <Text style={{paddingLeft: 20}}>No file selected</Text>
                    </View>

                    <View style={{padding: 20}}>
                        <Text h3>Submit a link</Text>
                        <TextInput multiline={false}
                                   style={{padding: 10, backgroundColor: 'white'}}/>
                    </View>

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

export default AssignmentEditor;