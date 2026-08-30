import React, { useState } from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { alertOutline } from 'ionicons/icons';
import { IncidentBottomSheet } from './IncidentBottomSheet';

export const IncidentFAB: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed" className="mb-[5.5rem] mr-2">
        <div className="relative group">
          <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-40 group-active:animate-none duration-1000"></div>
          <IonFabButton 
            color="danger" 
            onClick={() => setIsModalOpen(true)}
            className="shadow-[0_0_20px_rgba(239,68,68,0.7)] relative z-10 hover:scale-105 active:scale-95 transition-transform"
          >
            <IonIcon icon={alertOutline} className="text-3xl" />
          </IonFabButton>
        </div>
      </IonFab>
      
      <IncidentBottomSheet isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
