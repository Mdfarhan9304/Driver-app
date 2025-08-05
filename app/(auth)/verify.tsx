import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function VerifyScreen() {
  const { phone } = useLocalSearchParams();
  const router = useRouter();
  const { sendOTP, verifyOTP, isLoading } = useAuth();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [hasInitialOTPSent, setHasInitialOTPSent] = useState(false);

  const handleSendOTP = useCallback(async () => {
    if (!phone || Array.isArray(phone)) return;

    try {
      await sendOTP(phone, true); // true indicates it's from verify screen
      setTimer(30);
      setCanResend(false);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }, [phone, sendOTP]);

  // Send OTP automatically when screen loads for the first time
  useEffect(() => {
    if (!hasInitialOTPSent) {
      handleSendOTP();
      setHasInitialOTPSent(true);
    }
  }, [hasInitialOTPSent, handleSendOTP]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000) as unknown as NodeJS.Timeout;
    } else {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, canResend]);



  return (
    <LinearGradient colors={["#470A68", "#8D14CE"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Logo */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/unicapp-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.heading}>We’re here to deliver.</Text>
          </View>

          <View style={styles.midcontainer}>
            <Text style={styles.header}>OTP has been sent to this number</Text>
            <View style={styles.numb}>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "General-Sans-Regular",
                }}
              >
                {phone}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: "#5390F4",
                    fontSize: 12,
                    fontFamily: "General-Sans-Regular",
                  }}
                >
                  Edit Number
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={6}
                placeholder="Enter OTP"
                onChangeText={(text) => setOtp(text)}
              />
            </View>
            <View style={styles.btncontainer}>
              <TouchableOpacity
                disabled={isLoading || !canResend}
                onPress={handleSendOTP}
                style={{ opacity: (isLoading || !canResend) ? 0.5 : 1 }}
              >
                <Text style={styles.btn}>
                  {isLoading ? 'Sending...' : canResend ? 'Send Again' : `Wait ${timer}s`}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={isLoading || !otp}
                style={{ opacity: (isLoading || !otp) ? 0.5 : 1 }}
                onPress={async () => {
                  try {
                    await verifyOTP(otp, phone as string);
                    // Navigation is handled by AuthContext
                  } catch (error: any) {
                    Alert.alert(
                      "Error",
                      error.response?.data?.message || "Failed to verify OTP"
                    );
                  }
                }}
              >
                <Text style={styles.btn2}>{isLoading ? 'Verifying...' : 'Verify'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 130,
    backgroundColor: "#F5F5F580",
    borderRadius: 12,
    padding: 10,
    color: "white",
    textAlign: "center",
    fontFamily: "General-Sans-Medium",
  },
  numb: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -10,
    marginBottom: 10,
  },
  btn2: {
    width: 130,
    backgroundColor: "#F3E545",
    borderRadius: 12,
    padding: 10,
    textAlign: "center",

    fontFamily: "General-Sans-Medium",
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    justifyContent: "space-between",
    marginTop: 15,
  },
  header: {
    fontFamily: "General-Sans-Regular",
    color: "white",
    fontSize: 12,
    marginBottom: 20,
    fontWeight: "100",
  },
  desc: {
    fontFamily: "General-Sans-Regular",
    color: "white",
    fontSize: 10,
    marginVertical: 20,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: "20",

    display: "flex",
    flexDirection: "row",
  },
  logo: {
    width: 100,
    height: 100,
  },
  heading: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "General-Sans-Regular",
  },
  form: {
    width: "100%",
    gap: 16,
  },
  inputContainer: {
    width: "100%",
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFFFFF40",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  input: {
    fontFamily: "General-Sans-Regular",
    flex: 1,
    height: "100%",
    color: "black",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  loginButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#470A68",
  },
  registerContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  registerText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  registerLink: {
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  midcontainer: {
    width: 334,
    height: 190,
    backgroundColor: "#242424",
    borderRadius: 24,
    padding: 20,
  },
  signup: {
    backgroundColor: "#F3E545",
    borderRadius: 12,
    padding: 10,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "General-Sans-Medium",
  },
});