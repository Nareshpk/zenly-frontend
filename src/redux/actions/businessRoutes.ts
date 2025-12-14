import axiosInstance from "./axiosInstance";

// actions/doctorActions.ts (frontend)
export const saveBusinessHours = (doctorId: string, hours: any) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "BUSINESS_HOURS_SAVE_REQUEST" });

      // Use POST to /api/doctors/:doctorId/business-hours
      const res = await axiosInstance.post(`/api/business/${doctorId}/business-hours`, { hours });

      return dispatch({ type: "BUSINESS_HOURS_SAVE_SUCCESS", payload: res.data });
    } catch (error: any) {
      dispatch({ type: "BUSINESS_HOURS_SAVE_FAIL", payload: error.response?.data || error.message });
      throw error;
    }
  };
};
