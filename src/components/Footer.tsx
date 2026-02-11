import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h3>City Hospital</h3>
                    <p>Providing world-class healthcare with compassion and excellence.</p>
                </div>
                <div className={styles.section}>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className={styles.section}>
                    <h4>Contact</h4>
                    <p>Emergency: 108</p>
                    <p>Email: info@cityhospital.com</p>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} City Hospital. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
