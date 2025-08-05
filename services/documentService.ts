import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export interface DocumentUploadResult {
  uri: string;
  base64?: string; // Made optional since we're not always including it
  type: string;
  name: string;
}

export class DocumentService {
  static async requestPermissions(): Promise<boolean> {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant camera roll permissions to upload documents."
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error("Permission request error:", error);
      return false;
    }
  }

  static async pickDocument(): Promise<DocumentUploadResult | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, // Reduced quality to decrease file size
        base64: false, // Removed base64 to reduce payload size
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        // base64: asset.base64, // Removed to reduce payload size
        type: asset.type || "image/jpeg",
        name: asset.fileName || `document_${Date.now()}.jpg`,
      };
    } catch (error) {
      console.error("Document picker error:", error);
      Alert.alert("Error", "Failed to pick document. Please try again.");
      return null;
    }
  }

  static async takePhoto(): Promise<DocumentUploadResult | null> {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant camera permissions to take photos."
        );
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, // Reduced quality to decrease file size
        base64: false, // Removed base64 to reduce payload size
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        // base64: asset.base64, // Removed to reduce payload size
        type: asset.type || "image/jpeg",
        name: `photo_${Date.now()}.jpg`,
      };
    } catch (error) {
      console.error("Camera error:", error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
      return null;
    }
  }

  static showDocumentPickerOptions(
    onGallery: () => void,
    onCamera: () => void
  ): void {
    Alert.alert("Select Document", "Choose an option to upload your document", [
      { text: "Camera", onPress: onCamera },
      { text: "Gallery", onPress: onGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  static validateDocumentSize(base64: string, maxSizeMB: number = 5): boolean {
    try {
      const sizeInBytes = (base64.length * 3) / 4;
      const sizeInMB = sizeInBytes / (1024 * 1024);

      if (sizeInMB > maxSizeMB) {
        Alert.alert(
          "File Too Large",
          `Please select a file smaller than ${maxSizeMB}MB`
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error("Document validation error:", error);
      return false;
    }
  }
}
