'use client';

import styles from './page.module.css';
import MapComponent from '@/components/Map';
import { useAmbulance } from '@/hooks/useAmbulance';

export default function Dashboard() {
  const { latitude, longitude, lastUpdated, isLive, error } = useAmbulance();

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
      </div>
    </main>
  );
}
