import { Stack } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { rw, rh, rs } from '../../utils/responsive';
import { FormDataProvider } from './context';

// Reusable Header Component
export function OnboardingHeader({ title }: { title: string }) {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
            >
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.heading}>{title}</Text>
        </View>
    );
}

export default function OnboardingLayout() {
    return (
        <FormDataProvider> 
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="vehicle" options={{ headerShown: false }} />
            <Stack.Screen name="document" options={{ headerShown: false }} />
            <Stack.Screen name="bank" options={{ headerShown: false }} />
            <Stack.Screen name="final" options={{ headerShown: false }} />
        </Stack>
        </FormDataProvider>

    );
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        marginTop: rh(7),
        gap: rw(2),
        paddingHorizontal: rw(5),
    },
    backButton: {
        padding: rw(2),
        borderRadius: rw(7.5),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    heading: {
        fontFamily: "Filson-Bold",
        color: '#FFFFFF',
        fontSize: rs(4.5),
        flex: 1,
    },
});
