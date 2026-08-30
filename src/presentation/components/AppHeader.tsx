import React from 'react';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';

interface AppHeaderProps {
  title: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar style={{ '--background': 'transparent' }} className="!pt-8 pb-4 px-4 bg-gradient-to-b from-slate-100 dark:from-[#0b0f19] to-transparent">
        <IonTitle className="font-extrabold text-3xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-600 pl-2">
          {title}
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
