import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "https://main-five-beta.vercel.app/api/v1";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("auth_cookies");
      if (token) {
        config.headers.Cookie = `authToken=${token}`;
      }
    } catch (error) {
      console.error("Error getting token from storage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear stored token on unauthorized response
      await AsyncStorage.removeItem("auth_cookies");
      await AsyncStorage.removeItem("user_data");
    }
    return Promise.reject(error);
  }
);

// API Types
export interface RiderSignupData {
  phoneNumber: string;
}

export interface RiderVerifyData {
  phoneNumber: string;
  totp: string;
}

// Simplified registration data interface that matches our form structure
export interface SimpleRiderRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  vehicleName: string;
  vehicleNumber: string;
  accountHolderName: string;
  bankName: string;
  ifscCode: string;
  accountNumber: string;
  upiId: string;
  drivingLicense: any[];
  aadharCard: any[];
  profilePicture: any[];
}

export interface RiderRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
  bankDetails: {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    upiId?: string;
  };
  documents: {
    profilePicture: string; // base64 or file path
    drivingLicense: {
      front: string;
      back: string;
    };
    aadharCard: {
      front: string;
      back: string;
    };
  };
}

// Auth API
export const AuthAPI = {
  // Send OTP to rider's phone
  sendOTP: async (data: RiderSignupData) => {
    try {
      const response = await apiClient.post("/rider/signup", data);
      return response.data;
    } catch (error: any) {
      console.error("Send OTP error:", error.response?.data || error.message);
      throw error;
    }
  },

  // Verify OTP
  verifyOTP: async (data: RiderVerifyData) => {
    try {
      const response = await apiClient.post("/rider/verifyRider", data);

      // Extract token from set-cookie header
      const cookies = response.headers["set-cookie"];
      if (cookies && cookies.length > 0) {
        const authCookie = cookies[0].split(";")[0];
        const token = authCookie.split("=")[1];
        await AsyncStorage.setItem("auth_cookies", token);
      }

      // Transform the response to match expected format
      const transformedResponse = {
        ...response.data,
        user: response.data.rider
          ? {
              ...response.data.rider,
              _id: response.data.rider.id, // Ensure we have _id for backwards compatibility
            }
          : null,
      };

      return transformedResponse;
    } catch (error: any) {
      console.error("Verify OTP error:", error.response?.data || error.message);
      throw error;
    }
  },

  // Register rider with complete details
  registerRider: async (data: SimpleRiderRegistrationData) => {
    try {
      // Optimize the data before sending
      const optimizedData = {
        ...data,
        // Only send URIs, not base64 data to reduce payload size
        drivingLicense:
          data.drivingLicense?.map((doc) => ({
            uri: doc.uri,
            type: doc.type,
            name: doc.name,
          })) || [],
        aadharCard:
          data.aadharCard?.map((doc) => ({
            uri: doc.uri,
            type: doc.type,
            name: doc.name,
          })) || [],
        profilePicture:
          data.profilePicture?.map((doc) => ({
            uri: doc.uri,
            type: doc.type,
            name: doc.name,
          })) || [],
      };

      console.log(
        "Optimized registration data size:",
        JSON.stringify(optimizedData).length
      );

      const response = await apiClient.post(
        "/rider/registerRider",
        optimizedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Registration response:", response);
      return response.data;
    } catch (error: any) {
      console.error(
        "Register rider error:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await AsyncStorage.multiRemove(["auth_cookies", "user_data"]);
      return { success: true };
    } catch (error: any) {
      console.error("Logout error:", error);
      throw error;
    }
  },
};

// File upload utility
export const uploadFile = async (
  file: any,
  type: "profile" | "license" | "aadhar"
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  try {
    const response = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("File upload error:", error.response?.data || error.message);
    throw error;
  }
};

export default apiClient;
