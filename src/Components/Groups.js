//import liraries
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Content, Container, Text, Button, Spinner, Header, Left, Body, Right, Icon, Title, List, ListItem, Card, CardItem } from "native-base"

import MapMidware from "../Store/Middleware/MapMiddleware"
import { connect } from "react-redux"

function mapStateToProps(state) {
    return {
        groupData: state.MapReducer.getGroupsData,
        getGroups: state.MapReducer.getGroups,
        error: state.MapReducer.errorGroup,


    }
}

function mapDispatchToProps(dispatch) {
    return {
        groups: () => {
            dispatch(MapMidware.getGroups())
        }
    }
}



// create a component
class Groups extends Component {


    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            loading: false,

        };
    }



    static navigationOptions = {
        title: "Groups",
        drawerIcon: () => {
            return (
                <Icon name="ios-people" />
            )
        }
    }



    componentWillMount() {
        this.props.groups()
        // setTimeout(()=>{console.log(this.state.groups)},2000)
        this.setState({ loading: true })

    }


    componentWillReceiveProps(prop) {
        // if(!prop.getGroups ){
        //     this.setState({loading : true})
        // }

        if (prop.error) {
            this.setState({ loading: false })
        }


        if (prop.groupData[0] !== undefined) {
            this.setState({ loading: false })

            this.state.groups = prop.groupData
            // console.log(this.state.groups)
        }


    }




    renderGroups() {
        if (this.state.loading) {
            return <Spinner color="red" />
        }

        return (
            <Content>

                {
                    this.state.groups.map((obj, ind) => {
                        return (

                            <Card key={ind}
                            >
                                <CardItem style={{ backgroundColor: "#2E7D32" }}
                                >
                                    <Left>
                                        <Text style={{ color: "white" }}>
                                            {obj.circleName}
                                        </Text>
                                        {/* <Text note style={{ color: "white"  , justifyContent: "flex-start" , alignItems : "flex-end"}}>
                                            Code : {obj.JoiningCode}
                                        </Text> */}
                                    </Left>

                                    <Right>
                                        <Button transparent onPress={() => { this.props.navigation.navigate("ViewDetailRoute", { joinKey: obj.JoiningCode, userDetail: obj }) }}>
                                            <Text style={{ color: "orange" }}>View</Text></Button>
                                    </Right>
                                </CardItem>
                            </Card>




                        )
                    })
                }







            </Content>


        )


    }



    render() {

        console.log(this.state.loading, "groups")

        return (


            <Container>

                <Header>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.navigate('DrawerOpen') }}
                        >
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Groups</Title>
                    </Body>
                    <Right />
                </Header>

                <Container>
                    {this.renderGroups()}

                </Container>




            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Groups)