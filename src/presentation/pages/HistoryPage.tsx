import React, { useEffect, useMemo } from 'react';
import { IonPage, IonContent, IonIcon, IonBadge } from '@ionic/react';
import { checkmarkCircleOutline, warningOutline, timeOutline } from 'ionicons/icons';
import { AppHeader } from '../components/AppHeader';
import { useAppStore } from '../../application/store/useAppStore';

export const HistoryPage: React.FC = () => {
  const feedingRecords = useAppStore((state: any) => state.feedingRecords);
  const incidents = useAppStore((state: any) => state.incidents);
  const loadIncidents = useAppStore((state: any) => state.loadIncidents);
  const feedingPoints = useAppStore((state: any) => state.feedingPoints);

  useEffect(() => {
    loadIncidents();
  }, [loadIncidents]);

  const historyItems = useMemo(() => {
    const items: any[] = [];
    
    feedingRecords.forEach((r: any) => {
      const point = feedingPoints.find((p: any) => p.id === r.feedingPointId);
      items.push({
        id: `rec_${r.id}`,
        type: 'record',
        date: new Date(r.recordedAt),
        title: point ? `${point.sector} - ${point.name}` : 'Punto Desconocido',
        subtitle: `Agua: ${r.waterRefilled ? 'Sí' : 'No'} | Comida: ${r.foodRefilled ? 'Sí' : 'No'}`,
      });
    });

    incidents.forEach((i: any) => {
      items.push({
        id: `inc_${i.id}`,
        type: 'incident',
        date: new Date(i.reportedAt),
        title: i.type,
        subtitle: i.description || 'Sin detalles',
        status: i.status
      });
    });

    return items.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [feedingRecords, incidents, feedingPoints]);

  return (
    <IonPage>
      <AppHeader title="Historial" />
      <IonContent className="ion-padding">
        <div className="space-y-4 pb-24">
          {historyItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center text-slate-500 glass-panel rounded-3xl mt-4">
              <IonIcon icon={timeOutline} className="text-4xl mb-2 opacity-50" />
              <p className="font-medium text-sm">El historial de rondas e<br/>incidencias aparecerá aquí.</p>
            </div>
          ) : (
            historyItems.map(item => (
              <div key={item.id} className="glass-panel rounded-3xl p-4 shadow-lg flex items-start gap-4">
                <div className={`p-3 rounded-full mt-1 ${item.type === 'incident' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'}`}>
                  <IonIcon icon={item.type === 'incident' ? warningOutline : checkmarkCircleOutline} className="text-2xl" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-200 m-0 text-lg leading-tight">{item.title}</h3>
                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap ml-2">
                      {item.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1 mb-2 leading-snug">{item.subtitle}</p>
                  
                  {item.type === 'incident' && (
                    <IonBadge color={item.status === 'Resuelto' ? 'success' : 'warning'} className="px-2 py-1 rounded-md">
                      {item.status}
                    </IonBadge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};
