import ActionTypes from "../../ActionTypes";

export interface IUserReducer {
    data?: {};
    type: string;
    isLoading: boolean;
    isGuest: boolean;
}

const initialState: IUserReducer = {
    data: {},
    type: '',
    isLoading: false,
    isGuest: false,

};
export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {
                type: action.type,
                isLoading: true,
                isGuest: false,
            }
        case ActionTypes.LOGIN_FAILED:
            return {
                ...state,
                type: action.type,
                errMessage: action.err,
                isLoading: false,
                isGuest: false,
            }
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                type: action.type,
                data: action.response,
                isLoading: false,
                isGuest: false,
            }
        case ActionTypes.LOGIN_GUEST:
            return {
                ...state,
                type: action.type,
                isGuest: true
            }
        case ActionTypes.LOGOUT:
            return {
                ...state,
                type: action.type,
                data: {},
                isGuest: false,
                isLoading: false,
            }
        default:
            return state
    }

}