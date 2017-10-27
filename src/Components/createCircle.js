import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Button, Spinner, Text, Header, Input, Left, Icon, Title, Body, Label, Right, Thumbnail, Item, Toast } from "native-base"
import MapMidware from "../Store/Middleware/MapMiddleware"
import { connect } from "react-redux"


function mapStateToProps(state) {
    return {
        circleState: state.MapReducer.createCircle,
        CircleError: state.MapReducer.createCircleError,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        circle: (name) => {
            dispatch(MapMidware.createCircle(name))
        },


        clearState: () => {

            dispatch(MapMidware.userClearState())
        }



    }
}


class CreateCircle extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            showToast: false,
            borderColor: "gray",
            loading: false,
        }
    }


    //navigation options
    static navigationOptions = {
        title: "Create Circle",
        drawerIcon: () => {
            return (
                <Icon name="md-add-circle" />
            )
        }
    }


    componentWillReceiveProps(prop) {

        if (prop.circleState) {

            Toast.show({
                text: 'Circle Added!!',
                position: 'bottom',
                buttonText: 'Okay',
                type: "success",
                duration: 1000,

            })
            this.setState({
                name: '',
                loading: false
            })

            this.props.clearState()


        }
    }


    componentWillMount() {
        this.setState({ loading: false })
    }



    create() {
        const name = this.state.name
        if (name !== "") {

            this.props.circle(name)
            this.setState({
                loading: true,
            })
        }

        else {

            Toast.show({
                text: 'Enter Circle Name',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 1000,
            })

            this.setState({
                loading: false,
            })
        }

    }


    handleSpinner() {

        if (this.state.loading) {

            return <Spinner />

        }
        else {

            return <Button block onPress={this.create.bind(this)} style={{ margin: 15, backgroundColor: "#5E35B1" }}>
                <Text>Create Circle</Text>
            </Button>

        }


    }



    render() {
        return (
            <Container>

                <Header>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.navigate('DrawerOpen') }}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Create Circle</Title>
                    </Body>
                    <Right />
                </Header>


                <Item style={{ borderBottomColor: this.state.borderColor, margin: 15, marginLeft: 15, borderBottomWidth: 4 }}>

                    <Input placeholder="Enter Circle Name"
                        onChangeText={(text) => { this.setState({ name: text }) }}
                        value={this.state.name}

                        onFocus={() => {
                            this.setState({ borderColor: "skyblue" })
                        }}
                        onBlur={() => {
                            this.setState({ borderColor: "gray" })
                        }}

                    />
                </Item>


                {/* <Button block onPress={this.create.bind(this)} style={{ margin: 15, backgroundColor: "#5E35B1" }}>

                    <Text>Create Circle</Text>
                </Button> */}
                {this.handleSpinner()}

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCircle)