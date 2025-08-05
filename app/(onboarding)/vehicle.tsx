import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../components/button';
import { fontSizes, rh, rw } from '../../utils/responsive';
import { OnboardingHeader } from './_layout';
import { useFormData } from './context';

const Vehicle = () => {
    const router = useRouter();
    const { formData, updateField } = useFormData();

    const handleNext = async () => {
        console.log("=== VEHICLE DETAILS SCREEN ===");
        console.log("Current formData:", JSON.stringify(formData, null, 2));
        console.log("Vehicle Name:", formData.vehicleName);
        console.log("Vehicle Number:", formData.vehicleNumber);

        if (!formData.vehicleName || !formData.vehicleNumber) {
            console.log("Missing vehicle details");
            alert("Please fill in all vehicle details");
            return;
        }

        console.log("Navigating to document upload...");
        router.push('/document');
    };

    return (
        <LinearGradient colors={["#470A68", "#8D14CE", "#8D14CE"]} style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.content}
            >
                <View style={styles.content}>
                    <OnboardingHeader title="Vehicle Details" />

                    <View style={styles.inputContainerBox}>
                        <View style={styles.innerContent}>
                            {/* Blank input container - add your vehicle form here */}
                            <Text style={styles.innerHeader}>Vehicle</Text>
                            <TextInput style={styles.input} placeholder="Vehicle Name" value={formData.vehicleName} onChangeText={text => updateField('vehicleName', text)} />
                            <Text style={styles.innerHeader}>Vehicle Number</Text>
                            <TextInput style={styles.input} placeholder="Vehicle Number" value={formData.vehicleNumber} onChangeText={text => updateField('vehicleNumber', text)} />
                        </View>

                        <Button title="Next" onPress={handleNext} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

export default Vehicle;

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
    input: {
        width: "100%",
        height: rh(5),
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: rw(2),

        backgroundColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.10,
        shadowRadius: 1,
        elevation: 1.5,
    },
    innerHeader: {
        fontFamily: 'General-Sans-Medium',
        fontSize: fontSizes.lg,
        marginVertical: rh(1),

    },
    innerContent: {
        flex: 1,

        paddingVertical: rh(5),
        paddingHorizontal: rw(7.5),
    },
});