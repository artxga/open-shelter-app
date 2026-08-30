import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { AppHeader } from '../components/AppHeader';

export const HistoryPage: React.FC = () => {
  return (
    <IonPage>
      <AppHeader title="Historial" />
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center h-full text-center text-zinc-500">
          <p>El historial de rondas e incidencias aparecerá aquí.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};
