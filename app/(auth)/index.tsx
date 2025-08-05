import { useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function LoginPhone() {
  const router = useRouter();
  const { sendOTP } = useAuth();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const cleanedPhone = phone.trim().replace(/\D/g, "");
      const fullPhoneNumber = `+91${cleanedPhone}`;
      await sendOTP(fullPhoneNumber);
    } catch (error) {
      console.error("Phone submission error:", error);
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#470A68", "#8D14CE"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
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
            <Text style={styles.heading}>Your Delivery Superhero</Text>
          </View>

          <View style={styles.midcontainer}>
            <Text style={styles.header}>Get started with Unicapp</Text>
            <View style={styles.inputContainer}>
              <Text>+91</Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                maxLength={10}
                placeholder="Enter mobile number"
                value={phone}
                onChangeText={(text) => {
                  const cleaned = text.replace(/\D/g, "");
                  setPhone(cleaned);
                }}
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              onPress={handlePhoneSubmit}
              disabled={isLoading}
              style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#242424" />
              ) : (
                <Text style={styles.signup}>Sign up</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.desc}>
              By signing up, you agree to our Terms of Service and Privacy
              Policy. By continuing you agree to our Terms of Use and
              acknowledge that you have read our Privacy Policy.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: "General-Sans-Regular",
    color: "white",
    fontSize: 18,
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
  inputContainer: {
    width: "100%",
    height: 46,
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
  midcontainer: {
    width: 334,
    height: 227,
    backgroundColor: "#242424",
    borderRadius: 24,
    padding: 20,
  },
  signupButton: {
    backgroundColor: "#F3E545",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
  signupButtonDisabled: {
    opacity: 0.7,
  },
  signup: {
    textAlign: "center",
    fontFamily: "General-Sans-Medium",
  },
});