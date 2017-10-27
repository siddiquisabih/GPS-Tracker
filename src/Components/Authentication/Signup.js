import React, { Component } from 'react';
import { Container, Header, Icon, Content, Item, Input, Button, Text, Toast, Left, Right, Body, Title, Spinner } from 'native-base';
import * as firebase from "firebase"
import { connect } from "react-redux"
import Midware from "../../Store/Middleware/AuthMiddleware"
import { Image } from "react-native"


function mapStateToProps(state) {
    return {
        componentState: state,
        signupState: state.Reducer.signup,
        signupError: state.Reducer.signupError,
        signupErrorMessage: state.Reducer.signupErrorMessage,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        usersignup: (data) => {
            dispatch(Midware.signupUser(data))
        }
    }
}


var a = 0;
class Signup extends Component {
    static navigationOptions = {
        title: "Signup",
        header: false

    }

    constructor() {
        super()
        this.state = {
            email: '',
            pass: '',
            number: '',
            address: '',
            name: '',
            loading: false

        }
    }
    componentWillMount() {
        console.disableYellowBox = true

    }
    componentWillReceiveProps(prop) {
        if (prop.signupState === true && a === 0) {
            prop.navigation.navigate('MapRoute')
            a = a + 1
        }

        if (prop.signupError) {
            this.setState({ loading: false })
        }
    }


    handleSpinner() {
        if (this.state.loading) {
            return <Spinner color="red" />
        }


        return <Item style={style.buttonStyle}>
            <Button
                onPress={this.signupUser.bind(this)}>
                <Text>Signup</Text>
            </Button>
        </Item>


    }



    signupUser() {
        let data = {
            email: this.state.email,
            pass: this.state.pass,
            address: this.state.address,
            number: this.state.number,
            name: this.state.name

        }
        this.setState({ loading: true })
        this.props.usersignup(data)
    }


    ErrorHandle() {
        if (this.props.signupError) {
            return <Text note style={style.errorText}>{this.props.signupErrorMessage}</Text>
        }
    }



    render() {
        return (
            <Image
                source={require("../../noImage/loginpic.jpg")}
                style={style.backgroundImage}
            >
                <Container>
                    <Header>

                        <Left>
                            <Button transparent
                                onPress={() => {
                                    this.props.navigation.navigate("loginRoute")
                                }}
                            >

                                <Icon name="arrow-back" />

                            </Button>


                        </Left>
                        <Body><Title>Signup</Title></Body>
                        <Right />
                    </Header>



                    <Container style={style.containerStyle} >
                        <Content>


                            <Item >
                                <Icon name="ios-person-outline" />
                                <Input placeholder='Name' placeholderTextColor="yellow"
                                    onChangeText={(text) => { this.setState({ name: text }) }}
                                />
                            </Item>


                            <Item >
                                <Icon name="ios-at-outline" />

                                <Input placeholder='Email' placeholderTextColor="yellow"
                                    onChangeText={(text) => { this.setState({ email: text }) }}
                                    keyboardType="email-address"

                                />
                            </Item>




                            <Item >
                                <Icon name="ios-home-outline" />

                                <Input placeholder='Address' placeholderTextColor="yellow"
                                    onChangeText={(text) => { this.setState({ address: text }) }}

                                />
                            </Item>



                            <Item >
                                <Icon name="ios-call-outline" />

                                <Input placeholder='Phone Number' placeholderTextColor="yellow"
                                    onChangeText={(text) => { this.setState({ number: text }) }}
                                    keyboardType="phone-pad"

                                />
                            </Item>









                            <Item>
                                <Icon name="ios-unlock-outline" />

                                <Input placeholder='Password' placeholderTextColor="yellow" secureTextEntry
                                    onChangeText={(text) => { this.setState({ pass: text }) }}

                                />
                            </Item>
                        </Content>
                    </Container>

                    <Container>

                        {this.handleSpinner()}

                        {this.ErrorHandle()}

                    </Container>
                </Container>

            </Image>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)

var style = {
    errorText: {
        color: "#d50000",
        textAlign: "center",

    },
    containerStyle: {
        justifyContent: 'flex-end',
    },
    buttonStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        marginTop: 30
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover"
    }


}