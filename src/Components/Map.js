import React, { Component } from 'react'
import { Container, Button, Text, Header, Content, List, ListItem, Left, Icon, Title, Body, Label, Right, Thumbnail, Spinner, Item, Picker } from "native-base"
import MapView from "react-native-maps"
import MapMidware from "../Store/Middleware/MapMiddleware"
import { connect } from "react-redux"
import { Image, Dimensions } from "react-native"

function mapStateToProps(state) {
    return {
        componentState: state.MapReducer,
        latitude: state.MapReducer.region.latitude,
        isLocationError: state.MapReducer.locationError,
        longitude: state.MapReducer.region.longitude,
        isUserLocation: state.MapReducer.userLocation,
        region: state.MapReducer.region,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userLocation: () => {
            dispatch(MapMidware.GetUserLocation())
        },
    }
}



class MapComponent extends Component {
    constructor() {
        super()
        this.state = {
            latitude: 24.8716,
            longitude: 67.0599,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0321,
            statusBarHeight: {
                position: 'absolute',
                top: 1,
                left: 1,
                right: 1,
                bottom: 1,
            },
            statePlaces: [],
        }
    }

    componentWillMount() {
        this.props.userLocation()
        setTimeout(() => this.setState({ statusBarHeight: styles.map }), 200);
        // setTimeout(() =>alert(this.state.longitude), 200);
        console.disableYellowBox = true

    }



    componentWillReceiveProps(prop) {

        if (prop.isLocationError) {
            alert("Turn On Your Location Or GPS And Open The Application Again")
        }

        if (prop.isUserLocation) {
            this.setState({
                longitude: prop.region.longitude,
                latitude: prop.region.latitude,
            })

        }

    }

    static navigationOptions = {
        title: "Map",
        drawerIcon: () => {
            return (
                <Icon name="md-locate" />
            )
        }
    }






    handleError() {
        if (this.state.statePlaces[0] === undefined) {
            return <Text note>No Nearby Places.. check your network connection or select Nearby distance from drawer</Text>
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
                        <Title>GPS Tracker</Title>
                    </Body>
                    <Right />
                </Header>

                <Container>
                    <MapView
                        style={this.state.statusBarHeight}
                        /* style={styles.map} */
                        initialRegion={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: this.state.latitudeDelta,
                            longitudeDelta: this.state.longitudeDelta,
                        }}
                        provider="google"
                        mapType="standard"
                        followsUserLocation
                        showsUserLocation
                        showsCompass
                        showsMyLocationButton
                        toolbarEnabled>
                        <MapView.Marker
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude
                            }}
                            title="My Location">
                        </MapView.Marker>
                    </MapView>
                </Container>
            </Container>



        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)

const styles = {
    container: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

    }

}