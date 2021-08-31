import ActionTypes from "../../ActionTypes"

export const loginReques = (body) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        body: body
    }
}

export const loginFailed = (err) => {
    return {
        type: ActionTypes.LOGIN_FAILED,
        error: err
    }
}

export const loginSuccess = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        response: response
    }
}

export const logout = () => {
    return {
        type: ActionTypes.LOGOUT,
    }
}