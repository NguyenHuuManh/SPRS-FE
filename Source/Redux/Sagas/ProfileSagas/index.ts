import { call, put } from 'redux-saga/effects';
import { apiGetProfile } from "../../../ApiFunction/Auth";
import { STATUS } from '../../../Constrants/url';
import httpServices from '../../../Services/httpServices';
import { profileActions, userActions } from '../../Actions';
export function* getProfile() {

    try {
        const response = yield call(apiGetProfile);
        console.log("responseProfile", response)
        if (STATUS.success.includes(response?.status)) {
            if (response?.data?.code + "" == "200") {
                yield put(profileActions.profileSuccess(response?.data.obj));
            } else {
                yield put(profileActions.profileSuccess(response?.error));
            }
        } else {
            yield put(profileActions.profileFailed(response?.data));

        }
    } catch (error) {
        yield put(profileActions.profileFailed(error));
    }
}