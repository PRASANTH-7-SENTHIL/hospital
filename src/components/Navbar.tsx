
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="/">
                        <span className={styles.plusIcon}>+</span> City Hospital
                    </Link>
                </div>
                <ul className={styles.navLinks}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/services">Services</Link></li>
                    <li><Link href="/about">About Us</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    <li className={styles.ctaItem}>
                        <Link href="/dashboard" className={styles.dashboardBtn}>
                            🔴 Live Ambulance
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
