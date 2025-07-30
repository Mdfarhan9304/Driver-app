import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { rw, rh, rs, fontSizes } from '../../utils/responsive';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { OnboardingHeader } from './_layout';
import Button from '../../components/button';

export default function Onboarding() {
    const router = useRouter();

    const handleFinishOnboarding = async () => {
        // TODO: Save that onboarding is complete using AsyncStorage
        // await AsyncStorage.setItem('hasLaunched', 'true');
        router.push('/vehicle');
    };

    return (
        <LinearGradient colors={["#470A68", "#8D14CE", "#8D14CE"]} style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.content}
            >
                <View style={styles.content}>
                    <OnboardingHeader title="Let's get your account ready" />

                    <View style={styles.inputContainerBox}>
                        <View style={styles.innerContent}>
                            <FontAwesome5 name="user-circle" size={rw(20)} color="black" />
                            <Text style={styles.innerHeader}>Profile Details</Text>
                          
                            <TextInput style={styles.input} placeholder="First name" />
                            <TextInput style={styles.input} placeholder="Last name" />
                            <TextInput style={styles.input} placeholder="Email(optional)" />
                        </View>

                        <Button title="Next" onPress={handleFinishOnboarding} />
                        {/* <View style={styles.bottomButtonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleFinishOnboarding}
                            >
                                <Text style={styles.buttonText}>Get Started</Text>
                            </TouchableOpacity>
                        </View> */}

                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    },
    inputContainerBox: {
        width: "100%",
        backgroundColor: '#F5F5F5',
        flex: 1,
        borderTopEndRadius: rw(8),
        borderTopLeftRadius: rw(8),
        marginTop: rh(2.5),
        // padding: rw(7.5),
        overflow: "hidden",
    },
    input: {
        width: "100%",
        height: rh(5),
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: rw(2),
        marginTop: rh(1.5),
        backgroundColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.10,
        shadowRadius: 1,
        elevation: 1.5,
    },
    innerHeader: {
        fontFamily: 'General-Sans-Medium',
        fontSize: rs(5),
        marginTop: rs(4)
    },
    innerContent: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: rh(5),
        paddingHorizontal: rw(7.5),
    },
    bottomButtonContainer: {
        width: "100%",
        alignSelf: "center",
        alignItems: "center",
        marginBottom: rh(2.5),
    },
    button: {
        width: "90%",
        backgroundColor: "#F3E545",
        paddingVertical: rh(2),
        borderRadius: rw(2),
        alignItems: "center",
    },
    buttonText: {
        fontFamily: "General-Sans-Regular",
        fontWeight: "600",
        fontSize: rs(2),
        color: "#000",
    },
});