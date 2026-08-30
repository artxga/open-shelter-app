import React, { useEffect, useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonItem, IonLabel, IonSelect, IonSelectOption, IonToggle, 
  IonButton, IonIcon, IonToast, IonSpinner
} from '@ionic/react';
import { saveOutline, mapOutline } from 'ionicons/icons';
import { useAppStore } from '../../application/store/useAppStore';
import { PhotoCapture } from '../components/PhotoCapture';
import { IncidentFAB } from '../components/IncidentFAB';
import { AppHeader } from '../components/AppHeader';
import { FoodType, FeedingPoint } from '../../domain/models/FeedingPoint';

export const DashboardPage: React.FC = () => {
  const feedingPoints = useAppStore((state: any) => state.feedingPoints);
  const loadFeedingPoints = useAppStore((state: any) => state.loadFeedingPoints);
  const isLoadingPoints = useAppStore((state: any) => state.isLoadingPoints);
  const saveFeedingRecord = useAppStore((state: any) => state.saveFeedingRecord);
  const [selectedPointId, setSelectedPointId] = useState<string>('');
  const [waterRefilled, setWaterRefilled] = useState(false);
  const [foodRefilled, setFoodRefilled] = useState(false);
  const [foodTypes, setFoodTypes] = useState<FoodType[]>([]);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadFeedingPoints();
  }, [loadFeedingPoints]);

  const handleSubmit = async () => {
    if (!selectedPointId) return;
    
    setIsSaving(true);
    await saveFeedingRecord({
      feedingPointId: selectedPointId,
      waterRefilled,
      foodRefilled,
      foodTypes,
      photoUrl
    });
    setIsSaving(false);
    
    // Reset form
    setSelectedPointId('');
    setWaterRefilled(false);
    setFoodRefilled(false);
    setFoodTypes([]);
    setPhotoUrl(undefined);
    setShowToast(true);
  };

  return (
    <IonPage>
      <AppHeader title="Check-in Rondas" />
      <IonContent className="ion-padding">
        
        {/* MAP PLACEHOLDER */}
        <div className="w-full h-48 rounded-3xl mb-6 flex flex-col items-center justify-center relative overflow-hidden glass-panel border-t border-white/20 shadow-lg group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-transparent to-slate-900/80 opacity-50"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMGg4djhIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay"></div>
          <IonIcon icon={mapOutline} className="text-4xl text-amber-500/80 mb-2 relative z-10 group-hover:scale-110 transition-transform duration-500" />
          <span className="text-slate-300 font-semibold relative z-10 tracking-wide text-sm">Mapa interactivo (Próximamente)</span>
        </div>

        {isLoadingPoints ? (
          <div className="flex justify-center p-8"><IonSpinner name="dots" /></div>
        ) : (
          <div className="space-y-4 pb-24">
            
            <div className="glass-panel rounded-3xl p-1 shadow-lg">
              <IonItem className="rounded-2xl" color="glass" lines="none" style={{ '--background': 'transparent' }}>
                <IonLabel position="stacked" className="font-semibold text-slate-400 mb-2 tracking-wide uppercase text-xs">Punto de Alimentación</IonLabel>
                <IonSelect 
                  value={selectedPointId} 
                  onIonChange={e => setSelectedPointId(e.detail.value)}
                  placeholder="Seleccionar punto"
                  interface="action-sheet"
                  className="text-lg font-bold text-white w-full max-w-full"
                >
                  {feedingPoints.map((point: FeedingPoint) => (
                    <IonSelectOption key={point.id} value={point.id}>
                      {point.sector} - {point.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel rounded-3xl p-4 flex flex-col items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform" onClick={() => setWaterRefilled(!waterRefilled)}>
                <IonLabel className="text-sm font-semibold text-slate-300 text-center">¿Agua<br/>Renovada?</IonLabel>
                <IonToggle 
                  checked={waterRefilled} 
                  onIonChange={e => { e.stopPropagation(); setWaterRefilled(e.detail.checked); }} 
                  color="primary"
                  className="scale-125"
                />
              </div>

              <div className="glass-panel rounded-3xl p-4 flex flex-col items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform" onClick={() => setFoodRefilled(!foodRefilled)}>
                <IonLabel className="text-sm font-semibold text-slate-300 text-center">¿Comida<br/>Renovada?</IonLabel>
                <IonToggle 
                  checked={foodRefilled} 
                  onIonChange={e => { e.stopPropagation(); setFoodRefilled(e.detail.checked); }} 
                  color="primary"
                  className="scale-125"
                />
              </div>
            </div>

            {foodRefilled && (
              <div className="glass-panel rounded-3xl p-1 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
                <IonItem className="rounded-2xl" color="glass" lines="none" style={{ '--background': 'transparent' }}>
                  <IonLabel position="stacked" className="font-semibold text-slate-400 mb-2 tracking-wide uppercase text-xs">Tipo de Comida</IonLabel>
                  <IonSelect 
                    multiple={true} 
                    value={foodTypes} 
                    onIonChange={e => setFoodTypes(e.detail.value)}
                    interface="alert"
                    className="text-lg font-bold text-white w-full max-w-full"
                    placeholder="Seleccionar..."
                  >
                    <IonSelectOption value="Seco">Alimento Seco</IonSelectOption>
                    <IonSelectOption value="Húmedo/Medicado">Mezcla Húmedo/Medicado</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </div>
            )}

            <div className="glass-panel rounded-3xl p-2 shadow-lg mt-4">
              <PhotoCapture onPhotoTaken={setPhotoUrl} label="Evidencia Plato" />
            </div>

            <IonButton 
              expand="block" 
              size="large" 
              className="h-16 font-extrabold text-xl mt-8 mb-4 tracking-wider rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(245,158,11,0.3)] active:scale-95 transition-transform"
              style={{ '--border-radius': '16px' }}
              onClick={handleSubmit}
              disabled={!selectedPointId || isSaving}
            >
              {isSaving ? <IonSpinner name="crescent" /> : (
                <>
                  <IonIcon slot="start" icon={saveOutline} />
                  REGISTRAR PUNTO
                </>
              )}
            </IonButton>

          </div>
        )}
        
        <IncidentFAB />
      </IonContent>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Punto registrado correctamente."
        duration={2000}
        color="success"
        position="top"
      />
    </IonPage>
  );
};
