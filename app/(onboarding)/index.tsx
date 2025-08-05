import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../components/button';
import ProfilePicturePicker from '../../components/ProfilePicturePicker';
import { DocumentUploadResult } from '../../services/documentService';
import { rh, rs, rw } from '../../utils/responsive';
import { OnboardingHeader } from './_layout';
import { useFormData } from './context';

export default function Onboarding() {
    const router = useRouter();
    const { formData, updateField } = useFormData();

    // Debug: Log form data changes
    useEffect(() => {
        console.log("Current form data:", formData);
        console.log("Profile picture in form data:", formData.documents?.profilePicture);
    }, [formData]);

    const handleFinishOnboarding = async () => {
        // TODO: Save that onboarding is complete using AsyncStorage
        // await AsyncStorage.setItem('hasLaunched', 'true');
        router.push('/vehicle');
    };

    const handleProfileImageSelected = (result: DocumentUploadResult) => {
        console.log("Profile image selected:", result);
        // Update the form data with the profile picture - with null checks
        updateField('documents', {
            ...(formData.documents || {}),
            profilePicture: [result]
        });
        console.log("Updated form data documents:", {
            ...(formData.documents || {}),
            profilePicture: [result]
        });
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

                            {/* Profile Picture Picker */}
                            <ProfilePicturePicker
                                onImageSelected={handleProfileImageSelected}
                                currentImage={formData.documents?.profilePicture?.[0]?.uri}
                            />

                            <TextInput style={styles.input} placeholder="First name" value={formData.firstName || ''} onChangeText={text => updateField('firstName', text)} />
                            <TextInput style={styles.input} placeholder="Last name" value={formData.lastName || ''} onChangeText={text => updateField('lastName', text)} />
                            <TextInput style={styles.input} placeholder="Email(optional)" value={formData.email || ''} onChangeText={text => updateField('email', text)} />
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