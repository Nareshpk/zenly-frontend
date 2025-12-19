import { DOCTOR_CREATE_REQUEST, DOCTOR_CREATE_SUCCESS, DOCTOR_CREATE_FAIL, DOCTOR_DETAILS_FAIL, DOCTOR_DETAILS_REQUEST, DOCTOR_DETAILS_SUCCESS, DOCTOR_LIST_FAIL, DOCTOR_LIST_REQUEST, DOCTOR_LIST_SUCCESS, DOCTOR_STATUS_FAIL, DOCTOR_STATUS_REQUEST, DOCTOR_STATUS_SUCCESS, DOCTOR_UPDATE_FAIL, DOCTOR_UPDATE_REQUEST, DOCTOR_UPDATE_SUCCESS } from "../../constants/doctorConstants/doctor.types";
import axiosInstance from "../axiosInstance";

export const createDoctor = (formData: FormData) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: DOCTOR_CREATE_REQUEST });

            const res = await axiosInstance.post(
                "/api/admin/doctors",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return dispatch({
                type: DOCTOR_CREATE_SUCCESS,
                payload: res.data,
            });

        } catch (error: any) {
            dispatch({
                type: DOCTOR_CREATE_FAIL,
                payload: error.response?.data || error.message,
            });
            throw error;
        }
    };
};

export const getAllDoctors = (
  page = 1,
  limit = 10,
  search = "",
  status = "all"
) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: DOCTOR_LIST_REQUEST });

      const res = await axiosInstance.get(
        `/api/admin/doctors?page=${page}&limit=${limit}&search=${search}&status=${status}`
      );

      dispatch({
        type: DOCTOR_LIST_SUCCESS,
        payload: res.data.data,
      });

      return res.data;
    } catch (error: any) {
      dispatch({
        type: DOCTOR_LIST_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      throw error;
    }
  };
};


export const getDoctorById = (id: string) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: DOCTOR_DETAILS_REQUEST });

            const res = await axiosInstance.get(`/api/admin/doctors/${id}`);

            dispatch({
                type: DOCTOR_DETAILS_SUCCESS,
                payload: res.data.data,
            });
        } catch (error: any) {
            dispatch({
                type: DOCTOR_DETAILS_FAIL,
                payload: error.response?.data || error.message,
            });
        }
    };
};


export const updateDoctor = (id: string, formData: FormData) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: DOCTOR_UPDATE_REQUEST });

            const res = await axiosInstance.put(
                `/api/admin/doctors/${id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            dispatch({
                type: DOCTOR_UPDATE_SUCCESS,
                payload: res.data.data,
            });
        } catch (error: any) {
            dispatch({
                type: DOCTOR_UPDATE_FAIL,
                payload: error.response?.data || error.message,
            });
        }
    };
};


export const updateDoctorStatus = (id: string, isActive: boolean) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: DOCTOR_STATUS_REQUEST });

            const res = await axiosInstance.patch(
                `/api/admin/doctors/${id}/status`,
                { isActive }
            );

            dispatch({
                type: DOCTOR_STATUS_SUCCESS,
                payload: res.data.data,
            });
        } catch (error: any) {
            dispatch({
                type: DOCTOR_STATUS_FAIL,
                payload: error.response?.data || error.message,
            });
        }
    };
};

