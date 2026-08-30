import React from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonToggle, IonButton, IonIcon } from '@ionic/react';
import { personCircleOutline, notificationsOutline, syncOutline, moonOutline, logOutOutline } from 'ionicons/icons';
import { AppHeader } from '../components/AppHeader';
import { useAppStore } from '../../application/store/useAppStore';

export const SettingsPage: React.FC = () => {
  const isDarkMode = useAppStore((state: any) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state: any) => state.toggleDarkMode);
  return (
    <IonPage>
      <AppHeader title="Ajustes" />
      <IonContent className="ion-padding">
        <div className="space-y-6 pb-24">
          
          {/* PROFILE CARD */}
          <div className="glass-panel rounded-3xl p-6 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
            <IonIcon icon={personCircleOutline} className="text-7xl text-amber-500 relative z-10 mb-2 drop-shadow-md" />
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white m-0 relative z-10">Voluntario Activo</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium mt-1 relative z-10">Ronda Nocturna</p>
            <div className="mt-4 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full relative z-10 border border-emerald-500/30">
              En Línea
            </div>
          </div>

          {/* PREFERENCES */}
          <div className="space-y-3">
            <h3 className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-xs ml-4 mb-2">Preferencias</h3>
            
            <div className="glass-panel rounded-3xl p-1 shadow-lg">
              <IonItem className="rounded-2xl" color="glass" lines="none" style={{ '--background': 'transparent' }}>
                <div className="bg-amber-100 dark:bg-amber-500/20 p-2 rounded-xl mr-4">
                  <IonIcon icon={notificationsOutline} className="text-amber-600 dark:text-amber-500 text-xl" />
                </div>
                <IonLabel className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Notificaciones Push</IonLabel>
                <IonToggle checked={true} color="primary" slot="end" />
              </IonItem>
            </div>

            <div className="glass-panel rounded-3xl p-1 shadow-lg">
              <IonItem className="rounded-2xl" color="glass" lines="none" style={{ '--background': 'transparent' }}>
                <div className="bg-blue-100 dark:bg-blue-500/20 p-2 rounded-xl mr-4">
                  <IonIcon icon={syncOutline} className="text-blue-600 dark:text-blue-500 text-xl" />
                </div>
                <IonLabel className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Sincronización de Fondo</IonLabel>
                <IonToggle checked={true} color="primary" slot="end" />
              </IonItem>
            </div>

            <div className={`glass-panel rounded-3xl p-1 shadow-lg ${!isDarkMode ? 'opacity-90' : ''}`}>
              <IonItem className="rounded-2xl" color="glass" lines="none" style={{ '--background': 'transparent' }}>
                <div className="bg-indigo-100 dark:bg-indigo-500/20 p-2 rounded-xl mr-4">
                  <IonIcon icon={moonOutline} className="text-indigo-600 dark:text-indigo-400 text-xl" />
                </div>
                <IonLabel className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Modo Nocturno</IonLabel>
                <IonToggle 
                  checked={isDarkMode} 
                  onIonChange={() => toggleDarkMode()} 
                  color="primary" 
                  slot="end" 
                />
              </IonItem>
            </div>
          </div>

          {/* LOGOUT */}
          <IonButton 
            expand="block" 
            fill="clear"
            color="danger" 
            className="h-14 font-bold text-lg mt-8"
          >
            <IonIcon slot="start" icon={logOutOutline} />
            CERRAR SESIÓN
          </IonButton>

        </div>
      </IonContent>
    </IonPage>
  );
};
