import axiosInstance from "./axiosInstance";


export const saveUserProfile = (userId: string, profile: any) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "USER_PROFILE_SAVE_REQUEST" });

      const formData = new FormData();

      if (profile.age !== undefined)
        formData.append("age", String(profile.age));

      if (profile.sex)
        formData.append("sex", profile.sex);

      if (profile.bloodGroup)
        formData.append("bloodGroup", profile.bloodGroup);

      if (profile.address)
        formData.append("address", profile.address);

      // ✅ FILE FROM PROFILE OBJECT
      if (profile.file) {
        formData.append("profile", profile.file); // must match multer field name
      }

      const res = await axiosInstance.post(
        `/api/user-profile/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch({
        type: "USER_PROFILE_SAVE_SUCCESS",
        payload: res.data.profile,
      });
    } catch (error: any) {
      dispatch({
        type: "USER_PROFILE_SAVE_FAIL",
        payload: error.response?.data || error.message,
      });
      throw error;
    }
  };
};


export const getUserProfile = (userId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "USER_PROFILE_FETCH_REQUEST" });

      const res = await axiosInstance.get(
        `/api/user-profile/${userId}`
      );

      dispatch({
        type: "USER_PROFILE_FETCH_SUCCESS",
        payload: res.data.profile,
      });

      return res.data; // 🔥 allows `.then()` in component
    } catch (error: any) {
      dispatch({
        type: "USER_PROFILE_FETCH_FAIL",
        payload: error.response?.data || error.message,
      });
      throw error;
    }
  };
};
