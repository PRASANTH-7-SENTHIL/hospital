
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Advanced Healthcare <br /> for Your Family</h1>
          <p className={styles.subtitle}>
            Compassionate care, state-of-the-art technology, and <br /> 24/7 emergency services at your fingertips.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/dashboard" className={`${styles.btn} ${styles.btnPrimary}`}>
              🚑 Track Ambulance
            </Link>
            <Link href="/book-appointment" className={`${styles.btn} ${styles.btnSecondary}`}>
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <h3>50+</h3>
          <p>Specialist Doctors</p>
        </div>
        <div className={styles.statItem}>
          <h3>24/7</h3>
          <p>Emergency Care</p>
        </div>
        <div className={styles.statItem}>
          <h3>10k+</h3>
          <p>Happy Patients</p>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services} id="services">
        <h2 className={styles.sectionTitle}>Our Services</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>🩺</div>
            <h3>General Checkup</h3>
            <p>Comprehensive health screening for all ages.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>❤️</div>
            <h3>Cardiology</h3>
            <p>Expert heart care with advanced diagnostics.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>🧠</div>
            <h3>Neurology</h3>
            <p>Specialized treatment for neurological conditions.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>🦴</div>
            <h3>Orthopedics</h3>
            <p>Joint replacement and sports injury care.</p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className={styles.location} id="location">
        <h2 className={styles.sectionTitle}>Visit Us</h2>
        <div className={styles.locationContent}>
          <div className={styles.address}>
            <h3>City Hospital Main Campus</h3>
            <p>123 Health Avenue, Wellness City</p>
            <div className={styles.coordinates}>
              <p><strong>Coordinates:</strong></p>
              <p>Latitude: 13.051786</p>
              <p>Longitude: 80.210643</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=13.051786,80.210643"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              View on Google Maps →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
