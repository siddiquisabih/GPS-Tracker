import React, { Component } from 'react'
import { Image } from 'react-native'
import { Container, Spinner, Text } from "native-base"
import { connect } from "react-redux"
import Midware from "../Store/Middleware/AuthMiddleware"



function mapStateToProps(state) {
    return {
        authError: state.Reducer.userAuthError,
        userAuthentic: state.Reducer.userAuthentic
    }
}


function mapDispatchToProps(dispatch) {
    return {
        checkAuth: () => {
            dispatch(Midware.checkingForAuthentication())
        }
    }
}




class Splash extends Component {

    static navigationOptions = {
        header: false
    }
    constructor() {
        super()
        this.state = {
            error: false,
            validUser: false,
        }
    }


    componentWillReceiveProps(prop) {
        if (prop.authError) {
            this.setState({ error: true })
        }

        if (prop.userAuthentic) {
            this.setState({ validUser: true })
        }
    }



    componentWillMount() {
        // if (this.props.userAuthentic) {
        //     this.props.navigation.navigate("DrawerRoute")
        // }

        this.props.checkAuth()

        setTimeout(() => { this.navigateUser() }, 1000)

        console.disableYellowBox = true
    }



    navigateUser() {
        if (this.state.error) {
            this.props.navigation.navigate("loginRoute")
        }

        if (this.state.validUser) {
            this.props.navigation.navigate("Drawer")
        }
    }



    render() {
        return (
            <Image
                source={require("../noImage/back.jpg")}
                style={styles.imageBackground}
            >
                <Container style={styles.spinner} >
                    <Spinner
                        color="red"
                    />

                </Container>
            </Image>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash)

const styles = {
    imageBackground: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover"
    },
    spinner: {
        justifyContent: "center"
    }
}