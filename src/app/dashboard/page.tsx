'use client';

import styles from './page.module.css';
import MapComponent from '@/components/Map';
import { useAmbulance } from '@/hooks/useAmbulance';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const { latitude, longitude, lastUpdated, isLive, error } = useAmbulance();
  const [callStatus, setCallStatus] = useState<string>('');
  const [hasCalled, setHasCalled] = useState(false);

  const makeCall = async () => {
    setCallStatus('Initiating call...');
    try {
      const response = await axios.post('/api/make-call');
      if (response.data.success) {
        setCallStatus('Call initiated! Check your phone.');
        localStorage.setItem('ambulanceCallInitiated', 'true');
      } else {
        setCallStatus('Call failed: ' + (response.data.error || 'Unknown error'));
      }
    } catch (err) {
      setCallStatus('Error initiating call');
      console.error(err);
    }
  };

  const resetCallStatus = () => {
    localStorage.removeItem('ambulanceCallInitiated');
    setHasCalled(false);
    setCallStatus('Call status reset. Ready to call again.');
  };

  useEffect(() => {
    const checkAndCall = () => {
      // Check if we already called in this session/trip using localStorage
      const alreadyCalled = localStorage.getItem('ambulanceCallInitiated');

      if (isLive && !hasCalled && !alreadyCalled) {
        makeCall();
        setHasCalled(true);
        localStorage.setItem('ambulanceCallInitiated', 'true');
      }
      // Optional: Reset if ambulance goes offline? 
      // For now, keeping it strict "one time" as requested. 
      // We can add a "Reset" button if needed.
    };

    if (isLive) {
      checkAndCall();
    }
  }, [isLive, hasCalled]);

  // Cleanup effect: when component unmounts or isLive becomes false (trip ends), 
  // do we want to reset? 
  // User said "one time only". Let's *not* reset automatically to be safe, 
  // or maybe only reset if isLive is false for a long time.
  // For now, I'll add a manual reset in the UI if they want to test again.

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.title}>City Hospital Emergency</div>
        <div className={styles.statusIndicator}>
          {isLive ? (
            <>
              <span style={{ fontSize: '10px' }}>🔴</span> Ambulance Live
            </>
          ) : (
            'Offline'
          )}
        </div>
      </header>

      <div className={styles.container}>
        <section className={styles.mapSection}>
          <MapComponent lat={latitude} lng={longitude} />
        </section>

        <section className={styles.infoSection}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Status</div>
            <div className={`${styles.cardValue} ${isLive ? styles.liveBadge : styles.noSignal}`}>
              {error ? 'Error Fetching Data' : isLive ? 'Tracking Active' : 'No Signal from Ambulance'}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>Emergency Call</div>
            <div className={styles.cardValue}>
              <button
                onClick={makeCall}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Test Call Agent
              </button>
              <button
                onClick={resetCallStatus}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  marginLeft: '10px'
                }}
              >
                Reset
              </button>
            </div>
            {callStatus && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: callStatus.includes('failed') ? 'red' : 'green' }}>
                {callStatus}
              </div>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>Current Location</div>
            <div className={styles.cardValue}>
              {latitude && longitude ? (
                <>
                  <div>{latitude.toFixed(5)},</div>
                  <div>{longitude.toFixed(5)}</div>
                </>
              ) : (
                '----- , -----'
              )}
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
              Lat, Long
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>Last Update</div>
            <div className={styles.cardValue}>
              {lastUpdated || '--:--:--'}
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
              Updates every 15 seconds
            </div>
          </div>
        </section>
      </div >
    </main >
  );
}
