import { StyleSheet, Text, View, Platform, KeyboardAvoidingView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";
import { rw, rh, rs } from '../../utils/responsive';
import React from 'react';
import { OnboardingHeader } from './_layout';
import Button from '../../components/button';

const Bank = () => {
    const router = useRouter();
    const [bankDetails, setBankDetails] = React.useState({
        accountHolderName: '',
        bankName: '',
        ifscCode: '',
        accountNumber: '',
        upiId: ''
    });

    const handleNext = async () => {
        // TODO: Validate and handle bank details
        router.push('/final');
    };

    const handleInputChange = (field: keyof typeof bankDetails, value: string) => {
        setBankDetails(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <LinearGradient colors={["#470A68", "#8D14CE", "#8D14CE"]} style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.content}
            >
                <View style={styles.content}>
                    <OnboardingHeader title="Bank Details" />

                    <View style={styles.inputContainerBox}>
                        <View style={styles.innerContent}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Account Holder Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter account holder name"
                                    value={bankDetails.accountHolderName}
                                    onChangeText={(value) => handleInputChange('accountHolderName', value)}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Bank Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter bank name"
                                    value={bankDetails.bankName}
                                    onChangeText={(value) => handleInputChange('bankName', value)}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>IFSC Code</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter IFSC code"
                                    value={bankDetails.ifscCode}
                                    onChangeText={(value) => handleInputChange('ifscCode', value)}
                                    autoCapitalize="characters"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Account Number</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter account number"
                                    value={bankDetails.accountNumber}
                                    onChangeText={(value) => handleInputChange('accountNumber', value)}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>UPI ID</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter UPI ID"
                                    value={bankDetails.upiId}
                                    onChangeText={(value) => handleInputChange('upiId', value)}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        <Button
                            title="Next"
                            onPress={handleNext}
                        // disabled={!bankDetails.accountHolderName || !bankDetails.bankName ||
                        //     !bankDetails.ifscCode || !bankDetails.accountNumber}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

export default Bank;

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
    inputGroup: {
        marginBottom: rh(2.5),
    },
    label: {
        fontFamily: 'General-Sans-Medium',
        fontSize: rs(3.5),
        color: '#333333',
        marginBottom: rh(1),
    },
    input: {
        width: "100%",
        height: rh(6),
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: rw(2),
        backgroundColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        paddingHorizontal: rw(4),
        fontFamily: 'General-Sans-Regular',
        fontSize: rs(3.5),
        color: '#333333',
    },
    innerHeader: {
        fontFamily: 'General-Sans-Medium',
        fontSize: rs(4.5),
        marginVertical: rh(1),
    },
    innerContent: {
        flex: 1,
        paddingVertical: rh(5),
        paddingHorizontal: rw(7.5),
    },
}); 