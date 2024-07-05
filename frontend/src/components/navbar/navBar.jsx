import styles from './navbar.module.css';
import { MdEventAvailable } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarItens}>
                <Link to={'/'}>
                    <img className={styles.logo} src="../../../public/activity_icon_183756.png" alt="logo atividades" />
                </Link>
                <div className={styles.navbarMenu}>
                <Link  to={'/'}>
                        Atividades
                </Link>
                <Link to={'/add'}>
                        <MdEventAvailable/>
                        Nova Atividade
                </Link>
                        
                </div>
            </div>

            <div className={styles.mobileNavbar}>
                <Link to={'/'}>
                    <img className={styles.logo} src="../../../public/activity_icon_183756.png" alt="logo atividades" />
                </Link>
                <div className={styles.navbarMenu}>
                    <Link  to={'/'}>
                            Atividades
                    </Link>
                    <Link to={'/add'}>
                        <MdEventAvailable/>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

