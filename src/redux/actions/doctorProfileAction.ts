import axiosInstance from "./axiosInstance";


export const saveBasicDetails = (doctorData: any, imageFile: File | null) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: "DOCTOR_BASIC_REQUEST" });

            const form = new FormData();
            form.append("firstName", doctorData.firstName);
            form.append("lastName", doctorData.lastName);
            form.append("displayName", doctorData.displayName);
            form.append("designation", doctorData.designation);
            form.append("phone", doctorData.phone);
            form.append("email", doctorData.email);
            form.append("languages", JSON.stringify(doctorData.languages));
            form.append("memberships", JSON.stringify(doctorData.memberships));

            if (imageFile) {
                form.append("imageFile", imageFile);
            }

            const res = await axiosInstance.post(`/api/doctors/create`, form, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return dispatch({ type: "DOCTOR_BASIC_SUCCESS", payload: res.data });
        } catch (error: any) {
            dispatch({ type: "DOCTOR_BASIC_FAIL", payload: error.response?.data });
        }
    };
};

export const saveExperience = (doctorId: string, experience: any) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: "EXPERIENCE_ADD_REQUEST" });

            const form = new FormData();
            form.append("experience", JSON.stringify(experience));

            experience.forEach((exp: any, index: number) => {

                if (exp.logo) {
                    form.append(`experienceLogo`, exp.logo); // SAME KEY → MULTER HANDLES ARRAY
                }
            });

            const res = await axiosInstance.post(
                `/api/doctors/create/${doctorId}/experience`,
                form,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            return dispatch({ type: "EXPERIENCE_ADD_SUCCESS", payload: res.data });
        } catch (error: any) {
            dispatch({ type: "EXPERIENCE_ADD_FAIL", payload: error.response?.data });
        }
    };
};

export const saveEducation = (doctorId: string, education: any) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: "EDUCATION_ADD_REQUEST" });

            const form = new FormData();
            form.append("education", JSON.stringify(education));
            education.forEach((edu: any, index: number) => {
                if (edu.logo) {
                    form.append(`educationLogo`, edu.logo); // SAME KEY → MULTER HANDLES ARRAY
                }
            });
            const res = await axiosInstance.post(
                `/api/doctors/create/${doctorId}/education`,
                form,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

           return dispatch({ type: "EDUCATION_ADD_SUCCESS", payload: res.data });
        } catch (error: any) {
            dispatch({ type: "EDUCATION_ADD_FAIL", payload: error.response?.data });
        }
    };
};


export const saveAward = (doctorId: string, award: any) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: "AWARD_ADD_REQUEST" });

            const res = await axiosInstance.post(
                `/api/doctors/create/${doctorId}/awards`,
                { award }
            );

            return dispatch({ type: "AWARD_ADD_SUCCESS", payload: res.data });
        } catch (error: any) {
            dispatch({ type: "AWARD_ADD_FAIL", payload: error.response?.data });
        }
    };
};


export const saveInsurance = (doctorId: string, insurance: any) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: "INSURANCE_ADD_REQUEST" });


             const form = new FormData();
            form.append("insurance", JSON.stringify(insurance));

            insurance.forEach((ins: any, index: number) => {

                if (ins.logo) {
                    form.append(`insuranceLogo`, ins.logo); // SAME KEY → MULTER HANDLES ARRAY
                }
            });
    

            const res = await axiosInstance.post(
                `/api/doctors/create/${doctorId}/insurances`,
                form,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            return dispatch({ type: "INSURANCE_ADD_SUCCESS", payload: res.data });
        } catch (error: any) {
            dispatch({ type: "INSURANCE_ADD_FAIL", payload: error.response?.data });
        }
    };
};


export const saveClinic = (doctorId: string, clinic: any, logoFile: File | null, galleryFiles: File[]) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "CLINIC_ADD_REQUEST" });

      const form = new FormData();
      form.append("clinic", JSON.stringify(clinic));
      if (logoFile) form.append("clinicLogo", logoFile);
      galleryFiles.forEach((file) => form.append("gallery", file));

      // let axios set headers for multipart/form-data
      const res = await axiosInstance.post(`/api/doctors/create/${doctorId}/clinics`, form);

      return dispatch({ type: "CLINIC_ADD_SUCCESS", payload: res.data });
    } catch (error: any) {
      dispatch({ type: "CLINIC_ADD_FAIL", payload: error.response?.data || error.message });
    }
  };
};



export const saveBusinessHours = (doctorId: string, hours: any) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "BUSINESS_HOURS_SAVE_REQUEST" });

      // Use PUT or POST depending on your design; PUT is idempotent
      const res = await axiosInstance.post(`/api/doctors/create/${doctorId}/business-hours`, { hours });

      return dispatch({ type: "BUSINESS_HOURS_SAVE_SUCCESS", payload: res.data });
    } catch (error: any) {
      dispatch({ type: "BUSINESS_HOURS_SAVE_FAIL", payload: error.response?.data || error.message });
      throw error;
    }
  };
};