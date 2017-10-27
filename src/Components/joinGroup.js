//import liraries
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text, Header, Input, Left, Spinner, Icon, Title, Body, Label, Right, Thumbnail, Item, Toast } from "native-base"

import MapMidware from "../Store/Middleware/MapMiddleware"
import { connect } from "react-redux"



function mapStateToProps(state) {
    return {
        isJoin: state.MapReducer.userJoinGroup,
        isJoinError: state.MapReducer.userJoinGroupError,
        incorrectCode: state.MapReducer.invalidCode,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        joinGroup: (code) => {
            dispatch(MapMidware.groupJoin(code))
        },


        clearState: () => {
            dispatch(MapMidware.userClearState())
        }
    }
}


// create a component
class JoinGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: "",
            shoowToast: false,
            borderColor: "gray",
            loading: false
        };
    }


    static navigationOptions = {
        title: "Join Group",
        drawerIcon: () => {
            return (
                <Icon name="ios-contacts" />
            )
        }
    }


    joining() {

        const key = this.state.code

        if (key !== '') {

            this.props.joinGroup(key)
            this.setState({ loading: true })
        }


        else {

            Toast.show({
                text: 'Enter Key To Join',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 1000,
            })

        }

    }

    componentWillMount() {
        this.setState({ loading: false })
    }





    componentWillReceiveProps(prop) {

        console.log(prop.isJoin, "yai receive ho raha hai")

        if (prop.isJoin) {
            this.setState({ loading: false })

            Toast.show({
                text: 'You Joined The Group Successfully',
                position: 'bottom',
                buttonText: 'Okay',
                type: "success",
                duration: 1000,
            })

            this.props.clearState()
        }

        if (prop.isJoinError) {
            this.setState({ loading: false })

            Toast.show({
                text: 'You Already Member',
                position: 'bottom',
                buttonText: 'Okay',
                type: "warning",
                duration: 1000,
            })
            this.props.clearState()
        }

        if (prop.incorrectCode) {

            this.setState({ loading: false })

            Toast.show({
                text: 'Invalid Group Key',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 1000,
            })
            this.props.clearState()
        }
    }


    handleSpinnerAndButton() {

        if (this.state.loading) {
            return <Spinner />
        }

        else {
            return <Button block onPress={this.joining.bind(this)}
                style={{ margin: 15, backgroundColor: "#5E35B1" }}>
                <Text  >Join </Text>
            </Button>
        }
    }


    render() {
        return (

            <Container >

                <Header>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.navigate('DrawerOpen') }}
                        >
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Join Group</Title>
                    </Body>
                    <Right />
                </Header>
                <Item style={{ borderBottomWidth: 4, borderBottomColor: this.state.borderColor, margin: 15, marginLeft: 15 }}>


                    <Input placeholder="Enter Key To Join"
                        onChangeText={(text) => { this.setState({ code: text }) }}
                        onFocus={() => {
                            this.setState({ borderColor: "skyblue" })
                        }}
                        onBlur={() => {
                            this.setState({ borderColor: "gray" })
                        }}
                        value={this.state.code}
                    />
                </Item>


                {this.handleSpinnerAndButton()}



            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(JoinGroup)