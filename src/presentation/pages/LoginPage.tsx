import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { logInOutline, pawOutline } from 'ionicons/icons';
import { useAppStore } from '../../application/store/useAppStore';

export const LoginPage: React.FC = () => {
  const login = useAppStore((state: any) => state.login);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !password) return;
    
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      login();
    }, 1000);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ '--background': 'transparent' }}>
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex flex-col items-center justify-center relative overflow-hidden px-6 transition-colors duration-300">
          
          {/* Background Decorative Elements */}
          <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[40%] bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[40%] bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="w-full max-w-sm relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Logo/Icon */}
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-4 rounded-3xl shadow-[0_10px_30px_rgba(245,158,11,0.4)]">
                <IonIcon icon={pawOutline} className="text-6xl text-white drop-shadow-md" />
              </div>
            </div>

            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Michi<span className="text-amber-500">Care</span></h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Control Operativo de Rondas</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="glass-panel rounded-2xl p-2 shadow-lg">
                <IonInput 
                  value={code}
                  onIonInput={(e: any) => setCode(e.target.value)}
                  placeholder="Código de Voluntario (Ej. VOL-001)"
                  className="px-4 text-slate-900 dark:text-white font-semibold"
                  required
                />
              </div>

              <div className="glass-panel rounded-2xl p-2 shadow-lg">
                <IonInput 
                  type="password"
                  value={password}
                  onIonInput={(e: any) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="px-4 text-slate-900 dark:text-white font-semibold"
                  required
                />
              </div>

              <IonButton 
                type="submit"
                expand="block" 
                size="large" 
                disabled={!code || !password || isLoading}
                className="h-16 font-extrabold text-xl mt-8 tracking-wider rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.5)] transition-all active:scale-95 group"
                style={{ '--border-radius': '16px' }}
              >
                {isLoading ? <IonSpinner name="crescent" color="light" /> : (
                  <>
                    <IonIcon slot="start" icon={logInOutline} className="group-hover:translate-x-1 transition-transform" />
                    INGRESAR
                  </>
                )}
              </IonButton>
            </form>

            <div className="mt-8 text-center">
              <p className="text-xs text-slate-400 font-medium">¿Problemas para ingresar? Contacta al administrador.</p>
            </div>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
