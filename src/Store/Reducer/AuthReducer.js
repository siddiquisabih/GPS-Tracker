import Action from "../Action/AuthAction"


const initialState = {
    signup: false,
    login: false,
    loginError: false,
    loginErrorMessage: '',
    signupError: false,
    signupErrorMessage: '',
    logout: false,
    userUid: "",
    userAuthentic: false,
    userAuthError: false,
}


function Reducer(state = initialState, action) {
    switch (action.type) {
        case Action.signup:
            return Object.assign({}, state, { signup: true })

        case Action.signupError:
            return Object.assign({}, state, { signupError: true, signupErrorMessage: action.errorMessage })



        case Action.login:
            return Object.assign({}, state, { login: true })


        case Action.loginError:
            return Object.assign({}, state, { loginError: true, loginErrorMessage: action.errorMessage })


        case Action.logout:
            return Object.assign({}, state, {
                signup: false, login: false, loginError: false, loginErrorMessage: '', signupError: false,
                signupErrorMessage: '', logout: true, userUid: '', userAuthentic: false, userAuthError: false,
            })


        case Action.authentic:
            return Object.assign({}, state, { userUid: action.data, userAuthentic: true })

        case Action.authenticError:
            return Object.assign({}, state, { userAuthError: true })




        default:
            return state;
    }
};

export default Reducer