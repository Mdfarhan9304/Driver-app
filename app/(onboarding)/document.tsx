import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../components/button';
import { DocumentService, DocumentUploadResult } from '../../services/documentService';
import { rh, rs, rw } from '../../utils/responsive';
import { OnboardingHeader } from './_layout';
import { useFormData } from './context';

const Document = () => {
    const router = useRouter();
    const [drivingLicense, setDrivingLicense] = useState<DocumentUploadResult | null>(null);
    const [aadharCard, setAadharCard] = useState<DocumentUploadResult | null>(null);
    const { formData, updateField } = useFormData();

    const handleNext = async () => {
        console.log("=== DOCUMENT UPLOAD SCREEN ===");
        console.log("Current formData:", JSON.stringify(formData, null, 2));
        console.log("Driving License document:", drivingLicense);
        console.log("Aadhar Card document:", aadharCard);

        if (!drivingLicense || !aadharCard) {
            console.log("Missing required documents");
            alert('Please upload all required documents (Driving License and Aadhar Card)');
            return;
        }

        // Update form data with documents (convert single documents to arrays for API compatibility)
        console.log("Updating documents in formData...");
        updateField('documents', {
            drivingLicense: [drivingLicense],
            aadharCard: [aadharCard]
        });

        console.log("Documents updated in context. Navigating to bank details...");
        router.push('/(onboarding)/bank');
    };

    const handleDocumentUpload = async (type: 'license' | 'aadhar') => {
        console.log(`Starting ${type} document upload...`);
        DocumentService.showDocumentPickerOptions(
            async () => {
                console.log(`Picking ${type} document from gallery...`);
                const result = await DocumentService.pickDocument();
                if (result) {
                    console.log(`${type} document selected:`, {
                        name: result.name,
                        type: result.type,
                        uri: result.uri ? 'Present' : 'Missing'
                    });
                    if (type === 'license') {
                        setDrivingLicense(result);
                    } else {
                        setAadharCard(result);
                    }
                }
            },
            async () => {
                console.log(`Taking ${type} document photo...`);
                const result = await DocumentService.takePhoto();
                if (result) {
                    console.log(`${type} document photo taken:`, {
                        name: result.name,
                        type: result.type,
                        uri: result.uri ? 'Present' : 'Missing'
                    });
                    if (type === 'license') {
                        setDrivingLicense(result);
                    } else {
                        setAadharCard(result);
                    }
                }
            }
        );
    };

    const removeDocument = (type: 'license' | 'aadhar') => {
        console.log(`Removing ${type} document`);
        if (type === 'license') {
            setDrivingLicense(null);
        } else {
            setAadharCard(null);
        }
        console.log(`${type} document removed successfully`);
    };

    const renderDocumentItem = (document: DocumentUploadResult | null, type: 'license' | 'aadhar') => {
        if (!document) return null;

        return (
            <View style={styles.uploadedDocument}>
                <View style={styles.uploadedDocumentContent}>
                    <Ionicons
                        name={type === 'license' ? "car-outline" : "card-outline"}
                        size={20}
                        color="#470A68"
                    />
                    <Text style={styles.uploadedDocumentText}>
                        Document Uploaded - {document.name}
                    </Text>
                    <TouchableOpacity
                        onPress={() => removeDocument(type)}
                        style={styles.removeButton}
                    >
                        <Ionicons name="close-circle" size={20} color="#FF6B6B" />
                    </TouchableOpacity>
                </View>
            </View>
        );
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
                            <View style={styles.documentSection}>
                                <Text style={styles.documentTitle}>Driving License</Text>

                                <TouchableOpacity
                                    style={styles.uploadBox}
                                    onPress={() => handleDocumentUpload('license')}
                                >
                                    <View style={styles.uploadContent}>
                                        <Ionicons name="car-outline" size={24} color="#470A68" />
                                        <Text style={styles.documentSubtitle}>
                                            Upload Driving License
                                        </Text>
                                        <Ionicons
                                            name="add-circle"
                                            size={20}
                                            color="#470A68"
                                        />
                                    </View>
                                </TouchableOpacity>

                                {/* Display uploaded driving license document */}
                                {renderDocumentItem(drivingLicense, 'license')}
                            </View>

                            {/* Aadhar Card Upload */}
                            <View style={styles.documentSection}>
                                <Text style={styles.documentTitle}>Aadhar Card</Text>

                                <TouchableOpacity
                                    style={styles.uploadBox}
                                    onPress={() => handleDocumentUpload('aadhar')}
                                >
                                    <View style={styles.uploadContent}>
                                        <Ionicons name="card-outline" size={24} color="#470A68" />
                                        <Text style={styles.documentSubtitle}>
                                            Upload Aadhar Card
                                        </Text>
                                        <Ionicons
                                            name="add-circle"
                                            size={20}
                                            color="#470A68"
                                        />
                                    </View>
                                </TouchableOpacity>

                                {/* Display uploaded aadhar card document */}
                                {renderDocumentItem(aadharCard, 'aadhar')}
                            </View>
                        </View>

                        <Button
                            title="Next"
                            onPress={handleNext}
                            disabled={!drivingLicense || !aadharCard}
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
        fontSize: rs(4.5),
        color: '#333',
        marginBottom: rh(1),
    },
    subtitle: {
        fontFamily: 'General-Sans-Regular',
        fontSize: rs(3.5),
        color: '#666',
        marginBottom: rh(4),
    },
    uploadBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: rw(4),
        marginBottom: rh(2),
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
        justifyContent: 'space-between',
    },
    documentSection: {
        marginBottom: rh(3),
    },
    documentTitle: {
        fontFamily: 'General-Sans-Medium',
        fontSize: rs(4),
        color: '#333',
        marginBottom: rh(1),
    },
    documentSubtitle: {
        fontFamily: 'General-Sans-Regular',
        fontSize: rs(3),
        color: '#666',
        textAlign: 'center',
        flex: 1,
    },
    uploadedDocument: {
        backgroundColor: '#E8F5E8',
        borderRadius: rw(4),
        marginBottom: rh(1),
        padding: rw(3),
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    uploadedDocumentContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    uploadedDocumentText: {
        fontFamily: 'General-Sans-Regular',
        fontSize: rs(3),
        color: '#2E7D32',
        flex: 1,
        marginLeft: rw(2),
    },
    removeButton: {
        padding: rw(1),
    },
});