import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export class CameraService {
  static async takePhoto(): Promise<string | undefined> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
      return image.webPath; // URL to show the image in a web view
    } catch (error) {
      console.error('User cancelled or error taking photo', error);
      return undefined;
    }
  }
}
