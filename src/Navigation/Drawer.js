import { DrawerNavigator } from "react-navigation"
import MapComponent from "../Components/Map"
import Signout from "../Components/Authentication/Logout"
import CreateCircle from "../Components/createCircle"
import Groups from "../Components/Groups"
import JoinGroup from "../Components/joinGroup"


const Drawer = DrawerNavigator({

    MapRoute: {
        screen: MapComponent
    },

    GroupsRoute: {
        screen: Groups
    },

    CreateCircleRoute: {
        screen: CreateCircle
    },

    JoinGroupsRoute: {
        screen: JoinGroup
    },

    SignoutRoute: {
        screen: Signout
    },

})



export default Drawer