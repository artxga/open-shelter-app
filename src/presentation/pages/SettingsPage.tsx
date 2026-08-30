import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { AppHeader } from '../components/AppHeader';

export const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <AppHeader title="Configuración" />
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center h-full text-center text-zinc-500">
          <p>Ajustes de perfil y preferencias (Modo Noche forzado).</p>
        </div>
      </IonContent>
    </IonPage>
  );
};
