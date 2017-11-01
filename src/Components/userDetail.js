//import liraries
import React, { Component } from 'react';
import { Content, Container, Text, Button, Spinner, Header, Left, Body, Right, Icon, Title, List, ListItem, Card, CardItem } from "native-base"


// create a component
class UserDetails extends Component {


    static navigationOptions = {
        title: "Details",
        headerStyle: { backgroundColor: "#3F51B5" },
        headerTintColor: "white"
    }

    render() {
        return (
            <Container style={{ justifyContent: "space-around" }}>
                <Text>Name : {this.props.navigation.state.params.name}</Text>
                <Text>Email : {this.props.navigation.state.params.email} </Text>
                <Text>Number : {this.props.navigation.state.params.number}</Text>
                <Text>Address : {this.props.navigation.state.params.address}</Text>



            </Container>
        );
    }
}

export default UserDetails;