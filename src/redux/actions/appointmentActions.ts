import axiosInstance from "./axiosInstance";

export const APPOINTMENT_CREATE_REQUEST = "APPOINTMENT_CREATE_REQUEST";
export const APPOINTMENT_CREATE_SUCCESS = "APPOINTMENT_CREATE_SUCCESS";
export const APPOINTMENT_CREATE_FAIL = "APPOINTMENT_CREATE_FAIL";

export const APPOINTMENT_LIST_REQUEST = "APPOINTMENT_LIST_REQUEST";
export const APPOINTMENT_LIST_SUCCESS = "APPOINTMENT_LIST_SUCCESS";
export const APPOINTMENT_LIST_FAIL = "APPOINTMENT_LIST_FAIL";

export const APPOINTMENT_UPDATE_REQUEST = "APPOINTMENT_UPDATE_REQUEST";
export const APPOINTMENT_UPDATE_SUCCESS = "APPOINTMENT_UPDATE_SUCCESS";
export const APPOINTMENT_UPDATE_FAIL = "APPOINTMENT_UPDATE_FAIL";

export const APPOINTMENT_DELETE_REQUEST = "APPOINTMENT_DELETE_REQUEST";
export const APPOINTMENT_DELETE_SUCCESS = "APPOINTMENT_DELETE_SUCCESS";
export const APPOINTMENT_DELETE_FAIL = "APPOINTMENT_DELETE_FAIL";

export const APPOINTMENT_STATUS_REQUEST = "APPOINTMENT_STATUS_REQUEST";
export const APPOINTMENT_STATUS_SUCCESS = "APPOINTMENT_STATUS_SUCCESS";
export const APPOINTMENT_STATUS_FAIL = "APPOINTMENT_STATUS_FAIL";
export const APPOINTMENT_LIST_RESET = "APPOINTMENT_LIST_RESET";




export const createAppointment = (appointmentData: any) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: APPOINTMENT_CREATE_REQUEST });

            const res = await axiosInstance.post(
                "/api/appointments/create",
                appointmentData
            );

            return dispatch({
                type: APPOINTMENT_CREATE_SUCCESS,
                payload: res.data,
            });

        } catch (error: any) {
            dispatch({
                type: APPOINTMENT_CREATE_FAIL,
                payload: error.response?.data || error.message,
            });
            throw error;
        }
    };
};

export const getAppointmentsByDoctor = (doctorId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: APPOINTMENT_LIST_REQUEST });

      const res = await axiosInstance.get(
        `/api/appointments/get/doctor/${doctorId}`
      );

     return dispatch({
        type: APPOINTMENT_LIST_SUCCESS,
        payload: res.data,
      });
    } catch (error: any) {
      dispatch({
        type: APPOINTMENT_LIST_FAIL,
        payload: error.response?.data || error.message,
      });
      throw error;
    }
  };
};

export const getAppointmentsByPatient = (patientId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: APPOINTMENT_LIST_REQUEST });

      const res = await axiosInstance.get(
        `/api/appointments/get/patient/${patientId}`
      );

     return dispatch({
        type: APPOINTMENT_LIST_SUCCESS,
        payload: res.data,
      });
    } catch (error: any) {
      dispatch({
        type: APPOINTMENT_LIST_FAIL,
        payload: error.response?.data || error.message,
      });
      throw error;
    }
  };
};




export const updateAppointment = (id: string, data: any) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: APPOINTMENT_UPDATE_REQUEST });

            const res = await axiosInstance.put(
                `/api/appointments/update/${id}`,
                data
            );

            dispatch({
                type: APPOINTMENT_UPDATE_SUCCESS,
                payload: res.data,
            });

            return res.data;
        } catch (error: any) {
            dispatch({
                type: APPOINTMENT_UPDATE_FAIL,
                payload: error.response?.data || error.message,
            });
            throw error;
        }
    };
};

export const deleteAppointment = (id: string) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: APPOINTMENT_DELETE_REQUEST });

            const res = await axiosInstance.delete(
                `/api/appointments/delete/${id}`
            );

            dispatch({
                type: APPOINTMENT_DELETE_SUCCESS,
                payload: id,
            });

            return res.data;
        } catch (error: any) {
            dispatch({
                type: APPOINTMENT_DELETE_FAIL,
                payload: error.response?.data || error.message,
            });
            throw error;
        }
    };
};


export const updateAppointmentStatus = (
  appointmentId: string,
  status: "Confirmed" | "Cancelled" | "In Progress" | "Completed"
) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: APPOINTMENT_STATUS_REQUEST });

      const res = await axiosInstance.put(
        `/api/appointments/updateStatus/${appointmentId}/status`,
        { status }
      );

      dispatch({
        type: APPOINTMENT_STATUS_SUCCESS,
        payload: res.data.appointment,
      });

      return res.data.appointment;
    } catch (error: any) {
      dispatch({
        type: APPOINTMENT_STATUS_FAIL,
        payload: error.response?.data || error.message,
      });
      throw error;
    }
  };
};

export const startAppointment = (appointmentId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: APPOINTMENT_STATUS_REQUEST });

      const res = await axiosInstance.put(
        `/api/appointments/updatestart/${appointmentId}/start`
      );

      dispatch({
        type: APPOINTMENT_STATUS_SUCCESS,
        payload: res.data.appointment,
      });

      return res.data.appointment;
    } catch (error: any) {
      dispatch({
        type: APPOINTMENT_STATUS_FAIL,
        payload: error.response?.data || error.message,
      });
      throw error;
    }
  };
};


export const endAppointment = (appointmentId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: APPOINTMENT_STATUS_REQUEST });

      const res = await axiosInstance.put(
        `/api/appointments/updateend/${appointmentId}/end`
      );

      dispatch({
        type: APPOINTMENT_STATUS_SUCCESS,
        payload: res.data.appointment,
      });

      return res.data.appointment;
    } catch (error: any) {
      dispatch({
        type: APPOINTMENT_STATUS_FAIL,
        payload: error.response?.data || error.message,
      });
      throw error;
    }
  };
};

