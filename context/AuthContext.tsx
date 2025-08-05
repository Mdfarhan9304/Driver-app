import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthAPI, RiderRegistrationData } from "../services/api";
import { useRouter } from "expo-router";
import type { User } from "../types/user";
import { Alert } from "react-native";
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    sendOTP: (phone: string, fromVerifyScreen?: boolean) => Promise<void>;
    verifyOTP: (otp: string, phone: string) => Promise<void>;
    registerRider: (data: RiderRegistrationData) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isLoading: true,
        isAuthenticated: false,
    });

    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        loadTokenAndUserData();
    }, []);

    const loadTokenAndUserData = async () => {
        try {
            const savedToken = await AsyncStorage.getItem("auth_cookies");
            const savedUserData = await AsyncStorage.getItem("user_data");

            if (savedToken) {
                setToken(savedToken);

                if (savedUserData) {
                    const userData = JSON.parse(savedUserData);
                    setState((prevState) => ({
                        ...prevState,
                        isAuthenticated: true,
                        isLoading: false,
                        user: userData,
                    }));
                    console.log("[Auth] User authenticated with saved data");
                } else {
                    setState((prevState) => ({
                        ...prevState,
                        isAuthenticated: true,
                        isLoading: false,
                    }));
                    console.log("[Auth] User authenticated but no saved data");
                }
            } else {
                setState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                }));
                console.log("[Auth] No saved token found");
            }
        } catch (error) {
            console.error("[Auth] Error loading auth state:", error);
            await clearAuthData();
        }
    };

    const clearAuthData = async () => {
        try {
            await AsyncStorage.multiRemove(["auth_cookies", "user_data"]);
            setToken(null);
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        } catch (error) {
            console.error("[Auth] Error clearing auth data:", error);
        }
    };

    const checkAuth = async () => {
        try {
            const savedToken = await AsyncStorage.getItem('auth_cookies');

            if (!savedToken) {
                console.log('[Auth] No token found');
                setState((prev) => ({ ...prev, isAuthenticated: false, isLoading: false }));
                return;
            }

            try {
                const decoded: any = jwtDecode(savedToken);
                const currentTime = Date.now() / 1000;

                if (decoded.exp && decoded.exp < currentTime) {
                    console.log('[Auth] Token expired');
                    await clearAuthData();
                } else {
                    console.log('[Auth] Token valid');
                    setToken(savedToken);
                    setState((prev) => ({ ...prev, isAuthenticated: true, isLoading: false }));
                }
            } catch (decodeError) {
                console.error('[Auth] Error decoding token:', decodeError);
                await clearAuthData();
            }
        } catch (err) {
            console.error('[Auth] Error while verifying token:', err);
            await clearAuthData();
        }
    };

    const updateUserData = async (user: User) => {
        try {
            console.log("[Auth] Storing user data...");
            await AsyncStorage.setItem("user_data", JSON.stringify(user));
            setState((prev) => ({
                ...prev,
                user: user,
            }));
        } catch (error) {
            console.error("[Auth] User data update error:", error);
            throw error;
        }
    };

    const sendOTP = async (phone: string, fromVerifyScreen: boolean = false) => {
        try {
            if (!phone) {
                Alert.alert("Error", "Please enter your phone number.");
                return;
            }

            setState((prev) => ({ ...prev, isLoading: true }));
            console.log("[Auth] Sending OTP to:", phone);

            const response = await AuthAPI.sendOTP({ phoneNumber: phone });
            console.log(response);


            setState((prev) => ({ ...prev, isLoading: false }));

            // Only navigate if not called from verify screen
            if (!fromVerifyScreen) {
                router.push({
                    pathname: "/(auth)/verify",
                    params: { phone },
                });
            }
        } catch (error: any) {
            setState((prev) => ({ ...prev, isLoading: false }));
            console.error("[Auth] Send OTP error:", error);
            Alert.alert(
                "Error",
                error.response?.data?.message || "Failed to send OTP. Please try again."
            );
        }
    };

    const verifyOTP = async (otp: string, phone: string) => {
        if (!otp || otp.length !== 6) {
            Alert.alert("Error", "Please enter a valid 6-digit OTP");
            return;
        }

        try {
            setState((prev) => ({ ...prev, isLoading: true }));
            console.log("[Auth] Verifying OTP for:", phone);

            const response = await AuthAPI.verifyOTP({
                phoneNumber: phone,
                totp: otp,
            });

            console.log("[Auth] Verification response:", response);

            if (response.message === "Invalid OTP") {
                setState((prev) => ({ ...prev, isLoading: false }));
                Alert.alert("Invalid OTP", "Please enter valid OTP");
                return;
            }

            // Get data from either rider or user object
            const userOrRider = response.rider || response.user;
            if (!userOrRider) {
                throw new Error('No user data in response');
            }

            const userData: User = {
                ...userOrRider,
                id: userOrRider.id || userOrRider._id, // Handle both id formats
                isRegistered: userOrRider.isVerified || false, // Use isVerified as registration status
                isVerified: userOrRider.isVerified || false,
                isPhoneNumberVerified: userOrRider.isPhoneNumberVerified || false
            };

            // Save user data and update state
            await updateUserData(userData);
            setState((prev) => ({
                ...prev,
                isAuthenticated: true,
                isLoading: false,
                user: userData,
            }));

            // Navigate based on verification status
            // If not verified, always go to onboarding
            if (!userData.isVerified) {
                router.replace("/(onboarding)");
            } else {
                router.replace("/(tabs)");
            }

        } catch (error: any) {
            setState((prev) => ({ ...prev, isLoading: false }));
            console.error("[Auth] Verify OTP error:", error);
            Alert.alert(
                "Verification Failed",
                error.response?.data?.message || "Invalid OTP"
            );
        }
    };

    const registerRider = async (data: RiderRegistrationData) => {
        try {
            setState((prev) => ({ ...prev, isLoading: true }));
            console.log("[Auth] Registering rider with data");

            const response = await AuthAPI.registerRider(data);

            // Update user data with registration info
            const updatedUser = {
                ...state.user,
                ...response.user,
                isRegistered: true,
            } as User;

            await updateUserData(updatedUser);
            setState((prev) => ({
                ...prev,
                user: updatedUser,
                isLoading: false,
            }));

            console.log("[Auth] Rider registration successful");
            router.replace("/(onboarding)/final");

        } catch (error: any) {
            setState((prev) => ({ ...prev, isLoading: false }));
            console.error("[Auth] Register rider error:", error);
            Alert.alert(
                "Registration Failed",
                error.response?.data?.message || "Failed to register. Please try again."
            );
            throw error;
        }
    };

    const logout = async () => {
        try {
            console.log("[Auth] Starting logout process...");
            setState((prev) => ({ ...prev, isLoading: true }));

            await AuthAPI.logout();
            await clearAuthData();

            console.log("[Auth] Navigating to auth screen...");
            router.replace("/(auth)");
        } catch (error: any) {
            console.error("[Auth] Logout error:", error);
            setState((prev) => ({ ...prev, isLoading: false }));
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                sendOTP,
                verifyOTP,
                registerRider,
                logout,
                checkAuth,
                token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
