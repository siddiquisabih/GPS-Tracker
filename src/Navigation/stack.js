import { StackNavigator } from "react-navigation"
import MapComponent from "../Components/Map"
import Drawer from "../Navigation/Drawer"

import Splash from "../Components/splash"
import Login from "../../src/Components/Authentication/Login"
import Signup from "../../src/Components/Authentication/Signup"
import ViewDetail from "../../src/Components/ViewDetail"

import ViewMemberMap from "../../src/Components/ViewMember"
import UserDetails from "../../src/Components/userDetail"


const MainRoute = StackNavigator({
    SplashRoute: {
        screen: Splash
    },

    loginRoute: {
        screen: Login
    },

    signupRoute: {
        screen: Signup
    },

    Drawer: {
        screen: Drawer,
        navigationOptions: props => ({
            header: false,
        })
    },

    ViewDetailRoute: {
        screen: ViewDetail
    },

    ViewMemberMapRoute: {
        screen: ViewMemberMap
    },

    UserDetailsRoute: {
        screen: UserDetails
    },



})

export default MainRoute