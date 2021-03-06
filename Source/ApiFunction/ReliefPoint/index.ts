import { CITY, CREATE_RELIEF_POINT, DELETE_RELIEF_POINT, GET_RELIEF_POINT, GET_RELIEF_POINT_DETAIL, RELIEF_PUBLIC, UPDATE_RELIEF_POINT, UPDATE_STATUS_RELIEF_POINT, UPLOAD_IMG_RELIEF } from "../../Constrants/api";
import { convertToQuery } from "../../Helper/FunctionCommon";
import httpServices from "../../Services/httpServices";

export const apiCreateReliefPoint = async (body) => {
    return await httpServices.post(`${CREATE_RELIEF_POINT}`, body);
};

export const apiGetReliefPoint = async (body) => {
    return await httpServices.post(`${GET_RELIEF_POINT}`, body);
};

export const apiGetReliefPointDetail = async (param) => {
    return await httpServices.get(`${GET_RELIEF_POINT_DETAIL}${convertToQuery(param)}`);
};

export const apiUpdateReliefPoint = async (body) => {
    return await httpServices.put(`${UPDATE_RELIEF_POINT}`, body);
};

export const apiUpdateStatusReliefPoint = async (params) => {
    return await httpServices.put(`${UPDATE_STATUS_RELIEF_POINT}${convertToQuery(params)}`);
};


export const apiDeleteReliefPoint = async (param) => {
    return await httpServices.delete(`${DELETE_RELIEF_POINT}${convertToQuery(param)}`);
};

export const apiGetReliefPointCommon = async (param) => {
    console.log("param", param);
    return await httpServices.get(`${RELIEF_PUBLIC}${convertToQuery(param)}`);
};

export const apiUploadImg = async (body) => {
    return await httpServices.post(`${UPLOAD_IMG_RELIEF}`, body);
};

