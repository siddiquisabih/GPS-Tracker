import MapAction from "../../Store/Action/MapAction"
import * as firebase from "firebase"
import { AsyncStorage } from "react-native"

const region = {
    latitude: 24.8716,
    longitude: 67.0599,
    latitudeDelta: 0.4922,
    longitudeDelta: 0.3421,
}


// const api = "AIzaSyA3GwmUUONmop27PSuXTOFpsEvJADBYx-8"

const uid = ''
class MapMidware {

    static GetUserLocation() {
        return (dispatch) => {
            //get user Location
            navigator.geolocation.getCurrentPosition((pos) => {
                const longLat = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                }
                //if suceess then get user id and add user current location to database
                const crd = pos.coords
                //get user  refernce from phone 
                AsyncStorage.getItem("auth")
                    .then((responce) => {
                        uid = responce
                        console.log("uid ", uid)
                        //store longitude and latitude to user data base
                        const db = firebase.database().ref(`Users/${uid}/userData`).child("Location")
                        // const locationUser = {
                        //     longLat
                        // }
                        //push data to firebase
                        db.set(longLat)
                    })
                //dispatch coords
                dispatch(MapAction.userLocation(pos.coords))
            },
                //if user location failed
                (err) => {
                    //dispatch an error message
                    dispatch(MapAction.userLocationError(err.message))
                }),
                () => {
                    var options = {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    };
                }
        }
    }




    static createCircle(name) {
        return (dispatch) => {

            const dbkey = firebase.database().ref("Groups").push().key
            const groupCode = dbkey.slice(1, 7)

            const newgroup = {
                adminId: uid,
                circleName: name,
                JoiningCode: groupCode,
                groupKey: dbkey,
                members: [uid]
            }

            const databas = firebase.database().ref(`Groups/${dbkey}`)
                .set(newgroup)
                .then(() => {
                    dispatch(MapAction.userCreateCircle())
                })
                .catch(() => {
                    dispatch(MapAction.userCreateCircleError())
                })
        }
    }



    static getGroups() {

        return (dispatch) => {

            let membersDetail = []
            //get current user uid from phone
            AsyncStorage.getItem("auth")
                .then((responce) => {
                    uid = responce
                })

            const arrdata = []

            //groups path where all groups are placed 
            const datab = firebase.database().ref("Groups")

            //get all groups from firebase 
            datab.once("value", (object) => {
                let key = object.val()
                for (var a in key) {
                    arrdata.push(key[a]);
                }

            }).then(() => {

                console.log(uid)

                //filter groups and return only those groups in which user is alredy a member 
                const abc = arrdata.filter((m) => {
                    if (m.hasOwnProperty("members")) {
                        for (a = 0; a < m.members.length; a++) {
                            if (m.members[a] === uid) {
                                return m
                            }
                        }
                    }
                })


                //if founded then dispatch groups 
                dispatch(MapAction.userAllGroups(abc))
            })


            dispatch(MapAction.userGroupError())
        }
    }





    static groupJoin(code) {
        return (dispatch) => {

            //all groups 
            const arrydata = []

            //specific group
            const dataFilter = []
            var newData = []


            var groupKey = ''

            //joining id
            const codekey = ''
            const datab = firebase.database().ref("Groups")

            datab.once("value", (object) => {

                let key = object.val()
                for (var a in key) {
                    arrydata.push(key[a])
                }
                arrydata.map((obj) => {
                    codeKey = obj.JoiningCode

                    //comparing groups keys
                    if (codeKey === code) {

                        groupKey = obj.groupKey

                        newData = obj.members

                    }
                })
                console.log(codeKey)

            })
                .then(() => {
                    //if key is correct 
                    console.log(newData, groupKey, "yaoooo")
                    AsyncStorage.getItem("auth")
                        .then((responce) => {
                            uid = responce
                            // console.log(groupKey, "aaskljdhaksjdh")

                        })

                    //if incorrect key
                    if (newData[0] === undefined) {
                        dispatch(MapAction.userInvalidKey())
                    }


                    //includes checking if there is uid available or not on that specific group
                    if (newData[0] !== undefined && newData.includes(uid)) {
                        //dispatch action for faliure
                        dispatch(MapAction.UserJoinGroupError())
                        console.log("property hai")
                    }

                    //check user is not present in group and user code match with group code then add user in group 
                    //otherwise reject 
                    console.log(code, " ", codekey)
                    if (!newData.includes(uid) && newData[0] !== undefined) {
                        //dispatch action for success
                        console.log("property nai hai")
                        newData.push(uid)
                        const dataPush = firebase.database().ref(`Groups/${groupKey}/members`)
                        dataPush.set(newData)
                        dispatch(MapAction.UserJoinGroup())
                    }







                })
        }
    }


    static userDetail(detail) {
        let array = []

        return (dispatch) => {

            // console.log(detail.members, "ponka")
            Promise.all(detail.members.map(data => firebase.database().ref(`Users/${data}`).once("value")))
                .then((snap) => {
                    snap.map((obj) => {
                        array.push(obj.val())
                    })
                    //dispatch all users
                    dispatch(MapAction.getUserDetail(array))
                })
        }
    }

    static userClearState() {
        return (dispatch) => {

            dispatch(MapAction.joinGroupAndCreateCircleClearState())
        }
    }



}
export default MapMidware










// .then(() => {
//     //if key is correct 
//     console.log(newData, groupKey, "yaoooo")

//     if (groupKey !== '' && newData[0] !== undefined) {

//         //yahan check krna hai k ager member hai to reject warna accept

//         // newData.map(()=>{})

//         AsyncStorage.getItem("auth")
//             .then((responce) => {
//                 uid = responce
//                 newData.push(uid)
//                 console.log(groupKey, "aaskljdhaksjdh")

//                 const dataPush = firebase.database().ref(`Groups/${groupKey}/members`)
//                 dataPush.set(newData)

//             })


//     }

//     else {
//         console.log("sabih siddiuqi error hai")


//     }

// })