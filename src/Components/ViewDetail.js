import React, { Component } from 'react'
import { Content, Container, Text, Button, Spinner, Header, Left, Body, Right, Icon, Title, List, ListItem, Card, CardItem } from "native-base"
import { Share } from "react-native"

import MapMidware from "../Store/Middleware/MapMiddleware"
import { connect } from "react-redux"


function mapStateToProps(state) {
    return {
        userDetail: state.MapReducer.getUserDetails,
        dataUserDetail: state.MapReducer.userDetailData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserDetails: (detail) => {
            dispatch(MapMidware.userDetail(detail))
        },

        userCoords: (userDataForLocation) => {
            dispatch(MapMidware.getUserCoords(userDataForLocation))
        }


    }
}


class ViewDetail extends Component {

    static navigationOptions = {
        header: false
    }

    constructor(props) {
        super(props);
        this.state = {
            joinCode: '',
            userDetail: [],
            newData: [],
            loading: false,
        };
    }

    componentWillMount() {

        this.setState({
            joinCode: this.props.navigation.state.params.joinKey,
            userDetail: this.props.navigation.state.params.userDetail,
            loading: true
        })


        setTimeout(() => {
            this.props.getUserDetails(this.state.userDetail)
        }, 300)
        setTimeout(() => {
            console.log(this.state.newData, "checking")
        }, 1000)
    }




    componentWillReceiveProps(prop) {

        if (prop.userDetail) {
            this.setState({ loading: false })
        }

        if (prop.dataUserDetail[0] !== undefined) {
            console.log(prop.dataUserDetail)
            this.setState({ newData: prop.dataUserDetail, loading: false })

            // this.state.newData = prop.dataUserDetail

        }

    }



    renderDetail() {

        if (this.state.loading) {
            return <Spinner />
        }


        return (
            <Content>
                {
                    this.state.newData.map((obj, ind) => {
                        console.log(obj, "ooooo")
                        return (
                            <Card key={ind}
                            >
                                {console.log(obj.name)}
                                <CardItem style={{ backgroundColor: "#2E7D32" }}
                                >
                                    <Left>
                                        <Text style={{ color: "white" }}>
                                            {obj.name}
                                        </Text>
                                    </Left>

                                    <Body />

                                    <Right>
                                        <Button transparent>
                                            <Text note style={{ color: "white" }}>Details</Text>

                                        </Button>
                                    </Right>
                                </CardItem>
                            </Card>
                        )
                    })
                }
            </Content>
        )
    }



    inviteMore = () => {
        Share.share({
            message: "Hi there!! use this code to join our group.." + " " + this.state.joinCode
        })
            .then(() => {
                console.log("friend invited")
            })
    }



    userLocationCoords = () => {

        let data = this.state.newData

        this.props.userCoords(data)
        this.props.navigation.navigate("ViewMemberMapRoute")
    }


    render() {

        return (
            <Container>
                <Header>

                    <Left>

                        <Button transparent onPress={() => { this.props.navigation.navigate("GroupsRoute") }}>

                            <Icon name="arrow-back" />

                        </Button>


                    </Left>
                    <Body>
                        <Title>Information</Title>
                    </Body>
                    <Right />
                </Header>

                <Container>
                    {
                        this.renderDetail()
                    }

                </Container>




                <Button onPress={this.userLocationCoords} style={{ margin: 20 }} transparent>

                    <Text> View  </Text>

                </Button>


                <Button onPress={this.inviteMore} transparent>
                    <Text> Invite More  </Text>
                </Button>


            </Container>


        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDetail)
