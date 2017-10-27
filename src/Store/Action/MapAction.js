class MapAction {


    static location = "location"
    static locationError = "locationError"

    static circleCreate = "circleCreate"
    static circleCreateError = "circleCreateError"


    static getAllGroups = "getAllGroups"
    static groupError = "groupError"


    static userDetail = "userDetail"

    static joinGroup = "joinGroup"
    static joinGroupError = "joinGroupError"




    static clearState = "clearState"
    static invalidKey = "invalidKey"



    static userCoordsForMap = "userCoordsForMap"





    static userLocation(value) {
        return {
            type: MapAction.location,
            data: value
        }
    }

    static userLocationError(value) {
        return {
            type: MapAction.locationError,
            data: value
        }
    }

    static userCreateCircle() {
        return {
            type: MapAction.circleCreate,

        }
    }

    static userCreateCircleError() {
        return {
            type: MapAction.circleCreateError
        }
    }

    static userAllGroups(value) {
        return {
            type: MapAction.getAllGroups,
            data: value
        }
    }


    static userGroupError() {
        return {
            type: MapAction.groupError,

        }
    }


    static getUserDetail(value) {
        return {

            type: MapAction.userDetail,
            data: value

        }
    }

    static UserJoinGroup() {
        return {
            type: MapAction.joinGroup,

        }
    }




    static UserJoinGroupError() {
        return {
            type: MapAction.joinGroupError,

        }
    }


    static joinGroupAndCreateCircleClearState() {
        return {
            type: MapAction.clearState,
        }
    }


    static userInvalidKey() {
        return {
            type: MapAction.invalidKey
        }
    }


    static userCoords(value) {
        return {
            type: MapAction.userCoordsForMap,
            data: value
        }
    }




}
export default MapAction