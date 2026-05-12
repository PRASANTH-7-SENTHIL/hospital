'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Appointment {
    id: string;
    name: string;
    date: string;
    department: string;
    createdAt: string;
}

export default function BookAppointment() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [department, setDepartment] = useState('');
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Fetch appointments
    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('/api/appointments');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/api/appointments', {
                name,
                date,
                department,
            });

            if (response.data.success) {
                setMessage('Appointment booked successfully!');
                setName('');
                setDate('');
                setDepartment('');
                fetchAppointments(); // Refresh the list
            } else {
                setMessage('Failed to book appointment.');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <button className={styles.backButton} onClick={() => router.push('/dashboard')}>
                        &larr; Back to Dashboard
                    </button>
                    <div className={styles.title}>Book Appointment</div>
                </div>
            </header>

            <div className={styles.container}>
                <section className={styles.bookingSection}>
                    <h2>Schedule a Visit</h2>
                    <form className={styles.form} onSubmit={handleBooking}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Patient Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter full name"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="date">Date & Time</label>
                            <input
                                type="datetime-local"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="department">Department</label>
                            <select
                                id="department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Department</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Orthopedics">Orthopedics</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="General Checkup">General Checkup</option>
                            </select>
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Booking...' : 'Book Appointment'}
                        </button>

                        {message && (
                            <div className={`${styles.message} ${message.includes('successfully') ? styles.messageSuccess : styles.messageError}`}>
                                {message}
                            </div>
                        )}
                    </form>
                </section>

                <section className={styles.appointmentsListSection}>
                    <h2>Upcoming Appointments</h2>
                    <div className={styles.appointmentsGrid}>
                        {appointments.length > 0 ? (
                            appointments.map((appt) => (
                                <div key={appt.id} className={styles.appointmentCard}>
                                    <div className={styles.apptHeader}>
                                        <span className={styles.apptDepartment}>{appt.department}</span>
                                        <span className={styles.apptDate}>
                                            {new Date(appt.date).toLocaleString([], {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                    <div className={styles.apptBody}>
                                        <strong>Patient:</strong> {appt.name}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noAppointments}>No appointments booked yet.</p>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
