import MapAction from "../../Store/Action/MapAction"

const initialState = {
    userLocation: false,
    region: {},

    userLocationError: '',
    locationError: false,


    createCircle: false,
    createCircleError: false,


    getGroups: false,
    getGroupsData: [],

    errorGroup: false,


    getUserDetail: false,
    userDetailData: [],


    userJoinGroup: false,
    userJoinGroupError: false,

    invalidCode: false,






}



function MapReducer(state = initialState, action) {
    switch (action.type) {

        case MapAction.location:
            return Object.assign({}, state, { userLocation: true, region: action.data })

        case MapAction.locationError:
            return Object.assign({}, state, { userLocationError: action.data, locationError: true })

        case MapAction.circleCreate:
            return Object.assign({}, state, { createCircle: true, createCircleError: false })

        case MapAction.circleCreateError:
            return Object.assign({}, state, { circleCreate: false, createCircleError: true })

        case MapAction.getAllGroups:
            return Object.assign({}, state, { getGroups: true, getGroupsData: action.data })

        case MapAction.groupError:
            return Object.assign({}, state, { errorGroup: false })

        case MapAction.userDetail:
            return Object.assign({}, state, { getUserDetail: true, userDetailData: action.data })

        case MapAction.joinGroup:
            return Object.assign({}, state, { userJoinGroup: true, userJoinGroupError: false })

        case MapAction.joinGroupError:
            return Object.assign({}, state, { userJoinGroup: false, userJoinGroupError: true })


        case MapAction.clearState:
            return Object.assign({}, state, { createCircle: false, createCircleError: false, userJoinGroup: false, userJoinGroupError: false, invalidCode: false })

        case MapAction.invalidKey:
            return Object.assign({}, state, { invalidCode: true, userJoinGroup: false, userJoinGroupError: false })

        default:
            return state;
    }
}

export default MapReducer