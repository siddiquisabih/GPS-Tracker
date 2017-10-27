import React, { Component } from 'react';
import { Container, Header, Icon, Content, Item, Input, Button, Text, Toast, Left, Right, Body, Title, Spinner } from 'native-base';
import { Image, BackHandler } from 'react-native'
import * as firebase from "firebase"
import { connect } from "react-redux"
import Midware from "../../Store/Middleware/AuthMiddleware"


function mapStateToProps(state) {
    return {
        componentState: state,
        loginState: state.Reducer.login,
        loginError: state.Reducer.loginError,
        loginErrorMessage: state.Reducer.loginErrorMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signinuser: (data) => {
            dispatch(Midware.loginUser(data))
        }
    }
}

var a = 0;
class Login extends Component {
    static navigationOptions = {
        title: "Login",
        header: false
    }
    constructor() {
        super()
        this.state = {
            email: '',
            pass: '',
            loading: false


        }
    }
    componentWillMount() {
        console.disableYellowBox = true

        BackHandler.addEventListener("backpress",
            () => {
                BackHandler.exitApp()
            }
        )
    }

    componentWillReceiveProps(prop) {
        if (prop.loginState && a === 0) {
            prop.navigation.navigate('MapRoute')
            a = a + 1
        }
        if (prop.loginError) {
            this.setState({ loading: false })
        }
    }




    loginUser() {
        let data = {
            email: this.state.email,
            pass: this.state.pass

        }
        this.setState({ loading: true })
        this.props.signinuser(data)
    }

    ErrorHandle() {
        if (this.props.loginError) {
            return <Text note style={style.errorText}>{this.props.loginErrorMessage}</Text>
        }
    }



    handleSpinner() {
        if (this.state.loading) {
            return <Spinner color  = "red" />
        }


        return <Item style={style.buttonStyle}>
            <Button
                onPress={this.loginUser.bind(this)}
            >
                <Text>Login</Text>

            </Button>
        </Item>


    }



    render() {
        return (
            <Image
                source={require("../../noImage/loginpic.jpg")}
                style={style.backgroundImage}
            >
                <Container>

                    <Header>

                        <Left />
                        <Body><Title>Login</Title></Body>
                        <Right />
                    </Header>

                    <Container style={style.containerStyle}>
                        
                        <Item >
                            <Icon name="ios-at-outline" />
                            <Input placeholder='Email' placeholderTextColor="yellow"
                                onChangeText={(text) => { this.setState({ email: text }) }}
                                keyboardType="email-address"
                            />
                        </Item>
                        <Item>
                            <Icon name="ios-unlock-outline" />
                            <Input placeholder='Password' secureTextEntry placeholderTextColor="yellow"
                                onChangeText={(text) => { this.setState({ pass: text }) }}
                            />
                        </Item >
                    </Container>

                    <Container>

                        {this.handleSpinner()}

                        {this.ErrorHandle()}

                    <Button transparent
                            onPress={() => { this.props.navigation.navigate("signupRoute") }}
                        >
                    <Text style={{ color: "#d50000" }} >No Account? Create One !</Text>
                        </Button>

                        
                    </Container>
                </Container>
            </Image>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
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