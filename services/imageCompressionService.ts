import * as ImageManipulator from "expo-image-manipulator";

export interface CompressedImage {
  uri: string;
  type: string;
  name: string;
  size?: number;
}

export class ImageCompressionService {
  /**
   * Compress an image to reduce its size
   * @param imageUri - The URI of the image to compress
   * @param quality - Compression quality (0-1), default is 0.3
   * @param maxWidth - Maximum width in pixels, default is 800
   * @param maxHeight - Maximum height in pixels, default is 600
   */
  static async compressImage(
    imageUri: string,
    quality: number = 0.3,
    maxWidth: number = 800,
    maxHeight: number = 600
  ): Promise<string> {
    try {
      const manipulatorResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [
          {
            resize: {
              width: maxWidth,
              height: maxHeight,
            },
          },
        ],
        {
          compress: quality,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      return manipulatorResult.uri;
    } catch (error) {
      console.error("Image compression error:", error);
      // Return original URI if compression fails
      return imageUri;
    }
  }

  /**
   * Compress a document upload result
   * @param document - The document to compress
   * @param quality - Compression quality (0-1), default is 0.3
   */
  static async compressDocument(
    document: any,
    quality: number = 0.3
  ): Promise<any> {
    try {
      if (!document || !document.uri) {
        return document;
      }

      const compressedUri = await this.compressImage(
        document.uri,
        quality,
        800, // Max width for documents
        600 // Max height for documents
      );

      return {
        ...document,
        uri: compressedUri,
        // Remove base64 if it exists to reduce payload
        base64: undefined,
      };
    } catch (error) {
      console.error("Document compression error:", error);
      return document;
    }
  }

  /**
   * Compress multiple documents
   * @param documents - Array of documents to compress
   * @param quality - Compression quality (0-1), default is 0.3
   */
  static async compressDocuments(
    documents: any[],
    quality: number = 0.3
  ): Promise<any[]> {
    if (!documents || documents.length === 0) {
      return [];
    }

    try {
      const compressedDocs = await Promise.all(
        documents.map((doc) => this.compressDocument(doc, quality))
      );
      return compressedDocs;
    } catch (error) {
      console.error("Documents compression error:", error);
      return documents;
    }
  }
}
