import React, { useState } from 'react';
import { IonButton, IonIcon, IonSpinner, IonImg } from '@ionic/react';
import { cameraOutline, checkmarkCircle } from 'ionicons/icons';
import { CameraService } from '../../infrastructure/hardware/CameraService';

interface PhotoCaptureProps {
  onPhotoTaken: (photoUrl: string) => void;
  label?: string;
}

export const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onPhotoTaken, label = 'Tomar Foto' }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>();

  const handleCapture = async () => {
    setIsCapturing(true);
    const photo = await CameraService.takePhoto();
    setIsCapturing(false);
    
    if (photo) {
      setPhotoPreview(photo);
      onPhotoTaken(photo);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full my-4">
      {photoPreview ? (
        <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <IonImg src={photoPreview} alt="Captura" className="w-full h-48 object-cover" />
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md rounded-full p-1 shadow-lg">
            <IonIcon icon={checkmarkCircle} className="text-3xl text-emerald-400" />
          </div>
          <button 
            className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm text-white font-semibold py-3 hover:bg-black/80 transition-colors active:scale-y-95 origin-bottom"
            onClick={handleCapture}
          >
            Volver a Tomar
          </button>
        </div>
      ) : (
        <button 
          className="w-full max-w-sm h-20 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/5 hover:bg-amber-500/10 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-inner group"
          onClick={handleCapture}
          disabled={isCapturing}
        >
          {isCapturing ? <IonSpinner name="crescent" color="primary" /> : (
            <>
              <div className="bg-amber-500/20 p-3 rounded-full group-hover:bg-amber-500/30 transition-colors">
                <IonIcon icon={cameraOutline} className="text-2xl text-amber-400" />
              </div>
              <span className="font-semibold text-amber-500 tracking-wide">{label}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
