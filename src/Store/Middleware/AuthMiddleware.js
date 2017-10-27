import Action from "../Action/AuthAction"
import * as firebase from "firebase"
import { AsyncStorage } from "react-native"

var uid = ''

class Midware {

    static signupUser(data) {
        return (dispatch) => {
            let email = data.email
            let pass = data.pass
            const userData = {
                number: data.number,
                address: data.address,
                name: data.name,
                email: data.email
            }
            let auth = firebase.auth()
            auth.createUserWithEmailAndPassword(email, pass)
                .then((responce) => {
                    uid = responce.uid
                    AsyncStorage.setItem("auth", uid)
                        .then(() => {
                            dispatch(Action.userSignup())
                        })


                    const databas = firebase.database().ref(`Users/${uid}`)

                    const userDetails = {
                        userData
                    }

                    databas.set(userDetails)
                })

                .catch((err) => {
                    dispatch(Action.signupErrorAction(err.message))
                    alert(err)
                })
        }
    }



    static loginUser(data) {
        return (dispatch) => {
            let email = data.email
            let pass = data.pass

            let auth = firebase.auth()
            auth.signInWithEmailAndPassword(email, pass)
                .then((data) => {
                    uid = data.uid

                    AsyncStorage.setItem("auth", uid)
                        .then(() => {
                            dispatch(Action.userLogin())
                        })
                })
                .catch((err) => {
                    dispatch(Action.loginErrorAction(err.message))
                })
        }
    }



    static signoutUser() {
        return (dispatch) => {
            const logout = firebase.auth()
            logout.signOut().then(() => {
                AsyncStorage.removeItem("auth")
                    .then(() => {
                        uid = ''
                        dispatch(Action.UserLogout())
                    })
            })
        }
    }





    static checkingForAuthentication() {
        return (dispatch) => {
            AsyncStorage.getItem("auth")
                .then((responce) => {
                    if (responce) {
                        uid = responce
                        dispatch(Action.userAuthentic(responce))
                    }
                    else {
                        dispatch(Action.userAuthenticError())
                    }
                })
        }
    }









}
export default Midware