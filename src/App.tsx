import { Navigate, Route } from 'react-router-dom';
import { 
  IonApp, IonRouterOutlet, setupIonicReact, 
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { mapOutline, timeOutline, settingsOutline } from 'ionicons/icons';

import { DashboardPage } from './presentation/pages/DashboardPage';
import { HistoryPage } from './presentation/pages/HistoryPage';
import { SettingsPage } from './presentation/pages/SettingsPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Leaflet CSS for maps */
import 'leaflet/dist/leaflet.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 */
import '@ionic/react/css/palettes/dark.class.css';

/* Theme variables */
import './theme/variables.css';

import { useAppStore } from './application/store/useAppStore';
import { useEffect } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const isDarkMode = useAppStore((state: any) => state.isDarkMode);

  useEffect(() => {
    // Toggle dark mode class on HTML element
    if (isDarkMode) {
      document.documentElement.classList.add('ion-palette-dark');
      document.documentElement.classList.add('dark'); // For Tailwind
    } else {
      document.documentElement.classList.remove('ion-palette-dark');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </IonRouterOutlet>

        <IonTabBar 
          slot="bottom" 
          className="mx-6 mb-6 rounded-full border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.8)] h-16 absolute bottom-0 left-0 right-0 overflow-hidden"
          style={{ '--border': 'none', '--background': 'transparent' }}
        >
          <IonTabButton tab="dashboard" href="/dashboard" className="bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-colors active:scale-95 text-slate-500 dark:text-slate-400">
            <IonIcon icon={mapOutline} className="text-xl mb-1" />
            <IonLabel className="font-medium text-xs">Rondas</IonLabel>
          </IonTabButton>
          
          <IonTabButton tab="history" href="/history" className="bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-colors active:scale-95 text-slate-500 dark:text-slate-400">
            <IonIcon icon={timeOutline} className="text-xl mb-1" />
            <IonLabel className="font-medium text-xs">Historial</IonLabel>
          </IonTabButton>
          
          <IonTabButton tab="settings" href="/settings" className="bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-colors active:scale-95 text-slate-500 dark:text-slate-400">
            <IonIcon icon={settingsOutline} className="text-xl mb-1" />
            <IonLabel className="font-medium text-xs">Ajustes</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;
