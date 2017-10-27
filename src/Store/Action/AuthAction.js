class Action {

    static signup = "signup"
    static login = "login"
    static loginError = "loginError"
    static signupError = "signupError"
    static logout = "logout"
    static authentic = "authentic"
    static authenticError = "authenticError"



    static userAuthentic(value) {
        return {
            type: Action.authentic,
            data: value
        }
    }

    static userAuthenticError() {
        return {
            type: Action.authenticError
        }
    }


    static userSignup() {
        return {
            type: Action.signup
        }
    }

    static signupErrorAction(error) {
        return {
            type: Action.signupError,
            errorMessage: error
        }
    }




    static userLogin() {
        return {
            type: Action.login
        }
    }

    static loginErrorAction(error) {
        return {
            type: Action.loginError,
            errorMessage: error
        }

    }


    static UserLogout() {
        return {
            type: Action.logout
        }
    }




}
export default Action