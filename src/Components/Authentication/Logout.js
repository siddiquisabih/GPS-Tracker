import React, { Component } from 'react';
import { Container, Header, Icon, Content, Item, Input, Button, Text, Toast } from 'native-base';
import { connect } from "react-redux"
import Midware from "../../Store/Middleware/AuthMiddleware"



function mapStateToProps(state) {
    return {
        signoutState: state.Reducer.logout
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch(Midware.signoutUser())
        }
    }

}
class Signout extends Component {


    static navigationOptions = {
        title : "Logout",
        drawerIcon: () => {
            return (
                <Icon name="ios-cog" />
            )
        }
    }


    componentWillReceiveProps(prop) {
        if (prop.signoutState) {
            prop.navigation.navigate("SplashRoute")
        }
    }
    componentWillMount() {
        this.props.logout()
    }
    render() {
        return (
            <Container>

            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signout)
