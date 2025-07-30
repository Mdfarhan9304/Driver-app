import { Image, StyleSheet, Text, View,  } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { rw, rh, fontSizes } from '../../utils/responsive';
import Verification from '../../assets//images/verification.png'
import { TouchableOpacity } from 'react-native';
import { rs } from '../../utils/responsive';
import Button from '@/components/button';

const Final = () => {
    return (
        <LinearGradient colors={["#470A68", "#8D14CE", "#8D14CE"]} style={styles.container}>
            <View style={styles.content}>
                <View style={styles.inputContainerBox}>
                    <View style={styles.innerContent}>

                        {/* Content will go here */}

                        <Image source={Verification} />
                        <Text style={styles.title}>Verification Pending</Text>
                        <Text style={styles.description}>Thanks for joining Unicapp! Our team is verifying your documents. We’ll notify you once you’re approved.</Text>
                        <TouchableOpacity
                            disabled={false}
                            style={[styles.button]}
                        >
                            <Text style={[styles.buttonText]}>
                                {"Button"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Final

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
        marginTop: rh(12), // Increased to match the space taken by header
        overflow: "hidden",
    },
    innerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: rh(5),
        paddingHorizontal: rw(7.5),
    },
    title: {
        fontSize: fontSizes.xl, fontWeight: 'bold',
        color: '#000',
        marginTop: rh(2),
    },
    description: {
        fontSize: fontSizes.lg,
        maxWidth: rw(70),
        marginTop: rh(1),
        textAlign: 'center',
        color: '#000',
    },
    button: {
        backgroundColor: '#F3E545',
        padding: rw(3),
        width: rw(92),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: rh(2),
        borderRadius: rw(2),
      },
      buttonText: {
        fontFamily: "General-Sans-Bold",
        fontWeight: "600",
        fontSize: rs(4),
        color: "#000",
      },
      buttonDisabled: {
        backgroundColor: '#E0E0E0',
        opacity: 0.7,
      },
      buttonTextDisabled: {
        color: '#808080',
      }
})