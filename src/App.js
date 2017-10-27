import React, { Component } from 'react'
import * as firebase from "firebase"
import Store from "../src/Store/index"
import { Provider } from "react-redux"
import MainRoute from "../src/Navigation/stack"
import { Root } from "native-base"


// Initialize Firebase

//  database
// var config = {
//     apiKey: "AIzaSyAkIU1G8oxGVqyqyYDgQell4M1pS9ArCjg",
//     authDomain: "simple-calculator-9d3e5.firebaseapp.com",
//     databaseURL: "https://simple-calculator-9d3e5.firebaseio.com",
//     projectId: "simple-calculator-9d3e5",
//     storageBucket: "simple-calculator-9d3e5.appspot.com",
//     messagingSenderId: "575649196718"
//   };
// firebase.initializeApp(config);



// Initialize Firebase
var config = {
    apiKey: "AIzaSyAEO55e_CLIj9gtOIi9yra2Cif859GNlIw",
    authDomain: "tracking-application-f7233.firebaseapp.com",
    databaseURL: "https://tracking-application-f7233.firebaseio.com",
    projectId: "tracking-application-f7233",
    storageBucket: "tracking-application-f7233.appspot.com",
    messagingSenderId: "95533925804"
};
firebase.initializeApp(config);


class App extends Component {
    render() {
        return (
            <Provider store={Store} >

                <Root>
                    <MainRoute />
                </Root>

            </Provider>
        )
    }
}
export default App