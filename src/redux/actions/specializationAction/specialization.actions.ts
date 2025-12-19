import { SPECIALIZATION_CREATE_REQUEST, SPECIALIZATION_CREATE_SUCCESS, SPECIALIZATION_CREATE_FAIL, SPECIALIZATION_LIST_REQUEST, SPECIALIZATION_LIST_SUCCESS, SPECIALIZATION_LIST_FAIL, SPECIALIZATION_UPDATE_REQUEST, SPECIALIZATION_UPDATE_SUCCESS, SPECIALIZATION_UPDATE_FAIL, SPECIALIZATION_DELETE_REQUEST, SPECIALIZATION_DELETE_SUCCESS, SPECIALIZATION_DELETE_FAIL, SPECIALIZATION_TOGGLE_REQUEST, SPECIALIZATION_TOGGLE_SUCCESS, SPECIALIZATION_TOGGLE_FAIL, SPECIALIZATION_DETAILS_FAIL, SPECIALIZATION_DETAILS_REQUEST, SPECIALIZATION_DETAILS_SUCCESS } from "../../constants/specializationConstants/specializationConstants";
import axiosInstance from "../axiosInstance";


/* ================= CREATE ================= */
export const createSpecialization = (data: any) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: SPECIALIZATION_CREATE_REQUEST });

      const res = await axiosInstance.post(
        "/api/admin/doctors/specializations",
        data
      );

      dispatch({
        type: SPECIALIZATION_CREATE_SUCCESS,
        payload: res.data,
      });

    } catch (error: any) {
      dispatch({
        type: SPECIALIZATION_CREATE_FAIL,
        payload: error.response?.data || error.message,
      });
      throw error;
    }
  };
};

/* ================= GET ALL ================= */
export const getAllSpecializations = () => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: SPECIALIZATION_LIST_REQUEST });

      const res = await axiosInstance.get(
        "/api/admin/doctors/specializations/get-all"
      );

      dispatch({
        type: SPECIALIZATION_LIST_SUCCESS,
        payload: res.data.data,
      });

    } catch (error: any) {
      dispatch({
        type: SPECIALIZATION_LIST_FAIL,
        payload: error.response?.data || error.message,
      });
    }
  };
};

/* ================= UPDATE ================= */
export const updateSpecialization = (id: string, data: any) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: SPECIALIZATION_UPDATE_REQUEST });

      const res = await axiosInstance.put(
        `/api/admin/doctors/specializations/${id}`,
        data
      );

      dispatch({
        type: SPECIALIZATION_UPDATE_SUCCESS,
        payload: res.data,
      });

    } catch (error: any) {
      dispatch({
        type: SPECIALIZATION_UPDATE_FAIL,
        payload: error.response?.data || error.message,
      });
      throw error;
    }
  };
};

/* ================= DELETE ================= */
export const deleteSpecialization = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: SPECIALIZATION_DELETE_REQUEST });

      await axiosInstance.delete(
        `/api/admin/doctors/specializations/${id}`
      );

      dispatch({
        type: SPECIALIZATION_DELETE_SUCCESS,
        payload: id,
      });

    } catch (error: any) {
      dispatch({
        type: SPECIALIZATION_DELETE_FAIL,
        payload: error.response?.data || error.message,
      });
      throw error;
    }
  };
};

/* ================= TOGGLE ACTIVE ================= */
export const toggleSpecializationStatus = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: SPECIALIZATION_TOGGLE_REQUEST });

      const res = await axiosInstance.patch(
        `/api/admin/doctors/specializations/${id}/toggle`
      );

      dispatch({
        type: SPECIALIZATION_TOGGLE_SUCCESS,
        payload: res.data.data,
      });

    } catch (error: any) {
      dispatch({
        type: SPECIALIZATION_TOGGLE_FAIL,
        payload: error.response?.data || error.message,
      });
      throw error;
    }
  };
};


export const getSpecializationById = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: SPECIALIZATION_DETAILS_REQUEST });

      const res = await axiosInstance.get(
        `/api/admin/doctors/specializations/get-id/${id}`
      );

      dispatch({
        type: SPECIALIZATION_DETAILS_SUCCESS,
        payload: res.data.data,
      });

    } catch (error: any) {
      dispatch({
        type: SPECIALIZATION_DETAILS_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

