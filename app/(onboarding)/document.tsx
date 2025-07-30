
import { StyleSheet, Text, View, TouchableOpacity, Platform, KeyboardAvoidingView, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";
import { rw, rh, rs, fontSizes } from '../../utils/responsive';
import { OnboardingHeader } from './_layout';
import Button from '../../components/button';
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker'

const Document = () => {
    const router = useRouter();
    const [drivingLicense, setDrivingLicense] = useState(null);
    const [aadharCard, setAadharCard] = useState(null);

    const handleNext = async () => {
        // if (!drivingLicense || !aadharCard) {
        //     // Show error or alert that both documents are required
        //     return;
        // }
        router.push('/bank');
    };

    const handleDocumentUpload = async (type: 'license' | 'aadhar') => {
        // TODO: Implement document picker or camera functionality
        const result = await DocumentPicker.getDocumentAsync({
            multiple: true
        })

        console.log(`Uploading ${type}`);
    };

    return (
        <LinearGradient colors={["#470A68", "#8D14CE", "#8D14CE"]} style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.content}
            >
                <View style={styles.content}>
                    <OnboardingHeader title="Upload Documents" />

                    <View style={styles.inputContainerBox}>
                        <View style={styles.innerContent}>
                            <Text style={styles.title}>Required Documents</Text>
                            <Text style={styles.subtitle}>Please upload clear photos of your documents</Text>

                            {/* Driving License Upload */}
                            <TouchableOpacity
                                style={styles.uploadBox}
                                onPress={() => handleDocumentUpload('license')}
                            >
                                <View style={styles.uploadContent}>
                                    <View style={styles.iconContainer}>
                                        <Ionicons name="car-outline" size={24} color="#470A68" />
                                    </View>
                                    <View style={styles.uploadTextContainer}>
                                        <Text style={styles.documentTitle}>Driving License</Text>
                                        <Text style={styles.documentSubtitle}>
                                            {drivingLicense ? 'Uploaded' : 'Upload front and back side'}
                                        </Text>
                                    </View>
                                    <Ionicons
                                        name={drivingLicense ? "checkmark-circle" : "arrow-forward-circle"}
                                        size={24}
                                        color={drivingLicense ? "#4CAF50" : "#470A68"}
                                    />
                                </View>
                            </TouchableOpacity>

                            {/* Aadhar Card Upload */}
                            <TouchableOpacity
                                style={styles.uploadBox}
                                onPress={() => handleDocumentUpload('aadhar')}
                            >
                                <View style={styles.uploadContent}>
                                    <View style={styles.iconContainer}>
                                        <Ionicons name="card-outline" size={24} color="#470A68" />
                                    </View>
                                    <View style={styles.uploadTextContainer}>
                                        <Text style={styles.documentTitle}>Aadhar Card</Text>
                                        <Text style={styles.documentSubtitle}>
                                            {aadharCard ? 'Uploaded' : 'Upload front and back side'}
                                        </Text>
                                    </View>
                                    <Ionicons
                                        name={aadharCard ? "checkmark-circle" : "arrow-forward-circle"}
                                        size={24}
                                        color={aadharCard ? "#4CAF50" : "#470A68"}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Button
                            title="Next"
                            onPress={handleNext}
                        // disabled={!drivingLicense || !aadharCard}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

export default Document;

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
        overflow: "hidden",
    },
    innerContent: {
        flex: 1,
        paddingVertical: rh(5),
        paddingHorizontal: rw(7.5),
    },
    title: {
        fontFamily: 'General-Sans-Medium',
        fontSize: fontSizes.lg,
        color: '#333',
        marginBottom: rh(1),
    },
    subtitle: {
        fontFamily: 'General-Sans-Regular',
        fontSize: fontSizes.md,
        color: '#666',
        marginBottom: rh(4),
    },
    uploadBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: rw(4),
        marginBottom: rh(2.5),
        padding: rw(4),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    uploadContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: rw(12),
        height: rw(12),
        borderRadius: rw(6),
        backgroundColor: 'rgba(71, 10, 104, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: rw(3),
    },
    uploadTextContainer: {
        flex: 1,
    },
    documentTitle: {
        fontFamily: 'General-Sans-Medium',
        fontSize: rs(4),
        color: '#333',
        marginBottom: rh(0.5),
    },
    documentSubtitle: {
        fontFamily: 'General-Sans-Regular',
        fontSize: rs(3),
        color: '#666',
    },
}); 