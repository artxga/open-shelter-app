import React, { useState } from 'react';
import { IonModal, IonContent, IonButton, IonIcon, IonTextarea, IonItem, IonLabel, IonSelect, IonSelectOption, IonToast } from '@ionic/react';
import { warningOutline, closeOutline, paperPlaneOutline } from 'ionicons/icons';
import { PhotoCapture } from './PhotoCapture';
import { useAppStore } from '../../application/store/useAppStore';
import { IncidentType } from '../../domain/models/Incident';

interface IncidentBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IncidentBottomSheet: React.FC<IncidentBottomSheetProps> = ({ isOpen, onClose }) => {
  const reportIncident = useAppStore((state: any) => state.reportIncident);
  const isReporting = useAppStore((state: any) => state.isReportingIncident);
  
  const [type, setType] = useState<IncidentType>('Nuevo Abandono');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async () => {
    if (!photoUrl) {
      alert("La foto es obligatoria para reportar incidentes.");
      return;
    }
    
    await reportIncident({
      type,
      description,
      photoUrl
    });
    
    // Reset and close
    setDescription('');
    setPhotoUrl(undefined);
    setType('Nuevo Abandono');
    setShowToast(true);
    onClose();
  };

  return (
    <>
      <IonModal isOpen={isOpen} initialBreakpoint={0.75} breakpoints={[0, 0.75, 1]} onDidDismiss={onClose} className="glass-modal">
        <IonContent style={{ '--background': '#0b0f19' }}>
          <div className="sticky top-0 z-20 px-4 py-6 bg-[#0b0f19]/90 backdrop-blur-md border-b border-white/10 flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-red-500 flex items-center gap-2 m-0 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
              <IonIcon icon={warningOutline} /> Reportar Incidencia
            </h2>
            <IonButton fill="clear" color="medium" onClick={onClose}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </div>

          <div className="px-4 space-y-6 pb-12">
            <div className="glass-panel rounded-3xl p-1 shadow-lg">
              <IonItem className="rounded-2xl" color="glass" lines="none" style={{ '--background': 'transparent' }}>
                <IonLabel position="stacked" className="font-semibold text-slate-400 mb-2 tracking-wide uppercase text-xs">Tipo de Incidencia</IonLabel>
                <IonSelect 
                  value={type} 
                  onIonChange={e => setType(e.detail.value)} 
                  interface="action-sheet"
                  className="text-lg font-bold text-white w-full max-w-full"
                >
                  <IonSelectOption value="Nuevo Abandono">Nuevo Abandono (camada/no censado)</IonSelectOption>
                  <IonSelectOption value="Emergencia Médica">Emergencia Médica</IonSelectOption>
                  <IonSelectOption value="Vandalismo/Comida Contaminada">Vandalismo / Comida Contaminada</IonSelectOption>
                </IonSelect>
              </IonItem>
            </div>

            <div className="glass-panel rounded-3xl p-2 shadow-lg">
              <PhotoCapture label="Foto Obligatoria" onPhotoTaken={setPhotoUrl} />
            </div>

            <div className="glass-panel rounded-3xl p-1 shadow-lg">
              <IonItem className="rounded-2xl" color="glass" lines="none" style={{ '--background': 'transparent' }}>
                <IonLabel position="stacked" className="font-semibold text-slate-400 mb-2 tracking-wide uppercase text-xs">Notas Adicionales</IonLabel>
                <IonTextarea 
                  rows={3} 
                  placeholder="Describe la situación brevemente..."
                  value={description}
                  onIonChange={e => setDescription(e.detail.value!)}
                  className="text-white bg-black/20 rounded-xl p-2 mt-2"
                />
              </IonItem>
            </div>

            <IonButton 
              expand="block" 
              color="danger" 
              size="large" 
              className="h-16 font-extrabold text-xl mt-8 mb-4 tracking-wider rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(239,68,68,0.3)] active:scale-95 transition-transform"
              style={{ '--border-radius': '16px' }}
              onClick={handleSubmit}
              disabled={!photoUrl || isReporting}
            >
              <IonIcon slot="start" icon={paperPlaneOutline} />
              {isReporting ? 'Enviando...' : 'ENVIAR REPORTE'}
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Incidencia reportada con éxito."
        duration={3000}
        color="success"
        position="top"
      />
    </>
  );
};
