import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { DocumentService, DocumentUploadResult } from '../services/documentService';
import { rh, rw } from '../utils/responsive';

interface ProfilePicturePickerProps {
    onImageSelected: (result: DocumentUploadResult) => void;
    currentImage?: string;
}

const ProfilePicturePicker: React.FC<ProfilePicturePickerProps> = ({
    onImageSelected,
    currentImage
}) => {
    const [imageUri, setImageUri] = useState<string | null>(currentImage || null);

    // Update imageUri when currentImage prop changes
    useEffect(() => {
        setImageUri(currentImage || null);
    }, [currentImage]);

    const pickImage = async () => {
        DocumentService.showDocumentPickerOptions(
            async () => {
                const result = await DocumentService.pickDocument();
                if (result) {
                    console.log("Profile image picked from gallery:", result);
                    setImageUri(result.uri);
                    onImageSelected(result);
                }
            },
            async () => {
                const result = await DocumentService.takePhoto();
                if (result) {
                    console.log("Profile image taken from camera:", result);
                    setImageUri(result.uri);
                    onImageSelected(result);
                }
            }
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.profileImage} />
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Ionicons name="person" size={rw(12)} color="#999" />
                    </View>
                )}

                {/* Edit/Pencil Icon */}
                <View style={styles.editIconContainer}>
                    <Ionicons name="pencil" size={rw(4)} color="#fff" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: rh(2),
    },
    imageContainer: {
        position: 'relative',
        width: rw(25),
        height: rw(25),
        borderRadius: rw(12.5),
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        borderWidth: 3,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#8D14CE',
        borderRadius: rw(3),
        width: rw(6),
        height: rw(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
});

export default ProfilePicturePicker;
