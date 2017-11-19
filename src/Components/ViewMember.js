//import liraries
import React, { Component } from 'react';
import { Container, Button, Text, Header, Content, List, ListItem, Left, Icon, Title, Body, Label, Right, Thumbnail, Spinner, Item, Picker } from "native-base"
import MapView from "react-native-maps"
import MapMidware from "../Store/Middleware/MapMiddleware"
import { connect } from "react-redux"

function mapStateToProps(state) {
    return {
        locationData: state.MapReducer.userCoordsData,
        isLocation: state.MapReducer.userCoords,
    }
}



// create a component
class ViewMemberMap extends Component {


    static navigationOptions = {
        header: false
    }

    constructor(props) {
        super(props);
        this.state = {
            latitude: 24.8716,
            longitude: 67.0599,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0321,
        };
    }

    render() {
        return (
            <Container>

                {console.log(this.props)}


                <MapView
                    style={styles.map}
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

                    {
                        (this.props.isLocation) ?
                            this.props.locationData.map((loc, ind) => {
                                return (
                                    <MapView.Marker
                                        key={ind}
                                        coordinate={{
                                            latitude: loc.location.latitude,
                                            longitude: loc.location.longitude
                                        }}
                                        title={loc.name}
                                        description={loc.number}>
                                    </MapView.Marker>
                                )
                            })

                            : null

                    }


                </MapView>


                {/* <Button onPress={this.click}  ><Text>Click</Text></Button> */}




            </Container>




        );
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
};

//make this component available to the app
export default connect(mapStateToProps, null)(ViewMemberMap)














